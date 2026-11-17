// ============================================================
// Autenticación: registro, ingreso, salida
// ============================================================

// Captcha (Cloudflare Turnstile). Pegar acá la Site Key (la pública, NUNCA la secreta).
// Vacío = captcha apagado: la app anda como siempre. Activarlo en Supabase
// (Authentication → Attack Protection) SOLO después de publicar la app con la Site Key cargada.
const TURNSTILE_SITE_KEY = "0x4AAAAAAGFZVcjwCWidG-nA";

let turnstileScriptPromesa = null;
let turnstileWidgetId = null;

function cargarTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileScriptPromesa) {
    turnstileScriptPromesa = new Promise((resolve, reject) => {
      const sc = document.createElement("script");
      sc.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      sc.async = true;
      sc.onload = () => resolve();
      sc.onerror = () => { turnstileScriptPromesa = null; reject(new Error("captcha script")); };
      document.head.appendChild(sc);
    });
  }
  return turnstileScriptPromesa;
}

// Devuelve el token del captcha (o undefined si está apagado). Cada token sirve una sola vez.
async function obtenerCaptcha() {
  if (!TURNSTILE_SITE_KEY) return undefined;
  const caja = document.getElementById("captchaBox");
  if (!caja) return undefined;
  // Si Cloudflare no carga (sin red, bloqueado), seguimos sin token: si Supabase lo exige,
  // el servidor responde con error de captcha y se le avisa a la persona.
  try { await cargarTurnstile(); } catch (_) { return undefined; }
  return new Promise((resolve) => {
    let listo = false;
    const fin = (fn, v) => { if (listo) return; listo = true; clearTimeout(reloj); caja.hidden = true; fn(v); };
    const reloj = setTimeout(() => fin(resolve, undefined), 15000);
    const opciones = {
      sitekey: TURNSTILE_SITE_KEY,
      appearance: "interaction-only",
      callback: (token) => fin(resolve, token),
      "error-callback": () => fin(resolve, undefined),
      "expired-callback": () => {}
    };
    caja.hidden = false;
    if (turnstileWidgetId !== null) {
      try { window.turnstile.remove(turnstileWidgetId); } catch (_) {}
    }
    turnstileWidgetId = window.turnstile.render(caja, opciones);
  });
}

async function registrarUsuario(email, clave) {
  const captchaToken = await obtenerCaptcha();
  const { data, error } = await sbClient.auth.signUp({ email, password: clave, options: { captchaToken } });
  if (error) throw error;
  return data;
}

async function iniciarSesion(email, clave) {
  const captchaToken = await obtenerCaptcha();
  const { data, error } = await sbClient.auth.signInWithPassword({ email, password: clave, options: { captchaToken } });
  if (error) throw error;
  return data;
}

async function cerrarSesion() {
  await sbClient.auth.signOut();
}

async function usuarioActual() {
  const { data } = await sbClient.auth.getUser();
  return data?.user || null;
}

async function reenviarConfirmacion(email) {
  const captchaToken = await obtenerCaptcha();
  const { error } = await sbClient.auth.resend({ type: "signup", email, options: { captchaToken } });
  if (error) throw error;
}

async function enviarRecuperacionClave(email) {
  const captchaToken = await obtenerCaptcha();
  const { error } = await sbClient.auth.resetPasswordForEmail(email, { captchaToken });
  if (error) throw error;
}

async function eliminarCuenta() {
  const { error } = await sbClient.rpc("eliminar_mi_cuenta");
  if (error) throw error;
  await sbClient.auth.signOut();
}

function traducirErrorAuth(error) {
  const msg = String(error?.message || "").toLowerCase();
  if (msg.includes("captcha")) return t("captchaFallo");
  if (msg.includes("invalid login credentials")) return "Email o clave incorrectos.";
  if (msg.includes("already registered") || msg.includes("already exists")) return "Ese email ya tiene una cuenta. Probá iniciar sesión.";
  if (msg.includes("password") && msg.includes("least")) return "La clave debe tener al menos 6 caracteres.";
  if (msg.includes("email") && msg.includes("valid")) return "Ese email no parece válido.";
  if (msg.includes("rate limit")) return "Demasiados intentos. Esperá un momento y probá de nuevo.";
  if (msg.includes("email not confirmed")) return "Todavía no confirmaste tu cuenta. Revisá tu email (carpeta spam también) y tocá el link de confirmación.";
  return "Ocurrió un problema: " + (error?.message || "intentá de nuevo.");
}
