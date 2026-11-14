/**
 * Configuração Central do Supabase - RIDA Sites Profissionais
 * Permite conexão segura do frontend com o PostgreSQL na nuvem
 */
const SUPABASE_CONFIG = {
  url: "https://xnofhxatgophimewmkzh.supabase.co",
  anonKey: "sb_publishable_4z548p7Se3iWs9k_FFhUdw_Dd0Djjkz"
};

// Inicializa o cliente Supabase globalmente
if (window.supabase) {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
} else {
  console.error("SDK do Supabase não foi carregado.");
}
