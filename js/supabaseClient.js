// ============================================================
// Conexión con Supabase (base de datos en la nube)
// ============================================================
const SUPABASE_URL = "https://guszipsqpofaydxeorrw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_z2Y1oJ7862vpjhhwCvJEoQ_0z8t2WxF";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
