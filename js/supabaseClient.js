// ============================================================
// Conexión con Supabase (base de datos en la nube)
// ============================================================
const SUPABASE_URL = "https://guszipsqpofaydxeorrw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_z2Y1oJ7862vpjhhwCvJEoQ_0z8t2WxF";

// Dónde se guarda la sesión: si la persona tilda "Mantener sesión iniciada" (por defecto), queda en el
// aparato (localStorage); si no, solo dura mientras esté abierto el navegador o la app (sessionStorage).
const CLAVE_RECORDAR_SESION = "ingasto_recordar_sesion";
function recordarSesion() {
  try { return localStorage.getItem(CLAVE_RECORDAR_SESION) !== "0"; } catch (_) { return true; }
}
const almacenSesion = {
  getItem(k) {
    try { return recordarSesion() ? (localStorage.getItem(k) ?? sessionStorage.getItem(k)) : sessionStorage.getItem(k); }
    catch (_) { return null; }
  },
  setItem(k, v) {
    try {
      if (recordarSesion()) { localStorage.setItem(k, v); sessionStorage.removeItem(k); }
      else { sessionStorage.setItem(k, v); localStorage.removeItem(k); }
    } catch (_) {}
  },
  removeItem(k) {
    try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch (_) {}
  }
};

const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { storage: almacenSesion } });
