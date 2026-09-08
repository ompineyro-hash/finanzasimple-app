// ============================================================
// Autenticación: registro, ingreso, salida
// ============================================================

async function registrarUsuario(email, clave) {
  const { data, error } = await sbClient.auth.signUp({ email, password: clave });
  if (error) throw error;
  return data;
}

async function iniciarSesion(email, clave) {
  const { data, error } = await sbClient.auth.signInWithPassword({ email, password: clave });
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

async function enviarRecuperacionClave(email) {
  const { error } = await sbClient.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

function traducirErrorAuth(error) {
  const msg = String(error?.message || "").toLowerCase();
  if (msg.includes("invalid login credentials")) return "Email o clave incorrectos.";
  if (msg.includes("already registered") || msg.includes("already exists")) return "Ese email ya tiene una cuenta. Probá iniciar sesión.";
  if (msg.includes("password") && msg.includes("least")) return "La clave debe tener al menos 6 caracteres.";
  if (msg.includes("email") && msg.includes("valid")) return "Ese email no parece válido.";
  if (msg.includes("rate limit")) return "Demasiados intentos. Esperá un momento y probá de nuevo.";
  return "Ocurrió un problema: " + (error?.message || "intentá de nuevo.");
}
