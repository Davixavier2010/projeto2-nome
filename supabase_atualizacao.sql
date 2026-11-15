-- ==============================================================================
-- ATUALIZAÇÃO SUPABASE - RIDA SITES PROFISSIONAIS (VERSÃO COMPLETA E DEFINITIVA)
-- 1. Garante colunas de email e tenant_id na tabela perfis
-- 2. Sincroniza e-mails existentes de auth.users para perfis
-- 3. Define admin oficial (rida.xv10@gmail.com)
-- 4. Função is_admin() livre de recursão
-- 5. Função RPC rida_criar_novo_cliente (usada pelo Admin para criar clientes e sites)
-- 6. Função RPC update_site_status_by_admin
-- 7. Função RPC delete_user_by_admin
-- 8. Gatilho handle_new_user() para auto-cadastro de clientes (cria tenant + config + perfil)
-- 9. Função RPC rida_garantir_tenant_para_perfil()
-- 10. Políticas RLS completas e permissões para perfis, tenants e site_config
-- ==============================================================================

-- 1. ADICIONAR COLUNAS DE EMAIL E TENANT_ID EM PUBLIC.PERFIS
ALTER TABLE public.perfis ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.perfis ADD COLUMN IF NOT EXISTS tenant_id UUID;

-- Garante chave estrangeira opcional sem erro se já existir
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_perfis_tenant'
  ) THEN
    ALTER TABLE public.perfis 
    ADD CONSTRAINT fk_perfis_tenant 
    FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE SET NULL;
  END IF;
EXCEPTION WHEN OTHERS THEN 
  NULL;
END $$;

-- 2. SINCRONIZAR OS E-MAILS DE USUÁRIOS JÁ CADASTRADOS EM AUTH.USERS
UPDATE public.perfis p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

-- 3. GARANTIR QUE RIDA.XV10@GMAIL.COM TENHA ROLE = 'admin'
UPDATE public.perfis
SET role = 'admin'
WHERE email = 'rida.xv10@gmail.com' OR id IN (
  SELECT id FROM auth.users WHERE email = 'rida.xv10@gmail.com'
);

-- 4. FUNÇÃO DE VERIFICAÇÃO IS_ADMIN() SEGURA (SEM RECURSÃO)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    COALESCE(auth.jwt() ->> 'email', '') = 'rida.xv10@gmail.com'
    OR EXISTS (
      SELECT 1 FROM public.perfis
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- 5. FUNÇÃO RPC PARA CRIAR NOVO CLIENTE (TENANT + SITE_CONFIG) PELO ADMIN
CREATE OR REPLACE FUNCTION public.rida_criar_novo_cliente(
  p_nome TEXT,
  p_slug TEXT,
  p_plano TEXT,
  p_whatsapp TEXT,
  p_horarios TEXT,
  p_endereco TEXT
)
RETURNS UUID AS $$
DECLARE
  v_tenant_id UUID;
  v_slug TEXT := p_slug;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso negado: apenas o administrador da RIDA pode cadastrar clientes.';
  END IF;

  -- Ajusta slug se já existir
  IF EXISTS (SELECT 1 FROM public.tenants WHERE slug = v_slug) THEN
    v_slug := v_slug || '-' || substr(md5(random()::text), 1, 4);
  END IF;

  -- Insere o tenant
  INSERT INTO public.tenants (nome, slug, plano, status)
  VALUES (p_nome, v_slug, COALESCE(p_plano, 'essencial'), 'ativo')
  RETURNING id INTO v_tenant_id;

  -- Insere as configurações institucionais do site
  INSERT INTO public.site_config (tenant_id, whatsapp, horarios, endereco)
  VALUES (v_tenant_id, COALESCE(p_whatsapp, ''), COALESCE(p_horarios, 'Seg a Sex: 08h às 18h'), COALESCE(p_endereco, ''))
  ON CONFLICT (tenant_id) DO UPDATE SET
    whatsapp = EXCLUDED.whatsapp,
    horarios = EXCLUDED.horarios,
    endereco = EXCLUDED.endereco;

  RETURN v_tenant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.rida_criar_novo_cliente(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- 6. FUNÇÃO RPC PARA ATUALIZAR STATUS DO SITE (SEM BLOQUEIO DE RLS)
CREATE OR REPLACE FUNCTION public.update_site_status_by_admin(
  target_user_id UUID,
  new_status TEXT,
  new_link TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
BEGIN
  IF public.is_admin() THEN
    UPDATE public.perfis
    SET 
      status_site = new_status,
      link_site = CASE WHEN new_link IS NOT NULL THEN new_link ELSE link_site END,
      updated_at = timezone('utc'::text, now())
    WHERE id = target_user_id;

    RETURN json_build_object('success', true);
  ELSE
    RAISE EXCEPTION 'Acesso negado: apenas o administrador da RIDA pode alterar o status.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.update_site_status_by_admin(UUID, TEXT, TEXT) TO authenticated;

-- 7. FUNÇÃO RPC PARA EXCLUIR USUÁRIO (AUTH.USERS + PUBLIC.PERFIS)
CREATE OR REPLACE FUNCTION public.delete_user_by_admin(target_user_id UUID)
RETURNS JSONB AS $$
BEGIN
  IF public.is_admin() THEN
    IF target_user_id = auth.uid() THEN
      RAISE EXCEPTION 'Operação negada: Você não pode excluir sua própria conta de administrador.';
    END IF;

    DELETE FROM auth.users WHERE id = target_user_id;
    DELETE FROM public.perfis WHERE id = target_user_id;

    RETURN json_build_object('success', true);
  ELSE
    RAISE EXCEPTION 'Acesso negado: apenas o administrador da RIDA pode excluir clientes.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(UUID) TO authenticated;

-- 8. GATILHO COMPLETO E SEGURO PARA NOVOS CADASTROS DE CLIENTES
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_nome TEXT;
  v_whatsapp TEXT;
  v_nome_empresa TEXT;
  v_tipo_comercio TEXT;
  v_slug TEXT;
  v_tenant_id UUID := NULL;
  v_role TEXT;
BEGIN
  v_nome := COALESCE(NEW.raw_user_meta_data->>'nome', 'Cliente');
  v_whatsapp := COALESCE(NEW.raw_user_meta_data->>'whatsapp', '');
  v_nome_empresa := COALESCE(NEW.raw_user_meta_data->>'nome_empresa', 'Meu Negócio');
  v_tipo_comercio := COALESCE(NEW.raw_user_meta_data->>'tipo_comercio', 'Outro');
  
  IF NEW.email = 'rida.xv10@gmail.com' THEN
    v_role := 'admin';
  ELSE
    v_role := 'cliente';
  END IF;

  -- Para clientes que se cadastram sozinhos, cria automaticamente o tenant e o site_config
  IF v_role = 'cliente' THEN
    -- Gera slug amigável
    v_slug := lower(translate(v_nome_empresa, 'áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ', 'aaaaaeeeeiiiiooooouuuucnaaaaaeeeeiiiiooooouuuucn'));
    v_slug := trim(both '-' from regexp_replace(v_slug, '[^a-z0-9]+', '-', 'g'));
    
    IF v_slug IS NULL OR length(v_slug) < 2 THEN
      v_slug := 'cliente-' || substr(md5(random()::text), 1, 6);
    ELSIF EXISTS (SELECT 1 FROM public.tenants WHERE slug = v_slug) THEN
      v_slug := v_slug || '-' || substr(md5(random()::text), 1, 4);
    END IF;

    -- Cria o tenant
    INSERT INTO public.tenants (nome, slug, plano, status)
    VALUES (v_nome_empresa, v_slug, 'essencial', 'ativo')
    RETURNING id INTO v_tenant_id;

    -- Cria o site_config com dados iniciais
    INSERT INTO public.site_config (tenant_id, whatsapp, horarios, endereco)
    VALUES (v_tenant_id, v_whatsapp, 'Seg a Sex: 08h às 18h', '')
    ON CONFLICT (tenant_id) DO NOTHING;
  END IF;

  -- Grava o perfil vinculado ao tenant_id recém criado
  INSERT INTO public.perfis (
    id,
    email,
    nome,
    whatsapp,
    nome_empresa,
    tipo_comercio,
    role,
    status_site,
    tenant_id
  )
  VALUES (
    NEW.id,
    NEW.email,
    v_nome,
    v_whatsapp,
    v_nome_empresa,
    v_tipo_comercio,
    v_role,
    'aguardando_informacoes',
    v_tenant_id
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    nome = EXCLUDED.nome,
    whatsapp = EXCLUDED.whatsapp,
    nome_empresa = EXCLUDED.nome_empresa,
    tipo_comercio = EXCLUDED.tipo_comercio,
    tenant_id = COALESCE(public.perfis.tenant_id, EXCLUDED.tenant_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. FUNÇÃO RPC PARA GARANTIR/VINCULAR TENANT A QUALQUER PERFIL
CREATE OR REPLACE FUNCTION public.rida_garantir_tenant_para_perfil(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_perfil RECORD;
  v_tenant_id UUID;
  v_slug TEXT;
BEGIN
  IF NOT (public.is_admin() OR auth.uid() = p_user_id) THEN
    RAISE EXCEPTION 'Acesso negado: apenas o administrador ou o próprio cliente pode vincular seu tenant.';
  END IF;

  SELECT * INTO v_perfil FROM public.perfis WHERE id = p_user_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Perfil não encontrado.';
  END IF;

  -- Se já tem tenant_id válido
  IF v_perfil.tenant_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.tenants WHERE id = v_perfil.tenant_id) THEN
    SELECT slug INTO v_slug FROM public.tenants WHERE id = v_perfil.tenant_id;
    RETURN json_build_object('success', true, 'tenant_id', v_perfil.tenant_id, 'slug', v_slug);
  END IF;

  -- Se já existe um tenant com o mesmo nome da empresa
  SELECT id, slug INTO v_tenant_id, v_slug 
  FROM public.tenants 
  WHERE lower(trim(nome)) = lower(trim(v_perfil.nome_empresa)) 
  LIMIT 1;

  IF v_tenant_id IS NOT NULL THEN
    UPDATE public.perfis SET tenant_id = v_tenant_id WHERE id = p_user_id;
    RETURN json_build_object('success', true, 'tenant_id', v_tenant_id, 'slug', v_slug);
  END IF;

  -- Caso contrário, gera novo slug e cria tenant + site_config
  v_slug := lower(translate(COALESCE(v_perfil.nome_empresa, 'empresa'), 'áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ', 'aaaaaeeeeiiiiooooouuuucnaaaaaeeeeiiiiooooouuuucn'));
  v_slug := trim(both '-' from regexp_replace(v_slug, '[^a-z0-9]+', '-', 'g'));
  IF v_slug IS NULL OR length(v_slug) < 2 THEN
    v_slug := 'cliente-' || substr(md5(random()::text), 1, 6);
  ELSIF EXISTS (SELECT 1 FROM public.tenants WHERE slug = v_slug) THEN
    v_slug := v_slug || '-' || substr(md5(random()::text), 1, 4);
  END IF;

  INSERT INTO public.tenants (nome, slug, plano, status)
  VALUES (COALESCE(v_perfil.nome_empresa, 'Meu Negócio'), v_slug, 'essencial', 'ativo')
  RETURNING id INTO v_tenant_id;

  INSERT INTO public.site_config (tenant_id, whatsapp, horarios, endereco)
  VALUES (v_tenant_id, COALESCE(v_perfil.whatsapp, ''), 'Seg a Sex: 08h às 18h', '')
  ON CONFLICT (tenant_id) DO NOTHING;

  UPDATE public.perfis SET tenant_id = v_tenant_id WHERE id = p_user_id;

  RETURN json_build_object('success', true, 'tenant_id', v_tenant_id, 'slug', v_slug);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.rida_garantir_tenant_para_perfil(UUID) TO authenticated, anon;

-- 10. SINCRONIZAÇÃO AUTOMÁTICA DE TODOS OS CLIENTES LEGADOS EXISTENTES
DO $$
DECLARE
  r RECORD;
  v_tid UUID;
  v_s TEXT;
BEGIN
  FOR r IN SELECT * FROM public.perfis WHERE role != 'admin' AND (tenant_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.tenants WHERE id = perfis.tenant_id)) LOOP
    SELECT id, slug INTO v_tid, v_s FROM public.tenants WHERE lower(trim(nome)) = lower(trim(r.nome_empresa)) LIMIT 1;
    
    IF v_tid IS NULL THEN
      v_s := lower(translate(COALESCE(r.nome_empresa, 'empresa'), 'áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ', 'aaaaaeeeeiiiiooooouuuucnaaaaaeeeeiiiiooooouuuucn'));
      v_s := trim(both '-' from regexp_replace(v_s, '[^a-z0-9]+', '-', 'g'));
      IF v_s IS NULL OR length(v_s) < 2 THEN
        v_s := 'cliente-' || substr(md5(random()::text), 1, 6);
      ELSIF EXISTS (SELECT 1 FROM public.tenants WHERE slug = v_s) THEN
        v_s := v_s || '-' || substr(md5(random()::text), 1, 4);
      END IF;

      INSERT INTO public.tenants (nome, slug, plano, status)
      VALUES (COALESCE(r.nome_empresa, 'Meu Negócio'), v_s, 'essencial', 'ativo')
      RETURNING id INTO v_tid;

      INSERT INTO public.site_config (tenant_id, whatsapp, horarios, endereco)
      VALUES (v_tid, COALESCE(r.whatsapp, ''), 'Seg a Sex: 08h às 18h', '')
      ON CONFLICT (tenant_id) DO NOTHING;
    END IF;

    UPDATE public.perfis SET tenant_id = v_tid WHERE id = r.id;
  END LOOP;
END;
$$;

-- 11. POLÍTICAS DE RLS REFORÇADAS (PERMISSÕES COMPLETAS)
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- PERFIS
DROP POLICY IF EXISTS "Leitura de perfis" ON public.perfis;
CREATE POLICY "Leitura de perfis"
ON public.perfis FOR SELECT TO authenticated
USING (public.is_admin() OR auth.uid() = id);

DROP POLICY IF EXISTS "Inserção de perfil próprio" ON public.perfis;
CREATE POLICY "Inserção de perfil próprio"
ON public.perfis FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Atualização de perfil" ON public.perfis;
CREATE POLICY "Atualização de perfil"
ON public.perfis FOR UPDATE TO authenticated
USING (public.is_admin() OR auth.uid() = id)
WITH CHECK (public.is_admin() OR auth.uid() = id);

DROP POLICY IF EXISTS "Deleção de perfis por admin" ON public.perfis;
CREATE POLICY "Deleção de perfis por admin"
ON public.perfis FOR DELETE TO authenticated
USING (public.is_admin());

-- TENANTS
DROP POLICY IF EXISTS "Acesso a tenants" ON public.tenants;
CREATE POLICY "Acesso a tenants"
ON public.tenants FOR ALL TO authenticated
USING (
  public.is_admin() 
  OR id IN (SELECT tenant_id FROM public.perfis WHERE id = auth.uid())
)
WITH CHECK (
  public.is_admin()
  OR id IN (SELECT tenant_id FROM public.perfis WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Leitura pública de tenants" ON public.tenants;
CREATE POLICY "Leitura pública de tenants"
ON public.tenants FOR SELECT TO anon
USING (true);

-- SITE_CONFIG
DROP POLICY IF EXISTS "Acesso a site_config" ON public.site_config;
CREATE POLICY "Acesso a site_config"
ON public.site_config FOR ALL TO authenticated
USING (
  public.is_admin() 
  OR tenant_id IN (SELECT tenant_id FROM public.perfis WHERE id = auth.uid())
)
WITH CHECK (
  public.is_admin()
  OR tenant_id IN (SELECT tenant_id FROM public.perfis WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Leitura pública de site_config" ON public.site_config;
CREATE POLICY "Leitura pública de site_config"
ON public.site_config FOR SELECT TO anon
USING (true);

-- 12. HABILITAR REPLICAÇÃO EM TEMPO REAL (SEGURO E IDEMPOTENTE)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'perfis'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.perfis;
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

