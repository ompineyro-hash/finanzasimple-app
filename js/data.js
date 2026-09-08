// ============================================================
// Acceso a datos en Supabase: perfil, cuentas, categorías, movimientos
// ============================================================

async function obtenerPerfil(userId) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) throw error;
  return data;
}

async function actualizarMoneda(userId, moneda) {
  const { error } = await supabase.from("profiles").update({ moneda }).eq("id", userId);
  if (error) throw error;
}

async function listarCuentas(userId) {
  const { data, error } = await supabase.from("cuentas").select("*").eq("user_id", userId).order("nombre");
  if (error) throw error;
  return data;
}

async function crearCuenta(userId, nombre) {
  const { error } = await supabase.from("cuentas").insert({ user_id: userId, nombre });
  if (error) throw error;
}

async function renombrarCuenta(id, nombreNuevo) {
  const { error } = await supabase.from("cuentas").update({ nombre: nombreNuevo }).eq("id", id);
  if (error) throw error;
}

async function borrarCuenta(id) {
  const { error } = await supabase.from("cuentas").delete().eq("id", id);
  if (error) throw error;
}

async function listarCategorias(userId) {
  const { data, error } = await supabase.from("categorias").select("*").eq("user_id", userId).order("nombre");
  if (error) throw error;
  return data;
}

async function crearCategoria(userId, nombre) {
  const { error } = await supabase.from("categorias").insert({ user_id: userId, nombre });
  if (error) throw error;
}

async function renombrarCategoria(id, nombreNuevo) {
  const { error } = await supabase.from("categorias").update({ nombre: nombreNuevo }).eq("id", id);
  if (error) throw error;
}

async function borrarCategoria(id) {
  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) throw error;
}

async function listarMovimientosDelMes(userId, anio, mes) {
  const desde = `${anio}-${String(mes + 1).padStart(2, "0")}-01`;
  const ultimoDia = new Date(anio, mes + 1, 0).getDate();
  const hasta = `${anio}-${String(mes + 1).padStart(2, "0")}-${String(ultimoDia).padStart(2, "0")}`;
  const { data, error } = await supabase
    .from("movimientos")
    .select("*")
    .eq("user_id", userId)
    .gte("fecha", desde)
    .lte("fecha", hasta)
    .order("fecha", { ascending: false });
  if (error) throw error;
  return data;
}

async function crearMovimiento(userId, mov) {
  const { error } = await supabase.from("movimientos").insert({ user_id: userId, ...mov });
  if (error) throw error;
}

async function actualizarMovimiento(id, mov) {
  const { error } = await supabase
    .from("movimientos")
    .update({ ...mov, actualizado_en: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

async function borrarMovimiento(id) {
  const { error } = await supabase.from("movimientos").delete().eq("id", id);
  if (error) throw error;
}

function traducirErrorDatos(error) {
  const msg = String(error?.message || "").toLowerCase();
  if (msg.includes("duplicate") || msg.includes("unique")) return "Ya existe algo con ese nombre.";
  if (msg.includes("check constraint") && msg.includes("monto")) return "El monto tiene que ser mayor a cero.";
  if (msg.includes("network")) return "Sin conexión a internet. Probá de nuevo en un momento.";
  return "No se pudo guardar: " + (error?.message || "intentá de nuevo.");
}
