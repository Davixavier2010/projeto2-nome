-- ==============================================================================
-- ATUALIZAÇÃO SUPABASE - RIDA SITES PROFISSIONAIS (VERSÃO CORRIGIDA)
-- 1. Adiciona coluna de E-mail na tabela perfis e sincroniza usuários existentes
-- 2. Cria função de verificação is_admin() livre de recursão RLS
-- 3. Cria função RPC segura para o Admin atualizar status e links dos clientes
-- 4. Cria função RPC segura para o Admin excluir usuários (auth.users + perfis)
-- 5. Atualiza gatilho (trigger) de novos cadastros
-- 6. Ajusta políticas de segurança (RLS)
-- ==============================================================================

-- 1. ADICIONAR COLUNA DE EMAIL EM PUBLIC.PERFIS
ALTER TABLE public.perfis ADD COLUMN IF NOT EXISTS email TEXT;

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

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 5. FUNÇÃO RPC PARA ATUALIZAR STATUS DO SITE (SEM BLOQUEIO DE RLS)
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

-- 6. FUNÇÃO RPC PARA EXCLUIR USUÁRIO (AUTH.USERS + PUBLIC.PERFIS)
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

-- 7. ATUALIZAR GATILHO PARA GRAVAR EMAIL EM NOVOS CADASTROS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfis (
    id,
    email,
    nome,
    whatsapp,
    nome_empresa,
    tipo_comercio,
    role,
    status_site
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nome', 'Cliente'),
    COALESCE(NEW.raw_user_meta_data->>'whatsapp', ''),
    COALESCE(NEW.raw_user_meta_data->>'nome_empresa', 'Meu Negócio'),
    COALESCE(NEW.raw_user_meta_data->>'tipo_comercio', 'Outro'),
    CASE 
      WHEN NEW.email = 'rida.xv10@gmail.com' THEN 'admin'
      ELSE 'cliente'
    END,
    'aguardando_informacoes'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    nome = EXCLUDED.nome,
    whatsapp = EXCLUDED.whatsapp,
    nome_empresa = EXCLUDED.nome_empresa,
    tipo_comercio = EXCLUDED.tipo_comercio;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. POLÍTICAS DE RLS REFORÇADAS USANDO IS_ADMIN()
DROP POLICY IF EXISTS "Admins podem ler todos os perfis" ON public.perfis;
CREATE POLICY "Admins podem ler todos os perfis"
ON public.perfis
FOR SELECT
TO authenticated
USING (public.is_admin() OR auth.uid() = id);

DROP POLICY IF EXISTS "Admins podem atualizar qualquer perfil" ON public.perfis;
CREATE POLICY "Admins podem atualizar qualquer perfil"
ON public.perfis
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins podem deletar perfis" ON public.perfis;
CREATE POLICY "Admins podem deletar perfis"
ON public.perfis
FOR DELETE
TO authenticated
USING (public.is_admin());

-- 9. HABILITAR REPLICAÇÃO EM TEMPO REAL PARA A TABELA PERFIS
ALTER PUBLICATION supabase_realtime ADD TABLE public.perfis;
