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

// El captcha se empieza a resolver ANTES de apretar el botón (apenas se toca el formulario),
// así el token ya está listo. Cada token sirve una sola vez y vence a los 5 minutos.
let capPromesa = null;
let capHora = 0;
let capUltimoError = "";   // código que informa Cloudflare si falla (sirve para diagnosticar)

function iniciarCaptcha() {
  if (!TURNSTILE_SITE_KEY) return null;
  if (capPromesa && Date.now() - capHora < 240000) return capPromesa;
  capHora = Date.now();
  capPromesa = (async () => {
    const caja = document.getElementById("captchaBox");
    if (!caja) return undefined;
    // Si Cloudflare no carga (sin red, bloqueado), seguimos sin token: si Supabase lo exige,
    // el servidor responde con error de captcha y se le avisa a la persona.
    try { await cargarTurnstile(); } catch (_) { capUltimoError = "script"; return undefined; }
    return new Promise((resolve) => {
      let listo = false;
      const fin = (v) => { if (listo) return; listo = true; clearTimeout(reloj); resolve(v); };
      const reloj = setTimeout(() => { capUltimoError = capUltimoError || "espera"; fin(undefined); }, 25000);
      if (turnstileWidgetId !== null) {
        try { window.turnstile.remove(turnstileWidgetId); } catch (_) {}
        turnstileWidgetId = null;
      }
      caja.hidden = false;
      turnstileWidgetId = window.turnstile.render(caja, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "interaction-only",
        callback: (token) => fin(token),
        "error-callback": (codigo) => { capUltimoError = String(codigo || "error"); fin(undefined); return true; },
        "timeout-callback": () => { capUltimoError = "timeout"; fin(undefined); }
      });
    });
  })();
  return capPromesa;
}

// Devuelve el token del captcha (o undefined si está apagado o falló dos veces).
async function obtenerCaptcha() {
  if (!TURNSTILE_SITE_KEY) return undefined;
  capUltimoError = "";
  let token = await iniciarCaptcha();
  capPromesa = null;
  if (!token) {            // un reintento solo, sin avisarle a la persona
    token = await iniciarCaptcha();
    capPromesa = null;
  }
  setTimeout(iniciarCaptcha, 0);   // deja listo el token del próximo intento
  return token;
}

if (TURNSTILE_SITE_KEY) {
  document.addEventListener("focusin", (e) => {
    if (e.target && e.target.closest && e.target.closest("#formLogin")) iniciarCaptcha();
  });
  setTimeout(() => {
    const pl = document.getElementById("pantallaLogin");
    if (pl && !pl.hidden && pl.offsetParent !== null) iniciarCaptcha();
  }, 1500);
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
  if (msg.includes("captcha")) return t("captchaFallo") + (capUltimoError ? " (" + capUltimoError + ")" : "");
  if (msg.includes("invalid login credentials")) return "Email o clave incorrectos.";
  if (msg.includes("already registered") || msg.includes("already exists")) return "Ese email ya tiene una cuenta. Probá iniciar sesión.";
  if (msg.includes("password") && msg.includes("least")) return "La clave debe tener al menos 6 caracteres.";
  if (msg.includes("email") && msg.includes("valid")) return "Ese email no parece válido.";
  if (msg.includes("rate limit")) return "Demasiados intentos. Esperá un momento y probá de nuevo.";
  if (msg.includes("email not confirmed")) return "Todavía no confirmaste tu cuenta. Revisá tu email (carpeta spam también) y tocá el link de confirmación.";
  return "Ocurrió un problema: " + (error?.message || "intentá de nuevo.");
}
