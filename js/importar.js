// Lectura de archivos CSV y Excel (.xlsx) para importar movimientos.
// Sin librerías externas: el .xlsx se abre con el descompresor del navegador.

function impDetectarSeparador(texto) {
  const muestra = texto.split(/\r?\n/).filter((l) => l.trim()).slice(0, 5).join("\n");
  const cuenta = (c) => (muestra.match(new RegExp(c === "\t" ? "\\t" : "\\" + c, "g")) || []).length;
  const cand = [";", ",", "\t"].map((c) => [c, cuenta(c)]).sort((a, b) => b[1] - a[1]);
  return cand[0][1] > 0 ? cand[0][0] : ",";
}

// Devuelve una lista de filas; cada fila es una lista de textos.
function impParsearCSV(texto) {
  texto = String(texto).replace(/^﻿/, "");
  const sep = impDetectarSeparador(texto);
  const filas = []; let fila = [], campo = "", comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"') { if (texto[i + 1] === '"') { campo += '"'; i++; } else comillas = false; }
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === sep) { fila.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(campo); campo = ""; filas.push(fila); fila = [];
    } else campo += c;
  }
  if (campo !== "" || fila.length) { fila.push(campo); filas.push(fila); }
  return filas.filter((f) => f.some((x) => String(x).trim() !== ""));
}

// ---------- .xlsx (zip + xml) ----------
async function impDescomprimir(bytes, metodo) {
  if (metodo === 0) return bytes;
  if (metodo !== 8 || typeof DecompressionStream === "undefined") throw new Error("zip");
  const ds = new DecompressionStream("deflate-raw");
  const w = ds.writable.getWriter(); w.write(bytes); w.close();
  return new Uint8Array(await new Response(ds.readable).arrayBuffer());
}

async function impLeerZip(buffer) {
  const b = new Uint8Array(buffer), v = new DataView(buffer);
  let eocd = -1;
  for (let i = b.length - 22; i >= Math.max(0, b.length - 70000); i--) if (v.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error("zip");
  const n = v.getUint16(eocd + 10, true); let p = v.getUint32(eocd + 16, true);
  const dec = new TextDecoder(), archivos = {};
  for (let k = 0; k < n; k++) {
    if (v.getUint32(p, true) !== 0x02014b50) throw new Error("zip");
    const metodo = v.getUint16(p + 10, true), tam = v.getUint32(p + 20, true);
    const ln = v.getUint16(p + 28, true), le = v.getUint16(p + 30, true), lc = v.getUint16(p + 32, true);
    const off = v.getUint32(p + 42, true), nombre = dec.decode(b.subarray(p + 46, p + 46 + ln));
    archivos[nombre] = { metodo, tam, off };
    p += 46 + ln + le + lc;
  }
  const leer = async (nombre) => {
    const a = archivos[nombre]; if (!a) return null;
    const d0 = a.off, lnl = v.getUint16(d0 + 26, true), lel = v.getUint16(d0 + 28, true);
    const ini = d0 + 30 + lnl + lel;
    return dec.decode(await impDescomprimir(b.subarray(ini, ini + a.tam), a.metodo));
  };
  return { nombres: Object.keys(archivos), leer };
}

function impColumnaDeRef(ref) {
  const m = /^([A-Z]+)/.exec(ref || ""); if (!m) return 0;
  let n = 0; for (const ch of m[1]) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

async function impLeerXLSX(buffer) {
  const zip = await impLeerZip(buffer);
  const xml = (s) => new DOMParser().parseFromString(s, "application/xml");
  const ss = [];
  const sxml = await zip.leer("xl/sharedStrings.xml");
  if (sxml) xml(sxml).querySelectorAll("si").forEach((si) => ss.push(Array.from(si.querySelectorAll("t")).map((t) => t.textContent).join("")));
  const hojas = zip.nombres.filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  if (!hojas.length) throw new Error("xlsx");
  const doc = xml(await zip.leer(hojas[0]));
  const filas = [];
  doc.querySelectorAll("sheetData > row").forEach((r) => {
    const fila = [];
    r.querySelectorAll("c").forEach((c) => {
      const col = impColumnaDeRef(c.getAttribute("r")), t = c.getAttribute("t");
      const vEl = c.querySelector("v"); let val = "";
      if (t === "s") val = ss[parseInt(vEl ? vEl.textContent : "-1", 10)] ?? "";
      else if (t === "inlineStr") val = Array.from(c.querySelectorAll("t")).map((x) => x.textContent).join("");
      else if (vEl) val = (t === "str" || t === "b" || t === "e") ? vEl.textContent : Number(vEl.textContent);
      while (fila.length < col) fila.push("");
      fila[col] = val;
    });
    if (fila.some((x) => String(x).trim() !== "")) filas.push(fila);
  });
  return filas;
}

// ---------- valores ----------
function impParsearMonto(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
  let s = String(v ?? "").trim();
  if (!s) return NaN;
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (/-\s*$/.test(s)) { neg = true; s = s.replace(/-\s*$/, ""); }
  if (/^\s*-/.test(s) || /^[^\d]*-\s*\d/.test(s)) neg = true;
  s = s.replace(/[^\d.,]/g, "");
  if (!/\d/.test(s)) return NaN;
  const pu = s.lastIndexOf("."), co = s.lastIndexOf(",");
  if (pu >= 0 && co >= 0) {
    if (co > pu) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(/,/g, "");
  } else if (co >= 0) {
    s = /,\d{1,2}$/.test(s) && (s.match(/,/g) || []).length === 1 ? s.replace(",", ".") : s.replace(/,/g, "");
  } else if (pu >= 0) {
    const m = (s.match(/\./g) || []).length;
    if (m > 1 || /\.\d{3}$/.test(s)) s = s.replace(/\./g, "");
  }
  const n = Number(s);
  return Number.isFinite(n) ? (neg ? -n : n) : NaN;
}

function impISO(a, m, d) {
  const f = new Date(Date.UTC(a, m - 1, d));
  if (f.getUTCFullYear() !== a || f.getUTCMonth() !== m - 1 || f.getUTCDate() !== d) return null;
  return f.toISOString().slice(0, 10);
}

function impParsearFecha(v) {
  if (typeof v === "number") {
    if (v > 20000 && v < 80000) return new Date(Math.round((v - 25569) * 86400000)).toISOString().slice(0, 10);
    return null;
  }
  const s = String(v ?? "").trim(); let m;
  if ((m = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/.exec(s))) return impISO(+m[1], +m[2], +m[3]);
  if ((m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/.exec(s))) return impISO(+m[3], +m[2], +m[1]); // día primero
  if ((m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2})\b/.exec(s))) return impISO(2000 + +m[3], +m[2], +m[1]);
  return null;
}

// Adivina qué columna es cada cosa mirando los títulos.
function impAdivinarColumnas(cabeceras) {
  const buscar = (re) => cabeceras.findIndex((h) => re.test(String(h).toLowerCase()));
  const fecha = buscar(/fecha|date|data|creaci|created|release|dia|día/);
  // Si hay un monto neto (el que coincide con el saldo, como en Mercado Pago), se prefiere.
  let monto = buscar(/settlement_net_amount|net_amount|monto neto|importe neto/);
  if (monto < 0) monto = buscar(/monto|amount|importe|valor|neto|net|total/);
  const detalle = buscar(/descrip|detalle|concepto|motivo|description|reference|referencia|nombre|name|title|titulo/);
  const cuenta = buscar(/^\s*(cuenta|conta|account)\s*$/);
  const cat = buscar(/^\s*(categor[ií]a|category)\s*$/);
  const estado = buscar(/^\s*(estado|status)\s*$/);
  const fpago = buscar(/fecha de pago|data de pagamento|payment date/);
  return { fecha, monto, detalle, cuenta, cat, estado, fpago };
}

// ---------- pantalla (Ajustes → Importar movimientos) ----------
const IMP_MAX = 2000;
let imp = null; // { filas, cab, ini }

function impMostrarError(msg) {
  const e = $("impError");
  if (!msg) { e.hidden = true; return; }
  e.textContent = msg; e.hidden = false;
}

function impOpciones(cab, conNinguna) {
  const o = cab.map((h, i) => `<option value="${i}">${escapeHTML(String(h || "(" + (i + 1) + ")").slice(0, 40))}</option>`).join("");
  return (conNinguna ? `<option value="-1">${escapeHTML(t("impNinguna"))}</option>` : "") + o;
}

function impCuentasBase() {
  return cuentas.filter((c) => !c.moneda || c.moneda === monedaBase());
}

function impPrepararPantalla(filas) {
  // La fila de títulos es la primera (de las 30 primeras) donde se reconocen fecha y monto.
  let ini = 0;
  for (let i = 0; i < Math.min(30, filas.length); i++) {
    const g = impAdivinarColumnas(filas[i]);
    if (g.fecha >= 0 && g.monto >= 0 && g.fecha !== g.monto) { ini = i; break; }
  }
  const ancho = Math.max(...filas.slice(0, 50).map((f) => f.length));
  let cab = filas[ini].slice(); while (cab.length < ancho) cab.push("");
  const g = impAdivinarColumnas(cab);
  imp = { filas, cab, ini };
  $("impColFecha").innerHTML = impOpciones(cab, false);
  $("impColMonto").innerHTML = impOpciones(cab, false);
  $("impColDetalle").innerHTML = impOpciones(cab, true);
  $("impColCuenta").innerHTML = impOpciones(cab, true);
  $("impColCat").innerHTML = impOpciones(cab, true);
  imp.g = g;
  $("impColFecha").value = String(g.fecha >= 0 ? g.fecha : 0);
  $("impColMonto").value = String(g.monto >= 0 ? g.monto : Math.min(1, cab.length - 1));
  $("impColDetalle").value = String(g.detalle);
  $("impColCuenta").value = String(g.cuenta);
  $("impColCat").value = String(g.cat);
  const cs = impCuentasBase();
  $("impCuenta").innerHTML = cs.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
  const opt = (tipo) => categorias.filter((c) => (c.tipo || "Gasto") === tipo)
    .map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
  $("impCatGasto").innerHTML = opt("Gasto");
  $("impCatIngreso").innerHTML = opt("Ingreso");
  // Por defecto, una categoría genérica ("Otros", "Varios"...) si existe.
  ["impCatGasto", "impCatIngreso"].forEach((id) => {
    const g = Array.from($(id).options).find((o) => /otro|vari|sin cl|general|outr|other/i.test(o.value));
    if (g) $(id).value = g.value;
  });
  // Reporte de Mercado Pago (se reconoce por sus columnas): se elige solo la cuenta "Mercado Pago" si existe.
  if (cab.some((h) => /^settlement_net_amount$/i.test(String(h).trim()))) {
    const mp = cs.find((c) => /mercado\s*pago|^mp$/i.test(c.nombre));
    if (mp) $("impCuenta").value = mp.nombre;
  }
  $("impInvertir").checked = false;
  $("impPaso2").hidden = false;
}

function impArmarLista() {
  const cf = +$("impColFecha").value, cm = +$("impColMonto").value, cd = +$("impColDetalle").value;
  const cc = +$("impColCuenta").value, ck = +$("impColCat").value;
  const ce = imp.g.estado, cp = imp.g.fpago;
  const inv = $("impInvertir").checked, cuentaDef = $("impCuenta").value;
  const catG = $("impCatGasto").value, catI = $("impCatIngreso").value, base = monedaBase();
  const bajo = (x) => String(x ?? "").trim().toLowerCase();
  const ctasBase = impCuentasBase();
  const datos = imp.filas.slice(imp.ini + 1, imp.ini + 1 + IMP_MAX);
  const lista = []; let ignoradas = 0;
  for (const f of datos) {
    const fecha = impParsearFecha(f[cf]); let monto = impParsearMonto(f[cm]);
    if (!fecha || !Number.isFinite(monto) || monto === 0) { ignoradas++; continue; }
    if (inv) monto = -monto;
    let cuenta = cuentaDef;
    if (cc >= 0 && bajo(f[cc])) {
      const c = ctasBase.find((x) => bajo(x.nombre) === bajo(f[cc]));
      if (!c) { ignoradas++; continue; } // cuenta que no existe o en otra moneda
      cuenta = c.nombre;
    }
    let detalle = (cd >= 0 ? String(f[cd] ?? "").trim() : "");
    if (/^money_transfer/i.test(detalle)) detalle = "Transferencia";
    else if (/^[\w-]{20,}$/.test(detalle) || /^\d{6,}$/.test(detalle)) detalle = ""; // códigos sin significado
    detalle = detalle.slice(0, 120);
    const tipo = monto < 0 ? "Gasto" : "Ingreso";
    let categoria = tipo === "Gasto" ? catG : catI;
    if (ck >= 0 && bajo(f[ck])) {
      const k = categorias.find((x) => (x.tipo || "Gasto") === tipo && bajo(x.nombre) === bajo(f[ck]));
      if (k) categoria = k.nombre;
    }
    let estado = "pagado", fecha_pago = null;
    if (ce >= 0 && /pendiente|pendente|pending/.test(bajo(f[ce]))) {
      const fp = cp >= 0 ? impParsearFecha(f[cp]) : null;
      if (fp) { estado = "pendiente"; fecha_pago = fp; }
    }
    lista.push({ tipo, fecha, cuenta, categoria, detalle, monto: Math.round(Math.abs(monto) * 100) / 100,
      moneda: base, cotizacion: 1, estado, fecha_pago });
  }
  return { lista, ignoradas, recortado: imp.filas.length - imp.ini - 1 > IMP_MAX };
}

const impClave = (m) => [String(m.fecha).slice(0, 10), Number(m.monto).toFixed(2), m.tipo, String(m.detalle || "").trim()].join("|");

async function impRecalcular() {
  if (!imp) return;
  const { lista, ignoradas, recortado } = impArmarLista();
  // Los que ya existen en la misma cuenta se descuentan uno a uno.
  const claveC = (m) => impClave(m) + "|" + String(m.cuenta || "");
  const existentes = new Map();
  (await listarTodosLosMovimientos(usuario.id))
    .forEach((m) => existentes.set(claveC(m), (existentes.get(claveC(m)) || 0) + 1));
  const nuevos = [];
  for (const m of lista) {
    const k = claveC(m), n = existentes.get(k) || 0;
    if (n > 0) existentes.set(k, n - 1); else nuevos.push(m);
  }
  imp.nuevos = nuevos;
  // Posibles transferencias propias: mismo día, mismo monto, uno ingreso y otro gasto.
  const par = new Set();
  nuevos.forEach((m, i) => {
    if (par.has(i)) return;
    const k = nuevos.findIndex((o, n) => n > i && !par.has(n) && o.fecha === m.fecha && o.monto === m.monto && o.tipo !== m.tipo);
    if (k >= 0) { par.add(i); par.add(k); }
  });
  imp.par = par;
  imp.sel = new Set(nuevos.map((_, i) => i).filter((i) => !par.has(i)));
  const dup = lista.length - nuevos.length;
  $("impResumen").textContent = t("impResumen").replace("{n}", nuevos.length).replace("{d}", dup).replace("{x}", ignoradas)
    + (recortado ? " · " + t("impMuchas").replace(/\{max\}/g, IMP_MAX) : "");
  impPintarLista();
}

function impPintarLista() {
  $("impMuestra").innerHTML = '<div class="imp-lista">' + imp.nuevos.map((m, i) =>
    `<label class="imp-fila"><input type="checkbox" data-i="${i}"${imp.sel.has(i) ? " checked" : ""}> ` +
    `<span>${escapeHTML(m.fecha)} · ${m.tipo === "Gasto" ? "−" : "+"}${escapeHTML(formatoMonto(m.monto))} · ${escapeHTML(m.detalle || m.categoria)}` +
    `${imp.par.has(i) ? ' <em class="imp-transf">↔ ' + escapeHTML(t("impTransf")) + "</em>" : ""}</span></label>`).join("") + "</div>";
  impActualizarBoton();
}

function impActualizarBoton() {
  let ing = 0, gas = 0;
  imp.sel.forEach((i) => { const m = imp.nuevos[i]; if (m.tipo === "Gasto") gas += m.monto; else ing += m.monto; });
  $("impTotales").textContent = t("impTotales").replace("{i}", formatoMonto(ing)).replace("{g}", formatoMonto(gas));
  const b = $("impConfirmar");
  b.textContent = t("impBoton").replace("{n}", imp.sel.size);
  b.disabled = !imp.sel.size;
}

async function impElegirArchivo(ev) {
  const arch = ev.target.files && ev.target.files[0];
  imp = null; $("impPaso2").hidden = true; impMostrarError("");
  if (!arch) return;
  if (!impCuentasBase().length) { impMostrarError(t("impSinCuenta")); return; }
  if (!categorias.length) { impMostrarError(t("impSinCat")); return; }
  try {
    const esXlsx = /\.xlsx$/i.test(arch.name);
    const filas = esXlsx ? await impLeerXLSX(await arch.arrayBuffer()) : impParsearCSV(await arch.text());
    if (filas.length < 2) { impMostrarError(t("impErrSinFilas")); return; }
    impPrepararPantalla(filas);
    await impRecalcular();
  } catch (e) {
    console.error(e);
    impMostrarError(t("impErrArchivo"));
  }
}

async function impConfirmar() {
  if (!imp || !imp.sel || !imp.sel.size) return;
  const b = $("impConfirmar"); b.disabled = true;
  try {
    const todos = imp.nuevos.filter((_, i) => imp.sel.has(i));
    for (let i = 0; i < todos.length; i += 200) await crearMovimientos(usuario.id, todos.slice(i, i + 200));
    mostrarToast(t("impOk").replace("{n}", todos.length));
    $("impArchivo").value = ""; $("impPaso2").hidden = true; imp = null;
    await cargarMesActual();
  } catch (e) {
    impMostrarError(traducirErrorDatos(e));
    b.disabled = false;
  }
}

$("impArchivo").addEventListener("change", impElegirArchivo);
["impColFecha", "impColMonto", "impColDetalle", "impColCuenta", "impColCat", "impCuenta", "impCatGasto", "impCatIngreso", "impInvertir"]
  .forEach((id) => $(id).addEventListener("change", impRecalcular));
$("impMuestra").addEventListener("change", (e) => {
  const i = e.target && e.target.dataset ? e.target.dataset.i : undefined;
  if (i === undefined || !imp) return;
  if (e.target.checked) imp.sel.add(+i); else imp.sel.delete(+i);
  impActualizarBoton();
});
$("impConfirmar").addEventListener("click", impConfirmar);
