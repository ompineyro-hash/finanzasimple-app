// ============================================================
// Acceso a datos en Supabase: perfil, cuentas, categorías, movimientos
// ============================================================

async function obtenerPerfil(userId) {
  const { data, error } = await sbClient.from("profiles").select("*").eq("id", userId).single();
  if (error) throw error;
  return data;
}

async function actualizarMoneda(userId, moneda) {
  const { error } = await sbClient.from("profiles").update({ moneda }).eq("id", userId);
  if (error) throw error;
}

async function actualizarIdioma(userId, idioma) {
  const { error } = await sbClient.from("profiles").update({ idioma }).eq("id", userId);
  if (error) throw error;
}

async function actualizarMonedaBase(userId, monedaBase) {
  const { error } = await sbClient.from("profiles").update({ moneda_base: monedaBase }).eq("id", userId);
  if (error) throw error;
}

async function listarCuentas(userId) {
  const { data, error } = await sbClient.from("cuentas").select("*").eq("user_id", userId).order("nombre");
  if (error) throw error;
  return data;
}

async function crearCuenta(userId, nombre, moneda) {
  const { error } = await sbClient.from("cuentas").insert({ user_id: userId, nombre, moneda });
  if (error) throw error;
}
async function renombrarCuenta(id, nombreNuevo) {
  const { error } = await sbClient.from("cuentas").update({ nombre: nombreNuevo }).eq("id", id);
  if (error) throw error;
}

async function borrarCuenta(id) {
  const { error } = await sbClient.from("cuentas").delete().eq("id", id);
  if (error) throw error;
}

async function actualizarMonedaCuenta(id, moneda) {
  const { error } = await sbClient.from("cuentas").update({ moneda }).eq("id", id);
  if (error) throw error;
}

async function listarCategorias(userId) {
  const { data, error } = await sbClient.from("categorias").select("*").eq("user_id", userId).order("nombre");
  if (error) throw error;
  return data;
}

async function crearCategoria(userId, nombre, tipo) {
  const { error } = await sbClient.from("categorias").insert({ user_id: userId, nombre, tipo: tipo || "Gasto" });
  if (error) throw error;
}

async function renombrarCategoria(id, nombreNuevo) {
  const { error } = await sbClient.from("categorias").update({ nombre: nombreNuevo }).eq("id", id);
  if (error) throw error;
}

async function cambiarTipoCategoria(id, tipo) {
  const { error } = await sbClient.from("categorias").update({ tipo }).eq("id", id);
  if (error) throw error;
}

async function borrarCategoria(id) {
  const { error } = await sbClient.from("categorias").delete().eq("id", id);
  if (error) throw error;
}

// Para quien entra por primera vez y no tiene ni cuentas ni categorías:
// le dejamos una cuenta y unas categorías básicas para que pueda cargar su
// primer movimiento sin pasar antes por Config. Después las puede renombrar o borrar.
const DATOS_INICIALES = {
  es: {
    cuenta: "Efectivo",
    gastos: ["Alimentos", "Supermercado", "Transporte", "Vivienda", "Servicios", "Salud", "Educación", "Ropa", "Salidas", "Otros"],
    ingresos: ["Sueldo", "Otros ingresos"],
  },
  pt: {
    cuenta: "Dinheiro",
    gastos: ["Alimentação", "Supermercado", "Transporte", "Moradia", "Serviços", "Saúde", "Educação", "Roupas", "Lazer", "Outros"],
    ingresos: ["Salário", "Outras receitas"],
  },
  en: {
    cuenta: "Cash",
    gastos: ["Food", "Groceries", "Transport", "Housing", "Utilities", "Health", "Education", "Clothing", "Going out", "Other"],
    ingresos: ["Salary", "Other income"],
  },
};

async function sembrarDatosInicialesSiHaceFalta(userId, idioma) {
  const d = DATOS_INICIALES[idioma] || DATOS_INICIALES.es;
  const [ctas, cats] = await Promise.all([listarCuentas(userId), listarCategorias(userId)]);
  if (ctas.length || cats.length) return false;
  const filasCat = [
    ...d.gastos.map((nombre) => ({ user_id: userId, nombre, tipo: "Gasto" })),
    ...d.ingresos.map((nombre) => ({ user_id: userId, nombre, tipo: "Ingreso" })),
  ];
  const { error: e1 } = await sbClient.from("cuentas").insert({ user_id: userId, nombre: d.cuenta });
  if (e1) throw e1;
  const { error: e2 } = await sbClient.from("categorias").insert(filasCat);
  if (e2) throw e2;
  return true;
}

async function listarMonedas(userId) {
  const { data, error } = await sbClient.from("monedas").select("*").eq("user_id", userId).order("nombre");
  if (error) throw error;
  return data;
}

async function crearMoneda(userId, nombre, codigo, simbolo) {
  const { error } = await sbClient.from("monedas").insert({ user_id: userId, nombre, codigo, simbolo });
  if (error) throw error;
}

async function renombrarMoneda(id, nombreNuevo) {
  const { error } = await sbClient.from("monedas").update({ nombre: nombreNuevo }).eq("id", id);
  if (error) throw error;
}

async function borrarMoneda(id) {
  const { error } = await sbClient.from("monedas").delete().eq("id", id);
  if (error) throw error;
}

async function listarMovimientosDelMes(userId, anio, mes) {
  const desde = `${anio}-${String(mes + 1).padStart(2, "0")}-01`;
  const ultimoDia = new Date(anio, mes + 1, 0).getDate();
  const hasta = `${anio}-${String(mes + 1).padStart(2, "0")}-${String(ultimoDia).padStart(2, "0")}`;
  const { data, error } = await sbClient
    .from("movimientos")
    .select("*")
    .eq("user_id", userId)
    .or(`and(fecha.gte.${desde},fecha.lte.${hasta}),and(fecha_pago.gte.${desde},fecha_pago.lte.${hasta})`)
    .order("fecha", { ascending: false });
  if (error) throw error;
  return data;
}

// Todo lo que "todavía no salió" (gastos por pagar e ingresos por cobrar),
// de cualquier mes, ordenado por la fecha en que vence.
async function listarPendientes(userId) {
  const { data, error } = await sbClient
    .from("movimientos")
    .select("*")
    .eq("user_id", userId)
    .eq("estado", "pendiente")
    .order("fecha_pago", { ascending: true });
  if (error) throw error;
  return data;
}

// Cierra el ciclo: el movimiento pasa a pagado/cobrado con la fecha real.
async function marcarMovimientoPagado(id, fechaReal) {
  const { error } = await sbClient
    .from("movimientos")
    .update({ estado: "pagado", fecha_pago: fechaReal, actualizado_en: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

async function crearMovimiento(userId, mov) {
  const { error } = await sbClient.from("movimientos").insert({ user_id: userId, ...mov });
  if (error) throw error;
}

// Crea varios movimientos juntos (cuotas): o se guardan todos o ninguno.
async function crearMovimientos(userId, lista) {
  const filas = lista.map((mov) => ({ user_id: userId, ...mov }));
  const { error } = await sbClient.from("movimientos").insert(filas);
  if (error) throw error;
}

async function actualizarMovimiento(id, mov) {
  const { error } = await sbClient
    .from("movimientos")
    .update({ ...mov, actualizado_en: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

async function borrarMovimiento(id) {
  const { error } = await sbClient.from("movimientos").delete().eq("id", id);
  if (error) throw error;
}

async function listarMovimientosDelAnio(userId, anio) {
  const desde = `${anio}-01-01`;
  const hasta = `${anio}-12-31`;
  const { data, error } = await sbClient
    .from("movimientos")
    .select("*")
    .eq("user_id", userId)
    .or(`and(fecha.gte.${desde},fecha.lte.${hasta}),and(fecha_pago.gte.${desde},fecha_pago.lte.${hasta})`)
    .order("fecha", { ascending: false });
  if (error) throw error;
  return data;
}

async function listarTodosLosMovimientos(userId) {
  const { data, error } = await sbClient
    .from("movimientos")
    .select("*")
    .eq("user_id", userId)
    .order("fecha", { ascending: true });
  if (error) throw error;
  return data;
}

async function reiniciarDatosUsuario(userId) {
  const { error: e1 } = await sbClient.from("movimientos").delete().eq("user_id", userId);
  if (e1) throw e1;
  const { error: e2 } = await sbClient.from("cuentas").delete().eq("user_id", userId);
  if (e2) throw e2;
  const { error: e3 } = await sbClient.from("categorias").delete().eq("user_id", userId);
  if (e3) throw e3;
  const { error: e4 } = await sbClient.from("monedas").delete().eq("user_id", userId);
  if (e4) throw e4;
  // Estas tablas pueden no existir todavía: si falta alguna, se ignora.
  await borrarTodosLosComprobantes(userId);
  for (const tabla of ["transferencias", "fijos", "presupuestos"]) {
    const { error } = await sbClient.from(tabla).delete().eq("user_id", userId);
    if (error && !esTablaInexistente(error)) throw error;
  }
}

function traducirErrorDatos(error) {
  const msg = String(error?.message || "").toLowerCase();
  if (msg.includes("duplicate") || msg.includes("unique")) return "Ya existe algo con ese nombre.";
  if (msg.includes("check constraint") && msg.includes("monto")) return "El monto tiene que ser mayor a cero.";
  if (msg.includes("network")) return "Sin conexión a internet. Probá de nuevo en un momento.";
  return "No se pudo guardar: " + (error?.message || "intentá de nuevo.");
}

// ---------- Presupuesto (una fila por usuario) ----------
function esTablaInexistente(e) {
  return /PGRST205|42P01|does not exist|schema cache/i.test(String(e?.message || "") + String(e?.code || ""));
}

// Devuelve la fila, null si todavía no hay, o { noDisponible: true } si la tabla aún no existe en Supabase.
async function obtenerPresupuesto(userId) {
  const { data, error } = await sbClient.from("presupuestos").select("*").eq("user_id", userId).maybeSingle();
  if (error) {
    if (esTablaInexistente(error)) return { noDisponible: true };
    throw error;
  }
  return data;
}

async function guardarPresupuesto(userId, p) {
  const { error } = await sbClient.from("presupuestos").upsert(
    { user_id: userId, ingreso_base: p.ingreso_base, pct_fijos: p.pct_fijos, pct_vida: p.pct_vida, grupos: p.grupos || {}, actualizado_en: new Date().toISOString() },
    { onConflict: "user_id" }
  );
  if (error) throw error;
}


// ---------- Gastos fijos (se repiten todos los meses) ----------
async function listarFijos(userId) {
  const { data, error } = await sbClient.from("fijos").select("*").eq("user_id", userId).order("dia");
  if (error) {
    if (esTablaInexistente(error)) return { noDisponible: true };
    throw error;
  }
  return data || [];
}

async function crearFijo(userId, f) {
  const { error } = await sbClient.from("fijos").insert({ user_id: userId, ...f });
  if (error) throw error;
}

async function actualizarFijo(id, campos) {
  const { error } = await sbClient.from("fijos").update(campos).eq("id", id);
  if (error) throw error;
}

async function borrarFijo(id) {
  const { error } = await sbClient.from("fijos").delete().eq("id", id);
  if (error) throw error;
}

// Reclama el mes para este fijo: solo gana quien lo marca primero (evita duplicados si hay dos dispositivos).
async function reclamarFijoDelMes(id, mes) {
  const { data, error } = await sbClient.from("fijos").update({ ultimo_mes: mes })
    .eq("id", id).or("ultimo_mes.is.null,ultimo_mes.lt." + mes).select("id");
  if (error) throw error;
  return Array.isArray(data) && data.length > 0;
}

async function devolverFijoDelMes(id, mesAnterior) {
  await sbClient.from("fijos").update({ ultimo_mes: mesAnterior || null }).eq("id", id);
}


// ---------- Tengo: transferencias entre cuentas y saldo inicial ----------
async function listarTransferencias(userId) {
  const { data, error } = await sbClient.from("transferencias").select("*").eq("user_id", userId).order("fecha", { ascending: false });
  if (error) {
    if (esTablaInexistente(error)) return { noDisponible: true };
    throw error;
  }
  return data || [];
}

async function crearTransferencia(userId, tr) {
  const { error } = await sbClient.from("transferencias").insert({ user_id: userId, ...tr });
  if (error) throw error;
}

async function borrarTransferencia(id) {
  const { error } = await sbClient.from("transferencias").delete().eq("id", id);
  if (error) throw error;
}

async function actualizarSaldoInicial(id, valor) {
  const { error } = await sbClient.from("cuentas").update({ saldo_inicial: valor }).eq("id", id);
  if (error) throw error;
}


// ---------- Fotos de comprobantes (Supabase Storage, bucket privado "comprobantes") ----------
// Cada usuario solo ve su carpeta: comprobantes/<user_id>/<archivo>.jpg
async function sondearComprobantes() {
  try {
    const { error } = await sbClient.from("movimientos").select("comprobante").limit(1);
    return !error;
  } catch { return false; }
}

async function subirComprobante(userId, blob) {
  const id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  const ruta = `${userId}/${id}.jpg`;
  const { error } = await sbClient.storage.from("comprobantes").upload(ruta, blob, { contentType: "image/jpeg", upsert: false });
  if (error) throw error;
  return ruta;
}

async function urlComprobante(ruta) {
  const { data, error } = await sbClient.storage.from("comprobantes").createSignedUrl(ruta, 3600);
  if (error) throw error;
  return data.signedUrl;
}

async function borrarComprobante(ruta) {
  if (!ruta) return;
  try { await sbClient.storage.from("comprobantes").remove([ruta]); } catch { /* si falla, queda huérfano pero no molesta */ }
}

async function borrarTodosLosComprobantes(userId) {
  try {
    const { data } = await sbClient.storage.from("comprobantes").list(userId, { limit: 1000 });
    if (data && data.length) await sbClient.storage.from("comprobantes").remove(data.map((f) => `${userId}/${f.name}`));
  } catch { /* el bucket puede no existir todavía */ }
}


// ---------- Dólar sugerido: venta del Banco Nación (vía DolarApi.com) ----------
// Es solo una sugerencia: la persona siempre puede escribir otro valor.
async function obtenerDolarBNA() {
  try {
    const guardado = JSON.parse(localStorage.getItem("fs_dolar_bna") || "null");
    if (guardado && Date.now() - guardado.t < 3600000) return guardado;
  } catch { /* ignorar */ }
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch("https://dolarapi.com/v1/dolares/oficial", { signal: ctl.signal, cache: "no-store" });
    clearTimeout(timer);
    if (!r.ok) return null;
    const j = await r.json();
    const venta = Number(j.venta);
    if (!Number.isFinite(venta) || venta < 1 || venta > 100000) return null;
    const res = { venta, fecha: j.fechaActualizacion || null, t: Date.now() };
    try { localStorage.setItem("fs_dolar_bna", JSON.stringify(res)); } catch { /* ignorar */ }
    return res;
  } catch { return null; }
}
