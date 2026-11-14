-- ==============================================================================
-- ATUALIZAÇÃO SUPABASE - RIDA SITES PROFISSIONAIS
-- 1. Adiciona coluna de E-mail na tabela perfis e sincroniza usuários existentes
-- 2. Atualiza gatilho (trigger) de novos cadastros
-- 3. Cria função segura (RPC) para o Admin excluir usuários (auth.users + perfis)
-- 4. Ajusta políticas de segurança (RLS)
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

-- 4. ATUALIZAR GATILHO PARA GRAVAR EMAIL EM NOVOS CADASTROS
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

-- Reassocia o gatilho se necessário
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. FUNÇÃO RPC PARA EXCLUIR USUÁRIO (AUTH.USERS + PUBLIC.PERFIS)
CREATE OR REPLACE FUNCTION public.delete_user_by_admin(target_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  caller_email TEXT;
  caller_role TEXT;
BEGIN
  -- Identifica quem está executando a função
  SELECT email INTO caller_email FROM auth.users WHERE id = auth.uid();
  SELECT role INTO caller_role FROM public.perfis WHERE id = auth.uid();

  -- Valida se quem chamou é realmente o admin da RIDA
  IF caller_email = 'rida.xv10@gmail.com' OR caller_role = 'admin' THEN
    -- Impede autoexclusão do próprio admin
    IF target_user_id = auth.uid() THEN
      RAISE EXCEPTION 'Operação negada: Você não pode excluir sua própria conta de administrador.';
    END IF;

    -- Deleta o usuário da tabela de autenticação (dispara cascade para perfis)
    DELETE FROM auth.users WHERE id = target_user_id;

    -- Deleta também da tabela pública caso o cascade não tenha sido acionado
    DELETE FROM public.perfis WHERE id = target_user_id;

    RETURN json_build_object('success', true);
  ELSE
    RAISE EXCEPTION 'Acesso negado: apenas o administrador da RIDA pode excluir clientes.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permite que usuários autenticados chamem a função RPC
GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(UUID) TO authenticated;

-- 6. POLÍTICAS DE RLS REFORÇADAS PARA O ADMIN
DROP POLICY IF EXISTS "Admins podem ler todos os perfis" ON public.perfis;
CREATE POLICY "Admins podem ler todos os perfis"
ON public.perfis
FOR SELECT
TO authenticated
USING (
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'rida.xv10@gmail.com' OR
  (SELECT role FROM public.perfis WHERE id = auth.uid()) = 'admin' OR
  auth.uid() = id
);

DROP POLICY IF EXISTS "Admins podem atualizar qualquer perfil" ON public.perfis;
CREATE POLICY "Admins podem atualizar qualquer perfil"
ON public.perfis
FOR UPDATE
TO authenticated
USING (
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'rida.xv10@gmail.com' OR
  (SELECT role FROM public.perfis WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins podem deletar perfis" ON public.perfis;
CREATE POLICY "Admins podem deletar perfis"
ON public.perfis
FOR DELETE
TO authenticated
USING (
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'rida.xv10@gmail.com' OR
  (SELECT role FROM public.perfis WHERE id = auth.uid()) = 'admin'
);
