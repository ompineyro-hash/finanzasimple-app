// ============================================================
// FinanzaSimple - Lógica principal
// ============================================================

let usuario = null;
let perfil = null;
let cuentas = [];
let categorias = [];
let movimientos = [];
let fechaVista = new Date();
let vistaActiva = "vistaMovimientos";
let periodoAnalisis = "mes";

const $ = (id) => document.getElementById(id);

// ---------- Utilidades ----------
function moneda() { return perfil?.moneda || "$"; }

function formatoMonto(n) {
  return moneda() + " " + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatoFecha(str) {
  const [y, m, d] = str.split("-");
  return `${d}/${m}/${y}`;
}

function nombreMes(fecha) {
  return fecha.toLocaleString("es-AR", { month: "long", year: "numeric" });
}

function numeroDesdeTexto(txt) {
  let t = String(txt || "").trim().replace(/\./g, "").replace(",", ".");
  return Number(t);
}

function mostrarToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.hidden = true; }, 3000);
}

function mostrarAviso(el, msg) {
  el.textContent = msg;
  el.hidden = false;
}
function ocultarAviso(el) { el.hidden = true; }

// ============================================================
// LOGIN / REGISTRO
// ============================================================
let modoRegistro = false;

$("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarAviso($("loginError"));
  ocultarAviso($("loginOk"));
  const email = $("inputEmail").value.trim();
  const clave = $("inputClave").value;
  const btn = $("btnIngresar");
  btn.disabled = true;

  try {
    if (modoRegistro) {
      await registrarUsuario(email, clave);
      mostrarAviso($("loginOk"), "Cuenta creada. Ya podés entrar con tu email y clave.");
      modoRegistro = false;
      btn.textContent = "Entrar";
      $("btnMostrarRegistro").textContent = "Crear una cuenta nueva";
    } else {
      await iniciarSesion(email, clave);
      await arrancarApp();
    }
  } catch (err) {
    mostrarAviso($("loginError"), traducirErrorAuth(err));
  } finally {
    btn.disabled = false;
  }
});

$("btnMostrarRegistro").addEventListener("click", () => {
  modoRegistro = !modoRegistro;
  ocultarAviso($("loginError"));
  ocultarAviso($("loginOk"));
  $("btnIngresar").textContent = modoRegistro ? "Crear cuenta" : "Entrar";
  $("btnMostrarRegistro").textContent = modoRegistro ? "Ya tengo cuenta" : "Crear una cuenta nueva";
});

$("btnOlvideClave").addEventListener("click", async () => {
  const email = $("inputEmail").value.trim();
  if (!email) return mostrarAviso($("loginError"), "Escribí tu email arriba primero.");
  try {
    await enviarRecuperacionClave(email);
    mostrarAviso($("loginOk"), "Te enviamos un email para restablecer tu clave.");
  } catch (err) {
    mostrarAviso($("loginError"), traducirErrorAuth(err));
  }
});

$("btnSalir").addEventListener("click", async () => {
  await cerrarSesion();
  location.reload();
});

// ============================================================
// ARRANQUE DE LA APP (después de login)
// ============================================================
async function arrancarApp() {
  usuario = await usuarioActual();
  if (!usuario) return;

  $("pantallaLogin").hidden = true;
  $("app").hidden = false;

  try {
    perfil = await obtenerPerfil(usuario.id);
  } catch {
    perfil = { moneda: "$" };
  }
  $("inputMoneda").value = moneda();

  await cargarCuentasYCategorias();
  await cargarMesActual();
}

async function cargarCuentasYCategorias() {
  cuentas = await listarCuentas(usuario.id);
  categorias = await listarCategorias(usuario.id);
  renderCuentasConfig();
  renderCategoriasConfig();
  renderSelects();
}

async function cargarMesActual() {
  $("etiquetaMes").textContent = nombreMes(fechaVista);
  movimientos = await listarMovimientosDelMes(usuario.id, fechaVista.getFullYear(), fechaVista.getMonth());
  renderResumen();
  renderMovimientos();
  await renderVistaAnalisis();
}

$("btnMesAnterior").addEventListener("click", () => {
  fechaVista.setMonth(fechaVista.getMonth() - 1);
  cargarMesActual();
});
$("btnMesSiguiente").addEventListener("click", () => {
  fechaVista.setMonth(fechaVista.getMonth() + 1);
  cargarMesActual();
});

$("textoBusqueda").addEventListener("input", renderMovimientos);
$("filtroColumna").addEventListener("change", renderMovimientos);
$("btnLimpiarBusqueda").addEventListener("click", () => {
  $("textoBusqueda").value = "";
  $("filtroColumna").value = "todo";
  renderMovimientos();
});

// ============================================================
// NAVEGACIÓN ENTRE VISTAS
// ============================================================
document.querySelectorAll(".navbar-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".navbar-item").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    document.querySelectorAll(".vista").forEach((v) => (v.hidden = true));
    vistaActiva = btn.dataset.vista;
    $(vistaActiva).hidden = false;
  });
});

// ============================================================
// RENDER: Resumen del mes
// ============================================================
function renderResumen() {
  let ing = 0, gas = 0;
  movimientos.forEach((m) => {
    if (m.tipo === "Ingreso") ing += Number(m.monto);
    else gas += Number(m.monto);
  });
  $("valorBalance").textContent = formatoMonto(ing - gas);
  $("valorIngresos").textContent = formatoMonto(ing);
  $("valorGastos").textContent = formatoMonto(gas);
}

function normalizarTexto(v) {
  return String(v ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function pasaBusqueda(m) {
  const input = $("textoBusqueda");
  const selector = $("filtroColumna");
  if (!input || !selector) return true;
  const buscado = normalizarTexto(input.value).trim();
  if (!buscado) return true;
  const columna = selector.value;
  const campos = {
    fecha: formatoFecha(m.fecha),
    tipo: m.tipo,
    cuenta: m.cuenta,
    categoria: m.categoria,
    detalle: m.detalle || "",
    monto: String(m.monto),
  };
  if (columna === "todo") return Object.values(campos).some((v) => normalizarTexto(v).includes(buscado));
  return normalizarTexto(campos[columna] || "").includes(buscado);
}

// ============================================================
// RENDER: Lista de movimientos
// ============================================================
function renderMovimientos() {
  const cont = $("listaMovimientos");
  const visibles = movimientos.filter(pasaBusqueda);

  if (!movimientos.length) {
    cont.innerHTML = `<div class="vacio">Todavía no cargaste movimientos este mes.<br>Tocá el botón <b>+</b> para agregar el primero.</div>`;
    return;
  }
  if (!visibles.length) {
    cont.innerHTML = `<div class="vacio">No hay resultados para esa búsqueda.<br>Probá limpiarla o cambiar el filtro.</div>`;
    return;
  }
  cont.innerHTML = visibles.map((m) => {
    const esGasto = m.tipo === "Gasto";
    return `
      <div class="mov-item" data-id="${m.id}">
        <div class="mov-icono ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "↓" : "↑"}</div>
        <div class="mov-info">
          <div class="mov-categoria">${escapeHTML(m.categoria)}</div>
          <div class="mov-detalle">${escapeHTML(m.detalle || m.cuenta)}</div>
          <div class="mov-fecha">${formatoFecha(m.fecha)}</div>
        </div>
        <div class="mov-monto ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "-" : "+"}${formatoMonto(m.monto)}</div>
      </div>`;
  }).join("");

  cont.querySelectorAll(".mov-item").forEach((el) => {
    el.addEventListener("click", () => abrirModalEditar(el.dataset.id));
  });
}

// ============================================================
// RENDER: Análisis (Mes actual / Resumen anual / Acumulado)
// ============================================================
function calcularResumenLista(lista) {
  let ing = 0, gas = 0;
  lista.forEach((m) => {
    if (m.tipo === "Ingreso") ing += Number(m.monto);
    else gas += Number(m.monto);
  });
  return { ing, gas, balance: ing - gas };
}

function renderResumenAnalisis(lista) {
  const { ing, gas, balance } = calcularResumenLista(lista);
  $("analisisBalance").textContent = formatoMonto(balance);
  $("analisisIngresos").textContent = formatoMonto(ing);
  $("analisisGastos").textContent = formatoMonto(gas);
}

function renderCategoriasAnalisis(lista) {
  const cont = $("listaAnalisis");
  const porCategoria = {};
  let totalGastos = 0;
  lista.filter((m) => m.tipo === "Gasto").forEach((m) => {
    porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + Number(m.monto);
    totalGastos += Number(m.monto);
  });
  const entradas = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  if (!entradas.length) {
    cont.innerHTML = `
      <div class="grafico-dona grafico-dona-vacio"></div>
      <div class="vacio">No hay gastos cargados en este período.</div>`;
    return;
  }
  const colores = ["#C4562E", "#2F6F5E", "#D9A441", "#5B7FBF", "#8B5FBF", "#4FA3A0", "#C2707C", "#7A8B4F"];
  let acumulado = 0;
  const segmentos = entradas.map(([, monto], i) => {
    const pct = (monto / totalGastos) * 100;
    const desde = acumulado;
    acumulado += pct;
    return `${colores[i % colores.length]} ${desde}% ${acumulado}%`;
  }).join(", ");

  const leyenda = entradas.map(([cat, monto], i) => {
    const pct = totalGastos > 0 ? (monto / totalGastos) * 100 : 0;
    const color = colores[i % colores.length];
    return `
      <div class="analisis-item">
        <div class="analisis-fila">
          <span><span class="analisis-swatch" style="background:${color}"></span>${escapeHTML(cat)}</span>
          <span>${formatoMonto(monto)} (${pct.toFixed(0)}%)</span>
        </div>
        <div class="analisis-barra-fondo"><div class="analisis-barra" style="width:${pct}%;background:${color}"></div></div>
      </div>`;
  }).join("");

  cont.innerHTML = `
    <div class="grafico-dona" style="background:conic-gradient(${segmentos})">
      <div class="grafico-dona-centro">
        <span class="grafico-dona-total">${formatoMonto(totalGastos)}</span>
        <span class="grafico-dona-label">Total gastos</span>
      </div>
    </div>
    ${leyenda}`;
}

async function renderVistaAnalisis() {
  let lista;
  if (periodoAnalisis === "anio") {
    lista = await listarMovimientosDelAnio(usuario.id, fechaVista.getFullYear());
  } else if (periodoAnalisis === "todo") {
    lista = await listarTodosLosMovimientos(usuario.id);
  } else {
    lista = movimientos;
  }
  renderResumenAnalisis(lista);
  renderCategoriasAnalisis(lista);
}

document.querySelectorAll("#segmentadoAnalisis .segmentado-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#segmentadoAnalisis .segmentado-item").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    periodoAnalisis = btn.dataset.periodo;
    renderVistaAnalisis();
  });
});

// ============================================================
// RENDER: Configuración (cuentas / categorías)
// ============================================================
function renderCuentasConfig() {
  const cont = $("listaCuentas");
  cont.innerHTML = cuentas.length
    ? cuentas.map((c) => filaEditable(c, "cuenta")).join("")
    : `<div class="vacio">Todavía no agregaste ninguna cuenta.</div>`;
  enlazarAccionesEditables("cuenta");
}

function renderCategoriasConfig() {
  const cont = $("listaCategorias");
  cont.innerHTML = categorias.length
    ? categorias.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">Todavía no agregaste ninguna categoría.</div>`;
  enlazarAccionesEditables("categoria");
}

function filaEditable(item, tipo) {
  return `
    <div class="editable-item" data-id="${item.id}">
      <span>${escapeHTML(item.nombre)}</span>
      <div class="editable-acciones">
        <button data-accion="editar" data-tipo="${tipo}" title="Editar">✏️</button>
        <button data-accion="borrar" data-tipo="${tipo}" title="Borrar">🗑️</button>
      </div>
    </div>`;
}

function enlazarAccionesEditables(tipo) {
  const selector = tipo === "cuenta" ? "#listaCuentas" : "#listaCategorias";
  document.querySelectorAll(`${selector} [data-accion]`).forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const item = e.target.closest(".editable-item");
      const id = item.dataset.id;
      const accion = btn.dataset.accion;
      const lista = tipo === "cuenta" ? cuentas : categorias;
      const actual = lista.find((x) => x.id === id);

      if (accion === "editar") {
        const nuevo = prompt("Nuevo nombre:", actual.nombre);
        if (nuevo === null || !nuevo.trim()) return;
        try {
          if (tipo === "cuenta") await renombrarCuenta(id, nuevo.trim());
          else await renombrarCategoria(id, nuevo.trim());
          await cargarCuentasYCategorias();
          mostrarToast("Guardado.");
        } catch (err) { mostrarToast(traducirErrorDatos(err)); }
      }

      if (accion === "borrar") {
        if (!confirm(`¿Borrar "${actual.nombre}"? Si tiene movimientos asociados, no se va a poder borrar.`)) return;
        try {
          if (tipo === "cuenta") await borrarCuenta(id);
          else await borrarCategoria(id);
          await cargarCuentasYCategorias();
          mostrarToast("Borrado.");
        } catch (err) { mostrarToast("No se pudo borrar (¿tiene movimientos asociados?)"); }
      }
    });
  });
}

$("btnGuardarMoneda").addEventListener("click", async () => {
  const v = $("inputMoneda").value.trim() || "$";
  await actualizarMoneda(usuario.id, v);
  perfil.moneda = v;
  mostrarToast("Moneda actualizada.");
  renderResumen();
  renderMovimientos();
});

$("btnAgregarCuenta").addEventListener("click", async () => {
  const input = $("inputNuevaCuenta");
  const v = input.value.trim();
  if (!v) return;
  try {
    await crearCuenta(usuario.id, v);
    input.value = "";
    await cargarCuentasYCategorias();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

$("btnAgregarCategoria").addEventListener("click", async () => {
  const input = $("inputNuevaCategoria");
  const v = input.value.trim();
  if (!v) return;
  try {
    await crearCategoria(usuario.id, v);
    input.value = "";
    await cargarCuentasYCategorias();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

function renderSelects() {
  $("movCuenta").innerHTML = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") || `<option value="">-- Agregá una cuenta en Config --</option>`;
  $("movCategoria").innerHTML = categorias.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") || `<option value="">-- Agregá una categoría en Config --</option>`;
}

// ============================================================
// MODAL: Nuevo / Editar movimiento
// ============================================================
$("btnNuevo").addEventListener("click", () => abrirModalNuevo());
$("btnCerrarModal").addEventListener("click", cerrarModal);
$("modalFondo").addEventListener("click", (e) => { if (e.target.id === "modalFondo") cerrarModal(); });

function abrirModalNuevo() {
  if (!cuentas.length || !categorias.length) {
    return mostrarToast("Primero agregá al menos una cuenta y una categoría en Config.");
  }
  $("formMovimiento").reset();
  $("movId").value = "";
  $("modalTitulo").textContent = "Nuevo movimiento";
  $("btnBorrarMov").hidden = true;
  seleccionarTipo("Gasto");
  $("movFecha").value = new Date().toISOString().slice(0, 10);
  renderSelects();
  ocultarAviso($("movError"));
  $("modalFondo").hidden = false;
  fsVozPrepararNuevo();
}

function abrirModalEditar(id) {
  const m = movimientos.find((x) => x.id === id);
  if (!m) return;
  renderSelects();
  $("movId").value = m.id;
  $("modalTitulo").textContent = "Editar movimiento";
  $("btnBorrarMov").hidden = false;
  seleccionarTipo(m.tipo);
  $("movFecha").value = m.fecha;
  $("movCuenta").value = m.cuenta;
  $("movCategoria").value = m.categoria;
  $("movMonto").value = String(m.monto).replace(".", ",");
  $("movDetalle").value = m.detalle || "";
  ocultarAviso($("movError"));
  $("modalFondo").hidden = false;
  fsVoiceOcultar();
}

function cerrarModal() { $("modalFondo").hidden = true; }

function seleccionarTipo(tipo) {
  document.querySelectorAll("#segmentadoTipo .segmentado-item").forEach((b) => {
    b.classList.toggle("activo", b.dataset.tipo === tipo);
  });
}
document.querySelectorAll("#segmentadoTipo .segmentado-item").forEach((b) => {
  b.addEventListener("click", () => seleccionarTipo(b.dataset.tipo));
});

// ============================================================
// Carga de movimiento por voz (opcional) - paso a paso
// Pregunta un dato a la vez (tipo, cuenta, categoría, monto, detalle).
// Cada "Responder" arranca un reconocimiento nuevo con un toque del
// usuario, que es lo que hace que el celular pida permiso de forma
// confiable (en vez de un solo reconocimiento largo al abrir el modal).
// ============================================================
let fsVoiceStep = 0;
let fsVoiceRec = null;
let fsVoicePending = "";
const fsVoiceSteps = [
  { id: "tipo", q: "¿Es un gasto o un ingreso?" },
  { id: "movCuenta", q: "¿Con qué cuenta?" },
  { id: "movCategoria", q: "¿Qué categoría?" },
  { id: "movMonto", q: "¿Cuál es el monto? Podés decir pesos y centavos." },
  { id: "movDetalle", q: "¿Cuál es el detalle?" },
];

function fsVoiceNorm(t) {
  return String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function fsVoiceSetSel(id, val) {
  const el = $(id);
  if (!el) return false;
  const v = fsVoiceNorm(val);
  for (const o of el.options) {
    if (fsVoiceNorm(o.value) === v || fsVoiceNorm(o.textContent) === v) { el.value = o.value; return true; }
  }
  return false;
}

function fsVoiceTipo(t) {
  t = fsVoiceNorm(t);
  if (/\b(gasto|gastos|gaste|gaste|pague|pago|pagar|compre|compra|compre|sali[oó]|salida|egreso|debito|d[eé]bito|debitaron)\b/.test(t)) return "Gasto";
  if (/\b(ingreso|ingresos|cobre|cobro|cobrar|recibi|recibo|entro|entrada|deposito|dep[oó]sito|acredito|acreditaron|sueldo|cobranza)\b/.test(t)) return "Ingreso";
  return "";
}

function fsVoiceOpcion(id, t) {
  const el = $(id);
  if (!el) return "";
  t = fsVoiceNorm(t);
  for (const o of [...el.options].filter((x) => x.value)) {
    if (t.includes(fsVoiceNorm(o.textContent))) return o.value;
  }
  return "";
}

function fsVoiceNumeroPalabras(txt) {
  txt = fsVoiceNorm(txt).replace(/\by\b/g, " ").replace(/\s+/g, " ").trim();
  const u = { cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,
    diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18,diecinueve:19,
    veinte:20,veintiuno:21,veintidos:22,veintitres:23,veinticuatro:24,veinticinco:25,veintiseis:26,veintisiete:27,veintiocho:28,veintinueve:29,
    treinta:30,cuarenta:40,cincuenta:50,sesenta:60,setenta:70,ochenta:80,noventa:90,
    cien:100,ciento:100,doscientos:200,trescientos:300,cuatrocientos:400,quinientos:500,seiscientos:600,setecientos:700,ochocientos:800,novecientos:900 };
  let total = 0, actual = 0, vio = false;
  for (const w of txt.split(" ")) {
    if (w in u) { actual += u[w]; vio = true; continue; }
    if (w === "mil") { total += (actual || 1) * 1000; actual = 0; vio = true; continue; }
    if (w === "millon" || w === "millones") { total += (actual || 1) * 1000000; actual = 0; vio = true; continue; }
  }
  return vio ? total + actual : null;
}

function fsVoiceMonto(t) {
  let q = fsVoiceNorm(t).replace(/\$/g, " ").replace(/\s+/g, " ").trim();
  function vp(txt) { txt = (txt || "").trim(); if (!txt) return null; if (/^\d+$/.test(txt)) return parseInt(txt, 10); return fsVoiceNumeroPalabras(txt); }
  function cents(txt) { txt = (txt || "").replace(/\bcentavos?\b/g, " ").trim(); let m = txt.match(/\b(\d{1,2})\b/); if (m) return Math.min(99, parseInt(m[1], 10)); let n = vp(txt); return n === null ? null : Math.min(99, n); }
  if (/\bmillon(?:es)?\b/.test(q)) {
    let mm = q.match(/^(.*?)\bmillon(?:es)?\b\s*(.*)$/), pref = mm ? mm[1].trim() : "", resto = mm ? mm[2].trim() : "";
    let mult = vp(pref); if (mult === null || mult === 0) mult = 1; let total = mult *
