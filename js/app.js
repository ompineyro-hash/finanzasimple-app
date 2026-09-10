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
  renderAnalisis();
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
// RENDER: Análisis por categoría
// ============================================================
function renderAnalisis() {
  const cont = $("listaAnalisis");
  const porCategoria = {};
  let totalGastos = 0;
  movimientos.filter((m) => m.tipo === "Gasto").forEach((m) => {
    porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + Number(m.monto);
    totalGastos += Number(m.monto);
  });
  const entradas = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  if (!entradas.length) {
    cont.innerHTML = `<div class="vacio">No hay gastos cargados este mes todavía.</div>`;
    return;
  }
  cont.innerHTML = entradas.map(([cat, monto]) => {
    const pct = totalGastos > 0 ? (monto / totalGastos) * 100 : 0;
    return `
      <div class="analisis-item">
        <div class="analisis-fila"><span>${escapeHTML(cat)}</span><span>${formatoMonto(monto)} (${pct.toFixed(0)}%)</span></div>
        <div class="analisis-barra-fondo"><div class="analisis-barra" style="width:${pct}%"></div></div>
      </div>`;
  }).join("");
}

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

$("btnBorrarMov").addEventListener("click", async () => {
  const id = $("movId").value;
  if (!id) return;
  if (!confirm("¿Borrar este movimiento? No se puede deshacer.")) return;
  try {
    await borrarMovimiento(id);
    cerrarModal();
    await cargarMesActual();
    mostrarToast("Movimiento borrado.");
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

$("formMovimiento").addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarAviso($("movError"));

  const id = $("movId").value;
  const tipo = document.querySelector("#segmentadoTipo .activo").dataset.tipo;
  const fecha = $("movFecha").value;
  const cuenta = $("movCuenta").value;
  const categoria = $("movCategoria").value;
  const monto = numeroDesdeTexto($("movMonto").value);
  const detalle = $("movDetalle").value.trim();

  if (!fecha) return mostrarAviso($("movError"), "Falta la fecha.");
  if (!cuenta) return mostrarAviso($("movError"), "Elegí una cuenta.");
  if (!categoria) return mostrarAviso($("movError"), "Elegí una categoría.");
  if (!Number.isFinite(monto) || monto <= 0) return mostrarAviso($("movError"), "El monto tiene que ser mayor a cero.");

  const datos = { tipo, fecha, cuenta, categoria, detalle, monto };

  try {
    if (id) await actualizarMovimiento(id, datos);
    else await crearMovimiento(usuario.id, datos);
    cerrarModal();
    await cargarMesActual();
    mostrarToast(id ? "Movimiento actualizado." : "Movimiento guardado.");
  } catch (err) {
    mostrarAviso($("movError"), traducirErrorDatos(err));
  }
});

// ============================================================
// EXPORTAR (Excel / CSV)
// ============================================================
function descargarArchivo(nombre, contenido, tipo) {
  const blob = new Blob([contenido], { type: tipo });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function fechaParaNombreArchivo() {
  const d = new Date();
  return d.toISOString().slice(0, 10) + "_" + String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0");
}

function valorEscapadoExcel(v) {
  return String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

$("btnExportarExcel").addEventListener("click", async () => {
  try {
    mostrarToast("Preparando archivo...");
    const todos = await listarTodosLosMovimientos(usuario.id);
    if (!todos.length) return mostrarToast("Todavía no tenés movimientos para exportar.");
    const filas = todos.map((m) => {
      const montoConSigno = m.tipo === "Gasto" ? -Math.abs(m.monto) : Math.abs(m.monto);
      return `<tr>
        <td>${valorEscapadoExcel(formatoFecha(m.fecha))}</td>
        <td>${valorEscapadoExcel(m.tipo)}</td>
        <td>${valorEscapadoExcel(m.cuenta)}</td>
        <td>${valorEscapadoExcel(m.categoria)}</td>
        <td>${valorEscapadoExcel(m.detalle || "")}</td>
        <td style="mso-number-format:'0.00';">${montoConSigno}</td>
      </tr>`;
    }).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>
      <table border="1"><thead><tr><th>Fecha</th><th>Tipo</th><th>Cuenta</th><th>Categoría</th><th>Detalle</th><th>Monto</th></tr></thead>
      <tbody>${filas}</tbody></table></body></html>`;
    descargarArchivo(`FinanzaSimple_${fechaParaNombreArchivo()}.xls`, html, "application/vnd.ms-excel;charset=utf-8");
    mostrarToast("Archivo descargado.");
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

function valorCSV(v) {
  return '"' + String(v ?? "").replace(/"/g, '""') + '"';
}

$("btnExportarCSV").addEventListener("click", async () => {
  try {
    mostrarToast("Preparando archivo...");
    const todos = await listarTodosLosMovimientos(usuario.id);
    if (!todos.length) return mostrarToast("Todavía no tenés movimientos para exportar.");
    const encabezado = ["Fecha", "Tipo", "Cuenta", "Categoría", "Detalle", "Monto"].map(valorCSV).join(",");
    const filas = todos.map((m) => {
      const montoConSigno = m.tipo === "Gasto" ? -Math.abs(m.monto) : Math.abs(m.monto);
      return [formatoFecha(m.fecha), m.tipo, m.cuenta, m.categoria, m.detalle || "", montoConSigno].map(valorCSV).join(",");
    }).join("\n");
    descargarArchivo(`FinanzaSimple_${fechaParaNombreArchivo()}.csv`, "\ufeff" + encabezado + "\n" + filas, "text/csv;charset=utf-8");
    mostrarToast("Archivo descargado.");
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

// ============================================================
// REINICIAR DATOS
// ============================================================
$("btnReiniciarDatos").addEventListener("click", async () => {
  const paso1 = confirm("Vas a borrar TODOS tus movimientos, cuentas y categorías.\n\nTu usuario y tu clave no se ven afectados.\n\nEsta acción no se puede deshacer. ¿Continuar?");
  if (!paso1) return;
  const paso2 = confirm("Confirmación final: se van a borrar todos tus datos de trabajo ahora mismo.\n\n¿Reiniciar todo?");
  if (!paso2) return;

  try {
    await reiniciarDatosUsuario(usuario.id);
    await cargarCuentasYCategorias();
    await cargarMesActual();
    mostrarToast("Tus datos fueron reiniciados.");
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

// ============================================================
// Utilidad de escape HTML
// ============================================================
function escapeHTML(txt) {
  return String(txt ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ============================================================
// INICIO
// ============================================================
(async function init() {
  const u = await usuarioActual();
  if (u) await arrancarApp();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
