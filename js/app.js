// ============================================================
// Ingasto - Lógica principal
// ============================================================

const SVG_ICONOS = {
  ojo: `<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx="12" cy="12" r="3" />`,
  ojoOff: `<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /> <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /> <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /> <path d="m2 2 20 20" />`,
  izq: `<path d="m15 18-6-6 6-6" />`,
  der: `<path d="m9 18 6-6-6-6" />`,
  ingresoFl: `<path d="M7 7h10v10" /> <path d="M7 17 17 7" />`,
  gastoFl: `<path d="m7 7 10 10" /> <path d="M17 7v10H7" />`,
  reloj: `<circle cx="12" cy="12" r="10" /> <path d="M12 6v6l4 2" />`,
  tilde: `<path d="M20 6 9 17l-5-5" />`,
  mic: `<path d="M12 19v3" /> <path d="M19 10v2a7 7 0 0 1-14 0v-2" /> <rect x="9" y="2" width="6" height="13" rx="3" />`,
  billetera: `<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /> <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />`,
  calendario: `<path d="M8 2v3" /> <path d="M16 2v3" /> <rect x="3" y="3" width="18" height="18" rx="2" /> <path d="M3 9h18" />`,
  qr: `<rect width="5" height="5" x="3" y="3" rx="1" /> <rect width="5" height="5" x="16" y="3" rx="1" /> <rect width="5" height="5" x="3" y="16" rx="1" /> <path d="M21 16h-3a2 2 0 0 0-2 2v3" /> <path d="M21 21v.01" /> <path d="M12 7v3a2 2 0 0 1-2 2H7" /> <path d="M3 12h.01" /> <path d="M12 3h.01" /> <path d="M12 16v.01" /> <path d="M16 12h1" /> <path d="M21 12v.01" /> <path d="M12 21v-1" />`,
  abajo: `<path d="m6 9 6 6 6-6" />`,
  borrar: `<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" /> <path d="m12 9 6 6" /> <path d="m18 9-6 6" />`,
  camara: `<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /> <circle cx="12" cy="13" r="3" />`,
  baja: `<circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" /> <path d="m9 9 6 6" />`,
  buscar: `<path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" />`,
  clasificar: `<path d="M13 5h8" /> <path d="M13 12h8" /> <path d="M13 19h8" /> <path d="m3 17 2 2 4-4" /> <path d="m3 7 2 2 4-4" />`,
  globe: `<circle cx="12" cy="12" r="10" /> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /> <path d="M2 12h20" />`,
  luna: `<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />`,
  letra: `<path d="m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16" /> <path d="M15.697 14h5.606" /> <path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" /> <path d="M3.304 13h6.392" />`,
  candado: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" />`,
  moneda: `<circle cx="12" cy="12" r="10" /> <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /> <path d="M12 18V6" />`,
  banco: `<path d="M10 18v-7" /> <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" /> <path d="M14 18v-7" /> <path d="M18 18v-7" /> <path d="M3 22h18" /> <path d="M6 18v-7" />`,
  brujula: `<circle cx="12" cy="12" r="10" /> <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />`,
  repetir: `<path d="m17 2 4 4-4 4" /> <path d="M3 11v-1a4 4 0 0 1 4-4h14" /> <path d="m7 22-4-4 4-4" /> <path d="M21 13v1a4 4 0 0 1-4 4H3" />`,
  bajar: `<path d="M12 15V3" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /> <path d="m7 10 5 5 5-5" />`,
  subir: `<path d="M12 3v12" /> <path d="m17 8-5-5-5 5" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />`,
  llave: `<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /> <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />`,
  salir: `<path d="m16 17 5-5-5-5" /> <path d="M21 12H9" /> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />`,
  deshacer: `<path d="M9 14 4 9l5-5" /> <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />`,
  riesgo: `<path d="M12 16h.01" /> <path d="M12 8v4" /> <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />`,
  pregunta: `<circle cx="12" cy="12" r="10" /> <path d="M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5" /> <path d="M12 17h.01" />`,
  tarjeta: `<rect width="20" height="14" x="2" y="5" rx="2" /> <line x1="2" x2="22" y1="10" y2="10" /> <path d="M6 14h2" />`,
  x: `<path d="M18 6 6 18" /> <path d="m6 6 12 12" />`,
  sol: `<circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" />`,
  movil: `<rect x="6" y="2" width="12" height="20" rx="2" ry="2" /> <path d="M12 18h.01" />`,
  infinito: `<path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" />`,
  solluna: `<path d="M12 2v2" /> <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" /> <path d="M16 12a4 4 0 0 0-4-4" /> <path d="m19 5-1.256 1.256" /> <path d="M20 12h2" />`,
  barras: `<path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" /> <path d="M13 17V5" /> <path d="M8 17v-3" />`,
  archivo: `<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" />`,
  papelera: `<path d="M10 11v6" /> <path d="M14 11v6" /> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /> <path d="M3 6h18" /> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />`,
  escoba: `<path d="m16 22-1-4" /> <path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" /> <path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" /> <path d="m8 22 1-4" />`,
  imagen: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /> <circle cx="9" cy="9" r="2" /> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />`,
  flechas: `<path d="M8 3 4 7l4 4" /> <path d="M4 7h16" /> <path d="m16 21 4-4-4-4" /> <path d="M20 17H4" />`,
  lapiz: `<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /> <path d="m15 5 4 4" />`,
  mas: `<path d="M5 12h14" /> <path d="M12 5v14" />`,
  fuel: `<path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" /> <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" /> <path d="M2 21h13" /> <path d="M3 9h11" />`,
  bus: `<path d="M8 6v6" /> <path d="M15 6v6" /> <path d="M2 12h19.6" /> <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" /> <circle cx="7" cy="18" r="2" /> <path d="M9 18h5" /> <circle cx="16" cy="18" r="2" />`,
  luz: `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /> <path d="M9 18h6" /> <path d="M10 22h4" />`,
  super: `<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /> <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /> <circle cx="18" cy="20" r="2" /> <circle cx="8" cy="20" r="2" />`,
  casa: `<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`,
  salud: `<path d="M11 2v2" /> <path d="M5 2v2" /> <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" /> <path d="M8 15a6 6 0 0 0 12 0v-3" /> <circle cx="20" cy="10" r="2" />`,
  educ: `<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /> <path d="M22 10v6" /> <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />`,
  imp: `<path d="M12 17V7" /> <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" /> <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />`,
  ropa: `<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />`,
  ocio: `<path d="M5.8 11.3 2 22l10.7-3.79" /> <path d="M4 3h.01" /> <path d="M22 8h.01" /> <path d="M15 2h.01" /> <path d="M22 20h.01" /> <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" /> <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" /> <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" /> <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />`,
  mascota: `<circle cx="11" cy="4" r="2" /> <circle cx="18" cy="8" r="2" /> <circle cx="20" cy="16" r="2" /> <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />`,
  regalo: `<path d="M12 7v14" /> <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" /> <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" /> <rect x="3" y="7" width="18" height="4" rx="1" />`,
  sueldo: `<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /> <rect width="20" height="14" x="2" y="6" rx="2" />`,
  venta: `<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /> <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />`,
  otro: `<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /> <path d="M12 22V12" /> <polyline points="3.29 7 12 12 20.71 7" /> <path d="m7.5 4.27 9 5.15" />`,
};
// Íconos de línea: Lucide (licencia ISC, https://lucide.dev), copiados acá para que anden sin conexión.
// Tarjetas de Ajustes: los emojis se cambian por íconos de línea (si falla, queda el emoji).
function pintarIconosAjustes() {
  document.querySelectorAll("[data-ico]").forEach((el) => { const s = svgIcono(el.dataset.ico); if (s) el.innerHTML = s; });
}
function svgIcono(clave) {
  const d = SVG_ICONOS[clave];
  return d ? `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>` : "";
}
pintarIconosAjustes();
// Emojis que se cambian solos por íconos de línea en cualquier texto de la app (también el que se arma después).
const EMOJI_A_ICONO = { "🎙": "mic", "🎤": "mic", "🏦": "billetera", "📅": "calendario", "🗓": "calendario", "📷": "camara", "⏳": "reloj", "✔": "tilde", "▾": "abajo", "⬇": "abajo", "✖": "x", "☀": "sol", "🌙": "luna", "🌓": "solluna", "📱": "movil", "♾": "infinito", "📊": "barras", "📄": "archivo", "🗑": "papelera", "🧹": "escoba", "🖼": "imagen", "↔": "flechas", "⇄": "flechas", "↩": "deshacer", "🔍": "buscar", "🎉": "ocio", "🧭": "brujula", "💳": "tarjeta", "✏": "lapiz", "➕": "mas" };
const RE_EMOJI_ICONO = /(🎙️?|🎤|🏦|📅|🗓️?|📷|⏳|✔️?|▾|⬇️?|✖️?|☀️?|🌙|🌓|📱|♾️?|📊|📄|🗑️?|🧹|🖼️?|↔️?|⇄|↩️?|🔍|🎉|🧭|💳|✏️?|➕)/;
function iconizarNodoTexto(nodo) {
  const p = nodo.parentNode;
  if (!p || /^(SCRIPT|STYLE|OPTION|TEXTAREA|TITLE|SELECT)$/.test(p.nodeName)) return;
  const texto = nodo.nodeValue;
  if (!texto || !RE_EMOJI_ICONO.test(texto)) return;
  const partes = texto.split(RE_EMOJI_ICONO);
  const frag = document.createDocumentFragment();
  partes.forEach((parte) => {
    if (!parte) return;
    const base = parte.replace("\uFE0F", "");
    if (EMOJI_A_ICONO[base]) {
      let clave = EMOJI_A_ICONO[base];
      if (base === "📷" && /QR/i.test(texto)) clave = "qr";
      const tmp = document.createElement("template");
      tmp.innerHTML = svgIcono(clave);
      frag.appendChild(tmp.content);
    } else {
      frag.appendChild(document.createTextNode(parte));
    }
  });
  p.replaceChild(frag, nodo);
}
function iconizarArbol(raiz) {
  if (!raiz) return;
  if (raiz.nodeType === 3) { iconizarNodoTexto(raiz); return; }
  if (raiz.nodeType !== 1) return;
  const tw = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
  const lista = [];
  while (tw.nextNode()) lista.push(tw.currentNode);
  lista.forEach(iconizarNodoTexto);
}
iconizarArbol(document.body);
new MutationObserver((muts) => {
  for (const m of muts) {
    if (m.type === "characterData") iconizarNodoTexto(m.target);
    else m.addedNodes.forEach((n) => iconizarArbol(n));
  }
}).observe(document.body, { childList: true, subtree: true, characterData: true });

// Botón de acceso: ícono de línea + palabra chica abajo (siempre con palabra).
function botonAcceso(btn, clave, texto) {
  btn.innerHTML = svgIcono(clave) + `<span class="acc-txt">${String(texto).replace(/[&<>]/g, "")}</span>`;
}

let usuario = null;
let perfil = null;
let cuentas = [];
let categorias = [];
let movimientos = [];
let transferenciasMes = [];
let modoClasificar = false;
const clasifSel = new Set();
let pendientes = [];
let pendientesAbierto = false;
let fechaVista = new Date();
let vistaActiva = "vistaMovimientos";
let periodoAnalisis = "mes";
let swRegistro = null; // referencia al Service Worker, para poder pedirle que revise si hay una versión nueva

const $ = (id) => document.getElementById(id);

// ============================================================
// IDIOMAS (Español / Português / English)
// Traduce todo el texto fijo de la interfaz. Los mensajes que
// aparecen dinámicamente (avisos, confirmaciones, carga por voz)
// quedan en español por ahora.
// ============================================================
let idiomaActual = "es";

const TRADUCCIONES = {
  es: {
    subtitulo: "Tus gastos e ingresos, claros y simples.",
    labelEmail: "Email",
    labelClave: "Clave",
    placeholderClave: "Mínimo 6 caracteres",
    btnEntrar: "Entrar",
    separadorO: "o",
    loginNuevoTitulo: "¿Sos nuevo? Probalo 25 días gratis",
    btnCrearCuenta: "Crear una cuenta nueva",
    linkConocer: "Conocé qué es Ingasto",
    linkBotonBaja: "Botón de Baja",
    linkBotonArrep: "Botón de Arrepentimiento",
    tarjetaBaja: "Baja del servicio",
    tarjetaArrep: "Arrepentimiento",
    btnOlvideClave: "Olvidé mi clave",
    textoElegirNuevaClave: "Elegí tu nueva clave",
    labelNuevaClave: "Nueva clave",
    btnGuardarNuevaClave: "Guardar nueva clave",
    tituloCambiarClave: "Cambiar clave",
    textoCambiarClave: "Elegí una clave nueva para tu cuenta.",
    labelRepetirClave: "Repetir clave nueva",
    tituloPruebaVencida: "Tu prueba gratuita terminó",
    textoPruebaVencida: "Tus datos siguen guardados y a salvo. Activá tu cuenta para seguir usando Ingasto.",
    btnPagarPrueba: "Pagar $4.000 y activar",
    textoAvisoSoporte: "Si después de verificar no se activa, escribinos a ingastosoporte@gmail.com con el mail que usaste para registrarte.",
    btnVerificarPago: "Ya pagué, verificar",
    verificandoPago: "Verificando tu pago…",
    pagoNoEncontrado: "Todavía no encontramos tu pago. Puede demorar unos minutos: probá de nuevo en un rato.",
    btnAvisarSoporte: "Escribir a soporte",
    btnSalir2: "Salir",
    tarjetaCerrarSesion: "Cerrar sesión",
    btnCrearCuentaSubmit: "Crear cuenta",
    btnYaTengoCuenta: "Ya tengo cuenta",
    ariaMesAnterior: "Mes anterior",
    ariaMesSiguiente: "Mes siguiente",
    ariaSalir: "Salir",
    ariaOjo: "Ocultar o mostrar los saldos",
    confirmarSalir: "¿Querés cerrar tu sesión?",
    lblBalance: "Balance",
    lblResultadoMes: "Resultado del mes",
    diaHoy: "Hoy",
    diaAyer: "Ayer",
    barraGastoPct: "Gastaste el {p}% de tus ingresos del mes",
    barraGastoPasado: "Gastaste más de lo que ingresó este mes",
    barraSinIngresos: "Todavía no hay ingresos este mes",
    lblIngresos: "Ingresos",
    lblGastos: "Gastos",
    searchTodo: "Todo",
    searchFecha: "Fecha",
    searchTipo: "Tipo",
    searchCuenta: "Cuenta",
    searchCategoria: "Categoría",
    searchDetalle: "Detalle",
    searchMonto: "Monto",
    placeholderBuscar: "Buscar en este mes...",
    btnLimpiar: "Limpiar",
    accesoTodo: "Todo",
    accesoIngresos: "Ingresos",
    accesoGastos: "Gastos",
    btnBuscarSimple: "🔍 Buscar",
    btnOcultarBusqueda: "🔍 Ocultar búsqueda",
    accBuscar: "Buscar", accCerrar: "Cerrar", accClasificar: "Clasificar", accTerminar: "Terminar",
    analisisMesActual: "Mes actual",
    analisisResumenAnual: "Resumen anual",
    analisisAcumulado: "Acumulado",
    tituloGastosPorCategoria: "Gastos por categoría",
    tituloIngresosPorCategoria: "Ingresos por categoría",
    analisisGastosTab: "Gastos",
    analisisIngresosTab: "Ingresos",
    analisisSinGastos: "No hay gastos cargados en este período.",
    analisisSinIngresos: "No hay ingresos cargados en este período.",
    lblTotalGastos: "Total gastos",
    lblTotalIngresos: "Total ingresos",
    analisisPorCategoria: "Por categoría",
    analisisEvolucion: "Evolución mensual",
    analisisDiaADia: "Día a día",
    analisisPresupuesto: "Presupuesto",
    tituloPresupuesto: "Presupuesto del mes",
    textoPresupuesto: "Repartí tu ingreso entre gastos fijos, vida y salidas, y ahorro. Podés cambiar los porcentajes.",
    lblIngresoBase: "Ingreso del mes para repartir",
    presUsaReal: "Vacío = lo que ingresó este mes",
    presFijos: "Gastos fijos (%)",
    presVida: "Vida y salidas (%)",
    presAhorro: "Ahorro (%)",
    presGrupoFijos: "Gastos fijos",
    presGrupoVida: "Vida y salidas",
    presGrupoAhorro: "Meta de ahorro",
    presGastadoDe: "Gastaste {g} de {l}",
    presQueda: "Te quedan {r}",
    presPasaste: "Te pasaste {r}",
    presAhorroPosible: "Hoy podrías ahorrar {a} de una meta de {m}",
    presSinIngreso: "Cargá un ingreso este mes o escribí uno arriba para ver tu presupuesto.",
    presCambiarGrupos: "Elegir qué categorías son fijas",
    presOpcFijo: "Fijo",
    presOpcVida: "Vida y salidas",
    presRestablecer: "Volver a 50/30/20",
    presIngresoDelMes: "Tu ingreso del mes",
    presRepartoSugerido: "Reparto sugerido",
    presPodesCambiarlo: "podés cambiarlo",
    presCambiarPct: "Cambiar porcentajes",
    presVasBien: "Vas bien",
    presTuMeta: "(tu meta)",
    presTeFaltan: "Te faltan {r}",
    presMetaCumplida: "¡Meta cumplida!",
    presNotaAuto: "Tomado de tus ingresos de este mes. Podés cambiarlo.",
    presNotaManual: "Estás usando un valor propio.",
    presUsarReal: "Usar mis ingresos del mes",
    tituloFijos: "Gastos e ingresos fijos",
    tituloGuia: "Guía rápida",
    guiaTitulo: "¡Bien hecho, ya empezaste! 🎉",
    btnVolver: "← Volver",
    pasarAIngreso: "↔️ Pasar a Ingreso",
    pasarAGasto: "↔️ Pasar a Gasto",
    cambiarAIngresoTit: "Cambiar a Ingreso",
    cambiarAGastoTit: "Cambiar a Gasto",
    guiaSub: "Cuando quieras, probá esto:",
    guiaVoz: "Cargar con la voz",
    guiaVozSub: "Tocá Voz y hablá",
    guiaSit: "Situación",
    guiaSitSub: "Lo que debés y lo que se viene",
    guiaAna: "Análisis",
    guiaAnaSub: "En qué se va tu plata",
    guiaIr: "Ir a mi Ingasto",
    guiaRepetir: "Podés volver a ver esta guía en Ajustes.",
    fijosAyuda: "Cargá lo que pagás y lo que cobrás todos los meses. Cada mes, en el día elegido, te aparece en Pendientes para marcarlo como pagado o cobrado. Si un mes cambia la fecha, la modificás en ese movimiento.",
    fijosPorMes: "Gastos fijos por mes",
    fijosIngPorMes: "Ingresos fijos por mes",
    fijoTipo: "Tipo",
    fijoDetalleLabel: "Detalle",
    fijoPideDetalle: "Nombre:",
    fijoEditar: "Editar",
    fijoPideDia: "Día del mes (1 a 31):",
    fijoPideMonto: "Monto:",
    fijoPlaceholder: "Ej: Alquiler",
    fijoDia: "Día del mes",
    fijoDiaN: "Día {d}",
    fijoSinFijos: "Todavía no cargaste gastos ni ingresos fijos.",
    movVacioMes: "Todavía no cargaste movimientos este mes.<br>Tocá el botón <b>+</b> para agregar el primero.",
    movSinResultados: "No hay resultados para esa búsqueda.<br>Probá limpiarla o cambiar el filtro.",
    sinCuentas: "Todavía no agregaste ninguna cuenta.",
    sinCatGasto: "Todavía no agregaste ninguna categoría de gasto.",
    sinCatIngreso: "Todavía no agregaste ninguna categoría de ingreso.",
    toastNadaExportar: "Todavía no tenés movimientos para exportar.",
    loginEmailPrimero: "Escribí tu email arriba primero.",
    captchaFallo: "No pudimos comprobar que sos una persona. Revisá tu conexión y probá de nuevo.",
    recordarSesion: "Mantener sesión iniciada en este aparato",
    tituloSeguridad: "Seguridad",
    segAyuda: "Si no usás la app durante este tiempo, te vamos a pedir la clave de nuevo. Sirve si dejás la app abierta en un aparato que no es tuyo.",
    segNunca: "Nunca",
    segNuncaDet: "Como hasta ahora",
    seg1h: "1 hora sin usar",
    seg1d: "1 día sin usar",
    seg7d: "1 semana sin usar",
    avisoInactividad: "Cerramos tu sesión porque estuvo mucho tiempo sin usarse. Entrá de nuevo con tu clave.",
    confBorrarCat: "¿Borrar \"{n}\"? Si tiene movimientos asociados, no se va a poder borrar.",
    confBorrarMov: "¿Borrar este movimiento? No se puede deshacer.",
    errElegirCuenta: "Elegí una cuenta.",
    errElegirCategoria: "Elegí una categoría.",
    reiniciarConf1: "Vas a borrar TODOS tus movimientos, cuentas y categorías.\n\nTu usuario y tu clave no se ven afectados.\n\nEsta acción no se puede deshacer. ¿Continuar?",
    reiniciarConf2: "Confirmación final: se van a borrar todos tus datos de trabajo ahora mismo.\n\n¿Reiniciar todo?",
    reiniciarOk: "Tus datos fueron reiniciados.",
    eliminarConf1: "Vas a ELIMINAR TU CUENTA por completo: tu usuario, tu clave y todos tus datos (movimientos, cuentas, categorías).\n\nEsta acción no se puede deshacer.\n\n¿Continuar?",
    eliminarConf2: "Última confirmación: tu cuenta se va a borrar ahora mismo y no vas a poder recuperarla.\n\n¿Eliminar mi cuenta para siempre?",
    fijoToastAgregado: "Fijo guardado.",
    fijoToastGenerados: "Gastos fijos de este mes cargados en Pendientes: {n}.",
    fijoError: "Completá detalle, cuenta, categoría, un monto mayor a cero y un día entre 1 y 31.",
    fijoNotaMoneda: "Solo se pueden elegir cuentas en {m}.",
    fijoConfirmarBorrar: "¿Borrar este gasto fijo? Lo que ya está en Pendientes no se borra.",
    fijoBorrar: "Borrar",
    sitTengo: "Tengo",
    tengoTotal: "Total en tus cuentas",
    tengoSinCotiz: "No suma al total: falta la cotización de {m} (se guarda al cargar un movimiento en esa moneda).",
    tengoAjustar: "Ajustar",
    tengoAjustarPide: "¿Cuánto hay hoy en {c}?",
    tengoTransferir: "⇄ Transferir entre cuentas",
    tengoUltimas: "Últimas transferencias",
    tengoDolarRef: "Los dólares se valúan a {v} (dólar oficial Banco Nación, venta).",
    tengoDolarGuardado: "Los dólares se valúan a {v} (último valor guardado en este dispositivo; no se pudo consultar el Banco Nación).",
    tengoNota: "El saldo se calcula con el saldo inicial de cada cuenta más lo que cargaste. Si no coincide con la realidad, tocá Ajustar.",
    bienvSig: "Siguiente",
    bienvAtras: "Atrás",
    bienvEmpezar: "Empezar",
    bienvYaSe: "Ya sé, ir a la app",
    bienvVer: "¿Cómo empiezo? Ver la guía",
    bienv1T: "¡Bienvenido a Ingasto!",
    bienv1X: "Anotá tus gastos e ingresos y mirá en qué se va tu plata. En pocos pasos te mostramos dónde está cada cosa.",
    bienv2T: "Cargá tu primer movimiento",
    bienv2X: "Tocá el botón + (abajo, en el centro). Elegí Gasto o Ingreso, la cuenta, la categoría y el monto. También podés hablar: tocá Voz.",
    bienv3T: "Decile cuánto tenés",
    bienv3X: "Entrá a Situación → Tengo y tocá Ajustar en cada cuenta para escribir lo que hay hoy. Se hace una sola vez y es opcional.",
    bienv4T: "Mirá cómo vas",
    bienv4X: "Situación te muestra lo que debés y lo que se viene. Análisis, en qué se va tu plata. En Ajustes están tus cuentas, categorías, gastos e ingresos fijos, e importar un archivo.",
    bienv5T: "Tus datos son tuyos",
    bienv5X: "Los demás usuarios nunca ven tus datos. Nosotros no los miramos ni los compartimos. Ingasto no se conecta con tu banco ni con Mercado Pago, y nunca te pide claves.",
    btnClasificar: "✔ Clasificar varios",
    clasifTerminar: "✔ Terminar",
    clasifAyuda: "Tildá los movimientos y elegí la categoría que les corresponde.",
    clasifSinClasif: "Tildar los que están sin clasificar",
    clasifAplicar: "Aplicar categoría",
    clasifN: "{n} elegidos",
    clasifMezcla: "Elegí solo gastos o solo ingresos.",
    clasifHecho: "{n} movimientos clasificados.",
    clasifNada: "Tildá al menos un movimiento.",
    btnMovInterno: "↔ Es un movimiento interno",
    movInterno: "Movimiento interno",
    movInternoBorrar: "¿Borrar este movimiento interno? Se deshace la transferencia y las cuentas vuelven a sus saldos anteriores.",
    movInternoBorrada: "Movimiento interno borrado.",
    trAvisoMov: "Este movimiento se va a reemplazar por la transferencia: ya no cuenta como gasto ni como ingreso.",
    tengoCartel: "Antes de empezar: decile a la app con cuánta plata arrancás en cada cuenta. Tocá Ajustar en cada una y escribí lo que hay hoy. Se hace una sola vez. Después la app suma y resta sola con lo que cargues.",
    trTitulo: "Transferir entre cuentas",
    trDesde: "Desde",
    trHacia: "Hacia",
    trMonto: "Monto que sale",
    trMontoDestino: "Monto que llega ({m})",
    trAviso: "No cuenta como gasto ni como ingreso: solo pasa plata de una cuenta a otra.",
    trErrIguales: "Elegí dos cuentas distintas.",
    trErrMonto: "Escribí un monto mayor a cero (y el que llega, si las monedas son distintas).",
    trToast: "Transferencia guardada.",
    trConfirmBorrar: "¿Borrar esta transferencia?",
    tengoNecesitaDos: "Necesitás al menos dos cuentas para transferir.",
    fotoAviso: "La foto se guarda 60 días y después se borra sola. El movimiento queda.",
    fotoTitulo: "Foto del comprobante (opcional)",
    fotoAdjuntar: "🖼️ Elegir de la galería",
    fotoSacar: "📷 Sacar foto",
    fotoCambiar: "🖼️ Cambiar foto",
    fotoQuitar: "Quitar",
    fotoErr: "No se pudo usar la foto. Probá con otra.",
    tituloEvolucionMensual: "Evolución mensual",
    textoEvolucionMensual: "Ingresos y egresos totales de los últimos meses.",
    tituloDiaADia: "Ingresos y egresos del mes",
    textoDiaADia: "Acumulado de ingresos y egresos, día a día, del mes que estás viendo.",
    analisisSinDatos: "Todavía no hay movimientos cargados.",
    vacioTitulo: "Todavía no cargaste movimientos",
    vacioTexto: "Cargá el primero hablando o a mano y empezá a ver tu mes.",
    vacioVoz: "Cargar con voz",
    vacioMano: "Cargar a mano",
    tituloCuotas: "Compras en cuotas",
    cuotasEsteMes: "Este mes pagás en cuotas",
    cuotaXdeN: "Cuota {k} de {n}",
    cuotasRestan: "Restan",
    cuotasVacio: "No tenés compras en cuotas pendientes. Se cargan desde Agregar, tildando “Pagar en cuotas”.",
    cuotasVacioMes: "No tenés cuotas para pagar en este mes.",
    rapMasHint: "⬇ Más categorías",
    rapCategorias: "Elegí la categoría",
    rapMas: "Otra…",
    qrBtn: "📷 Escanear QR",
    qrTitulo: "Escanear factura",
    qrAyuda: "Apuntá la cámara al código QR de la factura.",
    qrGaleria: "Elegir foto de la galería",
    pedirNombre: "Nuevo nombre",
    toastGuardado: "Guardado.",
    toastBorrado: "Borrado.",
    toastNoBorrar: "No se pudo borrar (¿tiene movimientos asociados?)",
    pedirNumero: "Escribí un número válido.",
    qrCancelar: "Cancelar",
    qrPreparando: "Preparando el lector…",
    qrSinCamara: "No se pudo abrir la cámara. Probá con una foto de la galería.",
    qrNoLeyo: "No encontré un código QR en la foto. Probá de nuevo o cargalo a mano.",
    qrNoFactura: "Ese QR no es de una factura electrónica. Cargalo a mano.",
    qrOk: "Listo: importe y fecha cargados. Elegí la categoría.",
    qrOtraMoneda: "Factura en {m} ({i}). Cargué la fecha; poné el importe a mano.",
    qrFoto: "Sacar foto del QR",
    qrYaCargada: "Ojo: esta factura ya la cargaste.",
    rapBorrarAria: "Borrar último número",
    rapMasOpciones: "Más opciones (foto del comprobante) ▾",
    rapGuardarGasto: "Guardar gasto",
    rapGuardarIngreso: "Guardar ingreso",
    rapElegiCategoria: "Tocá una categoría antes de guardar.",
    tituloLetra: "Tamaño de letra",
    letraAyuda: "Elegí cómo querés ver las letras en Ingasto. Se guarda en este celular.",
    letraNormal: "Normal",
    letraNormalDet: "Como se ve siempre",
    letraGrande: "Grande",
    letraGrandeDet: "Letras más grandes",
    letraMuy: "Muy grande",
    letraMuyDet: "Las letras más grandes",
    tituloTema: "Modo oscuro",
    temaAuto: "Automático",
    temaAutoDet: "Igual que tu celular",
    temaClaro: "Claro",
    temaClaroDet: "Fondo claro, como siempre",
    temaOscuro: "Oscuro",
    temaOscuroDet: "Fondo oscuro, descansa la vista de noche",
    tituloIdioma: "Idioma",
    tituloMoneda: "Moneda",
    tituloMonedaBase: "Mi moneda",
    textoMonedaBase: "Es la moneda de tu país, contra la que se convierte todo lo demás cuando cargás un movimiento en otra moneda.",
    tituloMonedas: "Monedas",
    textoMonedas: "Agregá acá las monedas que uses de vez en cuando (por ejemplo, cuando viajás), para poder asignárselas a una cuenta.",
    placeholderNombreMoneda: "Nombre (ej: Dólares)",
    placeholderCodigoMoneda: "Código (ej: USD)",
    placeholderSimboloMoneda: "Símbolo (ej: U$S)",
    labelCotizacion: "Cotización (en tu moneda)",
    btnGuardar: "Guardar",
    tituloCuentas: "Cuentas",
    placeholderNuevaCuenta: "Nueva cuenta (ej: Banco)",
    btnAgregar: "Agregar",
    tituloCategorias: "Categorías",
    tituloCategoriasGasto: "Categorías de gasto",
    tituloCategoriasIngreso: "Categorías de ingreso",
    textoNuevaCategoriaTipo: "Elegí si la nueva categoría es para gastos o para ingresos:",
    placeholderNuevaCategoria: "Nueva categoría (ej: Alimentos)",
    tituloExportar: "Exportar mis datos",
    tituloImportar: "Importar movimientos",
    textoImportar: "Subí un archivo de Excel (.xlsx) o CSV, por ejemplo el reporte de Mercado Pago o el resumen de tu banco. Antes de guardar vas a ver cuántos movimientos entran.",
    impColFecha: "Columna de la fecha",
    impColMonto: "Columna del monto",
    impColDetalle: "Columna del detalle (opcional)",
    impNinguna: "— ninguna —",
    impCuenta: "Cuenta donde se guardan",
    impAvanzado: "Opciones avanzadas (si algo no se lee bien)",
    impSinClasifNombre: "Sin clasificar",
    impSinClasifIngreso: "Ingreso sin clasificar",
    impBanco: "entrada desde un banco (plata tuya, no es ingreso)",
    catSugTexto: "Todavía no tenés categorías. Podés empezar con una lista típica y después borrar o cambiar lo que no uses.",
    catSugBoton: "Cargar categorías sugeridas",
    catSugGasto: "Alimentos|Vivienda y alquiler|Servicios (luz, gas, agua, internet)|Transporte y combustible|Salud|Educación|Impuestos|Ropa|Salidas y ocio|Hogar|Mascotas|Regalos|Otros gastos",
    catSugIngreso: "Sueldo|Ventas|Alquileres cobrados|Otros ingresos",
    catSugOk: "Listo: se cargaron las categorías.",
    impAyudaTitulo: "¿Cómo bajo el archivo de Mercado Pago?",
    impAyudaPasos: "En Mercado Pago: Reportes → Todas las transacciones → Nuevo reporte. Elegí el período y el formato CSV, y tocá Generar. Cuando diga \"Nuevo\", tocá Descargar.",
    impTotales: "Ingresos {i} · Gastos {g}",
    impRevisar: "Destildá lo que no quieras importar:",
    impColCuenta: "Columna de la cuenta (opcional)",
    impTransf: "posible transferencia o devolución (se anulan)",
    impColCat: "Columna de la categoría (opcional)",
    impCatGasto: "Categoría de los gastos",
    impCatIngreso: "Categoría de los ingresos",
    impInvertir: "Invertir: los montos positivos son gastos",
    impAyudaSigno: "Normalmente los montos negativos son gastos y los positivos son ingresos.",
    impResumen: "{n} para importar · {d} ya estaban cargados · {x} filas ignoradas",
    impElegir: "Elegir archivo",
    impBoton: "Importar {n} movimientos",
    impErrArchivo: "No pude leer ese archivo. Probá con .xlsx o .csv.",
    impErrSinFilas: "No encontré movimientos en el archivo.",
    impSinCuenta: "Primero creá una cuenta en la moneda base (Ajustes → Cuentas).",
    impOk: "Listo: se importaron {n} movimientos.",
    impMuchas: "El archivo tiene más de {max} filas. Importá solo las primeras {max}.",
    impSinCat: "Falta crear categorías (Ajustes → Categorías).",
    textoExportar: "Descarga tus movimientos en un archivo para abrir en Excel o Google Sheets. Si dejás las fechas vacías, se exportan todos, de todos los meses.",
    labelExportDesde: "Desde (opcional)",
    labelExportHasta: "Hasta (opcional)",
    toastExportRangoInvalido: "La fecha \"Desde\" no puede ser posterior a \"Hasta\".",
    toastExportSinMovs: "No hay movimientos en ese período.",
    btnExcel: "📊 Exportar a Excel",
    btnCSV: "📄 Exportar a CSV",
    tituloZonaRiesgo: "Zona de riesgo",
    textoZonaRiesgo: "Esto borra tus movimientos, cuentas y categorías para empezar de cero. Tu usuario y tu clave no se ven afectados.",
    btnReiniciar: "🧹 Reiniciar todos mis datos",
    tituloEliminarCuenta: "Eliminar cuenta",
    textoEliminarCuenta: "Esto borra tu cuenta y todos tus datos de forma permanente. No se puede deshacer y vas a tener que crear una cuenta nueva si querés volver a usar Ingasto.",
    btnEliminarCuenta: "🗑️ Eliminar mi cuenta",
    ariaNuevoMov: "Nuevo movimiento",
    navMovimientos: "Movimientos",
    navAnalisis: "Análisis",
    navSituacion: "Situación",
    sitTitulo: "Mi situación",
    sitInicio: "Inicio",
    sitVolver: "Volver",
    sitDebo: "Debo",
    sitMeDeben: "Me deben",
    sitSeViene: "Se viene, mes a mes",
    sitVencido: "Vencido",
    sitProx7: "Próximos 7 días",
    sitMasAdelante: "Más adelante",
    sitVerN: "Ver {n} ›",
    sitVerDetalle: "Ver detalle ›",
    sitVerMeses: "Ver meses ›",
    sitTotal: "Total",
    sitNetoMes: "Neto del mes",
    sitNadaGrupo: "No hay nada en este grupo.",
    sitNadaPagar: "Nada por pagar",
    sitNadaCobrar: "Nada por cobrar. Para anotar un cobro, cargá un ingreso con \"Lo voy a cobrar después\".",
    prTitulo: "Anotar un préstamo",
    prMeDeben: "Me deben",
    prDebo: "Debo",
    prPersonaMeDeben: "¿A quién le prestaste?",
    prPersonaDebo: "¿Quién te prestó?",
    prAyudaMeDeben: "Prestaste plata: sale de una de tus cuentas y queda anotado que te la deben.",
    prAyudaDebo: "Te prestaron plata: entra a una de tus cuentas y queda anotado que la debés.",
    prMonto: "Monto",
    prCuentaSale: "Cuenta de donde sale la plata",
    prCuentaEntra: "Cuenta donde entra la plata",
    prFechaDev: "Fecha de devolución (opcional)",
    prNota: "Nota (opcional)",
    prAviso: "No cuenta como gasto ni como ingreso: solo mueve plata entre tus cuentas y queda anotado en Situación.",
    prErrPersona: "Escribí el nombre de la persona.",
    prErrMonto: "Escribí un monto mayor a cero.",
    prErrCuenta: "Elegí una cuenta.",
    prErrFechaDev: "La fecha de devolución no puede ser anterior a la fecha del préstamo.",
    prToast: "Préstamo guardado.",
    prToastDev: "Devolución guardada.",
    prToastBorrado: "Borrado.",
    prSeccionMeDeben: "Plata que presté",
    prSeccionDebo: "Plata que me prestaron",
    prNada: "No hay préstamos pendientes.",
    prAtajoDebo: "➕ Me prestaron plata",
    prAtajoMeDeben: "➕ Presté plata",
    prEnCuotas: "Lo pago en cuotas (préstamo del banco)",
    prCuotasN: "Cantidad de cuotas",
    prCuotaValor: "Valor de cada cuota",
    prCuotaFecha: "Fecha de la primera cuota",
    prCuotaCat: "Categoría de las cuotas",
    prQuedo: "¿La plata quedó en tu cuenta?",
    prQuedoSi: "Sí, entró a mi cuenta",
    prQuedoNo: "No, se usó directo (por ejemplo, para pagar una compra)",
    prCuotasAyuda: "Se crea una cuota pendiente por mes, que aparece en Pendientes y en Debo. El préstamo no cuenta como ingreso.",
    prCuentaCuotas: "Cuenta (donde entra la plata y desde donde pagás las cuotas)",
    prErrCuotas: "Poné una cantidad de cuotas entre 2 y 120.",
    prErrCuotaValor: "El valor de la cuota tiene que ser mayor a cero.",
    prErrCuotasMoneda: "Por ahora, los préstamos en cuotas son solo en tu moneda base. Elegí una cuenta en esa moneda.",
    prErrCuotasCat: "Elegí una categoría para las cuotas.",
    prToastCuotas: "Préstamo anotado. Se crearon {n} cuotas pendientes.",
    prSeccionCuotas: "Préstamos en cuotas",
    prEstCuotas: "En cuotas",
    prCuotasDet: "Las cuotas están en Pendientes (y en Debo). Si borrás este préstamo, las cuotas ya creadas siguen: borralas aparte desde Movimientos.",
    prRecibido: "Recibido",
    prAnotar: "➕ Anotar un préstamo",
    prBtnMeDeben: "Me devolvieron",
    prBtnDebo: "Devolví",
    prEstPendiente: "Pendiente",
    prEstParcial: "Devuelto en parte",
    prEstSaldado: "Saldado",
    prSaldados: "Saldados",
    prLinea: "Préstamos:",
    prDe: "de",
    prPrestado: "Total del préstamo",
    prDevuelto: "Ya devuelto",
    prFalta: "Falta devolver",
    prDesde: "Fecha del préstamo",
    prDevoluciones: "Devoluciones",
    prSinDev: "Todavía no hay devoluciones.",
    prFormMeDeben: "Anotar que me devolvieron",
    prFormDebo: "Anotar que devolví",
    prCuentaDevMeDeben: "Cuenta donde entra la plata",
    prCuentaDevDebo: "Cuenta de donde sale la plata",
    prBtnDev: "Anotar devolución",
    prAvisoDeMas: "Si te devuelven más de lo prestado, anotá la diferencia aparte como un ingreso.",
    prErrMasQueFalta: "No puede ser más que lo que falta ({m}).",
    prBorrar: "🗑️ Borrar este préstamo",
    prBorrarNo: "Para borrar este préstamo, primero borrá sus devoluciones.",
    prConfBorrar: "¿Borrar este préstamo? La plata vuelve al estado anterior en tus cuentas.",
    prConfBorrarPago: "¿Borrar esta devolución?",
    sitVacio: "No tenés pagos ni cobros pendientes. Cuando cargues algo para pagar o cobrar después, o una compra en cuotas, lo vas a ver acá ordenado.",
    navConfig: "Ajustes",
    modalNuevoTitulo: "Nuevo movimiento",
    modalEditarTitulo: "Editar movimiento",
    ariaCerrarModal: "Cerrar",
    ariaMostrarClave: "Mostrar clave",
    labelDiferidoGasto: "Lo voy a pagar después",
    labelDiferidoIngreso: "Lo voy a cobrar después",
    labelFechaPagoGasto: "Fecha en que se paga",
    labelFechaPagoIngreso: "Fecha en que se cobra",
    labelYaPagadoGasto: "Marcar como pagado",
    labelYaPagadoIngreso: "Marcar como cobrado",
    errFaltaFechaPago: "Falta la fecha de pago o cobro.",
    labelCuotas: "Pagar en cuotas",
    labelCantCuotas: "Cantidad de cuotas",
    labelPrimeraCuota: "Fecha de la primera cuota",
    ayudaCuotas: "Cargá el total de la compra: la app lo divide en partes iguales. Se crea una cuota por mes y quedan como pendientes hasta que las marques como pagadas.",
    labelMontoCuota: "Total de la compra",
    vistaCuotas: "{n} cuotas de {c} = {t} en total · primera {p}, última {u}",
    vistaCuotaUlt: "La última cuota es de {l} (ajusta los centavos).",
    textoCuota: "Cuota",
    toastCuotas: "Se crearon {n} cuotas.",
    errCuotas: "Las cuotas tienen que ser entre 2 y 60.",
    errFechaPagoAnterior: "La fecha de pago no puede ser anterior a la fecha del movimiento.",
    pendTitulo: "⏳ Pendientes",
    pendPorPagar: "Por pagar",
    pendPorCobrar: "Por cobrar",
    pendVencidos: "vencidos",
    pendVencido: "vencido",
    pendResumenN: "{n} pendientes",
    pendVenceHoy: "vence hoy",
    pendVenceEn: "vence en",
    pendVencioHace: "venció hace",
    pendVenceEl: "vence el",
    pendDia: "día",
    pendDias: "días",
    pendVer: "Ver",
    pendOcultar: "Ocultar",
    pendMarcarPagado: "Marcar como pagado",
    pendMarcarCobrado: "Marcar como cobrado",
    toastMarcadoPagado: "Listo, marcado como pagado.",
    toastMarcadoCobrado: "Listo, marcado como cobrado.",
    ayudaCotizacion: "Esta cuenta está en {c}. Escribí a cuántos {b} equivale 1 {c}.",
    cotizSugerida: "Usar el dólar de hoy: {v} (Banco Nación, venta)",
    errCotizacion: "Indicá la cotización (tiene que ser mayor a cero).",
    avisoSinCotiz: "⚠ {n} movimiento(s) en otra moneda no tienen cotización y no están sumados.",
    avisoDesfasados: "⚠ {n} movimiento(s) están en una cuenta de otra moneda pero figuran en {b}. Editalos para indicar la cotización.",
    sinCotizTag: "sin cotización",
    confirmCambioBase: "Cambiar tu moneda no convierte los movimientos que ya cargaste. ¿Querés seguir?",
    ariaMonedaCuenta: "Moneda de la cuenta",
    errMonedaDatos: "Completá el nombre, el código de 3 letras y el símbolo.",
    vacioMonedas: "No agregaste monedas propias. Las más comunes ya están disponibles para elegir.",
    toastMonedaGuardada: "Guardado.",
    toastPagadoDet: "Listo: {d} · {m} marcado como pagado.",
    toastCobradoDet: "Listo: {d} · {m} marcado como cobrado.",
    badgePendienteGasto: "⏳ por pagar · {f}",
    badgePendienteIngreso: "⏳ por cobrar · {f}",
    badgeOrigenGasto: "↪ se paga el {f}",
    badgeOrigenIngreso: "↪ se cobra el {f}",
    badgeOrigenPagadoGasto: "↪ pagado el {f}",
    badgeOrigenPagadoIngreso: "↪ cobrado el {f}",
    badgeCerradoGasto: "✔ pagado",
    badgeProgGasto: "Se debita el {f}",
    badgeProgIngreso: "Se acredita el {f}",
    tituloProximas: "Próximas",
    badgeCerradoIngreso: "✔ cobrado",
    previstoLinea: "⏳ Previsto del mes (con lo pendiente): {b}",
    segGasto: "Gasto",
    avisoVasACargarGasto: "📤 Vas a cargar un GASTO",
    avisoVasACargarIngreso: "📥 Vas a cargar un INGRESO",
    segIngreso: "Ingreso",
    labelFecha: "Fecha",
    labelCuenta: "Cuenta",
    labelCategoria: "Categoría",
    labelMonto: "Monto",
    labelDetalle: "Detalle (opcional)",
    placeholderDetalle: "Ej: Supermercado del sábado",
    btnCargarVoz: "🎙️ Cargar por voz (opcional)",
    vozPTipo: "Tipo",
    vozPCuenta: "Cuenta",
    vozPCat: "Categoría",
    vozPCotiz: "Cotización",
    vozPMonto: "Monto",
    vozPDetalle: "Detalle",
    vozQTipo: "¿Es un gasto o un ingreso?",
    vozQCuenta: "¿Con qué cuenta?",
    vozQCat: "¿Qué categoría?",
    vozQCotiz: "¿A qué cotización? Decí el número.",
    vozQMonto: "¿Cuál es el monto? Podés decir pesos y centavos.",
    vozQDetalle: "¿Cuál es el detalle? (podés omitirlo)",
    vozPaso: "Paso {n} de {total}",
    vozListoTitulo: "¡Todo cargado!",
    vozListoPreg: "Revisá y guardá",
    vozToque: "Tocá el micrófono y hablá, o elegí abajo.",
    vozEscuchando: "🔴 Escuchando…",
    vozNoEntendi: "No pude interpretar el dato. Repetilo o escribilo.",
    vozFraseBtn: "🎙️ Decilo todo junto",
    vozFraseEj: "Ejemplo: «Gasté 32 mil en el súper con la Visa, en 3 cuotas». Después revisás y guardás.",
    vozFraseNada: "No entendí el monto. Probá de nuevo o seguí paso a paso.",
    vozFraseListo: "Revisá los datos y completá lo que falta.",
    monedaIniTitulo: "¡Hola! Te damos la bienvenida a Ingasto",
    monedaIniPreg: "Para empezar, ¿en qué moneda llevás tus cuentas?",
    monedaIniOtras: "Ver otras monedas",
    monedaIniSeguir: "Continuar",
    monedaIniNota: "Lo podés cambiar después en Ajustes.",
    vozNoTipo: "No entendí si es gasto o ingreso. Decí “gasto” o “ingreso”, o tocá un botón.",
    vozNoEscuche: "No escuché nada. Tocá el micrófono y hablá apenas empiece.",
    vozMicBloq: "El micrófono está bloqueado para esta página. Revisá los permisos del navegador (candado junto a la dirección).",
    vozSinSoporte: "Este navegador no ofrece voz. Probá con Chrome, o cargá a mano.",
    vozNoPude: "No pude escuchar.",
    vozDeshacer: "↩ Deshacer",
    vozOmitir: "Omitir detalle",
    vozSeguir: "Seguir",
    vozGuardar: "Guardar movimiento",
    vozRevisar: "Cambiar en el formulario",
    vozCerrarAria: "Cerrar la carga por voz",
    vozTitulo: "Cargar por voz",
    vozMicAria: "Hablar",
    vozCual: "Hay más de una parecida. ¿Cuál es?",
    vozAddDif: "⏳ Lo voy a pagar después",
    vozAddCuotas: "🗓️ Pagar en cuotas",
    vozQuitar: "Quitar esto",
    vozPDif: "Pagar después",
    vozPFechaPago: "Fecha de pago",
    vozPCuotas: "En cuotas",
    vozPCuotaN: "Cuántas cuotas",
    vozPCuotaF: "1ª cuota",
    vozQDif: "¿Lo vas a pagar después? Decí sí o no.",
    vozQFechaPago: "¿Cuándo lo pagás? Decí por ejemplo “el 15” o “en 10 días”.",
    vozQCuotas: "¿Lo pagás en cuotas? Decí sí o no.",
    vozQCuotaN: "¿En cuántas cuotas?",
    vozQCuotaF: "¿Cuándo vence la primera cuota?",
    vozSi: "Sí",
    vozNo: "No",
    vozNoSiNo: "No entendí. Decí “sí” o “no”, o tocá un botón.",
    vozNoCuotas: "Las cuotas van de 2 a 60.",
    btnVozChico: "🎙️ Voz",
    btnResponder: "🎤 Responder",
    btnRepetir: "↻ Repetir",
    btnSeguir: "✓ Seguir",
    btnBorrar: "Borrar",
    btnGuardarMov: "Guardar",
    avisoFaltaNombreCategoria: "Escribí un nombre para la categoría antes de agregarla.",
  },
  pt: {
    subtitulo: "Seus gastos e receitas, claros e simples.",
    labelEmail: "Email",
    labelClave: "Senha",
    placeholderClave: "Mínimo 6 caracteres",
    btnEntrar: "Entrar",
    separadorO: "ou",
    loginNuevoTitulo: "É novo por aqui? Experimente 25 dias grátis",
    btnCrearCuenta: "Criar uma conta nova",
    linkConocer: "Conheça o Ingasto",
    linkBotonBaja: "Botão de Cancelamento",
    linkBotonArrep: "Botão de Arrependimento",
    tarjetaBaja: "Cancelar serviço",
    tarjetaArrep: "Arrependimento",
    btnOlvideClave: "Esqueci minha senha",
    textoElegirNuevaClave: "Escolha sua nova senha",
    labelNuevaClave: "Nova senha",
    btnGuardarNuevaClave: "Salvar nova senha",
    tituloCambiarClave: "Alterar senha",
    textoCambiarClave: "Escolha uma nova senha para sua conta.",
    labelRepetirClave: "Repetir nova senha",
    tituloPruebaVencida: "Seu período de teste terminou",
    textoPruebaVencida: "Seus dados continuam salvos e seguros. Ative sua conta para continuar usando o Ingasto.",
    btnPagarPrueba: "Pagar $4.000 e ativar",
    textoAvisoSoporte: "Se depois de verificar não ativar, escreva para ingastosoporte@gmail.com com o e-mail que você usou para se cadastrar.",
    btnVerificarPago: "Já paguei, verificar",
    verificandoPago: "Verificando seu pagamento…",
    pagoNoEncontrado: "Ainda não encontramos seu pagamento. Pode demorar alguns minutos: tente de novo daqui a pouco.",
    btnAvisarSoporte: "Escrever ao suporte",
    btnSalir2: "Sair",
    tarjetaCerrarSesion: "Sair da conta",
    btnCrearCuentaSubmit: "Criar conta",
    btnYaTengoCuenta: "Já tenho conta",
    ariaMesAnterior: "Mês anterior",
    ariaMesSiguiente: "Próximo mês",
    ariaSalir: "Sair",
    ariaOjo: "Ocultar ou mostrar os saldos",
    confirmarSalir: "Quer encerrar a sessão?",
    lblBalance: "Saldo",
    lblResultadoMes: "Resultado do mês",
    diaHoy: "Hoje",
    diaAyer: "Ontem",
    barraGastoPct: "Você gastou {p}% da sua renda do mês",
    barraGastoPasado: "Você gastou mais do que entrou este mês",
    barraSinIngresos: "Ainda não há receitas este mês",
    lblIngresos: "Receitas",
    lblGastos: "Despesas",
    searchTodo: "Tudo",
    searchFecha: "Data",
    searchTipo: "Tipo",
    searchCuenta: "Conta",
    searchCategoria: "Categoria",
    searchDetalle: "Detalhe",
    searchMonto: "Valor",
    placeholderBuscar: "Buscar neste mês...",
    btnLimpiar: "Limpar",
    accesoTodo: "Tudo",
    accesoIngresos: "Receitas",
    accesoGastos: "Despesas",
    btnBuscarSimple: "🔍 Buscar",
    btnOcultarBusqueda: "🔍 Ocultar busca",
    accBuscar: "Buscar", accCerrar: "Fechar", accClasificar: "Classificar", accTerminar: "Concluir",
    analisisMesActual: "Mês atual",
    analisisResumenAnual: "Resumo anual",
    analisisAcumulado: "Acumulado",
    tituloGastosPorCategoria: "Despesas por categoria",
    tituloIngresosPorCategoria: "Receitas por categoria",
    analisisGastosTab: "Despesas",
    analisisIngresosTab: "Receitas",
    analisisSinGastos: "Não há despesas registradas neste período.",
    analisisSinIngresos: "Não há receitas registradas neste período.",
    lblTotalGastos: "Total de despesas",
    lblTotalIngresos: "Total de receitas",
    analisisPorCategoria: "Por categoria",
    analisisEvolucion: "Evolução mensal",
    analisisDiaADia: "Dia a dia",
    analisisPresupuesto: "Orçamento",
    tituloPresupuesto: "Orçamento do mês",
    textoPresupuesto: "Divida sua renda entre gastos fixos, vida e lazer, e poupança. Você pode mudar as porcentagens.",
    lblIngresoBase: "Renda do mês para dividir",
    presUsaReal: "Vazio = o que entrou neste mês",
    presFijos: "Gastos fixos (%)",
    presVida: "Vida e lazer (%)",
    presAhorro: "Poupança (%)",
    presGrupoFijos: "Gastos fixos",
    presGrupoVida: "Vida e lazer",
    presGrupoAhorro: "Meta de poupança",
    presGastadoDe: "Você gastou {g} de {l}",
    presQueda: "Restam {r}",
    presPasaste: "Você passou {r}",
    presAhorroPosible: "Hoje você poderia poupar {a} de uma meta de {m}",
    presSinIngreso: "Registre uma receita neste mês ou digite uma acima para ver seu orçamento.",
    presCambiarGrupos: "Escolher quais categorias são fixas",
    presOpcFijo: "Fixo",
    presOpcVida: "Vida e lazer",
    presRestablecer: "Voltar para 50/30/20",
    presIngresoDelMes: "Sua renda do mês",
    presRepartoSugerido: "Divisão sugerida",
    presPodesCambiarlo: "você pode mudar",
    presCambiarPct: "Mudar porcentagens",
    presVasBien: "Tudo certo",
    presTuMeta: "(sua meta)",
    presTeFaltan: "Faltam {r}",
    presMetaCumplida: "Meta cumprida!",
    presNotaAuto: "Tirado das suas receitas deste mês. Você pode mudar.",
    presNotaManual: "Você está usando um valor próprio.",
    presUsarReal: "Usar minhas receitas do mês",
    tituloFijos: "Despesas e receitas fixas",
    tituloGuia: "Guia rápido",
    guiaTitulo: "Muito bem, você já começou! 🎉",
    btnVolver: "← Voltar",
    pasarAIngreso: "↔️ Passar para Receita",
    pasarAGasto: "↔️ Passar para Despesa",
    cambiarAIngresoTit: "Mudar para Receita",
    cambiarAGastoTit: "Mudar para Despesa",
    guiaSub: "Quando quiser, experimente:",
    guiaVoz: "Registrar com a voz",
    guiaVozSub: "Toque em Voz e fale",
    guiaSit: "Situação",
    guiaSitSub: "O que você deve e o que vem por aí",
    guiaAna: "Análise",
    guiaAnaSub: "Para onde vai o seu dinheiro",
    guiaIr: "Ir para o meu Ingasto",
    guiaRepetir: "Você pode ver este guia de novo em Ajustes.",
    fijosAyuda: "Registre o que você paga e o que recebe todo mês. Todo mês, no dia escolhido, aparece em Pendentes para marcar como pago ou recebido. Se num mês a data mudar, altere nesse movimento.",
    fijosPorMes: "Despesas fixas por mês",
    fijosIngPorMes: "Receitas fixas por mês",
    fijoTipo: "Tipo",
    fijoDetalleLabel: "Detalhe",
    fijoPideDetalle: "Nome:",
    fijoEditar: "Editar",
    fijoPideDia: "Dia do mês (1 a 31):",
    fijoPideMonto: "Valor:",
    fijoPlaceholder: "Ex: Aluguel",
    fijoDia: "Dia do mês",
    fijoDiaN: "Dia {d}",
    fijoSinFijos: "Você ainda não registrou despesas nem receitas fixas.",
    movVacioMes: "Você ainda não registrou movimentos neste mês.<br>Toque no botão <b>+</b> para adicionar o primeiro.",
    movSinResultados: "Nenhum resultado para essa busca.<br>Tente limpá-la ou mudar o filtro.",
    sinCuentas: "Você ainda não adicionou nenhuma conta.",
    sinCatGasto: "Você ainda não adicionou nenhuma categoria de despesa.",
    sinCatIngreso: "Você ainda não adicionou nenhuma categoria de receita.",
    toastNadaExportar: "Você ainda não tem movimentos para exportar.",
    loginEmailPrimero: "Escreva seu e-mail acima primeiro.",
    captchaFallo: "Não conseguimos confirmar que você é uma pessoa. Verifique sua conexão e tente de novo.",
    recordarSesion: "Manter sessão iniciada neste aparelho",
    tituloSeguridad: "Segurança",
    segAyuda: "Se você não usar o app durante esse tempo, vamos pedir sua senha de novo. Serve caso deixe o app aberto em um aparelho que não é seu.",
    segNunca: "Nunca",
    segNuncaDet: "Como até agora",
    seg1h: "1 hora sem usar",
    seg1d: "1 dia sem usar",
    seg7d: "1 semana sem usar",
    avisoInactividad: "Encerramos sua sessão porque ficou muito tempo sem uso. Entre de novo com sua senha.",
    confBorrarCat: "Excluir \"{n}\"? Se tiver movimentos associados, não será possível excluir.",
    confBorrarMov: "Excluir este movimento? Não é possível desfazer.",
    errElegirCuenta: "Escolha uma conta.",
    errElegirCategoria: "Escolha uma categoria.",
    reiniciarConf1: "Você vai apagar TODOS os seus movimentos, contas e categorias.\n\nSeu usuário e sua senha não são afetados.\n\nEsta ação não pode ser desfeita. Continuar?",
    reiniciarConf2: "Confirmação final: todos os seus dados de trabalho serão apagados agora.\n\nReiniciar tudo?",
    reiniciarOk: "Seus dados foram reiniciados.",
    eliminarConf1: "Você vai EXCLUIR SUA CONTA por completo: seu usuário, sua senha e todos os seus dados (movimentos, contas, categorias).\n\nEsta ação não pode ser desfeita.\n\nContinuar?",
    eliminarConf2: "Última confirmação: sua conta será excluída agora e não poderá ser recuperada.\n\nExcluir minha conta para sempre?",
    fijoToastAgregado: "Fixo salvo.",
    fijoToastGenerados: "Gastos fixos deste mês em Pendentes: {n}.",
    fijoError: "Preencha detalhe, conta, categoria, um valor maior que zero e um dia entre 1 e 31.",
    fijoNotaMoneda: "Só é possível escolher contas em {m}.",
    fijoConfirmarBorrar: "Apagar este gasto fixo? O que já está em Pendentes não é apagado.",
    fijoBorrar: "Apagar",
    sitTengo: "Eu tenho",
    tengoTotal: "Total nas suas contas",
    tengoSinCotiz: "Não entra no total: falta a cotação de {m} (é guardada ao registrar um movimento nessa moeda).",
    tengoAjustar: "Ajustar",
    tengoAjustarPide: "Quanto há hoje em {c}?",
    tengoTransferir: "⇄ Transferir entre contas",
    tengoUltimas: "Últimas transferências",
    tengoDolarRef: "Os dólares são avaliados a {v} (dólar oficial Banco Nación, venda).",
    tengoDolarGuardado: "Os dólares são avaliados a {v} (último valor salvo neste dispositivo; não foi possível consultar o Banco Nación).",
    tengoNota: "O saldo é calculado com o saldo inicial de cada conta mais o que você registrou. Se não bater com a realidade, toque em Ajustar.",
    bienvSig: "Próximo",
    bienvAtras: "Voltar",
    bienvEmpezar: "Começar",
    bienvYaSe: "Já sei, ir para o app",
    bienvVer: "Como começo? Ver o guia",
    bienv1T: "Bem-vindo ao Ingasto!",
    bienv1X: "Anote seus gastos e receitas e veja para onde vai o seu dinheiro. Em poucos passos mostramos onde fica cada coisa.",
    bienv2T: "Registre seu primeiro movimento",
    bienv2X: "Toque no botão + (embaixo, no centro). Escolha Despesa ou Receita, a conta, a categoria e o valor. Você também pode falar: toque em Voz.",
    bienv3T: "Diga quanto você tem",
    bienv3X: "Entre em Situação → Tenho e toque em Ajustar em cada conta para digitar o que há hoje. Faz-se uma só vez e é opcional.",
    bienv4T: "Veja como você está",
    bienv4X: "Situação mostra o que você deve e o que vem. Análise, para onde vai seu dinheiro. Em Ajustes ficam suas contas, categorias, gastos e receitas fixas, e importar um arquivo.",
    bienv5T: "Seus dados são seus",
    bienv5X: "Os outros usuários nunca veem seus dados. Nós não os olhamos nem os compartilhamos. O Ingasto não se conecta ao seu banco nem ao Mercado Pago, e nunca pede senhas.",
    btnClasificar: "✔ Classificar vários",
    clasifTerminar: "✔ Concluir",
    clasifAyuda: "Marque os movimentos e escolha a categoria correspondente.",
    clasifSinClasif: "Marcar os que estão sem classificar",
    clasifAplicar: "Aplicar categoria",
    clasifN: "{n} escolhidos",
    clasifMezcla: "Escolha só despesas ou só receitas.",
    clasifHecho: "{n} movimentos classificados.",
    clasifNada: "Marque pelo menos um movimento.",
    btnMovInterno: "↔ É um movimento interno",
    movInterno: "Movimento interno",
    movInternoBorrar: "Apagar este movimento interno? A transferência é desfeita e as contas voltam aos saldos anteriores.",
    movInternoBorrada: "Movimento interno apagado.",
    trAvisoMov: "Este movimento será substituído pela transferência: deixa de contar como despesa ou receita.",
    tengoCartel: "Antes de começar: diga ao app com quanto dinheiro você começa em cada conta. Toque em Ajustar em cada uma e digite o que há hoje. Só se faz uma vez. Depois o app soma e subtrai sozinho com o que você registrar.",
    trTitulo: "Transferir entre contas",
    trDesde: "De",
    trHacia: "Para",
    trMonto: "Valor que sai",
    trMontoDestino: "Valor que chega ({m})",
    trAviso: "Não conta como despesa nem receita: só passa dinheiro de uma conta para outra.",
    trErrIguales: "Escolha duas contas diferentes.",
    trErrMonto: "Digite um valor maior que zero (e o que chega, se as moedas forem diferentes).",
    trToast: "Transferência salva.",
    trConfirmBorrar: "Apagar esta transferência?",
    tengoNecesitaDos: "Você precisa de pelo menos duas contas para transferir.",
    fotoAviso: "A foto é guardada por 60 dias e depois é apagada sozinha. O lançamento continua.",
    fotoTitulo: "Foto do comprovante (opcional)",
    fotoAdjuntar: "🖼️ Escolher da galeria",
    fotoSacar: "📷 Tirar foto",
    fotoCambiar: "🖼️ Trocar foto",
    fotoQuitar: "Remover",
    fotoErr: "Não foi possível usar a foto. Tente outra.",
    tituloEvolucionMensual: "Evolução mensal",
    textoEvolucionMensual: "Receitas e despesas totais dos últimos meses.",
    tituloDiaADia: "Receitas e despesas do mês",
    textoDiaADia: "Acumulado de receitas e despesas, dia a dia, do mês que você está vendo.",
    analisisSinDatos: "Ainda não há movimentos cadastrados.",
    vacioTitulo: "Você ainda não registrou movimentos",
    vacioTexto: "Registre o primeiro falando ou à mão e comece a ver o seu mês.",
    vacioVoz: "Registrar por voz",
    vacioMano: "Registrar à mão",
    tituloCuotas: "Compras parceladas",
    cuotasEsteMes: "Este mês você paga em parcelas",
    cuotaXdeN: "Parcela {k} de {n}",
    cuotasRestan: "Faltam",
    cuotasVacio: "Você não tem compras parceladas pendentes. Elas são registradas em Adicionar, marcando “Pagar em parcelas”.",
    cuotasVacioMes: "Você não tem parcelas para pagar neste mês.",
    rapMasHint: "⬇ Mais categorias",
    rapCategorias: "Escolha a categoria",
    rapMas: "Outra…",
    qrBtn: "📷 Escanear QR",
    qrTitulo: "Escanear fatura",
    qrAyuda: "Aponte a câmera para o código QR da fatura.",
    qrGaleria: "Escolher foto da galeria",
    pedirNombre: "Novo nome",
    toastGuardado: "Salvo.",
    toastBorrado: "Apagado.",
    toastNoBorrar: "Não foi possível apagar (tem movimentos associados?)",
    pedirNumero: "Digite um número válido.",
    qrCancelar: "Cancelar",
    qrPreparando: "Preparando o leitor…",
    qrSinCamara: "Não foi possível abrir a câmera. Tente com uma foto da galeria.",
    qrNoLeyo: "Não encontrei um código QR na foto. Tente de novo ou preencha manualmente.",
    qrNoFactura: "Esse QR não é de uma fatura eletrônica. Preencha manualmente.",
    qrOk: "Pronto: valor e data preenchidos. Escolha a categoria.",
    qrOtraMoneda: "Fatura em {m} ({i}). Preenchi a data; digite o valor.",
    qrFoto: "Tirar foto do QR",
    qrYaCargada: "Atenção: você já registrou esta fatura.",
    rapBorrarAria: "Apagar último número",
    rapMasOpciones: "Mais opções (foto do comprovante) ▾",
    rapGuardarGasto: "Salvar despesa",
    rapGuardarIngreso: "Salvar receita",
    rapElegiCategoria: "Toque em uma categoria antes de salvar.",
    tituloLetra: "Tamanho da letra",
    letraAyuda: "Escolha como quer ver as letras no Ingasto. Fica guardado neste celular.",
    letraNormal: "Normal",
    letraNormalDet: "Como sempre",
    letraGrande: "Grande",
    letraGrandeDet: "Letras maiores",
    letraMuy: "Muito grande",
    letraMuyDet: "As maiores letras",
    tituloTema: "Modo escuro",
    temaAuto: "Automático",
    temaAutoDet: "Igual ao seu celular",
    temaClaro: "Claro",
    temaClaroDet: "Fundo claro, como sempre",
    temaOscuro: "Escuro",
    temaOscuroDet: "Fundo escuro, descansa a vista à noite",
    tituloIdioma: "Idioma",
    tituloMoneda: "Moeda",
    tituloMonedaBase: "Minha moeda",
    textoMonedaBase: "É a moeda do seu país, para a qual tudo é convertido quando você lança um movimento em outra moeda.",
    tituloMonedas: "Moedas",
    textoMonedas: "Adicione aqui as moedas que usa de vez em quando (por exemplo, quando viaja), para poder atribuí-las a uma conta.",
    placeholderNombreMoneda: "Nome (ex: Dólares)",
    placeholderCodigoMoneda: "Código (ex: USD)",
    placeholderSimboloMoneda: "Símbolo (ex: U$S)",
    labelCotizacion: "Cotação (na sua moeda)",
    btnGuardar: "Salvar",
    tituloCuentas: "Contas",
    placeholderNuevaCuenta: "Nova conta (ex: Banco)",
    btnAgregar: "Adicionar",
    tituloCategorias: "Categorias",
    tituloCategoriasGasto: "Categorias de despesa",
    tituloCategoriasIngreso: "Categorias de receita",
    textoNuevaCategoriaTipo: "Escolha se a nova categoria é para despesas ou receitas:",
    placeholderNuevaCategoria: "Nova categoria (ex: Alimentação)",
    tituloExportar: "Exportar meus dados",
    tituloImportar: "Importar movimentos",
    textoImportar: "Envie um arquivo Excel (.xlsx) ou CSV, por exemplo o relatório do Mercado Pago ou o extrato do seu banco. Antes de salvar você verá quantos movimentos entram.",
    impColFecha: "Coluna da data",
    impColMonto: "Coluna do valor",
    impColDetalle: "Coluna do detalhe (opcional)",
    impNinguna: "— nenhuma —",
    impCuenta: "Conta onde serão salvos",
    impAvanzado: "Opções avançadas (se algo não for lido bem)",
    impSinClasifNombre: "Despesa sem classificação",
    impSinClasifIngreso: "Receita sem classificação",
    impBanco: "entrada vinda de um banco (dinheiro seu, não é receita)",
    catSugTexto: "Você ainda não tem categorias. Pode começar com uma lista típica e depois apagar ou mudar o que não usar.",
    catSugBoton: "Carregar categorias sugeridas",
    catSugGasto: "Alimentação|Moradia e aluguel|Serviços (luz, gás, água, internet)|Transporte e combustível|Saúde|Educação|Impostos|Roupas|Lazer e saídas|Casa|Animais de estimação|Presentes|Outras despesas",
    catSugIngreso: "Salário|Vendas|Aluguéis recebidos|Outras receitas",
    catSugOk: "Pronto: categorias carregadas.",
    impAyudaTitulo: "Como baixo o arquivo do Mercado Pago?",
    impAyudaPasos: "No Mercado Pago: Relatórios → Todas as transações → Novo relatório. Escolha o período e o formato CSV, e toque em Gerar. Quando aparecer \"Novo\", toque em Baixar.",
    impTotales: "Receitas {i} · Despesas {g}",
    impRevisar: "Desmarque o que não quiser importar:",
    impColCuenta: "Coluna da conta (opcional)",
    impTransf: "possível transferência ou estorno (se anulam)",
    impColCat: "Coluna da categoria (opcional)",
    impCatGasto: "Categoria das despesas",
    impCatIngreso: "Categoria das receitas",
    impInvertir: "Inverter: valores positivos são despesas",
    impAyudaSigno: "Normalmente valores negativos são despesas e positivos são receitas.",
    impResumen: "{n} para importar · {d} já estavam salvos · {x} linhas ignoradas",
    impElegir: "Escolher arquivo",
    impBoton: "Importar {n} movimentos",
    impErrArchivo: "Não consegui ler esse arquivo. Tente .xlsx ou .csv.",
    impErrSinFilas: "Não encontrei movimentos no arquivo.",
    impSinCuenta: "Primeiro crie uma conta na moeda base (Ajustes → Contas).",
    impOk: "Pronto: {n} movimentos importados.",
    impMuchas: "O arquivo tem mais de {max} linhas. Importe só as primeiras {max}.",
    impSinCat: "Falta criar categorias (Ajustes → Categorias).",
    textoExportar: "Baixe seus lançamentos em um arquivo para abrir no Excel ou Google Sheets. Se deixar as datas vazias, todos são exportados, de todos os meses.",
    labelExportDesde: "De (opcional)",
    labelExportHasta: "Até (opcional)",
    toastExportRangoInvalido: "A data \"De\" não pode ser posterior a \"Até\".",
    toastExportSinMovs: "Não há lançamentos nesse período.",
    btnExcel: "📊 Exportar para Excel",
    btnCSV: "📄 Exportar para CSV",
    tituloZonaRiesgo: "Zona de risco",
    textoZonaRiesgo: "Isso apaga seus lançamentos, contas e categorias para começar do zero. Seu usuário e sua senha não são afetados.",
    btnReiniciar: "🧹 Reiniciar todos os meus dados",
    tituloEliminarCuenta: "Excluir conta",
    textoEliminarCuenta: "Isso apaga sua conta e todos os seus dados de forma permanente. Não pode ser desfeito e você vai precisar criar uma conta nova se quiser usar o Ingasto de novo.",
    btnEliminarCuenta: "🗑️ Excluir minha conta",
    ariaNuevoMov: "Novo lançamento",
    navMovimientos: "Lançamentos",
    navAnalisis: "Análise",
    navSituacion: "Situação",
    sitTitulo: "Minha situação",
    sitInicio: "Início",
    sitVolver: "Voltar",
    sitDebo: "Eu devo",
    sitMeDeben: "Me devem",
    sitSeViene: "Vem aí, mês a mês",
    sitVencido: "Vencido",
    sitProx7: "Próximos 7 dias",
    sitMasAdelante: "Mais adiante",
    sitVerN: "Ver {n} ›",
    sitVerDetalle: "Ver detalhes ›",
    sitVerMeses: "Ver meses ›",
    sitTotal: "Total",
    sitNetoMes: "Líquido do mês",
    sitNadaGrupo: "Não há nada neste grupo.",
    sitNadaPagar: "Nada a pagar",
    sitNadaCobrar: "Nada a receber. Para anotar um recebimento, lance uma receita com \"Vou receber depois\".",
    prTitulo: "Registrar um empréstimo",
    prMeDeben: "Me devem",
    prDebo: "Eu devo",
    prPersonaMeDeben: "Para quem você emprestou?",
    prPersonaDebo: "Quem te emprestou?",
    prAyudaMeDeben: "Você emprestou dinheiro: sai de uma das suas contas e fica registrado que lhe devem.",
    prAyudaDebo: "Te emprestaram dinheiro: entra em uma das suas contas e fica registrado que você deve.",
    prMonto: "Valor",
    prCuentaSale: "Conta de onde sai o dinheiro",
    prCuentaEntra: "Conta onde entra o dinheiro",
    prFechaDev: "Data de devolução (opcional)",
    prNota: "Nota (opcional)",
    prAviso: "Não conta como despesa nem como receita: só move dinheiro entre suas contas e fica registrado em Situação.",
    prErrPersona: "Escreva o nome da pessoa.",
    prErrMonto: "Digite um valor maior que zero.",
    prErrCuenta: "Escolha uma conta.",
    prErrFechaDev: "A data de devolução não pode ser anterior à data do empréstimo.",
    prToast: "Empréstimo salvo.",
    prToastDev: "Devolução salva.",
    prToastBorrado: "Apagado.",
    prSeccionMeDeben: "Dinheiro que emprestei",
    prSeccionDebo: "Dinheiro que me emprestaram",
    prNada: "Não há empréstimos pendentes.",
    prAtajoDebo: "➕ Me emprestaram",
    prAtajoMeDeben: "➕ Emprestei dinheiro",
    prEnCuotas: "Pago em parcelas (empréstimo do banco)",
    prCuotasN: "Quantidade de parcelas",
    prCuotaValor: "Valor de cada parcela",
    prCuotaFecha: "Data da primeira parcela",
    prCuotaCat: "Categoria das parcelas",
    prQuedo: "O dinheiro ficou na sua conta?",
    prQuedoSi: "Sim, entrou na minha conta",
    prQuedoNo: "Não, foi usado direto (por exemplo, para pagar uma compra)",
    prCuotasAyuda: "É criada uma parcela pendente por mês, que aparece em Pendentes e em Devo. O empréstimo não conta como receita.",
    prCuentaCuotas: "Conta (onde entra o dinheiro e de onde você paga as parcelas)",
    prErrCuotas: "Informe uma quantidade de parcelas entre 2 e 120.",
    prErrCuotaValor: "O valor da parcela precisa ser maior que zero.",
    prErrCuotasMoneda: "Por enquanto, empréstimos em parcelas são só na sua moeda base. Escolha uma conta nessa moeda.",
    prErrCuotasCat: "Escolha uma categoria para as parcelas.",
    prToastCuotas: "Empréstimo registrado. Foram criadas {n} parcelas pendentes.",
    prSeccionCuotas: "Empréstimos em parcelas",
    prEstCuotas: "Em parcelas",
    prCuotasDet: "As parcelas estão em Pendentes (e em Devo). Se você apagar este empréstimo, as parcelas já criadas continuam: apague-as à parte em Movimentos.",
    prRecibido: "Recebido",
    prAnotar: "➕ Registrar um empréstimo",
    prBtnMeDeben: "Me devolveram",
    prBtnDebo: "Devolvi",
    prEstPendiente: "Pendente",
    prEstParcial: "Devolvido em parte",
    prEstSaldado: "Quitado",
    prSaldados: "Quitados",
    prLinea: "Empréstimos:",
    prDe: "de",
    prPrestado: "Total do empréstimo",
    prDevuelto: "Já devolvido",
    prFalta: "Falta devolver",
    prDesde: "Data do empréstimo",
    prDevoluciones: "Devoluções",
    prSinDev: "Ainda não há devoluções.",
    prFormMeDeben: "Registrar que me devolveram",
    prFormDebo: "Registrar que devolvi",
    prCuentaDevMeDeben: "Conta onde entra o dinheiro",
    prCuentaDevDebo: "Conta de onde sai o dinheiro",
    prBtnDev: "Registrar devolução",
    prAvisoDeMas: "Se devolverem mais do que o emprestado, registre a diferença à parte como uma receita.",
    prErrMasQueFalta: "Não pode ser mais do que falta ({m}).",
    prBorrar: "🗑️ Apagar este empréstimo",
    prBorrarNo: "Para apagar este empréstimo, apague primeiro as devoluções.",
    prConfBorrar: "Apagar este empréstimo? O dinheiro volta ao estado anterior nas suas contas.",
    prConfBorrarPago: "Apagar esta devolução?",
    sitVacio: "Você não tem pagamentos nem recebimentos pendentes. Quando lançar algo para pagar ou receber depois, ou uma compra parcelada, você vai ver aqui, organizado.",
    navConfig: "Ajustes",
    modalNuevoTitulo: "Novo lançamento",
    modalEditarTitulo: "Editar lançamento",
    ariaCerrarModal: "Fechar",
    ariaMostrarClave: "Mostrar senha",
    labelDiferidoGasto: "Vou pagar depois",
    labelDiferidoIngreso: "Vou receber depois",
    labelFechaPagoGasto: "Data em que será pago",
    labelFechaPagoIngreso: "Data em que será recebido",
    labelYaPagadoGasto: "Marcar como pago",
    labelYaPagadoIngreso: "Marcar como recebido",
    errFaltaFechaPago: "Falta a data de pagamento ou recebimento.",
    labelCuotas: "Pagar em parcelas",
    labelCantCuotas: "Número de parcelas",
    labelPrimeraCuota: "Data da primeira parcela",
    ayudaCuotas: "Informe o total da compra: o app divide em partes iguais. Cria-se uma parcela por mês e ficam pendentes até você marcá-las como pagas.",
    labelMontoCuota: "Total da compra",
    vistaCuotas: "{n} parcelas de {c} = {t} no total · primeira {p}, última {u}",
    vistaCuotaUlt: "A última parcela é de {l} (ajusta os centavos).",
    textoCuota: "Parcela",
    toastCuotas: "{n} parcelas criadas.",
    errCuotas: "As parcelas devem ser entre 2 e 60.",
    errFechaPagoAnterior: "A data de pagamento não pode ser anterior à data do lançamento.",
    pendTitulo: "⏳ Pendentes",
    pendPorPagar: "A pagar",
    pendPorCobrar: "A receber",
    pendVencido: "vencido",
    pendResumenN: "{n} pendentes",
    pendVencidos: "vencidos",
    pendVenceHoy: "vence hoje",
    pendVenceEn: "vence em",
    pendVencioHace: "venceu há",
    pendVenceEl: "vence em",
    pendDia: "dia",
    pendDias: "dias",
    pendVer: "Ver",
    pendOcultar: "Ocultar",
    pendMarcarPagado: "Marcar como pago",
    pendMarcarCobrado: "Marcar como recebido",
    toastMarcadoPagado: "Pronto, marcado como pago.",
    toastMarcadoCobrado: "Pronto, marcado como recebido.",
    ayudaCotizacion: "Esta conta está em {c}. Escreva quantos {b} vale 1 {c}.",
    cotizSugerida: "Usar o dólar de hoje: {v} (Banco Nación, venda)",
    errCotizacion: "Informe a cotação (tem que ser maior que zero).",
    avisoSinCotiz: "⚠ {n} lançamento(s) em outra moeda não têm cotação e não estão somados.",
    avisoDesfasados: "⚠ {n} lançamento(s) estão numa conta de outra moeda mas aparecem em {b}. Edite-os para informar a cotação.",
    sinCotizTag: "sem cotação",
    confirmCambioBase: "Mudar sua moeda não converte os lançamentos que você já fez. Quer continuar?",
    ariaMonedaCuenta: "Moeda da conta",
    errMonedaDatos: "Preencha o nome, o código de 3 letras e o símbolo.",
    vacioMonedas: "Você não adicionou moedas próprias. As mais comuns já estão disponíveis para escolher.",
    toastMonedaGuardada: "Salvo.",
    toastPagadoDet: "Pronto: {d} · {m} marcado como pago.",
    toastCobradoDet: "Pronto: {d} · {m} marcado como recebido.",
    badgePendienteGasto: "⏳ a pagar · {f}",
    badgePendienteIngreso: "⏳ a receber · {f}",
    badgeOrigenGasto: "↪ será pago em {f}",
    badgeOrigenIngreso: "↪ será recebido em {f}",
    badgeOrigenPagadoGasto: "↪ pago em {f}",
    badgeOrigenPagadoIngreso: "↪ recebido em {f}",
    badgeCerradoGasto: "✔ pago",
    badgeProgGasto: "Será debitado em {f}",
    badgeProgIngreso: "Será creditado em {f}",
    tituloProximas: "Próximas",
    badgeCerradoIngreso: "✔ recebido",
    previstoLinea: "⏳ Previsto do mês (com o pendente): {b}",
    segGasto: "Despesa",
    avisoVasACargarGasto: "📤 Você vai lançar uma DESPESA",
    avisoVasACargarIngreso: "📥 Você vai lançar uma RECEITA",
    segIngreso: "Receita",
    labelFecha: "Data",
    labelCuenta: "Conta",
    labelCategoria: "Categoria",
    labelMonto: "Valor",
    labelDetalle: "Detalhe (opcional)",
    placeholderDetalle: "Ex: Supermercado de sábado",
    btnCargarVoz: "🎙️ Adicionar por voz (opcional)",
    vozPTipo: "Tipo",
    vozPCuenta: "Conta",
    vozPCat: "Categoria",
    vozPCotiz: "Cotação",
    vozPMonto: "Valor",
    vozPDetalle: "Detalhe",
    vozQTipo: "É uma despesa ou uma receita?",
    vozQCuenta: "Com qual conta?",
    vozQCat: "Qual categoria?",
    vozQCotiz: "Qual cotação? Diga o número.",
    vozQMonto: "Qual o valor? Pode dizer reais e centavos.",
    vozQDetalle: "Qual o detalhe? (pode pular)",
    vozPaso: "Passo {n} de {total}",
    vozListoTitulo: "Tudo preenchido!",
    vozListoPreg: "Revise e salve",
    vozToque: "Toque no microfone e fale, ou escolha abaixo.",
    vozEscuchando: "🔴 Ouvindo…",
    vozNoEntendi: "Não consegui interpretar. Repita ou digite.",
    vozFraseBtn: "🎙️ Diga tudo junto",
    vozFraseEj: "Exemplo: «Gastei 32 mil no mercado com o Visa, em 3 parcelas». Depois você revisa e salva.",
    vozFraseNada: "Não entendi o valor. Tente de novo ou siga passo a passo.",
    vozFraseListo: "Revise os dados e complete o que falta.",
    monedaIniTitulo: "Olá! Boas-vindas ao Ingasto",
    monedaIniPreg: "Para começar, em que moeda ficam suas contas?",
    monedaIniOtras: "Ver outras moedas",
    monedaIniSeguir: "Continuar",
    monedaIniNota: "Você pode mudar depois em Ajustes.",
    vozNoTipo: "Não entendi se é despesa ou receita. Diga “gasto” ou “ingreso”, ou toque num botão.",
    vozNoEscuche: "Não ouvi nada. Toque no microfone e fale assim que começar.",
    vozMicBloq: "O microfone está bloqueado para esta página. Verifique as permissões do navegador.",
    vozSinSoporte: "Este navegador não oferece voz. Use o Chrome ou preencha à mão.",
    vozNoPude: "Não consegui ouvir.",
    vozDeshacer: "↩ Desfazer",
    vozOmitir: "Pular detalhe",
    vozSeguir: "Continuar",
    vozGuardar: "Salvar movimento",
    vozRevisar: "Alterar no formulário",
    vozCerrarAria: "Fechar o preenchimento por voz",
    vozTitulo: "Adicionar por voz",
    vozMicAria: "Falar",
    vozCual: "Há mais de uma parecida. Qual é?",
    vozAddDif: "⏳ Vou pagar depois",
    vozAddCuotas: "🗓️ Pagar em parcelas",
    vozQuitar: "Remover isto",
    vozPDif: "Pagar depois",
    vozPFechaPago: "Data de pagamento",
    vozPCuotas: "Parcelado",
    vozPCuotaN: "Quantas parcelas",
    vozPCuotaF: "1ª parcela",
    vozQDif: "Vai pagar depois? Diga “sí” ou “no”.",
    vozQFechaPago: "Quando vai pagar? Diga por exemplo “el 15” ou “en 10 días”.",
    vozQCuotas: "Vai pagar em parcelas? Diga “sí” ou “no”.",
    vozQCuotaN: "Em quantas parcelas?",
    vozQCuotaF: "Quando vence a primeira parcela?",
    vozSi: "Sim",
    vozNo: "Não",
    vozNoSiNo: "Não entendi. Diga “sí” ou “no”, ou toque num botão.",
    vozNoCuotas: "As parcelas vão de 2 a 60.",
    btnVozChico: "🎙️ Voz",
    btnResponder: "🎤 Responder",
    btnRepetir: "↻ Repetir",
    btnSeguir: "✓ Continuar",
    btnBorrar: "Excluir",
    btnGuardarMov: "Salvar",
    avisoFaltaNombreCategoria: "Escreva um nome para a categoria antes de adicioná-la.",
  },
  en: {
    subtitulo: "Your expenses and income, clear and simple.",
    labelEmail: "Email",
    labelClave: "Password",
    placeholderClave: "Minimum 6 characters",
    btnEntrar: "Log in",
    separadorO: "or",
    loginNuevoTitulo: "New here? Try it free for 25 days",
    btnCrearCuenta: "Create a new account",
    linkConocer: "What is Ingasto?",
    linkBotonBaja: "Cancel subscription",
    linkBotonArrep: "Withdraw from purchase",
    tarjetaBaja: "Cancel service",
    tarjetaArrep: "Withdraw purchase",
    btnOlvideClave: "Forgot my password",
    textoElegirNuevaClave: "Choose your new password",
    labelNuevaClave: "New password",
    btnGuardarNuevaClave: "Save new password",
    tituloCambiarClave: "Change password",
    textoCambiarClave: "Choose a new password for your account.",
    labelRepetirClave: "Repeat new password",
    tituloPruebaVencida: "Your free trial has ended",
    textoPruebaVencida: "Your data is still saved and safe. Activate your account to keep using Ingasto.",
    btnPagarPrueba: "Pay $4,000 and activate",
    textoAvisoSoporte: "If it doesn't activate after checking, write to ingastosoporte@gmail.com with the email you used to sign up.",
    btnVerificarPago: "I've paid, check now",
    verificandoPago: "Checking your payment…",
    pagoNoEncontrado: "We haven't found your payment yet. It can take a few minutes: please try again shortly.",
    btnAvisarSoporte: "Contact support",
    btnSalir2: "Log out",
    tarjetaCerrarSesion: "Log out",
    btnCrearCuentaSubmit: "Create account",
    btnYaTengoCuenta: "I already have an account",
    ariaMesAnterior: "Previous month",
    ariaMesSiguiente: "Next month",
    ariaSalir: "Log out",
    ariaOjo: "Hide or show balances",
    confirmarSalir: "Do you want to log out?",
    lblBalance: "Balance",
    lblResultadoMes: "Month result",
    diaHoy: "Today",
    diaAyer: "Yesterday",
    barraGastoPct: "You've spent {p}% of this month's income",
    barraGastoPasado: "You've spent more than came in this month",
    barraSinIngresos: "No income yet this month",
    lblIngresos: "Income",
    lblGastos: "Expenses",
    searchTodo: "All",
    searchFecha: "Date",
    searchTipo: "Type",
    searchCuenta: "Account",
    searchCategoria: "Category",
    searchDetalle: "Detail",
    searchMonto: "Amount",
    placeholderBuscar: "Search this month...",
    btnLimpiar: "Clear",
    accesoTodo: "All",
    accesoIngresos: "Income",
    accesoGastos: "Expenses",
    btnBuscarSimple: "🔍 Search",
    btnOcultarBusqueda: "🔍 Hide search",
    accBuscar: "Search", accCerrar: "Close", accClasificar: "Sort", accTerminar: "Done",
    analisisMesActual: "Current month",
    analisisResumenAnual: "Yearly summary",
    analisisAcumulado: "All time",
    tituloGastosPorCategoria: "Expenses by category",
    tituloIngresosPorCategoria: "Income by category",
    analisisGastosTab: "Expenses",
    analisisIngresosTab: "Income",
    analisisSinGastos: "No expenses recorded for this period.",
    analisisSinIngresos: "No income recorded for this period.",
    lblTotalGastos: "Total expenses",
    lblTotalIngresos: "Total income",
    analisisPorCategoria: "By category",
    analisisEvolucion: "Monthly trend",
    analisisDiaADia: "Day by day",
    analisisPresupuesto: "Budget",
    tituloPresupuesto: "Monthly budget",
    textoPresupuesto: "Split your income into fixed costs, living and fun, and savings. You can change the percentages.",
    lblIngresoBase: "Income to split this month",
    presUsaReal: "Empty = this month's income",
    presFijos: "Fixed costs (%)",
    presVida: "Living and fun (%)",
    presAhorro: "Savings (%)",
    presGrupoFijos: "Fixed costs",
    presGrupoVida: "Living and fun",
    presGrupoAhorro: "Savings goal",
    presGastadoDe: "You spent {g} of {l}",
    presQueda: "{r} left",
    presPasaste: "Over by {r}",
    presAhorroPosible: "Today you could save {a} of a {m} goal",
    presSinIngreso: "Add an income this month or type one above to see your budget.",
    presCambiarGrupos: "Choose which categories are fixed",
    presOpcFijo: "Fixed",
    presOpcVida: "Living and fun",
    presRestablecer: "Reset to 50/30/20",
    presIngresoDelMes: "Your income this month",
    presRepartoSugerido: "Suggested split",
    presPodesCambiarlo: "you can change it",
    presCambiarPct: "Change percentages",
    presVasBien: "You are doing fine",
    presTuMeta: "(your goal)",
    presTeFaltan: "{r} to go",
    presMetaCumplida: "Goal reached!",
    presNotaAuto: "Taken from this month's income. You can change it.",
    presNotaManual: "You are using your own value.",
    presUsarReal: "Use my income for the month",
    tituloFijos: "Fixed expenses and income",
    tituloGuia: "Quick guide",
    guiaTitulo: "Well done, you have started! 🎉",
    btnVolver: "← Back",
    pasarAIngreso: "↔️ Switch to Income",
    pasarAGasto: "↔️ Switch to Expense",
    cambiarAIngresoTit: "Change to Income",
    cambiarAGastoTit: "Change to Expense",
    guiaSub: "Whenever you like, try this:",
    guiaVoz: "Add with your voice",
    guiaVozSub: "Tap Voice and speak",
    guiaSit: "Situation",
    guiaSitSub: "What you owe and what is coming",
    guiaAna: "Analysis",
    guiaAnaSub: "Where your money goes",
    guiaIr: "Go to my Ingasto",
    guiaRepetir: "You can see this guide again in Settings.",
    fijosAyuda: "Add what you pay and what you receive every month. Each month, on the chosen day, it shows up in Pending so you can mark it as paid or received. If the date changes one month, edit it on that movement.",
    fijosPorMes: "Fixed expenses per month",
    fijosIngPorMes: "Fixed income per month",
    fijoTipo: "Type",
    fijoDetalleLabel: "Detail",
    fijoPideDetalle: "Name:",
    fijoEditar: "Edit",
    fijoPideDia: "Day of the month (1 to 31):",
    fijoPideMonto: "Amount:",
    fijoPlaceholder: "E.g. Rent",
    fijoDia: "Day of the month",
    fijoDiaN: "Day {d}",
    fijoSinFijos: "You have not added fixed expenses yet.",
    movVacioMes: "You haven't added any transactions this month.<br>Tap the <b>+</b> button to add the first one.",
    movSinResultados: "No results for that search.<br>Try clearing it or changing the filter.",
    sinCuentas: "You haven't added any accounts yet.",
    sinCatGasto: "You haven't added any expense categories yet.",
    sinCatIngreso: "You haven't added any income categories yet.",
    toastNadaExportar: "You have no transactions to export yet.",
    loginEmailPrimero: "Enter your email above first.",
    captchaFallo: "We couldn't confirm you're a person. Check your connection and try again.",
    recordarSesion: "Keep me signed in on this device",
    tituloSeguridad: "Security",
    segAyuda: "If you don't use the app for this long, we'll ask for your password again. Useful if you leave the app open on a device that isn't yours.",
    segNunca: "Never",
    segNuncaDet: "Same as before",
    seg1h: "1 hour of no use",
    seg1d: "1 day of no use",
    seg7d: "1 week of no use",
    avisoInactividad: "We signed you out because the app wasn't used for a long time. Sign in again with your password.",
    confBorrarCat: "Delete \"{n}\"? If it has linked transactions, it can't be deleted.",
    confBorrarMov: "Delete this transaction? This can't be undone.",
    errElegirCuenta: "Choose an account.",
    errElegirCategoria: "Choose a category.",
    reiniciarConf1: "You are about to delete ALL your transactions, accounts and categories.\n\nYour user and password are not affected.\n\nThis can't be undone. Continue?",
    reiniciarConf2: "Final confirmation: all your working data will be deleted right now.\n\nReset everything?",
    reiniciarOk: "Your data has been reset.",
    eliminarConf1: "You are about to DELETE YOUR ACCOUNT completely: your user, your password and all your data (transactions, accounts, categories).\n\nThis can't be undone.\n\nContinue?",
    eliminarConf2: "Last confirmation: your account will be deleted right now and can't be recovered.\n\nDelete my account forever?",
    fijoToastAgregado: "Fixed expense saved.",
    fijoToastGenerados: "Fixed expenses for this month added to Pending: {n}.",
    fijoError: "Fill in detail, account, category, an amount above zero and a day between 1 and 31.",
    fijoNotaMoneda: "Only accounts in {m} can be chosen.",
    fijoConfirmarBorrar: "Delete this fixed expense? What is already in Pending is not deleted.",
    fijoBorrar: "Delete",
    sitTengo: "I have",
    tengoTotal: "Total in your accounts",
    tengoSinCotiz: "Not included in the total: the {m} rate is missing (it is saved when you add an entry in that currency).",
    tengoAjustar: "Adjust",
    tengoAjustarPide: "How much is there today in {c}?",
    tengoTransferir: "⇄ Transfer between accounts",
    tengoUltimas: "Latest transfers",
    tengoDolarRef: "Dollars are valued at {v} (official Banco Nación rate, selling).",
    tengoDolarGuardado: "Dollars are valued at {v} (last value saved on this device; Banco Nación could not be reached).",
    tengoNota: "The balance is each account's starting balance plus what you recorded. If it does not match reality, tap Adjust.",
    bienvSig: "Next",
    bienvAtras: "Back",
    bienvEmpezar: "Get started",
    bienvYaSe: "I know it, go to the app",
    bienvVer: "How do I start? See the guide",
    bienv1T: "Welcome to Ingasto!",
    bienv1X: "Record your expenses and income and see where your money goes. In a few short steps we show you where everything is.",
    bienv2T: "Add your first movement",
    bienv2X: "Tap the + button (bottom, center). Pick Expense or Income, the account, the category and the amount. You can also speak: tap Voice.",
    bienv3T: "Tell it how much you have",
    bienv3X: "Go to Situation → I have and tap Adjust on each account to enter what is there today. You only do it once and it is optional.",
    bienv4T: "See how you are doing",
    bienv4X: "Situation shows what you owe and what is coming. Analysis, where your money goes. In Settings you will find your accounts, categories, fixed expenses and income, and file import.",
    bienv5T: "Your data is yours",
    bienv5X: "Other users never see your data. We do not look at it or share it. Ingasto does not connect to your bank or Mercado Pago, and never asks for passwords.",
    btnClasificar: "✔ Categorize several",
    clasifTerminar: "✔ Done",
    clasifAyuda: "Tick the movements and pick the category they belong to.",
    clasifSinClasif: "Tick the uncategorized ones",
    clasifAplicar: "Apply category",
    clasifN: "{n} selected",
    clasifMezcla: "Pick only expenses or only income.",
    clasifHecho: "{n} movements categorized.",
    clasifNada: "Tick at least one movement.",
    btnMovInterno: "↔ This is an internal movement",
    movInterno: "Internal movement",
    movInternoBorrar: "Delete this internal movement? The transfer is undone and the accounts go back to their previous balances.",
    movInternoBorrada: "Internal movement deleted.",
    trAvisoMov: "This movement will be replaced by the transfer: it no longer counts as an expense or income.",
    tengoCartel: "Before you start: tell the app how much money you begin with in each account. Tap Adjust on each one and enter what is there today. You only do this once. After that the app adds and subtracts on its own with what you record.",
    trTitulo: "Transfer between accounts",
    trDesde: "From",
    trHacia: "To",
    trMonto: "Amount sent",
    trMontoDestino: "Amount received ({m})",
    trAviso: "It does not count as an expense or income: it only moves money from one account to another.",
    trErrIguales: "Choose two different accounts.",
    trErrMonto: "Enter an amount above zero (and the amount received, if the currencies differ).",
    trToast: "Transfer saved.",
    trConfirmBorrar: "Delete this transfer?",
    tengoNecesitaDos: "You need at least two accounts to transfer.",
    fotoAviso: "The photo is kept for 60 days and then deleted automatically. The entry stays.",
    fotoTitulo: "Receipt photo (optional)",
    fotoAdjuntar: "🖼️ Choose from gallery",
    fotoSacar: "📷 Take photo",
    fotoCambiar: "🖼️ Change photo",
    fotoQuitar: "Remove",
    fotoErr: "Could not use the photo. Try another one.",
    tituloEvolucionMensual: "Monthly trend",
    textoEvolucionMensual: "Total income and expenses over the last few months.",
    tituloDiaADia: "Income and expenses this month",
    textoDiaADia: "Cumulative income and expenses, day by day, for the month you're viewing.",
    analisisSinDatos: "No transactions logged yet.",
    vacioTitulo: "You haven't added any entries yet",
    vacioTexto: "Add the first one by voice or by hand and start seeing your month.",
    vacioVoz: "Add by voice",
    vacioMano: "Add by hand",
    tituloCuotas: "Installment purchases",
    cuotasEsteMes: "This month you pay in installments",
    cuotaXdeN: "Installment {k} of {n}",
    cuotasRestan: "Remaining",
    cuotasVacio: "You have no pending installment purchases. Add them from Add, ticking “Pay in installments”.",
    cuotasVacioMes: "You have no installments to pay this month.",
    rapMasHint: "⬇ More categories",
    rapCategorias: "Choose the category",
    rapMas: "Other…",
    qrBtn: "📷 Scan QR",
    qrTitulo: "Scan invoice",
    qrAyuda: "Point the camera at the invoice QR code.",
    qrGaleria: "Choose a photo from the gallery",
    pedirNombre: "New name",
    toastGuardado: "Saved.",
    toastBorrado: "Deleted.",
    toastNoBorrar: "Could not delete (does it have linked transactions?)",
    pedirNumero: "Enter a valid number.",
    qrCancelar: "Cancel",
    qrPreparando: "Getting the reader ready…",
    qrSinCamara: "Couldn't open the camera. Try a photo from the gallery.",
    qrNoLeyo: "I couldn't find a QR code in the photo. Try again or enter it by hand.",
    qrNoFactura: "That QR isn't from an electronic invoice. Enter it by hand.",
    qrOk: "Done: amount and date filled in. Choose the category.",
    qrOtraMoneda: "Invoice in {m} ({i}). I filled in the date; enter the amount by hand.",
    qrFoto: "Take a photo of the QR",
    qrYaCargada: "Heads up: you already added this invoice.",
    rapBorrarAria: "Delete last digit",
    rapMasOpciones: "More options (receipt photo) ▾",
    rapGuardarGasto: "Save expense",
    rapGuardarIngreso: "Save income",
    rapElegiCategoria: "Tap a category before saving.",
    tituloLetra: "Text size",
    letraAyuda: "Choose how you want to see the text in Ingasto. It is saved on this phone.",
    letraNormal: "Normal",
    letraNormalDet: "As usual",
    letraGrande: "Large",
    letraGrandeDet: "Bigger text",
    letraMuy: "Extra large",
    letraMuyDet: "The biggest text",
    tituloTema: "Dark mode",
    temaAuto: "Automatic",
    temaAutoDet: "Same as your phone",
    temaClaro: "Light",
    temaClaroDet: "Light background, as always",
    temaOscuro: "Dark",
    temaOscuroDet: "Dark background, easier on the eyes at night",
    tituloIdioma: "Language",
    tituloMoneda: "Currency",
    tituloMonedaBase: "My currency",
    textoMonedaBase: "This is your home currency, which everything else is converted to when you log a movement in a different currency.",
    tituloMonedas: "Currencies",
    textoMonedas: "Add currencies here that you use from time to time (for example, when traveling), so you can assign them to an account.",
    placeholderNombreMoneda: "Name (e.g: Dollars)",
    placeholderCodigoMoneda: "Code (e.g: USD)",
    placeholderSimboloMoneda: "Symbol (e.g: U$S)",
    labelCotizacion: "Exchange rate (in your currency)",
    btnGuardar: "Save",
    tituloCuentas: "Accounts",
    placeholderNuevaCuenta: "New account (e.g: Bank)",
    btnAgregar: "Add",
    tituloCategorias: "Categories",
    tituloCategoriasGasto: "Expense categories",
    tituloCategoriasIngreso: "Income categories",
    textoNuevaCategoriaTipo: "Choose whether the new category is for expenses or income:",
    placeholderNuevaCategoria: "New category (e.g: Groceries)",
    tituloExportar: "Export my data",
    tituloImportar: "Import transactions",
    textoImportar: "Upload an Excel (.xlsx) or CSV file, for example the Mercado Pago report or your bank statement. Before saving you will see how many transactions will be added.",
    impColFecha: "Date column",
    impColMonto: "Amount column",
    impColDetalle: "Description column (optional)",
    impNinguna: "— none —",
    impCuenta: "Account to save them in",
    impAvanzado: "Advanced options (if something isn't read well)",
    impSinClasifNombre: "Unclassified",
    impSinClasifIngreso: "Unclassified income",
    impBanco: "deposit from a bank (your own money, not income)",
    catSugTexto: "You don't have categories yet. You can start with a typical list and then delete or change what you don't use.",
    catSugBoton: "Load suggested categories",
    catSugGasto: "Food|Housing and rent|Utilities (power, gas, water, internet)|Transport and fuel|Health|Education|Taxes|Clothing|Going out and leisure|Home|Pets|Gifts|Other expenses",
    catSugIngreso: "Salary|Sales|Rent received|Other income",
    catSugOk: "Done: categories loaded.",
    impAyudaTitulo: "How do I download the Mercado Pago file?",
    impAyudaPasos: "In Mercado Pago: Reports → All transactions → New report. Pick the period and CSV format, then tap Generate. When it says \"New\", tap Download.",
    impTotales: "Income {i} · Expenses {g}",
    impRevisar: "Untick what you don't want to import:",
    impColCuenta: "Account column (optional)",
    impTransf: "possible transfer or refund (they cancel out)",
    impColCat: "Category column (optional)",
    impCatGasto: "Category for expenses",
    impCatIngreso: "Category for income",
    impInvertir: "Flip: positive amounts are expenses",
    impAyudaSigno: "Usually negative amounts are expenses and positive ones are income.",
    impResumen: "{n} to import · {d} already saved · {x} rows ignored",
    impElegir: "Choose file",
    impBoton: "Import {n} transactions",
    impErrArchivo: "I couldn't read that file. Try .xlsx or .csv.",
    impErrSinFilas: "I found no transactions in the file.",
    impSinCuenta: "First create an account in your base currency (Settings → Accounts).",
    impOk: "Done: {n} transactions imported.",
    impMuchas: "The file has more than {max} rows. Import only the first {max}.",
    impSinCat: "You need to create categories first (Settings → Categories).",
    textoExportar: "Download your movements in a file to open in Excel or Google Sheets. If you leave the dates empty, all of them are exported, from every month.",
    labelExportDesde: "From (optional)",
    labelExportHasta: "To (optional)",
    toastExportRangoInvalido: "The \"From\" date can't be after the \"To\" date.",
    toastExportSinMovs: "There are no movements in that period.",
    btnExcel: "📊 Export to Excel",
    btnCSV: "📄 Export to CSV",
    tituloZonaRiesgo: "Danger zone",
    textoZonaRiesgo: "This deletes your movements, accounts and categories to start fresh. Your user and password are not affected.",
    btnReiniciar: "🧹 Reset all my data",
    tituloEliminarCuenta: "Delete account",
    textoEliminarCuenta: "This permanently deletes your account and all your data. It can't be undone, and you'll need to create a new account if you want to use Ingasto again.",
    btnEliminarCuenta: "🗑️ Delete my account",
    ariaNuevoMov: "New movement",
    navMovimientos: "Movements",
    navAnalisis: "Analysis",
    navSituacion: "Overview",
    sitTitulo: "My situation",
    sitInicio: "Home",
    sitVolver: "Back",
    sitDebo: "I owe",
    sitMeDeben: "Owed to me",
    sitSeViene: "Coming up, month by month",
    sitVencido: "Overdue",
    sitProx7: "Next 7 days",
    sitMasAdelante: "Later",
    sitVerN: "See {n} ›",
    sitVerDetalle: "See details ›",
    sitVerMeses: "See months ›",
    sitTotal: "Total",
    sitNetoMes: "Month net",
    sitNadaGrupo: "Nothing in this group.",
    sitNadaPagar: "Nothing to pay",
    sitNadaCobrar: "Nothing to collect. To record money owed to you, add income with \"I'll get paid later\".",
    prTitulo: "Record a loan",
    prMeDeben: "Owed to me",
    prDebo: "I owe",
    prPersonaMeDeben: "Who did you lend to?",
    prPersonaDebo: "Who lent you money?",
    prAyudaMeDeben: "You lent money: it leaves one of your accounts and is recorded as owed to you.",
    prAyudaDebo: "You were lent money: it enters one of your accounts and is recorded as something you owe.",
    prMonto: "Amount",
    prCuentaSale: "Account the money comes from",
    prCuentaEntra: "Account the money goes into",
    prFechaDev: "Return date (optional)",
    prNota: "Note (optional)",
    prAviso: "It counts as neither expense nor income: it only moves money between your accounts and is recorded in Situation.",
    prErrPersona: "Write the person's name.",
    prErrMonto: "Enter an amount above zero.",
    prErrCuenta: "Choose an account.",
    prErrFechaDev: "The return date can't be before the loan date.",
    prToast: "Loan saved.",
    prToastDev: "Repayment saved.",
    prToastBorrado: "Deleted.",
    prSeccionMeDeben: "Money I lent",
    prSeccionDebo: "Money I was lent",
    prNada: "No pending loans.",
    prAtajoDebo: "➕ I borrowed money",
    prAtajoMeDeben: "➕ I lent money",
    prEnCuotas: "I pay it in installments (bank loan)",
    prCuotasN: "Number of installments",
    prCuotaValor: "Amount of each installment",
    prCuotaFecha: "Date of the first installment",
    prCuotaCat: "Category for the installments",
    prQuedo: "Did the money reach your account?",
    prQuedoSi: "Yes, it went into my account",
    prQuedoNo: "No, it was used directly (for example, to pay for a purchase)",
    prCuotasAyuda: "One pending installment is created per month; it shows in Pending and in I owe. The loan does not count as income.",
    prCuentaCuotas: "Account (where the money goes in and where you pay installments from)",
    prErrCuotas: "Enter a number of installments between 2 and 120.",
    prErrCuotaValor: "The installment amount must be greater than zero.",
    prErrCuotasMoneda: "For now, installment loans are only in your base currency. Pick an account in that currency.",
    prErrCuotasCat: "Pick a category for the installments.",
    prToastCuotas: "Loan recorded. {n} pending installments were created.",
    prSeccionCuotas: "Installment loans",
    prEstCuotas: "In installments",
    prCuotasDet: "The installments are in Pending (and in I owe). If you delete this loan, the installments already created stay: delete them separately from Transactions.",
    prRecibido: "Received",
    prAnotar: "➕ Record a loan",
    prBtnMeDeben: "They paid me back",
    prBtnDebo: "I paid back",
    prEstPendiente: "Pending",
    prEstParcial: "Partly repaid",
    prEstSaldado: "Settled",
    prSaldados: "Settled",
    prLinea: "Loans:",
    prDe: "of",
    prPrestado: "Loan total",
    prDevuelto: "Already repaid",
    prFalta: "Still to repay",
    prDesde: "Loan date",
    prDevoluciones: "Repayments",
    prSinDev: "No repayments yet.",
    prFormMeDeben: "Record that they paid me back",
    prFormDebo: "Record that I paid back",
    prCuentaDevMeDeben: "Account the money goes into",
    prCuentaDevDebo: "Account the money comes from",
    prBtnDev: "Record repayment",
    prAvisoDeMas: "If you get back more than you lent, record the difference separately as income.",
    prErrMasQueFalta: "It can't be more than what is left ({m}).",
    prBorrar: "🗑️ Delete this loan",
    prBorrarNo: "To delete this loan, first delete its repayments.",
    prConfBorrar: "Delete this loan? The money goes back to how it was in your accounts.",
    prConfBorrarPago: "Delete this repayment?",
    sitVacio: "You have no pending payments or collections. When you add something to pay or collect later, or an installment purchase, it will show up here, organized.",
    navConfig: "Settings",
    modalNuevoTitulo: "New movement",
    modalEditarTitulo: "Edit movement",
    ariaCerrarModal: "Close",
    ariaMostrarClave: "Show password",
    labelDiferidoGasto: "I'll pay this later",
    labelDiferidoIngreso: "I'll get paid later",
    labelFechaPagoGasto: "Date it will be paid",
    labelFechaPagoIngreso: "Date it will be received",
    labelYaPagadoGasto: "Mark as paid",
    labelYaPagadoIngreso: "Mark as received",
    errFaltaFechaPago: "The payment or collection date is missing.",
    labelCuotas: "Pay in installments",
    labelCantCuotas: "Number of installments",
    labelPrimeraCuota: "Date of the first installment",
    ayudaCuotas: "Enter the total of the purchase: the app splits it into equal parts. One installment is created per month and they stay pending until you mark them as paid.",
    labelMontoCuota: "Purchase total",
    vistaCuotas: "{n} installments of {c} = {t} total · first {p}, last {u}",
    vistaCuotaUlt: "The last installment is {l} (adjusts the cents).",
    textoCuota: "Installment",
    toastCuotas: "{n} installments created.",
    errCuotas: "Installments must be between 2 and 60.",
    errFechaPagoAnterior: "The payment date can't be earlier than the entry date.",
    pendTitulo: "⏳ Pending",
    pendPorPagar: "To pay",
    pendPorCobrar: "To receive",
    pendVencido: "overdue",
    pendResumenN: "{n} pending",
    pendVencidos: "overdue",
    pendVenceHoy: "due today",
    pendVenceEn: "due in",
    pendVencioHace: "overdue by",
    pendVenceEl: "due on",
    pendDia: "day",
    pendDias: "days",
    pendVer: "Show",
    pendOcultar: "Hide",
    pendMarcarPagado: "Mark as paid",
    pendMarcarCobrado: "Mark as received",
    toastMarcadoPagado: "Done, marked as paid.",
    toastMarcadoCobrado: "Done, marked as received.",
    ayudaCotizacion: "This account is in {c}. Enter how many {b} 1 {c} is worth.",
    cotizSugerida: "Use today's dollar: {v} (Banco Nación, selling)",
    errCotizacion: "Enter the exchange rate (it must be greater than zero).",
    avisoSinCotiz: "⚠ {n} entry(ies) in another currency have no exchange rate and are not included in the totals.",
    avisoDesfasados: "⚠ {n} entry(ies) belong to an account in another currency but are recorded in {b}. Edit them to enter the exchange rate.",
    sinCotizTag: "no rate",
    confirmCambioBase: "Changing your currency does not convert the entries you already logged. Continue?",
    ariaMonedaCuenta: "Account currency",
    errMonedaDatos: "Fill in the name, the 3-letter code and the symbol.",
    vacioMonedas: "You haven't added any custom currencies. The most common ones are already available to choose.",
    toastMonedaGuardada: "Saved.",
    toastPagadoDet: "Done: {d} · {m} marked as paid.",
    toastCobradoDet: "Done: {d} · {m} marked as received.",
    badgePendienteGasto: "⏳ to pay · {f}",
    badgePendienteIngreso: "⏳ to receive · {f}",
    badgeOrigenGasto: "↪ will be paid on {f}",
    badgeOrigenIngreso: "↪ will be received on {f}",
    badgeOrigenPagadoGasto: "↪ paid on {f}",
    badgeOrigenPagadoIngreso: "↪ received on {f}",
    badgeCerradoGasto: "✔ paid",
    badgeProgGasto: "Charged on {f}",
    badgeProgIngreso: "Credited on {f}",
    tituloProximas: "Upcoming",
    badgeCerradoIngreso: "✔ received",
    previstoLinea: "⏳ Month forecast (with what's pending): {b}",
    segGasto: "Expense",
    avisoVasACargarGasto: "📤 You're logging an EXPENSE",
    avisoVasACargarIngreso: "📥 You're logging INCOME",
    segIngreso: "Income",
    labelFecha: "Date",
    labelCuenta: "Account",
    labelCategoria: "Category",
    labelMonto: "Amount",
    labelDetalle: "Detail (optional)",
    placeholderDetalle: "E.g: Saturday groceries",
    btnCargarVoz: "🎙️ Voice entry (optional)",
    vozPTipo: "Type",
    vozPCuenta: "Account",
    vozPCat: "Category",
    vozPCotiz: "Exchange rate",
    vozPMonto: "Amount",
    vozPDetalle: "Detail",
    vozQTipo: "Is it an expense or income?",
    vozQCuenta: "Which account?",
    vozQCat: "Which category?",
    vozQCotiz: "What exchange rate? Say the number.",
    vozQMonto: "What is the amount?",
    vozQDetalle: "What is the detail? (you can skip it)",
    vozPaso: "Step {n} of {total}",
    vozListoTitulo: "All filled in!",
    vozListoPreg: "Review and save",
    vozToque: "Tap the microphone and speak, or pick below.",
    vozEscuchando: "🔴 Listening…",
    vozNoEntendi: "Couldn't read that. Say it again or type it.",
    vozFraseBtn: "🎙️ Say it all at once",
    vozFraseEj: "Example: “I spent 32 thousand at the supermarket on my Visa, in 3 installments”. Then you review and save.",
    vozFraseNada: "I didn't catch the amount. Try again or go step by step.",
    vozFraseListo: "Check the details and fill in what is missing.",
    monedaIniTitulo: "Hi! Welcome to Ingasto",
    monedaIniPreg: "To get started, what currency do your accounts use?",
    monedaIniOtras: "See other currencies",
    monedaIniSeguir: "Continue",
    monedaIniNota: "You can change it later in Settings.",
    vozNoTipo: "Couldn't tell expense from income. Say “gasto” or “ingreso”, or tap a button.",
    vozNoEscuche: "I heard nothing. Tap the microphone and speak right away.",
    vozMicBloq: "The microphone is blocked for this page. Check your browser permissions.",
    vozSinSoporte: "This browser has no voice support. Try Chrome, or type it.",
    vozNoPude: "Couldn't listen.",
    vozDeshacer: "↩ Undo",
    vozOmitir: "Skip detail",
    vozSeguir: "Next",
    vozGuardar: "Save entry",
    vozRevisar: "Edit in the form",
    vozCerrarAria: "Close voice entry",
    vozTitulo: "Voice entry",
    vozMicAria: "Speak",
    vozCual: "More than one looks similar. Which one?",
    vozAddDif: "⏳ I'll pay it later",
    vozAddCuotas: "🗓️ Pay in instalments",
    vozQuitar: "Remove this",
    vozPDif: "Pay later",
    vozPFechaPago: "Payment date",
    vozPCuotas: "Instalments",
    vozPCuotaN: "How many",
    vozPCuotaF: "1st instalment",
    vozQDif: "Will you pay it later? Say “sí” or “no”.",
    vozQFechaPago: "When will you pay? Say for example “el 15” or “en 10 días”.",
    vozQCuotas: "Pay in instalments? Say “sí” or “no”.",
    vozQCuotaN: "How many instalments?",
    vozQCuotaF: "When is the first instalment due?",
    vozSi: "Yes",
    vozNo: "No",
    vozNoSiNo: "Couldn't tell. Say “sí” or “no”, or tap a button.",
    vozNoCuotas: "Instalments go from 2 to 60.",
    btnVozChico: "🎙️ Voice",
    btnResponder: "🎤 Answer",
    btnRepetir: "↻ Repeat",
    btnSeguir: "✓ Next",
    btnBorrar: "Delete",
    btnGuardarMov: "Save",
    avisoFaltaNombreCategoria: "Type a name for the category before adding it.",
  },
};

function t(clave) {
  return (TRADUCCIONES[idiomaActual] && TRADUCCIONES[idiomaActual][clave]) || TRADUCCIONES.es[clave] || clave;
}

function aplicarIdioma(idioma) {
  if (!TRADUCCIONES[idioma]) idioma = "es";
  idiomaActual = idioma;
  document.documentElement.lang = idioma;
  try { localStorage.setItem("fs_idioma", idioma); } catch {} if (typeof marcarIdiomaLogin === "function") marcarIdiomaLogin();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  document.querySelectorAll(".selector-idioma").forEach((sel) => {
    sel.value = idioma;
  });

  actualizarTextosDinamicosIdioma();
}

// Textos que se generan por código (no están fijos en el HTML) y hay
// que actualizar a mano cada vez que cambia el idioma.
function actualizarTextosDinamicosIdioma() {
  mostrarFechaHoy();
  // Botones de login, si está en modo registro
  if ($("btnIngresar") && $("btnMostrarRegistro")) {
    $("btnIngresar").textContent = modoRegistro ? t("btnCrearCuentaSubmit") : t("btnEntrar");
    $("btnMostrarRegistro").textContent = modoRegistro ? t("btnYaTengoCuenta") : t("btnCrearCuenta");
  }
  if ($("bloqueNuevoTitulo")) $("bloqueNuevoTitulo").hidden = !!modoRegistro;
  if ($("labelClaveConfirmar")) {
    $("labelClaveConfirmar").hidden = !modoRegistro;
    $("inputClaveConfirmar").required = modoRegistro;
    if (!modoRegistro) $("inputClaveConfirmar").value = "";
  }
  // Textos de "pago después" y de pendientes, si ya hay sesión iniciada
  actualizarTextosDiferido();
  if (usuario) {
    renderPendientes();
    renderMovimientos();
    renderResumen();
  }
  // Título del modal de movimiento, según si se está editando o no
  const modalTitulo = $("modalTitulo");
  if (modalTitulo) {
    const editando = !!$("movId")?.value;
    modalTitulo.textContent = editando ? t("modalEditarTitulo") : t("modalNuevoTitulo");
  }
  // Accesos simples (Todo/Ingresos/Gastos) y botón de buscar, si ya existen
  const segTipoLista = $("segmentadoTipoLista");
  if (segTipoLista) {
    const btns = segTipoLista.querySelectorAll(".segmentado-item");
    if (btns[0]) btns[0].textContent = t("accesoTodo");
    if (btns[1]) btns[1].textContent = t("accesoIngresos");
    if (btns[2]) btns[2].textContent = t("accesoGastos");
  }
  const btnBuscarSimple = $("btnBuscarSimple");
  if (btnBuscarSimple) {
    const input = $("textoBusqueda");
    const filaOculta = input ? (input.closest("div") || input.parentElement).hidden : true;
    botonAcceso(btnBuscarSimple, "buscar", filaOculta ? t("accBuscar") : t("accCerrar"));
  }
  if ($("btnClasificar")) botonAcceso($("btnClasificar"), "clasificar", modoClasificar ? t("accTerminar") : t("accClasificar"));
}

// ---------- Utilidades ----------
function moneda() { return perfil?.moneda || "$"; }

// Montos: sin ",00" cuando son redondos; con centavos solo si los tienen.
function decimalesDe(n) {
  return Math.round(Math.abs(Number(n)) * 100) % 100 === 0 ? 0 : 2;
}
// Monto sin centavos, con el número completo (para resúmenes en una línea).
function formatoMontoEntero(n) {
  return moneda() + " " + Math.round(Number(n)).toLocaleString("es-AR");
}
function formatoMonto(n) {
  const d = decimalesDe(n);
  return moneda() + " " + Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
}

// ---------- Monedas ----------
// Cada movimiento se guarda en la moneda de su cuenta, con la cotización de ese día
// (cuánto vale 1 de esa moneda en la moneda base). Los totales se arman convirtiendo
// cada movimiento con su propia cotización.
const CATALOGO_MONEDAS = [
  { codigo: "ARS", simbolo: "$", n: { es: "Peso argentino", pt: "Peso argentino", en: "Argentine peso" } },
  { codigo: "USD", simbolo: "US$", n: { es: "Dólar estadounidense", pt: "Dólar americano", en: "US dollar" } },
  { codigo: "EUR", simbolo: "€", n: { es: "Euro", pt: "Euro", en: "Euro" } },
  { codigo: "BRL", simbolo: "R$", n: { es: "Real brasileño", pt: "Real brasileiro", en: "Brazilian real" } },
  { codigo: "UYU", simbolo: "$U", n: { es: "Peso uruguayo", pt: "Peso uruguaio", en: "Uruguayan peso" } },
  { codigo: "CLP", simbolo: "CLP$", n: { es: "Peso chileno", pt: "Peso chileno", en: "Chilean peso" } },
  { codigo: "MXN", simbolo: "MX$", n: { es: "Peso mexicano", pt: "Peso mexicano", en: "Mexican peso" } },
  { codigo: "COP", simbolo: "COL$", n: { es: "Peso colombiano", pt: "Peso colombiano", en: "Colombian peso" } },
  { codigo: "PEN", simbolo: "S/", n: { es: "Sol peruano", pt: "Sol peruano", en: "Peruvian sol" } },
  { codigo: "PYG", simbolo: "₲", n: { es: "Guaraní", pt: "Guarani", en: "Paraguayan guaraní" } },
  { codigo: "BOB", simbolo: "Bs", n: { es: "Boliviano", pt: "Boliviano", en: "Bolivian boliviano" } },
  { codigo: "GBP", simbolo: "£", n: { es: "Libra esterlina", pt: "Libra esterlina", en: "Pound sterling" } },
];
let monedasUsuario = [];

function monedaBase() { return perfil?.moneda_base || "ARS"; }

function todasLasMonedas() {
  const lista = CATALOGO_MONEDAS.map((m) => ({ codigo: m.codigo, simbolo: m.simbolo, nombre: m.n[idiomaActual] || m.n.es }));
  monedasUsuario.forEach((m) => {
    const cod = String(m.codigo || "").toUpperCase();
    if (cod && !lista.some((x) => x.codigo === cod)) lista.push({ codigo: cod, simbolo: m.simbolo || cod, nombre: m.nombre || cod });
  });
  return lista;
}

function simboloDe(codigo) {
  if (codigo === monedaBase()) return moneda();
  return todasLasMonedas().find((m) => m.codigo === codigo)?.simbolo || codigo;
}

function opcionesMonedas(seleccionada, corto) {
  return todasLasMonedas().map((m) =>
    `<option value="${escapeHTML(m.codigo)}"${m.codigo === seleccionada ? " selected" : ""}>${escapeHTML(corto ? m.codigo + " (" + m.simbolo + ")" : m.codigo + " · " + m.nombre + " (" + m.simbolo + ")")}</option>`
  ).join("");
}

function monedaDeCuentaNombre(nombre) {
  const c = cuentas.find((x) => x.nombre === nombre);
  return (c && c.moneda) || monedaBase();
}
function monedaDeMov(m) { return m.moneda || monedaDeCuentaNombre(m.cuenta); }
function cotizDeMov(m) {
  if (monedaDeMov(m) === monedaBase()) return 1;
  const c = Number(m.cotizacion);
  return c > 0 ? c : null;
}
// Monto del movimiento convertido a la moneda base (0 si falta la cotización: se avisa aparte).
function montoBase(m) {
  const c = cotizDeMov(m);
  return c === null ? 0 : Number(m.monto) * c;
}
function formatoNum(n) {
  const d = decimalesDe(n);
  return Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
}
function formatoMontoMov(m) { return simboloDe(monedaDeMov(m)) + " " + formatoNum(m.monto); }
function equivMovHTML(m) {
  if (monedaDeMov(m) === monedaBase()) return "";
  const c = cotizDeMov(m);
  return `<div class="mov-equiv">${c === null ? escapeHTML(t("sinCotizTag")) : "≈ " + escapeHTML(formatoMonto(Number(m.monto) * c))}</div>`;
}

function leerCotiz() { try { return JSON.parse(localStorage.getItem("fs_cotiz") || "{}"); } catch { return {}; } }
function guardarCotiz(cod, v) { try { const o = leerCotiz(); o[cod] = v; localStorage.setItem("fs_cotiz", JSON.stringify(o)); } catch {} }

function avisoMonedasHTML() {
  const todos = [...movimientos, ...pendientes.filter((p) => !movimientos.some((m) => m.id === p.id))];
  let sin = 0, desfasados = 0;
  todos.forEach((m) => {
    const cod = monedaDeMov(m);
    if (cod !== monedaBase()) { if (cotizDeMov(m) === null) sin++; }
    else if (monedaDeCuentaNombre(m.cuenta) !== monedaBase()) desfasados++;
  });
  let h = "";
  if (sin) h += `<div>${escapeHTML(t("avisoSinCotiz").replace("{n}", sin))}</div>`;
  if (desfasados) h += `<div>${escapeHTML(t("avisoDesfasados").replace("{n}", desfasados).replace("{b}", simboloDe(monedaBase())))}</div>`;
  return h;
}
function renderAvisoMonedas() {
  const el = $("avisoMonedas");
  if (!el) return;
  const h = avisoMonedasHTML();
  el.innerHTML = h;
  el.hidden = !h;
}

function formatoFecha(str) {
  const [y, m, d] = str.split("-");
  return `${d}/${m}/${y}`;
}

function nombreMes(fecha) {
  const locale = LOCALES_POR_IDIOMA[idiomaActual] || "es-AR";
  const texto = fecha.toLocaleString(locale, { month: "long", year: "numeric" });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Fecha de hoy en la barra superior, en el idioma elegido.
const LOCALES_POR_IDIOMA = { es: "es-AR", pt: "pt-BR", en: "en-US" };
function mostrarFechaHoy() {
  const el = $("fechaHoy");
  if (!el) return;
  const locale = LOCALES_POR_IDIOMA[idiomaActual] || "es-AR";
  const texto = new Date().toLocaleDateString(locale, {
    weekday: "short", day: "numeric", month: "short",
  }).replace(/\./g, "");
  const hoy = { es: "Hoy", pt: "Hoje", en: "Today" }[idiomaActual] || "Hoy";
  el.textContent = hoy + ": " + texto;
}

// Da formato de miles mientras se escribe un importe: 1000000,5 -> 1.000.000,5
function formatearImporteEscrito(texto) {
  let s = String(texto || "");
  // Un punto escrito al final (teclado sin coma) se toma como coma decimal.
  if (/\.$/.test(s) && !s.includes(",")) s = s.slice(0, -1) + ",";
  // 27.19 o 82.9 (un solo punto y 1 o 2 dígitos después): es decimal, no miles.
  if (/^\s*\d+\.\d{1,2}\s*$/.test(s)) s = s.replace(".", ",");
  s = s.replace(/[^\d,]/g, "");
  const i = s.indexOf(",");
  let entero = i === -1 ? s : s.slice(0, i);
  let decimal = i === -1 ? null : s.slice(i + 1).replace(/,/g, "").slice(0, 2);
  entero = entero.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimal === null ? entero : entero + "," + decimal;
}

function activarFormatoImporte(input) {
  if (!input) return;
  input.addEventListener("input", () => {
    const formateado = formatearImporteEscrito(input.value);
    if (formateado !== input.value) input.value = formateado;
  });
}

function numeroDesdeTexto(txt) {
  let t = String(txt || "").trim();
  // 27.19 o 82.9 (un solo punto y 1 o 2 dígitos después, sin coma): es decimal, no miles.
  if (/^\d+\.\d{1,2}$/.test(t)) return Number(t);
  t = t.replace(/\./g, "").replace(",", ".");
  return Number(t);
}

function mostrarToast(msg, ms) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.hidden = true; }, ms || 2600);
}

function mostrarAviso(el, msg) {
  // En la pantalla de acceso, un aviso nuevo reemplaza al anterior (no quedan el rojo y el verde juntos).
  if (el.id === "loginError") $("loginOk").hidden = true;
  if (el.id === "loginOk") $("loginError").hidden = true;
  el.textContent = msg;
  el.hidden = false;
}
function ocultarAviso(el) { el.hidden = true; }

// ============================================================
// LOGIN / REGISTRO
// ============================================================
// Si viene de "Probar gratis" (?registro=1), arranca directo en el formulario de alta.
let modoRegistro = new URLSearchParams(location.search).get("registro") === "1";

// Evita pedir mails seguidos por toques repetidos: 60 s de espera por email.
// (Es una ayuda para el usuario; el límite real contra abusos lo pone Supabase.)
const ENVIO_MAIL_ESPERA_MS = 60000;
const ultimosEnviosMail = {};
let emailPendienteConfirmar = "";
function segundosParaPedirMail(email) {
  const ultimo = ultimosEnviosMail[email.toLowerCase()] || 0;
  const resta = ENVIO_MAIL_ESPERA_MS - (Date.now() - ultimo);
  return resta > 0 ? Math.ceil(resta / 1000) : 0;
}
function anotarEnvioMail(email) { ultimosEnviosMail[email.toLowerCase()] = Date.now(); }
function avisarEsperaMail(email, segundos) {
  mostrarAviso($("loginOk"), "Ya te enviamos un mail a " + email + " hace un momento. Esperá " + segundos + " segundos antes de pedir otro, y revisá también la carpeta Spam.");
}

// Antes de loguearse, aplicamos el último idioma usado en este dispositivo
// (o español por defecto) para que la pantalla de login también se vea traducida.
try {
  aplicarIdioma(localStorage.getItem("fs_idioma") || "es");
} catch {
  aplicarIdioma("es");
}

// Botón "ojito" para mostrar/ocultar cualquier campo de clave
document.querySelectorAll(".btn-ojito").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = $(btn.dataset.target);
    if (!input) return;
    const mostrando = input.type === "text";
    input.type = mostrando ? "password" : "text";
    btn.innerHTML = svgIcono(mostrando ? "ojo" : "ojoOff");
  });
});

function marcarIdiomaLogin() {
  const s = $("selectIdiomaLogin");
  if (s) s.value = idiomaActual;
}
if ($("selectIdiomaLogin")) {
  $("selectIdiomaLogin").addEventListener("change", (e) => {
    aplicarIdioma(e.target.value);
    try { localStorage.setItem("fs_idioma_eleg", "1"); } catch {}
    marcarIdiomaLogin();
  });
}
marcarIdiomaLogin();

$("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarAviso($("loginError"));
  ocultarAviso($("loginOk"));
  $("btnReenviarConfirmacion").hidden = true;
  const email = $("inputEmail").value.trim();
  const clave = $("inputClave").value;
  const btn = $("btnIngresar");
  btn.disabled = true;
  // Se decide dónde guardar la sesión ANTES de entrar (ver almacenSesion en supabaseClient.js)
  try { localStorage.setItem(CLAVE_RECORDAR_SESION, $("chkRecordar").checked ? "1" : "0"); } catch (_) {}

  try {
    if (modoRegistro) {
      const claveConfirmar = $("inputClaveConfirmar").value;
      if (clave !== claveConfirmar) {
        throw { message: "Las claves no coinciden." };
      }
      const espera = segundosParaPedirMail(email);
      if (espera) {
        emailPendienteConfirmar = email;
        $("btnReenviarConfirmacion").hidden = false;
        avisarEsperaMail(email, espera);
        return;
      }
      const resultado = await registrarUsuario(email, clave);
      // Si el mail ya tenía cuenta, Supabase no da error ni manda mail: devuelve un usuario
      // sin "identities". Se avisa en vez de decir que se envió un mail que nunca llega.
      if (resultado?.user && Array.isArray(resultado.user.identities) && resultado.user.identities.length === 0) {
        modoRegistro = false;
        $("inputClave").value = "";
        $("inputClaveConfirmar").value = "";
        actualizarTextosDinamicosIdioma();
        mostrarAviso($("loginError"), "Ese email ya tiene una cuenta. Probá entrar con tu clave, o tocá “Olvidé mi clave”.");
        return;
      }
      // Si Supabase pide confirmar el mail, no llega una sesión activa todavía.
      if (resultado?.user && !resultado.session) {
        anotarEnvioMail(email);
        emailPendienteConfirmar = email;
        mostrarAviso($("loginOk"), "¡Casi! Te enviamos un mail a " + email + " para confirmar tu cuenta. Abrilo y tocá el link antes de entrar.");
        $("btnReenviarConfirmacion").hidden = false;
      } else {
        mostrarAviso($("loginOk"), "Cuenta creada. Ya podés entrar con tu email y clave.");
      }
      modoRegistro = false;
      $("formLogin").reset();
      actualizarTextosDinamicosIdioma();
    } else {
      const resultadoLogin = await iniciarSesion(email, clave);
      try { localStorage.setItem("ingasto_ultima_actividad", String(Date.now())); } catch (_) {}
      await arrancarApp(resultadoLogin?.user);
    }
  } catch (err) {
    mostrarAviso($("loginError"), err?.message === "Las claves no coinciden." ? err.message : traducirErrorAuth(err));
    // Si todavía no confirmó la cuenta, le ofrecemos reenviar el mail.
    if (!modoRegistro && String(err?.message || "").toLowerCase().includes("email not confirmed")) {
      emailPendienteConfirmar = email;
      $("btnReenviarConfirmacion").hidden = false;
    }
  } finally {
    btn.disabled = false;
  }
});

$("btnMostrarRegistro").addEventListener("click", () => {
  modoRegistro = !modoRegistro;
  ocultarAviso($("loginError"));
  ocultarAviso($("loginOk"));
  $("btnReenviarConfirmacion").hidden = true;
  actualizarTextosDinamicosIdioma();
});

$("btnReenviarConfirmacion").addEventListener("click", async () => {
  const email = emailPendienteConfirmar;
  if (!email) return;
  const espera = segundosParaPedirMail(email);
  if (espera) return avisarEsperaMail(email, espera);
  try {
    await reenviarConfirmacion(email);
    anotarEnvioMail(email);
    mostrarAviso($("loginOk"), "Te lo mandamos de nuevo a " + email + ". Revisá también la carpeta Spam.");
  } catch (err) {
    mostrarAviso($("loginError"), traducirErrorAuth(err));
  }
});

$("btnOlvideClave").addEventListener("click", async () => {
  const email = $("inputEmail").value.trim();
  $("btnReenviarConfirmacion").hidden = true;
  if (!email) return mostrarAviso($("loginError"), t("loginEmailPrimero"));
  const espera = segundosParaPedirMail(email);
  if (espera) return avisarEsperaMail(email, espera);
  try {
    await enviarRecuperacionClave(email);
    anotarEnvioMail(email);
    mostrarAviso($("loginOk"), "Te enviamos un email para restablecer tu clave.");
  } catch (err) {
    mostrarAviso($("loginError"), traducirErrorAuth(err));
  }
});

// ============================================================
// RECUPERACIÓN DE CLAVE: cuando el usuario toca el link del mail,
// Supabase dispara el evento PASSWORD_RECOVERY. Mostramos una
// pantalla para que cargue su clave nueva.
// ============================================================
function mostrarPantallaNuevaClave() {
  $("pantallaLogin").hidden = true;
  $("app").hidden = true;
  $("pantallaNuevaClave").hidden = false;
}

sbClient.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") {
    mostrarPantallaNuevaClave();
  }
});

// Por si el evento no llega a tiempo, también nos guiamos por la URL.
if (/type=recovery/.test(location.hash)) {
  mostrarPantallaNuevaClave();
}

if ($("formNuevaClave")) {
  $("formNuevaClave").addEventListener("submit", async (e) => {
    e.preventDefault();
    ocultarAviso($("nuevaClaveError"));
    ocultarAviso($("nuevaClaveOk"));
    const nueva = $("inputNuevaClave").value;
    try {
      const { error } = await sbClient.auth.updateUser({ password: nueva });
      if (error) throw error;
      mostrarAviso($("nuevaClaveOk"), "Tu clave se actualizó. Ya podés entrar con la nueva.");
      $("formNuevaClave").reset();
      setTimeout(() => { location.href = location.origin + location.pathname; }, 2500);
    } catch (err) {
      mostrarAviso($("nuevaClaveError"), traducirErrorAuth(err));
    }
  });
}

// ============================================================
// CAMBIAR CLAVE (desde adentro de Config, con sesión ya iniciada)
// ============================================================
if ($("formCambiarClave")) {
  $("formCambiarClave").addEventListener("submit", async (e) => {
    e.preventDefault();
    ocultarAviso($("cambiarClaveError"));
    ocultarAviso($("cambiarClaveOk"));
    const nueva = $("inputCambiarClaveNueva").value;
    const repetir = $("inputCambiarClaveRepetir").value;
    if (nueva !== repetir) {
      return mostrarAviso($("cambiarClaveError"), "Las claves no coinciden.");
    }
    try {
      const { error } = await sbClient.auth.updateUser({ password: nueva });
      if (error) throw error;
      mostrarAviso($("cambiarClaveOk"), "Tu clave se actualizó correctamente.");
      $("formCambiarClave").reset();
    } catch (err) {
      mostrarAviso($("cambiarClaveError"), traducirErrorAuth(err));
    }
  });
}

if ($("btnSalirTop")) $("btnSalirTop").addEventListener("click", () => $("btnSalir").click());
$("btnSalir").addEventListener("click", async () => {
  // Pedir confirmacion: evita salir de la app por un toque sin querer.
  if (!window.confirm(t("confirmarSalir"))) return;
  await cerrarSesion();
  location.reload();
});

if ($("btnSalirPruebaVencida")) {
  $("btnSalirPruebaVencida").addEventListener("click", async () => {
    await cerrarSesion();
    location.reload();
  });
}

// ============================================================
// ARRANQUE DE LA APP (después de login)
// ============================================================
// Cuántos días de prueba gratis tiene cada usuario nuevo.
const DIAS_DE_PRUEBA = 25;
// Reinicio de la prueba (18/11/2026): a todos los que se registraron antes de esta fecha
// se les cuentan los 25 días desde acá. Debe coincidir con `trial_vigente()` en Supabase y con panel.html.
const REINICIO_PRUEBA = new Date("2026-11-18T03:00:00Z").getTime();

// Plan pago vigente: activo y, si tiene fecha de vencimiento, que no haya pasado.
// Sin fecha (plan_vence vacío) = sin vencimiento (cuentas activadas a mano).
function planVigente() {
  if (!perfil?.plan_activo) return false;
  if (!perfil.plan_vence) return true;
  return new Date(perfil.plan_vence).getTime() > Date.now();
}

function pruebaVencida() {
  if (planVigente()) return false; // ya pagó y sigue al día, no hay bloqueo
  if (!usuario?.created_at) return false; // por las dudas, no bloqueamos si no sabemos la fecha
  const creado = Math.max(new Date(usuario.created_at).getTime(), REINICIO_PRUEBA);
  const dias = (Date.now() - creado) / (1000 * 60 * 60 * 24);
  return dias > DIAS_DE_PRUEBA;
}

// Red de seguridad del cobro: le preguntamos a la función "verificar-pago"
// si el mail de esta cuenta tiene un pago aprobado en Mercado Pago. Así el
// acceso no depende de que llegue el aviso automático (webhook).
let verificandoPago = false;
let yaVerificoPagoAlAbrir = false;
async function verificarPago(silencioso) {
  if (verificandoPago) return false;
  verificandoPago = true;
  const msg = $("msgVerificarPago");
  const btn = $("btnVerificarPago");
  if (btn) btn.disabled = true;
  if (!silencioso && msg) {
    msg.textContent = t("verificandoPago");
    msg.hidden = false;
  }
  try {
    const { data, error } = await sbClient.functions.invoke("verificar-pago");
    if (!error && data?.ok) {
      verificandoPago = false;
      await arrancarApp(usuario);
      return true;
    }
  } catch {
    // se informa abajo, igual que si no hubiera pago
  }
  if (!silencioso && msg) {
    msg.textContent = t("pagoNoEncontrado");
    msg.hidden = false;
  }
  verificandoPago = false;
  if (btn) btn.disabled = false;
  return false;
}

if ($("btnVerificarPago")) {
  $("btnVerificarPago").addEventListener("click", () => verificarPago(false));
}

async function arrancarApp(usuarioYaObtenido) {
  usuario = usuarioYaObtenido || (await usuarioActual());
  if (!usuario) return;
  if (revisarInactividad()) return;   // pasó mucho tiempo sin usar la app: se pide la clave de nuevo
  anotarActividad(true);

  try {
    perfil = await obtenerPerfil(usuario.id);
  } catch {
    perfil = { moneda: "$" };
  }

  if (pruebaVencida()) {
    $("pantallaLogin").hidden = true;
    $("app").hidden = true;
    $("pantallaPruebaVencida").hidden = false;
    // Si ya pagó pero el aviso de Mercado Pago no llegó, lo chequeamos solos.
    if (!yaVerificoPagoAlAbrir) {
      yaVerificoPagoAlAbrir = true;
      verificarPago(true);
    }
    return;
  }

  $("pantallaLogin").hidden = true;
  $("pantallaPruebaVencida").hidden = true;
  $("app").hidden = false;
  $("inputMoneda").value = moneda();
  let idiomaEntrada = perfil?.idioma || localStorage.getItem("fs_idioma") || "es";
  try {
    // Si eligió idioma en la pantalla de entrada, esa elección manda y se guarda en la cuenta
    if (localStorage.getItem("fs_idioma_eleg") === "1") {
      localStorage.removeItem("fs_idioma_eleg");
      const elegido = localStorage.getItem("fs_idioma");
      if (elegido && TRADUCCIONES[elegido] && elegido !== idiomaEntrada) {
        idiomaEntrada = elegido;
        try { await actualizarIdioma(usuario.id, elegido); if (perfil) perfil.idioma = elegido; } catch {}
      }
    }
  } catch {}
  aplicarIdioma(idiomaEntrada);
  if ($("selectIdioma")) $("selectIdioma").value = idiomaActual;

  // Estas dos cargas no dependen una de la otra (los movimientos ya
  // traen el nombre de categoría/cuenta como texto), así que las
  // pedimos en paralelo en vez de una detrás de la otra: reduce
  // bastante el tiempo de arranque, sobre todo con conexión lenta.
  try {
    let monedaIni = null;
    if (await necesitaDatosIniciales(usuario.id)) {
      // Primera vez: se elige la moneda y queda como base de sus cuentas
      monedaIni = await elegirMonedaInicial();
      const simboloIni = (CATALOGO_MONEDAS.find((m) => m.codigo === monedaIni) || {}).simbolo || monedaIni;
      try {
        await actualizarMonedaBase(usuario.id, monedaIni);
        await actualizarMoneda(usuario.id, simboloIni);
        if (perfil) { perfil.moneda_base = monedaIni; perfil.moneda = simboloIni; }
        $("inputMoneda").value = simboloIni;
      } catch {}
    }
    await sembrarDatosInicialesSiHaceFalta(usuario.id, idiomaActual, monedaIni);
  } catch {}
  await Promise.all([cargarCuentasYCategorias(), cargarMesActual()]);
  generarFijosDelMes().catch(() => {});
  bienvenidaSiCorresponde();
  sondearComprobantes().then((ok) => { comprobantesDisponible = ok; fotoUI(); });
  suscribirActualizacionEnVivo();
  arrancarLatidoDeRespaldo();
}

// Latido de respaldo: además de la conexión en vivo, cada 30 segundos
// (mientras la pantalla esté visible) volvemos a pedir los datos del
// mes. Es la misma idea que tenía la versión anterior de la app: así,
// aunque la conexión en vivo falle silenciosamente en algún momento,
// nunca se pasan más de unos segundos sin ver lo último.
let latidoDeRespaldo = null;
function arrancarLatidoDeRespaldo() {
  clearInterval(latidoDeRespaldo);
  latidoDeRespaldo = setInterval(() => {
    if (!usuario || !$("app") || $("app").hidden || document.hidden) return;
    cargarMesActual().catch(() => {});
  }, 30000);
}

// ============================================================
// ACTUALIZACIÓN EN VIVO: cuando se guarda un movimiento, cuenta o
// categoría (desde este dispositivo o cualquier otro), Supabase
// nos avisa al instante y refrescamos, sin tener que preguntar
// "¿hay algo nuevo?" cada tanto.
// ============================================================
let canalActualizacionEnVivo = null;

function suscribirActualizacionEnVivo(forzarReconexion) {
  // Si ya hay una conexión y no estamos forzando, no duplicamos.
  // Si estamos forzando (por ejemplo, al volver de background después
  // de un rato largo), tiramos la conexión vieja -que puede haber
  // quedado cortada sin avisar- y abrimos una nueva.
  if (canalActualizacionEnVivo) {
    if (!forzarReconexion) return;
    sbClient.removeChannel(canalActualizacionEnVivo);
    canalActualizacionEnVivo = null;
  }
  canalActualizacionEnVivo = sbClient
    .channel("cambios-" + usuario.id)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "movimientos", filter: `user_id=eq.${usuario.id}` },
      () => cargarMesActual()
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "cuentas", filter: `user_id=eq.${usuario.id}` },
      () => cargarCuentasYCategorias()
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "categorias", filter: `user_id=eq.${usuario.id}` },
      () => cargarCuentasYCategorias()
    )
    .subscribe();
}

// Red de seguridad: si por lo que sea el mensaje en vivo no llega
// (por ejemplo, el celu estuvo sin señal y se reconectó), al volver
// a la pestaña igual refrescamos una vez.
async function actualizarDatosSiCorresponde() {
  if (!usuario || !$("app") || $("app").hidden) return;
  mostrarFechaHoy();
  suscribirActualizacionEnVivo(true);
  try {
    await cargarMesActual();
  } catch {}
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") actualizarDatosSiCorresponde();
});
window.addEventListener("focus", actualizarDatosSiCorresponde);

async function cargarCuentasYCategorias() {
  [cuentas, categorias, monedasUsuario] = await Promise.all([
    listarCuentas(usuario.id),
    listarCategorias(usuario.id),
    listarMonedas(usuario.id).catch(() => []),
  ]);
  renderMonedasConfig();
  renderCuentasConfig();
  renderCategoriasConfig();
  renderSelects();
}

async function cargarMesActual() {
  const [delMes, losPendientes, lasTransf] = await Promise.all([
    listarMovimientosDelMes(usuario.id, fechaVista.getFullYear(), fechaVista.getMonth()),
    listarPendientes(usuario.id),
    listarTransferencias(usuario.id).catch(() => []),
  ]);
  movimientos = delMes;
  const claveVista = claveMesVista();
  transferenciasMes = Array.isArray(lasTransf) ? lasTransf.filter((x) => mesClave(x.fecha) === claveVista) : [];
  pendientes = losPendientes;
  renderResumen();
  renderPendientes();
  renderMovimientos();
  await renderVistaAnalisis();
  if (subVistaAnalisis === "diaadia") renderDiaADia();
  if (vistaActiva === "vistaSituacion") cargarTengo().then(tengoRefrescarVista);
  // Si está abierta la pantalla "Compras en cuotas", que siga el mes que se está mirando
  if ($("configPanelCuotas") && !$("configPanelCuotas").hidden) renderCuotas();
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
// ---- Boton "atras" del celu ----
// Cada pantalla que se abre "encima" (ventana de movimiento, panel de
// Ajustes, otra pestania) guarda un paso en el historial. Asi el boton
// atras del celu cierra esa pantalla en vez de sacar al usuario de la app.
let saltarPop = 0;

function guardarPasoAtras(nombre) {
  try { history.pushState({ fs: nombre }, ""); } catch (e) {}
}

function volverUnPaso(nombre) {
  // Se usa cuando la pantalla se cierra con un boton de la app (X, Volver):
  // se retira el paso guardado para que no quede uno de mas.
  if (history.state && history.state.fs === nombre) {
    saltarPop++;
    history.back();
  }
}

function irAVista(id) {
  document.querySelectorAll(".navbar-item").forEach((b) => {
    b.classList.toggle("activo", b.dataset.vista === id);
  });
  document.querySelectorAll(".vista").forEach((v) => (v.hidden = true));
  vistaActiva = id;
  $(vistaActiva).hidden = false;
  // En "Mi situación" y en Ajustes no corresponde el selector de mes ni el resumen del mes.
  $("app").classList.toggle("modo-situacion", id === "vistaSituacion" || id === "vistaConfig");
}

function volverAlMenuConfig() {
  document.querySelectorAll(".config-panel").forEach((p) => (p.hidden = true));
  const menu = $("configMenu");
  if (menu) menu.hidden = false;
}

window.addEventListener("popstate", () => {
  if (saltarPop > 0) { saltarPop--; return; }
  const modal = $("modalFondo");
  if (modal && !modal.hidden) { modal.hidden = true; return; }
  if (document.querySelector(".config-panel:not([hidden])")) { volverAlMenuConfig(); return; }
  if (vistaActiva !== "vistaMovimientos") irAVista("vistaMovimientos");
});

document.querySelectorAll(".navbar-item[data-vista]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const destino = btn.dataset.vista;
    if (destino === vistaActiva) return;
    if (destino !== "vistaMovimientos" && vistaActiva === "vistaMovimientos") guardarPasoAtras("vista");
    else if (destino === "vistaMovimientos") volverUnPaso("vista");
    if (destino === "vistaSituacion") { sitReiniciar(); cargarTengo().then(tengoRefrescarVista); }
    irAVista(destino);
  });
});

// ============================================================
// NAVEGACIÓN ENTRE TARJETAS DE CONFIG (Idioma, Moneda, Cuentas, etc.)
// ============================================================
document.querySelectorAll(".config-tarjeta").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panelId = btn.dataset.config;
    if (!panelId) return;
    const menu = $("configMenu");
    if (menu) menu.hidden = true;
    document.querySelectorAll(".config-panel").forEach((p) => (p.hidden = true));
    const panel = $(panelId);
    if (panel) { panel.hidden = false; guardarPasoAtras("panel"); }
  });
});

document.querySelectorAll(".config-volver").forEach((btn) => {
  btn.addEventListener("click", () => {
    volverAlMenuConfig();
    volverUnPaso("panel");
  });
});

// ============================================================
// RENDER: Resumen del mes
// ============================================================
// ---------- Pendientes: "todavía no salió" ----------
// Un movimiento puede tener fecha_pago (cuándo se paga o se cobra de verdad).
// Mientras esté "pendiente" no suma al Balance: se ve como alerta hasta que se
// marca como pagado/cobrado, y recién ahí cuenta en el mes en que se pagó.
function hoyISO() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function mesClave(fechaISO) { return String(fechaISO).slice(0, 7); }

function claveMesVista() {
  return fechaVista.getFullYear() + "-" + String(fechaVista.getMonth() + 1).padStart(2, "0");
}

function esPendiente(m) { return m.estado === "pendiente"; }
function esDiferido(m) { return !!m.fecha_pago; }

// "normal": sin diferir, cuenta en su fecha.
// "pago": diferido, y su fecha de pago cae en el mes que se mira.
// "origen": diferido, cargado en este mes pero se paga en otro (solo señal, no suma).
function papelEnMes(m, clave) {
  if (!esDiferido(m)) return "normal";
  return mesClave(m.fecha_pago) === clave ? "pago" : "origen";
}

// Movimientos que cuentan en el Balance, con la fecha en que realmente se pagaron.
function soloContables(lista) {
  return lista.filter((m) => !esPendiente(m)).map((m) => (m.fecha_pago ? { ...m, fecha: m.fecha_pago } : m));
}

function contablesDelMes(lista, clave) {
  return soloContables(lista).filter((m) => mesClave(m.fecha) === clave);
}

function diasHasta(fechaISO) {
  const [a, m, d] = fechaISO.split("-").map(Number);
  const [ha, hm, hd] = hoyISO().split("-").map(Number);
  return Math.round((Date.UTC(a, m - 1, d) - Date.UTC(ha, hm - 1, hd)) / 86400000);
}

function textoVencimiento(fechaISO) {
  const n = diasHasta(fechaISO);
  if (n === 0) return t("pendVenceHoy");
  if (n > 0 && n <= 7) return `${t("pendVenceEn")} ${n} ${n === 1 ? t("pendDia") : t("pendDias")}`;
  if (n > 7) return `${t("pendVenceEl")} ${formatoFecha(fechaISO)}`;
  const a = Math.abs(n);
  return `${t("pendVencioHace")} ${a} ${a === 1 ? t("pendDia") : t("pendDias")}`;
}

function badgeMovimiento(m, papel) {
  if (papel === "normal") return null;
  const g = m.tipo === "Ingreso" ? "Ingreso" : "Gasto";
  const f = formatoFecha(m.fecha_pago);
  if (papel === "pago") {
    if (!esPendiente(m) && m.fecha_pago > hoyISO()) return { texto: t("badgeProg" + g).replace("{f}", f), clase: "badge-pendiente" };
    if (!esPendiente(m)) return { texto: t("badgeCerrado" + g), clase: "badge-cerrado" };
    const vencido = m.fecha_pago < hoyISO();
    return { texto: t("badgePendiente" + g).replace("{f}", f), clase: vencido ? "badge-vencido" : "badge-pendiente" };
  }
  const clave = esPendiente(m) ? "badgeOrigen" + g : "badgeOrigenPagado" + g;
  return { texto: t(clave).replace("{f}", f), clase: "badge-origen" };
}

async function cerrarPendiente(id) {
  const m = pendientes.find((x) => x.id === id) || movimientos.find((x) => x.id === id);
  if (!m) return;
  try {
    await marcarMovimientoPagado(id, hoyISO());
    await cargarMesActual();
    mostrarToast(t(m.tipo === "Ingreso" ? "toastCobradoDet" : "toastPagadoDet").replace("{d}", () => m.categoria).replace("{m}", () => formatoMontoMov(m)), 6000);
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
}

// ============================================================
// MI SITUACIÓN: lo que debo, lo que me deben y lo que se viene, del resumen al detalle
// ============================================================
let sitPila = [{ v: "inicio" }];

function sitIr(v, id) { sitPila.push({ v, id }); renderSituacion(); $("vistaSituacion").scrollTop = 0; window.scrollTo(0, 0); }
function sitAtras() { if (sitPila.length > 1) sitPila.pop(); renderSituacion(); }
function sitReiniciar() { sitPila = [{ v: "inicio" }]; renderSituacion(); }

function sitGrupo(m) {
  const n = diasHasta(m.fecha_pago);
  return n < 0 ? "venc" : n <= 7 ? "sem" : "mas";
}
function sitNombreGrupo(k) { return t({ venc: "sitVencido", sem: "sitProx7", mas: "sitMasAdelante" }[k]); }
function sitSuma(l) { return l.reduce((a, m) => a + montoBase(m), 0); }
function sitDeudas() { return pendientes.filter((m) => m.tipo === "Gasto"); }
function sitCobros() { return pendientes.filter((m) => m.tipo === "Ingreso"); }
function sitFuturos() { return pendientes.filter((m) => diasHasta(m.fecha_pago) >= 0); }
function sitMeses() {
  return [...new Set(sitFuturos().map((m) => mesClave(m.fecha_pago)))].sort();
}
function sitNombreMes(clave) {
  const [a, m] = clave.split("-").map(Number);
  const loc = { es: "es-AR", pt: "pt-BR", en: "en-US" }[idiomaActual] || "es-AR";
  const n = new Date(a, m - 1, 1).toLocaleDateString(loc, { month: "long", year: "numeric" });
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function sitCabecera(titulo, ruta) {
  const volver = sitPila.length > 1 ? `<button type="button" class="sit-volver" data-sit-atras aria-label="${escapeHTML(t("sitVolver"))}">←</button>` : "";
  return `<div class="sit-cabecera">${volver}<div><h2 class="sit-titulo">${escapeHTML(titulo)}</h2>${ruta ? `<div class="sit-ruta">${escapeHTML(ruta)}</div>` : ""}</div></div>`;
}
function sitTarjeta(vista, id, etq, ver, grande, sub, claseGrande) {
  return `<button type="button" class="sit-card" data-sit-ir="${vista}"${id ? ` data-sit-id="${escapeHTML(id)}"` : ""}>
    <div class="sit-etq"><span>${escapeHTML(etq)}</span><span class="sit-ver">${escapeHTML(ver)}</span></div>
    <div class="sit-grande ${claseGrande || ""}">${escapeHTML(grande)}</div>${sub ? `<div class="sit-sub">${sub}</div>` : ""}</button>`;
}
function sitFila(m) {
  const esGasto = m.tipo === "Gasto";
  const vencido = diasHasta(m.fecha_pago) < 0;
  return `<div class="pend-fila" data-id="${m.id}">
    <div class="pend-info">
      <div class="pend-cat">${escapeHTML(m.categoria)}</div>
      <div class="pend-sub">${escapeHTML(m.cuenta)}${m.detalle ? " · " + escapeHTML(m.detalle) : ""}</div>
      <div class="pend-venc${vencido ? " vencido" : ""}">${escapeHTML(textoVencimiento(m.fecha_pago))}</div>
    </div>
    <div class="pend-derecha">
      <div class="mov-monto ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "-" : "+"}${escapeHTML(formatoMontoMov(m))}</div>${equivMovHTML(m)}
      <button type="button" class="boton boton-secundario pend-cerrar" data-id="${m.id}">${escapeHTML(t(esGasto ? "pendMarcarPagado" : "pendMarcarCobrado"))}</button>
    </div></div>`;
}
function sitLista(l) {
  return `<div class="sit-lista">${l.length ? l.map(sitFila).join("") : `<div class="sit-vacio">${escapeHTML(t("sitNadaGrupo"))}</div>`}</div>`;
}
function sitOrdenar(l) { return [...l].sort((a, b) => String(a.fecha_pago).localeCompare(String(b.fecha_pago))); }

function renderSituacion() {
  const cont = $("vistaSituacion");
  if (!cont || !usuario) return;
  const s = sitPila[sitPila.length - 1];
  const inicio = t("sitInicio");
  const deudas = sitDeudas(), cobros = sitCobros();
  let h = "";

  if (s.v === "inicio") {
    h = sitCabecera(t("sitTitulo"), "");
    const avisoM = avisoMonedasHTML();
    if (avisoM) h += `<div class="aviso-monedas">${avisoM}</div>`;
    if (tengoDisponible) {
      h += sitTarjeta("tengo", "", t("sitTengo"), t("sitVerDetalle"), tengoCalculo ? formatoMonto(tengoCalculo.total) : "…", "", "sit-bien");
    }
    {
      const venc = sitSuma(deudas.filter((m) => sitGrupo(m) === "venc"));
      const sem = sitSuma(deudas.filter((m) => sitGrupo(m) === "sem"));
      const prD = prAbiertos("debo"), prC = prAbiertos("me_deben");
      const lineaPr = (l, sentido) => l.length ? `<span class="sit-pres">${escapeHTML(t("prLinea"))} ${escapeHTML(formatoMonto(prSuma(sentido)))}</span>` : "";
      const subDebo = [deudas.length
        ? `${venc ? `<span class="sit-mal">${escapeHTML(t("sitVencido"))} ${escapeHTML(formatoMonto(venc))}</span> · ` : ""}${escapeHTML(t("sitProx7"))} ${escapeHTML(formatoMonto(sem))}` : "",
        lineaPr(prD, "debo")].filter(Boolean).join("<br>");
      h += sitTarjeta("debo", "", t("sitDebo"), t("sitVerDetalle"), formatoMonto(sitSuma(deudas) + prSuma("debo")),
        subDebo || `<span class="sit-nada">${escapeHTML(t("sitNadaPagar"))}</span>`, "sit-mal");
      if (prestamosDisponible !== false) h += `<button type="button" class="pr-atajo" data-pr-nuevo="debo">${escapeHTML(t("prAtajoDebo"))}</button>`;
      const subCobrar = lineaPr(prC, "me_deben");
      h += sitTarjeta("cobrar", "", t("sitMeDeben"), t("sitVerDetalle"), formatoMonto(sitSuma(cobros) + prSuma("me_deben")),
        cobros.length || prC.length ? subCobrar : `<span class="sit-nada">${escapeHTML(t("sitNadaCobrar"))}</span>`, "sit-bien");
      if (prestamosDisponible !== false) h += `<button type="button" class="pr-atajo" data-pr-nuevo="me_deben">${escapeHTML(t("prAtajoMeDeben"))}</button>`;
      const meses = sitMeses();
      if (meses.length) {
        const tot = (k) => sitSuma(sitFuturos().filter((m) => m.tipo === "Gasto" && mesClave(m.fecha_pago) === k));
        const max = Math.max(1, ...meses.map(tot));
        const barras = meses.map((k) => `<div class="sit-barra"><span>${escapeHTML(sitNombreMes(k).split(" ")[0].slice(0, 3))}</span><span class="sit-riel"><i style="width:${Math.max(4, Math.round(tot(k) / max * 100))}%"></i></span><span>${escapeHTML(formatoMonto(tot(k)))}</span></div>`).join("");
        h += `<button type="button" class="sit-card" data-sit-ir="viene"><div class="sit-etq"><span>${escapeHTML(t("sitSeViene"))}</span><span class="sit-ver">${escapeHTML(t("sitVerMeses"))}</span></div><div class="sit-barras">${barras}</div></button>`;
      }
    }
  } else if (s.v === "tengo") {
    h = sitCabecera(t("sitTengo"), `${inicio} › ${t("sitTengo")}`) + tengoHTML();
  } else if (s.v === "debo") {
    h = sitCabecera(t("sitDebo"), `${inicio} › ${t("sitDebo")}`);
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitTotal"))}</span></div><div class="sit-grande">${escapeHTML(formatoMonto(sitSuma(deudas) + prSuma("debo")))}</div></div>`;
    ["venc", "sem", "mas"].forEach((k) => {
      const l = deudas.filter((m) => sitGrupo(m) === k);
      h += sitTarjeta("grupo", k, sitNombreGrupo(k), t("sitVerN").replace("{n}", l.length), formatoMonto(sitSuma(l)), "", k === "venc" && l.length ? "sit-mal" : "");
    });
    h += prSeccionHTML("debo");
  } else if (s.v === "grupo") {
    const l = sitOrdenar(deudas.filter((m) => sitGrupo(m) === s.id));
    h = sitCabecera(sitNombreGrupo(s.id), `${inicio} › ${t("sitDebo")} › ${sitNombreGrupo(s.id)}`);
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitTotal"))}</span></div><div class="sit-grande">${escapeHTML(formatoMonto(sitSuma(l)))}</div></div>` + sitLista(l);
  } else if (s.v === "cobrar") {
    h = sitCabecera(t("sitMeDeben"), `${inicio} › ${t("sitMeDeben")}`);
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitTotal"))}</span></div><div class="sit-grande">${escapeHTML(formatoMonto(sitSuma(cobros) + prSuma("me_deben")))}</div></div>`;
    if (cobros.length || prestamosDisponible === false || !prAbiertos("me_deben").length) h += sitLista(sitOrdenar(cobros));
    h += prSeccionHTML("me_deben");
  } else if (s.v === "viene") {
    h = sitCabecera(t("sitSeViene"), `${inicio} › ${t("sitSeViene")}`);
    sitMeses().forEach((k) => {
      const l = sitFuturos().filter((m) => mesClave(m.fecha_pago) === k);
      const d = sitSuma(l.filter((m) => m.tipo === "Gasto")), c = sitSuma(l.filter((m) => m.tipo === "Ingreso"));
      h += sitTarjeta("mes", k, sitNombreMes(k), t("sitVerN").replace("{n}", l.length), "-" + formatoMonto(d),
        c ? `<span class="sit-bien">+${escapeHTML(formatoMonto(c))} ${escapeHTML(t("pendPorCobrar").toLowerCase())}</span>` : "", "sit-mal");
    });
  } else if (s.v === "mes") {
    const l = sitOrdenar(sitFuturos().filter((m) => mesClave(m.fecha_pago) === s.id));
    const d = sitSuma(l.filter((m) => m.tipo === "Gasto")), c = sitSuma(l.filter((m) => m.tipo === "Ingreso"));
    h = sitCabecera(sitNombreMes(s.id), `${inicio} › ${t("sitSeViene")} › ${sitNombreMes(s.id)}`);
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitNetoMes"))}</span></div><div class="sit-grande ${c - d < 0 ? "sit-mal" : "sit-bien"}">${c - d < 0 ? "-" : "+"}${escapeHTML(formatoMonto(Math.abs(c - d)))}</div><div class="sit-sub">${escapeHTML(t("pendPorPagar"))} ${escapeHTML(formatoMonto(d))} · ${escapeHTML(t("pendPorCobrar"))} ${escapeHTML(formatoMonto(c))}</div></div>` + sitLista(l);
  }
  cont.innerHTML = h;
}

$("vistaSituacion").addEventListener("click", (e) => {
  if (e.target.closest("[data-sit-atras]")) return sitAtras();
  const tAj = e.target.closest("[data-tengo-ajustar]");
  if (tAj) { e.stopPropagation(); return tengoAjustar(tAj.dataset.tengoAjustar); }
  if (e.target.closest("[data-tengo-transferir]")) return abrirTransferencia();
  const tBor = e.target.closest("[data-tengo-borrar]");
  if (tBor) {
    if (!confirm(t("trConfirmBorrar"))) return;
    return borrarTransferencia(tBor.dataset.tengoBorrar).then(cargarTengo).then(tengoRefrescarVista).catch((err) => mostrarToast(traducirErrorDatos(err)));
  }
  const prNuevo = e.target.closest("[data-pr-nuevo]");
  if (prNuevo) return abrirPrestamo(prNuevo.dataset.prNuevo);
  const prFila = e.target.closest("[data-pr-id]");
  if (prFila) return abrirPrestamoDet(prFila.dataset.prId);
  const cerrar = e.target.closest(".pend-cerrar");
  if (cerrar) { e.stopPropagation(); return cerrarPendiente(cerrar.dataset.id); }
  const fila = e.target.closest(".pend-fila");
  if (fila) return abrirModalEditar(fila.dataset.id);
  const ir = e.target.closest("[data-sit-ir]");
  if (ir) sitIr(ir.dataset.sitIr, ir.dataset.sitId);
});

function renderPendientes() {
  renderSituacion();
  renderAvisoMonedas();
  const cont = $("bannerPendientes");
  if (!cont) return;
  if (!pendientes.length) {
    cont.hidden = true;
    cont.innerHTML = "";
    return;
  }
  const hoy = hoyISO();
  let porPagar = 0, porCobrar = 0, vencidos = 0;
  pendientes.forEach((m) => {
    if (m.tipo === "Ingreso") porCobrar += montoBase(m);
    else porPagar += montoBase(m);
    if (m.fecha_pago < hoy) vencidos++;
  });
  const linea1 = [`<b class="pend-n">${escapeHTML(t("pendResumenN").replace("{n}", pendientes.length))}</b>`];
  if (vencidos) linea1.push(`<span class="pend-alerta">${escapeHTML(vencidos + " " + t(vencidos === 1 ? "pendVencido" : "pendVencidos"))}</span>`);
  const linea2 = [];
  if (porPagar) linea2.push(`<span class="pend-monto">${escapeHTML(t("pendPorPagar"))} <b>${escapeHTML(formatoMontoEntero(porPagar))}</b></span>`);
  if (porCobrar) linea2.push(`<span class="pend-monto">${escapeHTML(t("pendPorCobrar"))} <b>${escapeHTML(formatoMontoEntero(porCobrar))}</b></span>`);

  const filaHTML = (m) => {
    const esGasto = m.tipo === "Gasto";
    const vencido = m.fecha_pago < hoy;
    return `
      <div class="pend-fila" data-id="${m.id}">
        <div class="pend-info">
          <div class="pend-cat">${escapeHTML(m.categoria)}</div>
          <div class="pend-sub">${escapeHTML(m.cuenta)}${m.detalle ? " · " + escapeHTML(m.detalle) : ""}</div>
          <div class="pend-venc${vencido ? " vencido" : ""}">${escapeHTML(textoVencimiento(m.fecha_pago))}</div>
        </div>
        <div class="pend-derecha">
          <div class="mov-monto ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "-" : "+"}${escapeHTML(formatoMontoMov(m))}</div>${equivMovHTML(m)}
          <button type="button" class="boton boton-secundario pend-cerrar" data-id="${m.id}">${escapeHTML(t(esGasto ? "pendMarcarPagado" : "pendMarcarCobrado"))}</button>
        </div>
      </div>`;
  };
  // Pagos y cobros en bloques separados, cada uno con su total.
  const bloque = (lista, claveTitulo, total) => lista.length
    ? `<div class="pend-grupo-titulo">${escapeHTML(t(claveTitulo))} · <b>${escapeHTML(formatoMonto(total))}</b> (${lista.length})</div>${lista.map(filaHTML).join("")}`
    : "";
  const filas = bloque(pendientes.filter((m) => m.tipo !== "Ingreso"), "pendPorPagar", porPagar)
    + bloque(pendientes.filter((m) => m.tipo === "Ingreso"), "pendPorCobrar", porCobrar);

  cont.innerHTML = `
    <div class="pend-cabecera">
      <div class="pend-textos">
        <div class="pend-resumen"><div class="pend-l1">${linea1.join(" · ")}</div><div class="pend-l2">${linea2.join('<span class="pend-sep"> · </span>')}</div></div>
      </div>
      <button type="button" class="boton boton-texto" id="btnTogglePendientes">${escapeHTML(t(pendientesAbierto ? "pendOcultar" : "pendVer"))}</button>
    </div>
    <div class="pend-lista"${pendientesAbierto ? "" : " hidden"}>${filas}</div>`;
  cont.classList.toggle("tiene-vencidos", vencidos > 0);
  cont.hidden = false;

  $("btnTogglePendientes").addEventListener("click", () => {
    pendientesAbierto = !pendientesAbierto;
    renderPendientes();
  });
  cont.querySelectorAll(".pend-fila").forEach((el) => {
    el.addEventListener("click", () => abrirModalEditar(el.dataset.id));
  });
  cont.querySelectorAll(".pend-cerrar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      cerrarPendiente(btn.dataset.id);
    });
  });
}

function renderPrevisto() {
  const el = $("lineaPrevisto");
  if (!el) return;
  const clave = claveMesVista();
  let ingPend = 0, gasPend = 0;
  movimientos.forEach((m) => {
    if (esPendiente(m) && mesClave(m.fecha_pago) === clave) {
      if (m.tipo === "Ingreso") ingPend += montoBase(m);
      else gasPend += montoBase(m);
    }
  });
  if (!ingPend && !gasPend) {
    el.hidden = true;
    el.innerHTML = "";
    return;
  }
  const { balance } = calcularResumenLista(contablesDelMes(movimientos, clave));
  const previsto = balance + ingPend - gasPend;
  const partes = [];
  if (gasPend) partes.push(`${t("pendPorPagar")} ${formatoMonto(gasPend)}`);
  if (ingPend) partes.push(`${t("pendPorCobrar")} ${formatoMonto(ingPend)}`);
  el.innerHTML = `<strong>${escapeHTML(t("previstoLinea").replace("{b}", formatoMonto(previsto)))}</strong><span>${escapeHTML(partes.join(" · "))}</span>`;
  el.hidden = false;
}

// Achica la letra de un monto solo lo necesario para que entre en su tarjeta, en una línea.
function ajustarMontoAlCaber(el) {
  if (!el) return;
  el.style.fontSize = "";
  let tam = parseFloat(getComputedStyle(el).fontSize) || 13;
  while (el.scrollWidth > el.clientWidth && tam > 9) {
    tam -= 0.5;
    el.style.fontSize = tam + "px";
  }
}
function ajustarMontosResumen() {
  ["valorBalance", "valorIngresos", "valorGastos"].forEach((id) => ajustarMontoAlCaber($(id)));
}
window.addEventListener("resize", ajustarMontosResumen);

// Barrita debajo del resultado: qué parte de los ingresos del mes ya se gastó.
function renderBarraGasto(ing, gas) {
  const caja = $("barraGasto");
  if (!caja) return;
  if (ing <= 0 && gas <= 0) { caja.hidden = true; return; }
  caja.hidden = false;
  const relleno = $("barraGastoRelleno");
  const texto = $("barraGastoTexto");
  if (ing <= 0 || gas > ing) {
    relleno.style.width = "100%";
    caja.classList.add("pasado");
    texto.textContent = ing <= 0 ? t("barraSinIngresos") : t("barraGastoPasado");
    return;
  }
  const pct = Math.round((gas / ing) * 100);
  caja.classList.toggle("pasado", false);
  relleno.style.width = pct + "%";
  texto.textContent = t("barraGastoPct").replace("{p}", pct);
}

function renderResumen() {
  const { ing, gas } = calcularResumenLista(contablesDelMes(movimientos, claveMesVista()));
  $("valorBalance").textContent = formatoMonto(ing - gas);
  $("valorIngresos").textContent = formatoMonto(ing);
  $("valorGastos").textContent = formatoMonto(gas);
  renderBarraGasto(ing, gas);
  ajustarMontosResumen();
  renderPrevisto();
}

function normalizarTexto(v) {
  return String(v ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

let tipoFiltroActivo = "todo";

function pasaFiltroTipo(m) {
  if (tipoFiltroActivo === "todo") return true;
  return m.tipo === tipoFiltroActivo;
}

function pasaBusqueda(m) {
  if (!pasaFiltroTipo(m)) return false;
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

// ---------- Accesos simples: Todo / Ingresos / Gastos, y búsqueda escondida ----------
(function agregarAccesosSimples() {
  const input = $("textoBusqueda");
  if (!input || $("segmentadoTipoLista")) return;
  const filaBusqueda = input.closest("div") || input.parentElement;

  const segmentado = document.createElement("div");
  segmentado.className = "segmentado";
  segmentado.id = "segmentadoTipoLista";
  segmentado.style.flex = "1";
  segmentado.style.minWidth = "0";
  segmentado.innerHTML = `
    <button type="button" class="segmentado-item activo" data-tipolista="todo">${t("accesoTodo")}</button>
    <button type="button" class="segmentado-item" data-tipolista="Ingreso">${t("accesoIngresos")}</button>
    <button type="button" class="segmentado-item" data-tipolista="Gasto">${t("accesoGastos")}</button>
  `;

  const btnBuscar = document.createElement("button");
  btnBuscar.type = "button";
  btnBuscar.id = "btnBuscarSimple";
  btnBuscar.className = "boton boton-secundario";
  btnBuscar.style.flexShrink = "0";
  btnBuscar.style.padding = "8px 12px";
  botonAcceso(btnBuscar, "buscar", t("accBuscar"));

  // Filtros y buscador en una sola fila para ganar lugar para la lista.
  const filaAccesos = document.createElement("div");
  filaAccesos.id = "filaAccesosLista";
  filaAccesos.style.cssText = "display:flex;gap:8px;align-items:stretch;margin-bottom:8px;";
  const btnClasif = $("btnClasificar");
  if (btnClasif) { btnClasif.className = "boton boton-secundario acceso-btn"; botonAcceso(btnClasif, "clasificar", t("accClasificar")); }
  btnBuscar.className = "boton boton-secundario acceso-btn";
  btnBuscar.removeAttribute("style");
  filaAccesos.append(segmentado, btnBuscar);
  if (btnClasif) filaAccesos.append(btnClasif);
  if (filaBusqueda && filaBusqueda.parentElement) {
    filaBusqueda.parentElement.insertBefore(filaAccesos, filaBusqueda);
  }
  filaBusqueda.hidden = true;

  btnBuscar.addEventListener("click", () => {
    filaBusqueda.hidden = !filaBusqueda.hidden;
    botonAcceso(btnBuscar, "buscar", filaBusqueda.hidden ? t("accBuscar") : t("accCerrar"));
  });

  window.ajustarAccesos = function () {
    filaAccesos.classList.remove("acc-wrap");
    const tope = segmentado.getBoundingClientRect().top;
    if (!filaAccesos.offsetWidth) return; // oculta (antes del login): se vuelve a medir cuando se muestre
    const apretado = segmentado.scrollWidth > segmentado.clientWidth + 1 ||
      [...segmentado.querySelectorAll(".segmentado-item")].some((i) => i.scrollWidth > i.clientWidth + 1) ||
      [...filaAccesos.querySelectorAll(".acceso-btn")].some((b) => b.getBoundingClientRect().top > tope + 8);
    if (apretado) filaAccesos.classList.add("acc-wrap");
  };
  window.addEventListener("resize", window.ajustarAccesos);
  setTimeout(window.ajustarAccesos, 0);
  setTimeout(window.ajustarAccesos, 800);
  if (window.ResizeObserver) {
    let pend = false;
    const ro = new ResizeObserver(() => {
      if (pend) return;
      pend = true;
      requestAnimationFrame(() => { pend = false; window.ajustarAccesos(); });
    });
    ro.observe(filaAccesos);
    segmentado.querySelectorAll(".segmentado-item").forEach((i) => ro.observe(i));
    filaAccesos.querySelectorAll(".acceso-btn").forEach((i) => ro.observe(i));
  }
  ["load", "focus", "orientationchange", "pageshow"].forEach((ev) => window.addEventListener(ev, () => setTimeout(window.ajustarAccesos, 100)));
  document.addEventListener("visibilitychange", () => { if (!document.hidden) setTimeout(window.ajustarAccesos, 100); });
  setTimeout(window.ajustarAccesos, 2500);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => window.ajustarAccesos());
  segmentado.querySelectorAll(".segmentado-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      segmentado.querySelectorAll(".segmentado-item").forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      tipoFiltroActivo = btn.dataset.tipolista;
      renderMovimientos();
    });
  });
})();

// En pantallas anchas la categoría ocupa solo lo que necesita el nombre más largo,
// así el detalle queda pegado y las columnas siguen alineadas.
function ajustarAnchoCategorias() {
  const cont = $("listaMovimientos");
  if (!cont) return;
  if (!window.matchMedia("(min-width:900px)").matches) {
    cont.style.removeProperty("--ancho-cat");
    return;
  }
  // Primero que cada categoría tome el ancho de su texto, y recién ahí medimos la más larga.
  cont.style.setProperty("--ancho-cat", "max-content");
  let max = 0;
  cont.querySelectorAll(".mov-categoria").forEach((el) => { max = Math.max(max, el.getBoundingClientRect().width); });
  if (max) cont.style.setProperty("--ancho-cat", Math.min(Math.max(Math.ceil(max) + 2, 60), 260) + "px");
  else cont.style.removeProperty("--ancho-cat");
}
window.addEventListener("resize", ajustarAnchoCategorias);

// ============================================================
// RENDER: Lista de movimientos
// ============================================================
// "Hoy", "Ayer" o "Jueves 13 de noviembre" (en el idioma elegido).
function tituloDia(fechaStr) {
  const [y, m, d] = String(fechaStr).split("-").map(Number);
  if (!y || !m || !d) return String(fechaStr || "");
  const f = new Date(y, m - 1, d);
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const dif = Math.round((hoy - f) / 86400000);
  if (dif === 0) return t("diaHoy");
  if (dif === 1) return t("diaAyer");
  const opciones = { weekday: "long", day: "numeric", month: "long" };
  if (y !== hoy.getFullYear()) opciones.year = "numeric";
  const texto = f.toLocaleDateString(LOCALES_POR_IDIOMA[idiomaActual] || "es-AR", opciones).replace(",", "");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// ---------- Carga rápida: importe con el teclado de la app, categoría de un toque y guardar ----------
function rapidoActivo() { return !$("rapido").hidden; }
function rapidoActivar(si) {
  $("rapido").hidden = !si;
  const f = $("formMovimiento");
  f.classList.toggle("modo-rapido", si);
  f.classList.remove("rapido-ver-cuenta", "rapido-ver-fecha", "rapido-ver-cat", "rapido-ver-mas");
  $("rapCuentas").hidden = true;
  if (si) rapidoRefrescar();
}
function rapidoUsos() { try { return JSON.parse(localStorage.getItem("fs_cat_uso") || "{}"); } catch { return {}; } }
function rapidoRefrescar() {
  if (!rapidoActivo()) return;
  const tipo = tipoDelFormulario();
  // Categorías más usadas (este mes + lo que se fue cargando en este equipo), las 5 primeras
  const usos = rapidoUsos();
  const cuenta = {};
  for (const m of movimientos) if (m.tipo === tipo) cuenta[m.categoria] = (cuenta[m.categoria] || 0) + 1;
  const lista = categorias.filter((c) => (c.tipo || "Gasto") === tipo).map((c) => c.nombre);
  lista.sort((a, b) => ((cuenta[b] || 0) + 2 * (usos[b] || 0)) - ((cuenta[a] || 0) + 2 * (usos[a] || 0)));
  const elegida = $("movCategoria").value;
  const top = lista.slice(0, 5);
  if (elegida && !top.includes(elegida) && $("formMovimiento").dataset.rapCatElegida) top.unshift(elegida);
  $("rapCats").classList.remove("una-col");
  $("rapCats").innerHTML = top.map((n) => `<button type="button" class="rapido-cat${$("formMovimiento").dataset.rapCatElegida === n ? " activo" : ""}" data-cat="${escapeHTML(n)}" style="--cat-h:${tonoCategoria(n)}"><span aria-hidden="true">${iconoCategoria(n) || "•"}</span> ${escapeHTML(n)}</button>`).join("")
    + `<button type="button" class="rapido-cat rapido-cat-mas" data-cat-mas>${escapeHTML(t("rapMas"))}</button>`;
  $("rapCuenta").textContent = "🏦 " + ($("movCuenta").value || "—");
  const f = $("movFecha").value;
  $("rapFecha").textContent = "📅 " + (f === hoyISO() ? t("diaHoy") : tituloDia(f));
  $("rapGuardar").textContent = t(tipo === "Gasto" ? "rapGuardarGasto" : "rapGuardarIngreso");
  $("rapDiferido").textContent = $("labelDiferido").textContent;
  document.querySelectorAll("[data-rap-toggle]").forEach((b) => b.classList.toggle("activo", $(b.dataset.rapToggle).checked));
  const f2 = $("formMovimiento");
  f2.classList.toggle("rapido-ver-cuotas", $("movCuotas").checked);
  f2.classList.toggle("rapido-ver-diferido", $("movDiferido").checked);
  $("rapido").classList.toggle("es-ingreso", tipo === "Ingreso");
  $("rapQR").hidden = tipo !== "Gasto";
  $("rapQR2").hidden = tipo !== "Gasto";
  rapidoMostrarMonto();
}
// Cartel "Más categorías": aparece solo si hay más para ver deslizando; al tocarlo baja solo
function rapidoHint() {
  const f = $("formMovimiento"), h = $("rapMasHint");
  if (!f || !h) return;
  const resta = f.scrollHeight - f.scrollTop - f.clientHeight;
  h.hidden = !(rapidoActivo() && resta > 8);
  // Si algún nombre de categoría no entra en media pantalla (letra grande), pasa a una sola columna
  const rc = $("rapCats");
  if (rc && !rc.classList.contains("una-col") && rc.clientWidth > 0 &&
      [...rc.querySelectorAll(".rapido-cat")].some((b) => b.scrollWidth > b.clientWidth + 1)) rc.classList.add("una-col");
}
$("rapMasHint").addEventListener("click", () => {
  const f = $("formMovimiento");
  f.scrollBy({ top: Math.round(f.clientHeight * 0.6), behavior: "smooth" });
});
$("formMovimiento").addEventListener("scroll", rapidoHint, { passive: true });
window.addEventListener("resize", rapidoHint);
let rapidoHintPend = false;
new MutationObserver(() => { if (rapidoHintPend) return; rapidoHintPend = true; requestAnimationFrame(() => { rapidoHintPend = false; rapidoHint(); }); })
  .observe($("formMovimiento"), { attributes: true, childList: true, subtree: true });
function rapidoMostrarMonto() {
  $("rapMonto").textContent = $("movMonto").value || "0";
  $("rapSigno").textContent = (() => { const c = cuentas.find((x) => x.nombre === $("movCuenta").value); return c && c.moneda && c.moneda !== monedaBase() ? simboloDe(c.moneda) : moneda(); })();
}
function rapidoTecla(k) {
  const inp = $("movMonto");
  let v = inp.value.replace(/\./g, "");
  if (k === "borrar") v = v.slice(0, -1);
  else if (k === ",") { if (!v.includes(",")) v = (v || "0") + ","; }
  else { if (/,\d\d$/.test(v)) return; if (v.replace(/\D/g, "").length >= 12) return; v += k; }
  inp.value = formatearImporteEscrito(v);
  inp.dispatchEvent(new Event("input", { bubbles: true }));
}
$("rapTeclado").addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b) rapidoTecla(b.dataset.k); });
$("movMonto").addEventListener("input", () => { if (rapidoActivo()) rapidoMostrarMonto(); });
$("rapCats").addEventListener("click", (e) => {
  if (e.target.closest("[data-cat-mas]")) { $("formMovimiento").classList.add("rapido-ver-cat"); $("movCategoria").focus(); return; }
  const b = e.target.closest("[data-cat]");
  if (!b) return;
  $("movCategoria").value = b.dataset.cat;
  $("formMovimiento").dataset.rapCatElegida = b.dataset.cat;
  document.querySelectorAll("#rapCats .rapido-cat").forEach((x) => x.classList.toggle("activo", x === b));
});
$("movCategoria").addEventListener("change", () => { if (rapidoActivo()) { $("formMovimiento").dataset.rapCatElegida = $("movCategoria").value; rapidoRefrescar(); } });
function rapidoCuentasDibujar() {
  const box = $("rapCuentas");
  const actual = $("movCuenta").value;
  box.innerHTML = cuentas.map((c) => `<button type="button" class="${c.nombre === actual ? "activo" : ""}" data-cuenta="${escapeHTML(c.nombre)}">🏦 ${escapeHTML(c.nombre)}</button>`).join("");
}
$("rapCuenta").addEventListener("click", () => {
  const box = $("rapCuentas");
  if (box.hidden) rapidoCuentasDibujar();
  box.hidden = !box.hidden;
});
$("rapCuentas").addEventListener("click", (e) => {
  const b = e.target.closest("[data-cuenta]");
  if (!b) return;
  $("movCuenta").value = b.dataset.cuenta;
  $("movCuenta").dispatchEvent(new Event("change", { bubbles: true }));
  $("rapCuentas").hidden = true;
  rapidoRefrescar();
});
$("rapFecha").addEventListener("click", () => {
  $("formMovimiento").classList.add("rapido-ver-fecha");
  const d = $("movFecha");
  d.scrollIntoView({ block: "center", behavior: "smooth" });
  try { d.showPicker(); } catch (_) { d.focus(); }
});
$("movCuenta").addEventListener("change", () => { if (rapidoActivo()) rapidoRefrescar(); });
$("movFecha").addEventListener("change", () => { if (rapidoActivo()) rapidoRefrescar(); });
document.querySelectorAll("[data-rap-toggle]").forEach((b) => b.addEventListener("click", () => {
  const chk = $(b.dataset.rapToggle);
  chk.checked = !chk.checked;
  chk.dispatchEvent(new Event("change", { bubbles: true }));
  rapidoRefrescar();
}));
$("rapMasOpciones").addEventListener("click", () => { $("formMovimiento").classList.toggle("rapido-ver-mas"); });
// En la compu se puede escribir el importe con el teclado aunque no haya un casillero elegido
document.addEventListener("keydown", (e) => {
  if (!rapidoActivo() || $("modalFondo").hidden) return;
  const el = document.activeElement;
  if (el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) return;
  if (/^[0-9]$/.test(e.key)) { rapidoTecla(e.key); e.preventDefault(); }
  else if (e.key === "," || e.key === ".") { rapidoTecla(","); e.preventDefault(); }
  else if (e.key === "Backspace") { rapidoTecla("borrar"); e.preventDefault(); }
});
// Antes de guardar en modo rápido: tiene que haber una categoría elegida a propósito
$("formMovimiento").addEventListener("submit", (e) => {
  if (!rapidoActivo()) return;
  const f = $("formMovimiento");
  if (!f.dataset.rapCatElegida && !f.classList.contains("rapido-ver-cat")) {
    e.preventDefault(); e.stopImmediatePropagation();
    mostrarAviso($("movError"), t("rapElegiCategoria"));
    return;
  }
  const usos = rapidoUsos(); const c = $("movCategoria").value;
  usos[c] = (usos[c] || 0) + 1;
  try { localStorage.setItem("fs_cat_uso", JSON.stringify(usos)); } catch {}
}, true);


// ---------- Escanear el QR de una factura electrónica (ARCA/AFIP) ----------
// El QR trae un link con los datos de la factura en base64 (fecha, importe, moneda, punto de venta, número).
// Todo se lee en el celular: la imagen de la cámara no se envía a ningún lado.
let qrStream = null, qrTimer = null, qrDetector = null, qrJsQR = null;
function qrLeerFactura(texto) {
  try {
    const txt = String(texto).trim();
    // Se toma el valor de p= tal cual (URLSearchParams cambiaría los "+" del base64 por espacios y rompería los datos).
    const m = txt.match(/[?&]p=([^&#\s]*)/);
    let d = null;
    try {
      let b64 = m ? m[1] : txt;
      try { b64 = decodeURIComponent(b64); } catch {}
      b64 = b64.replace(/ /g, "+").replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      d = JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch { d = JSON.parse(txt); }
    if (!d || typeof d !== "object") return null;
    let imp = d.importe;
    if (typeof imp === "string") {
      imp = imp.replace(/\s/g, "");
      if (imp.includes(",") && imp.includes(".")) imp = imp.replace(/\./g, "").replace(",", ".");
      else imp = imp.replace(",", ".");
    }
    const importe = Number(imp);
    let fecha = String(d.fecha || "").trim();
    const dm = fecha.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    fecha = dm ? dm[3] + "-" + dm[2] + "-" + dm[1] : fecha.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !Number.isFinite(importe) || importe <= 0) return null;
    return { fecha, importe, moneda: String(d.moneda == null ? "" : d.moneda).trim(), ptoVta: d.ptoVta, nroCmp: d.nroCmp };
  } catch { return null; }
}
function qrAplicar(f) {
  const enPesos = !f.moneda || /^(PES|ARS|\$|PESOS)$/i.test(f.moneda);
  if (enPesos) {
    const txt = Number.isInteger(f.importe) ? String(f.importe) : f.importe.toFixed(2).replace(".", ",");
    $("movMonto").value = formatearImporteEscrito(txt);
    $("movMonto").dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(f.fecha)) { $("movFecha").value = f.fecha; $("movFecha").dispatchEvent(new Event("change", { bubbles: true })); }
  if (!$("movDetalle").value && f.ptoVta && f.nroCmp) $("movDetalle").value = "Factura " + String(f.ptoVta).padStart(4, "0") + "-" + String(f.nroCmp).padStart(8, "0");
  rapidoRefrescar();
  qrAvisarSiYaCargada(f);
  mostrarToast(enPesos ? t("qrOk") : t("qrOtraMoneda").replace("{m}", f.moneda).replace("{i}", f.importe), 5500);
}
async function qrAvisarSiYaCargada(f) {
  if (!f.ptoVta || !f.nroCmp) return;
  try {
    const detalle = "Factura " + String(f.ptoVta).padStart(4, "0") + "-" + String(f.nroCmp).padStart(8, "0");
    const { data } = await sbClient.from("movimientos").select("id").eq("user_id", usuario.id).eq("fecha", f.fecha).eq("detalle", detalle).limit(1);
    if (data && data.length) setTimeout(() => mostrarToast(t("qrYaCargada"), 6000), 300);
  } catch {}
}
function qrCerrar() {
  clearTimeout(qrTimer); qrTimer = null;
  if (qrStream) { qrStream.getTracks().forEach((x) => x.stop()); qrStream = null; }
  $("qrVideo").srcObject = null;
  $("qrEscaner").hidden = true;
}
async function qrPrepararDetector() {
  if (qrDetector) return qrDetector;
  if ("BarcodeDetector" in window) {
    try { qrDetector = { nativo: new BarcodeDetector({ formats: ["qr_code"] }) }; return qrDetector; } catch {}
  }
  // Respaldo para navegadores sin lector propio (iPhone, Firefox): librería jsQR, se baja solo la primera vez.
  if (!qrJsQR) {
    await new Promise((ok, mal) => {
      const sc = document.createElement("script");
      sc.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";
      sc.onload = ok; sc.onerror = mal; document.head.appendChild(sc);
    });
    qrJsQR = window.jsQR;
  }
  qrDetector = { js: qrJsQR };
  return qrDetector;
}
async function qrDecodificar(fuente, ancho, alto) {
  const det = await qrPrepararDetector();
  if (det.nativo) {
    const r = await det.nativo.detect(fuente);
    return r && r[0] ? r[0].rawValue : null;
  }
  const max = 1200, k = Math.min(1, max / Math.max(ancho, alto));
  const c = document.createElement("canvas");
  c.width = Math.round(ancho * k); c.height = Math.round(alto * k);
  const cx = c.getContext("2d", { willReadFrequently: true });
  cx.drawImage(fuente, 0, 0, c.width, c.height);
  const im = cx.getImageData(0, 0, c.width, c.height);
  const r = det.js(im.data, im.width, im.height, { inversionAttempts: "attemptBoth" });
  return r ? r.data : null;
}
function qrResultado(texto) {
  const f = qrLeerFactura(texto);
  if (!f) { $("qrEstado").textContent = t("qrNoFactura") + " (" + String(texto).slice(0, 70) + (String(texto).length > 70 ? "…" : "") + ")"; return false; }
  qrCerrar();
  qrAplicar(f);
  return true;
}
async function qrBucle() {
  const v = $("qrVideo");
  if ($("qrEscaner").hidden || !qrStream) return;
  try {
    if (v.videoWidth) {
      const txt = await qrDecodificar(v, v.videoWidth, v.videoHeight);
      if (txt && qrResultado(txt)) return;
    }
  } catch {}
  qrTimer = setTimeout(qrBucle, 300);
}
$("rapQR2").addEventListener("click", () => $("rapQR").click());
$("rapQR").addEventListener("click", async () => {
  $("qrEstado").textContent = t("qrPreparando");
  $("qrEscaner").hidden = false;
  try { await qrPrepararDetector(); } catch { $("qrEstado").textContent = t("qrSinCamara"); return; }
  try {
    qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
    const v = $("qrVideo");
    v.srcObject = qrStream;
    try { await qrStream.getVideoTracks()[0].applyConstraints({ advanced: [{ focusMode: "continuous" }] }); } catch {}
    await v.play();
    $("qrEstado").textContent = t("qrAyuda");
    qrBucle();
  } catch { $("qrEstado").textContent = t("qrSinCamara"); }
});
$("qrCerrar").addEventListener("click", qrCerrar);
async function qrDesdeArchivo(e) {
  const file = e.target.files && e.target.files[0];
  e.target.value = "";
  if (!file) return;
  $("qrEstado").textContent = t("qrPreparando");
  try {
    const bmp = await createImageBitmap(file);
    const txt = await qrDecodificar(bmp, bmp.width, bmp.height);
    if (!txt) { $("qrEstado").textContent = t("qrNoLeyo"); return; }
    qrResultado(txt);
  } catch { $("qrEstado").textContent = t("qrNoLeyo"); }
}
$("qrArchivo").addEventListener("change", qrDesdeArchivo);
$("qrFotoCam").addEventListener("change", qrDesdeArchivo);

// En celulares, al bajar por la lista de Movimientos se esconde el resumen de arriba (vuelve al subir al principio).
(function resumenQueSeVa() {
  // En el celular la cabecera se pasa adentro de la lista (main.contenido): queda pegada arriba solo
  // la fila del mes y el resumen se va con el scroll, sin saltos. En pantallas grandes vuelve a su lugar.
  const cont = document.querySelector("main.contenido");
  const top = document.querySelector("header.topbar");
  if (!cont || !top) return;
  const app = top.parentNode;
  const mq = window.matchMedia("(max-width:640px)");
  function ubicar() {
    if (mq.matches) {
      if (top.parentNode !== cont) cont.insertBefore(top, cont.firstChild);
      top.classList.add("topbar-scroll");
    } else {
      if (top.parentNode === cont) app.insertBefore(top, cont);
      top.classList.remove("topbar-scroll");
    }
  }
  ubicar();
  if (mq.addEventListener) mq.addEventListener("change", ubicar); else mq.addListener(ubicar);
})();

// ---------- Compras en cuotas (pantalla en Ajustes) ----------
// Las cuotas se guardan como movimientos con "Cuota 3/12" en el detalle; acá se agrupan por compra.
const RE_CUOTA = /^(.*?)(?:\s·\s)?(?:Cuota|Parcela|Installment)\s(\d+)\/(\d+)$/;
async function renderCuotas() {
  const cont = $("listaCuotas");
  cont.innerHTML = `<div class="vacio">…</div>`;
  let todos;
  try { todos = await listarTodosLosMovimientos(usuario.id); }
  catch (err) { cont.innerHTML = `<div class="vacio">${escapeHTML(traducirErrorDatos(err))}</div>`; return; }
  const grupos = new Map();
  for (const m of todos) {
    const r = RE_CUOTA.exec(String(m.detalle || ""));
    if (!r) continue;
    const base = r[1].trim(), k = +r[2], n = +r[3];
    const clave = [base, m.categoria, m.cuenta, n, m.monto, m.moneda || ""].join("|");
    if (!grupos.has(clave)) grupos.set(clave, { base, categoria: m.categoria, cuenta: m.cuenta, n, cuotas: [] });
    grupos.get(clave).cuotas.push({ k, fecha: String(m.fecha), estado: m.estado || "pagado", m });
  }
  const prefijo = `${fechaVista.getFullYear()}-${String(fechaVista.getMonth() + 1).padStart(2, "0")}`;
  let totalMes = 0;
  const filas = [];
  for (const g of grupos.values()) {
    g.cuotas.sort((a, b) => a.k - b.k);
    // Solo las compras que tienen una cuota en el mes que se está mirando
    const delMes = g.cuotas.find((c) => c.fecha.startsWith(prefijo));
    if (!delMes) continue;
    const actual = delMes;
    totalMes += montoBase(delMes.m);
    const restan = g.cuotas.filter((c) => c.k > actual.k && c.estado === "pendiente").reduce((acc, c) => acc + montoBase(c.m), 0);
    filas.push({ g, actual, restan, pct: Math.round((actual.k / g.n) * 100) });
  }
  $("cuotasTotalMes").textContent = formatoMonto(totalMes);
  if (!filas.length) { cont.innerHTML = `<div class="vacio">${escapeHTML(t(grupos.size ? "cuotasVacioMes" : "cuotasVacio"))}</div>`; return; }
  filas.sort((a, b) => a.actual.fecha.localeCompare(b.actual.fecha));
  cont.innerHTML = filas.map(({ g, actual, restan, pct }) => `
    <div class="cuota-tarjeta">
      <div class="cuota-fila">
        <div class="mov-icono gasto" style="--cat-h:${tonoCategoria(g.categoria)}" aria-hidden="true">${iconoCategoria(g.categoria) || svgIcono("tarjeta")}</div>
        <div class="cuota-txt">
          <b>${escapeHTML(g.base || g.categoria)}</b>
          <span>${escapeHTML(t("cuotaXdeN").replace("{k}", actual.k).replace("{n}", g.n))} · ${escapeHTML(g.cuenta || "")}</span>
        </div>
        <div class="cuota-monto">-${escapeHTML(formatoMonto(montoBase(actual.m)))}</div>
      </div>
      <div class="cuota-barra"><div style="width:${pct}%"></div></div>
      <div class="cuota-restan">${escapeHTML(t("cuotasRestan"))} <b>${escapeHTML(formatoMonto(restan))}</b></div>
    </div>`).join("");
}
document.querySelectorAll('[data-config="configPanelCuotas"]').forEach((b) => b.addEventListener("click", renderCuotas));

// ---------- Tamaño de letra ----------
function letraGuardada() { try { const l = localStorage.getItem("fs_letra"); return l === "grande" || l === "muy" ? l : "normal"; } catch { return "normal"; } }
function aplicarLetra(v) {
  try { localStorage.setItem("fs_letra", v); } catch {}
  if (v === "grande" || v === "muy") document.documentElement.setAttribute("data-letra", v);
  else document.documentElement.removeAttribute("data-letra");
  document.querySelectorAll("[data-letra-opcion]").forEach((b) => b.classList.toggle("activo", b.dataset.letraOpcion === v));
}
document.querySelectorAll("[data-letra-opcion]").forEach((b) => b.addEventListener("click", () => aplicarLetra(b.dataset.letraOpcion)));
aplicarLetra(letraGuardada());

// Primera vez: pregunta en qué moneda lleva sus cuentas y devuelve el código (ARS, USD, EUR, BRL...)
function elegirMonedaInicial() {
  return new Promise((resolve) => {
    const pref = { es: "ARS", pt: "BRL", en: "USD" }[idiomaActual] || "ARS";
    const cat = todasLasMonedas();
    const nombre = (c) => (cat.find((m) => m.codigo === c) || {}).nombre || c;
    const simb = (c) => (CATALOGO_MONEDAS.find((m) => m.codigo === c) || {}).simbolo || c;
    const cods = ["ARS", "USD", "EUR"];
    if (!cods.includes(pref)) cods.unshift(pref);
    let elegida = pref;
    const lista = $("monedaIniLista"), sel = $("monedaIniSelect");
    const pintar = () => {
      lista.innerHTML = "";
      cods.forEach((c) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "moneda-ini-op" + (c === elegida ? " activo" : "");
        b.setAttribute("aria-pressed", c === elegida ? "true" : "false");
        b.innerHTML = '<span class="moneda-ini-sim"></span><span class="moneda-ini-txt"><b></b><small></small></span><span class="moneda-ini-radio" aria-hidden="true"></span>';
        b.querySelector(".moneda-ini-sim").textContent = simb(c);
        b.querySelector("b").textContent = nombre(c);
        b.querySelector("small").textContent = c;
        b.onclick = () => { elegida = c; pintar(); };
        lista.appendChild(b);
      });
    };
    sel.innerHTML = CATALOGO_MONEDAS.map((m) => `<option value="${m.codigo}">${escapeHTML(nombre(m.codigo))} (${m.codigo})</option>`).join("");
    sel.hidden = true;
    $("monedaIniOtras").hidden = false;
    $("monedaIniOtras").onclick = () => { sel.hidden = false; sel.value = elegida; $("monedaIniOtras").hidden = true; sel.focus(); };
    sel.onchange = () => { elegida = sel.value; if (!cods.includes(elegida)) cods.push(elegida); pintar(); };
    $("monedaIniSeguir").onclick = () => { $("pantallaMoneda").hidden = true; document.body.classList.remove("voz-abierta"); resolve(elegida); };
    pintar();
    $("pantallaMoneda").hidden = false;
  });
}

// Ojito: oculta los saldos (se desenfocan) y recuerda la elección en este aparato
function ocultarGuardado() { try { return localStorage.getItem("fs_ocultar") === "1"; } catch (e) { return false; } }
function aplicarOcultar(v) {
  if (v) document.documentElement.setAttribute("data-ocultar", "1");
  else document.documentElement.removeAttribute("data-ocultar");
  try { localStorage.setItem("fs_ocultar", v ? "1" : "0"); } catch (e) {}
  const b = $("btnOjo");
  if (b) { b.innerHTML = svgIcono(v ? "ojoOff" : "ojo"); b.setAttribute("aria-pressed", v ? "true" : "false"); }
}
$("btnOjo").addEventListener("click", () => aplicarOcultar(!ocultarGuardado()));
aplicarOcultar(ocultarGuardado());

// ---------- Tema claro / oscuro ----------
function temaGuardado() { try { return localStorage.getItem("fs_tema") || "auto"; } catch { return "auto"; } }
function aplicarTema(t) {
  try { localStorage.setItem("fs_tema", t); } catch {}
  const oscuro = t === "oscuro" || (t === "auto" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-tema", oscuro ? "oscuro" : "claro");
  document.querySelectorAll("[data-tema-opcion]").forEach((b) => b.classList.toggle("activo", b.dataset.temaOpcion === t));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", oscuro ? "#0B1411" : "#2F6F5E");
}
document.querySelectorAll("[data-tema-opcion]").forEach((b) => b.addEventListener("click", () => aplicarTema(b.dataset.temaOpcion)));
if (window.matchMedia) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const alCambiar = () => { if (temaGuardado() === "auto") aplicarTema("auto"); };
  if (mq.addEventListener) mq.addEventListener("change", alCambiar);
}
aplicarTema(temaGuardado());

// El mes se achica (o pasa a nombre corto) si no entra entre las flechas, para que nunca se pise.
function ajustarMes() {
  const el = $("etiquetaMes");
  if (!el) return;
  const caja = el.closest(".mes-centro");
  if (!caja) return;
  el.style.fontSize = "";
  el.textContent = nombreMes(fechaVista);
  const sobra = () => caja.scrollWidth > caja.clientWidth + 1;
  let fs = parseFloat(getComputedStyle(el).fontSize) || 15;
  let n = 0;
  while (sobra() && fs > 10.5 && n++ < 24) { fs -= 0.5; el.style.fontSize = fs + "px"; }
  if (sobra()) {
    const locale = LOCALES_POR_IDIOMA[idiomaActual] || "es-AR";
    const corto = fechaVista.toLocaleString(locale, { month: "short", year: "numeric" }).replace(".", "");
    el.textContent = corto.charAt(0).toUpperCase() + corto.slice(1);
    el.style.fontSize = "";
    fs = parseFloat(getComputedStyle(el).fontSize) || 15;
    n = 0;
    while (sobra() && fs > 10.5 && n++ < 24) { fs -= 0.5; el.style.fontSize = fs + "px"; }
  }
  if (typeof ajustarFechaHoy === "function") ajustarFechaHoy();
}
// La línea "Hoy: vie, 27 nov": se achica y, si aun así no entra, queda solo "vie, 27 nov".
function ajustarFechaHoy() {
  const f = $("fechaHoy");
  const caja = f && f.closest(".mes-centro");
  if (!caja || !caja.clientWidth) return;
  mostrarFechaHoy();
  f.style.fontSize = "";
  const sobra = () => caja.scrollWidth > caja.clientWidth + 1;
  let fs = parseFloat(getComputedStyle(f).fontSize) || 11, n = 0;
  while (sobra() && fs > 10 && n++ < 12) { fs -= 0.5; f.style.fontSize = fs + "px"; }
  if (sobra()) {
    f.textContent = f.textContent.replace(/^[^:]*:\s*/, "");
    f.style.fontSize = "";
    fs = parseFloat(getComputedStyle(f).fontSize) || 11; n = 0;
    while (sobra() && fs > 9.5 && n++ < 12) { fs -= 0.5; f.style.fontSize = fs + "px"; }
  }
}
// Celular (menos de 700 px): Ingresos y Gastos van adentro de la tarjeta verde, como dos recuadros chicos. En pantallas grandes, en su propia fila.
function ubicarResumen() {
  const fila = document.querySelector(".resumen-tarjetas-fila");
  const verde = document.querySelector(".tarjeta-resumen-balance");
  const cont = document.querySelector(".resumen-tarjetas");
  if (!fila || !verde || !cont) return;
  const chico = window.innerWidth < 700;
  if (chico && fila.parentNode !== verde) { verde.appendChild(fila); verde.classList.add("con-fila"); }
  else if (!chico && fila.parentNode !== cont) { cont.appendChild(fila); verde.classList.remove("con-fila"); }
}
ubicarResumen();
window.addEventListener("resize", ubicarResumen);
window.addEventListener("resize", () => { if (typeof ajustarMes === "function" && usuario) ajustarMes(); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (usuario) ajustarMes(); });

function renderMovimientos() {
  ajustarMes(); if (window.ajustarAccesos) window.ajustarAccesos();
  const cont = $("listaMovimientos");
  const visibles = movimientos.filter(pasaBusqueda);
  const hayBusqueda = !!($("textoBusqueda") && $("textoBusqueda").value.trim());
  const trVisibles = tipoFiltroActivo === "todo" && !hayBusqueda ? transferenciasMes : [];

  if (!movimientos.length && !transferenciasMes.length) {
    cont.innerHTML = `<div class="vacio-lindo">
      <div class="vacio-lindo-ic" aria-hidden="true"><svg class="ic-linea" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 14.5h2"/><path d="M6 6V5a2 2 0 0 1 2-2h9"/></svg></div>
      <h3>${escapeHTML(t("vacioTitulo"))}</h3>
      <p>${escapeHTML(t("vacioTexto"))}</p>
      <button type="button" class="vacio-btn-voz" data-vacio="voz">🎙️ ${escapeHTML(t("vacioVoz"))}</button>
      <button type="button" class="vacio-btn-mano" data-vacio="mano">${escapeHTML(t("vacioMano"))}</button>
      <button type="button" class="vacio-btn-guia" data-ver-bienvenida>${escapeHTML(t("bienvVer"))}</button>
    </div>`;
    return;
  }
  if (!visibles.length && !trVisibles.length) {
    cont.innerHTML = `<div class="vacio">${t("movSinResultados")}</div>`;
    return;
  }
  const clave = claveMesVista();
  const filaInterna = (x) => `
      <div class="mov-item mov-interno" data-transf="${x.id}">
        <div class="mov-icono interno" role="img" aria-label="${escapeHTML(t("movInterno"))}">↔</div>
        <div class="mov-info">
          <div class="mov-categoria">${escapeHTML(t("movInterno"))}</div>
          <div class="mov-detalle">${escapeHTML(x.cuenta_origen)} → ${escapeHTML(x.cuenta_destino)}</div>
          <div class="mov-fecha">${formatoFecha(x.fecha)}</div>
        </div>
        <div class="mov-derecha"><div class="mov-monto interno">${escapeHTML(formatoMontoMoneda(Number(x.monto_origen), monedaDeCuentaNombre(x.cuenta_origen)))}</div></div>
      </div>`;
  const pendTr = trVisibles.slice().sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));
  // Movimientos agrupados por día: un título "Hoy", "Ayer" o la fecha, en vez de repetirla en cada fila.
  let diaActual = null;
  const titDia = (f) => {
    if (f === diaActual) return "";
    diaActual = f;
    return `<div class="dia-titulo">${escapeHTML(tituloDia(f))}</div>`;
  };
  const conTitulo = (x) => titDia(String(x.fecha)) + filaInterna(x);
  // Lo que ya pasó (hoy y antes) va arriba, de lo más nuevo a lo más viejo. Lo que viene (cuotas futuras) va abajo, bajo "Próximas".
  const hoyS = hoyISO();
  const pas = visibles.filter((m) => String(m.fecha) <= hoyS);
  const fut = visibles.filter((m) => String(m.fecha) > hoyS).sort((x, y) => String(x.fecha).localeCompare(String(y.fecha)));
  const trPas = pendTr.filter((x) => String(x.fecha) <= hoyS);
  const trFut = pendTr.filter((x) => String(x.fecha) > hoyS).reverse();
  const armar = (lista, trl, asc) => { diaActual = null; return lista.map((m) => {
    let antes = "";
    while (trl.length && (asc ? String(trl[0].fecha) <= String(m.fecha) : String(trl[0].fecha) >= String(m.fecha))) antes += conTitulo(trl.shift());
    antes += titDia(String(m.fecha));
    const esGasto = m.tipo === "Gasto";
    const papel = papelEnMes(m, clave);
    const badge = badgeMovimiento(m, papel);
    const clases = "mov-item"
      + (papel === "origen" ? " mov-origen" : "")
      + (papel === "pago" && esPendiente(m) ? " mov-pendiente" : "");
    const botonCerrar = !modoClasificar && papel === "pago" && esPendiente(m)
      ? `<button type="button" class="boton boton-secundario pend-cerrar" data-id="${m.id}">${escapeHTML(t(esGasto ? "pendMarcarPagado" : "pendMarcarCobrado"))}</button>`
      : "";
    const chk = modoClasificar ? `<input type="checkbox" class="clasif-chk" data-chk="${m.id}" ${clasifSel.has(m.id) ? "checked" : ""} aria-label="${escapeHTML(m.categoria)}">` : "";
    return antes + `
      <div class="${clases}${modoClasificar && clasifSel.has(m.id) ? " clasif-marcado" : ""}" data-id="${m.id}">${chk}
        <div class="mov-icono ${esGasto ? "gasto" : "ingreso"}" style="--cat-h:${tonoCategoria(m.categoria)}" role="img" aria-label="${esGasto ? t("segGasto") : t("segIngreso")}">${iconoCategoria(m.categoria) || (esGasto ? "↓" : "↑")}</div>
        <div class="mov-info">
          <div class="mov-categoria">${escapeHTML(m.categoria)}${m.comprobante ? " 📎" : ""}</div>
          <div class="mov-detalle">${escapeHTML(m.cuenta)}${m.detalle ? " · " + escapeHTML(m.detalle) : ""}</div>
          <div class="mov-fecha">${formatoFecha(m.fecha)}</div>
          ${badge ? `<div class="mov-badge ${badge.clase}">${escapeHTML(badge.texto)}</div>` : ""}
        </div>
        <div class="mov-derecha">
          <div class="mov-monto ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "-" : "+"}${escapeHTML(formatoMontoMov(m))}</div>${equivMovHTML(m)}
          ${botonCerrar}
        </div>
      </div>`;
  }).join("") + trl.map(conTitulo).join(""); };
  cont.innerHTML = armar(pas, trPas, false)
    + ((fut.length || trFut.length) ? `<div class="proximas-titulo">${escapeHTML(t("tituloProximas"))}</div>` + armar(fut, trFut, true) : "");

  ajustarAnchoCategorias();
  cont.querySelectorAll(".mov-item:not(.mov-interno)").forEach((el) => {
    el.addEventListener("click", () => {
      if (modoClasificar) return clasifAlternar(el.dataset.id);
      abrirModalEditar(el.dataset.id);
    });
  });
  cont.querySelectorAll(".mov-interno").forEach((el) => {
    el.addEventListener("click", async () => {
      if (modoClasificar) return;
      if (!confirm(t("movInternoBorrar"))) return;
      try { await borrarTransferencia(el.dataset.transf); await cargarMesActual(); mostrarToast(t("movInternoBorrada")); }
      catch (err) { mostrarToast(traducirErrorDatos(err)); }
    });
  });
  cont.querySelectorAll(".pend-cerrar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      cerrarPendiente(btn.dataset.id);
    });
  });
}

// ============================================================
// RENDER: Análisis (Mes actual / Resumen anual / Acumulado)
// ============================================================
function calcularResumenLista(lista) {
  let ing = 0, gas = 0;
  lista.forEach((m) => {
    if (m.tipo === "Ingreso") ing += montoBase(m);
    else gas += montoBase(m);
  });
  return { ing, gas, balance: ing - gas };
}

function renderResumenAnalisis(lista) {
  const { ing, gas, balance } = calcularResumenLista(lista);
  $("analisisBalance").textContent = formatoMonto(balance);
  $("analisisIngresos").textContent = formatoMonto(ing);
  $("analisisGastos").textContent = formatoMonto(gas);
}

let tipoAnalisis = "Gasto";
let ultimaListaAnalisis = [];

function renderCategoriasAnalisis(lista, tipo) {
  const cont = $("listaAnalisis");
  const esGasto = tipo === "Gasto";
  $("tituloListaAnalisis").textContent = esGasto ? t("tituloGastosPorCategoria") : t("tituloIngresosPorCategoria");
  const porCategoria = {};
  let total = 0;
  lista.filter((m) => m.tipo === tipo).forEach((m) => {
    porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + montoBase(m);
    total += montoBase(m);
  });
  const entradas = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  if (!entradas.length) {
    cont.innerHTML = `
      <div class="grafico-dona grafico-dona-vacio"></div>
      <div class="vacio">${esGasto ? t("analisisSinGastos") : t("analisisSinIngresos")}</div>`;
    return;
  }
  const colores = esGasto
    ? ["#FF8A6B", "#7DB8FF", "#F2C230", "#4C8DF6", "#A46BF5", "#FF5D8F", "#22B8CF", "#8BC34A"]
    : ["#1FB58F", "#22B8CF", "#4C8DF6", "#F2B731", "#A46BF5", "#FF6B4A", "#8BC34A", "#FF5D8F"];
  let acumulado = 0;
  const segmentos = entradas.map(([, monto], i) => {
    const pct = (monto / total) * 100;
    const desde = acumulado;
    acumulado += pct;
    return `${colores[i % colores.length]} ${desde}% ${acumulado}%`;
  }).join(", ");

  const leyenda = entradas.map(([cat, monto], i) => {
    const pct = total > 0 ? (monto / total) * 100 : 0;
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
        <span class="grafico-dona-total">${formatoMonto(total)}</span>
        <span class="grafico-dona-label">${esGasto ? t("lblTotalGastos") : t("lblTotalIngresos")}</span>
      </div>
    </div>
    ${leyenda}`;
}

async function renderVistaAnalisis() {
  let lista;
  // El Análisis cuenta solo lo que ya se pagó/cobró, en el mes en que se pagó.
  if (periodoAnalisis === "anio") {
    const anio = String(fechaVista.getFullYear());
    lista = soloContables(await listarMovimientosDelAnio(usuario.id, fechaVista.getFullYear()))
      .filter((m) => m.fecha.startsWith(anio));
  } else if (periodoAnalisis === "todo") {
    lista = soloContables(await listarTodosLosMovimientos(usuario.id));
  } else {
    lista = contablesDelMes(movimientos, claveMesVista());
  }
  ultimaListaAnalisis = lista;
  renderResumenAnalisis(lista);
  renderCategoriasAnalisis(lista, tipoAnalisis);
  await cargarPresupuesto();
  if (subVistaAnalisis === "presupuesto") renderPresupuesto();
}

document.querySelectorAll("#segmentadoAnalisis .segmentado-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#segmentadoAnalisis .segmentado-item").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    periodoAnalisis = btn.dataset.periodo;
    renderVistaAnalisis();
  });
});

document.querySelectorAll("#segmentadoTipoAnalisis .segmentado-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#segmentadoTipoAnalisis .segmentado-item").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    tipoAnalisis = btn.dataset.tipoAnalisis;
    renderCategoriasAnalisis(ultimaListaAnalisis, tipoAnalisis);
  });
});

// ============================================================
// RENDER: Análisis — Evolución mensual / Día a día
// ============================================================
let subVistaAnalisis = "categorias";
const NOMBRES_MES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function agruparPorMes(lista) {
  const porMes = {};
  lista.forEach((m) => {
    const clave = m.fecha.slice(0, 7);
    if (!porMes[clave]) porMes[clave] = { ing: 0, gas: 0 };
    if (m.tipo === "Ingreso") porMes[clave].ing += montoBase(m);
    else porMes[clave].gas += montoBase(m);
  });
  return porMes;
}

function abreviarNumero(n) {
  const signo = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1e6) return signo + (abs / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (abs >= 1e3) return signo + (abs / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return signo + Math.round(abs);
}

async function renderEvolucionMensual() {
  const cont = $("graficoEvolucion");
  const todos = soloContables(await listarTodosLosMovimientos(usuario.id));
  if (!todos.length) {
    cont.innerHTML = `<div class="vacio" data-i18n="analisisSinDatos">${escapeHTML(t("analisisSinDatos"))}</div>`;
    $("evolBalance").textContent = "—";
    $("evolIngresos").textContent = "—";
    $("evolGastos").textContent = "—";
    return;
  }
  const porMes = agruparPorMes(todos);
  const claves = Object.keys(porMes).sort().slice(-6);
  const max = Math.max(1, ...claves.map((c) => Math.max(porMes[c].ing, porMes[c].gas)));

  const totIng = claves.reduce((s, c) => s + porMes[c].ing, 0);
  const totGas = claves.reduce((s, c) => s + porMes[c].gas, 0);
  $("evolBalance").textContent = formatoMonto(totIng - totGas);
  $("evolIngresos").textContent = formatoMonto(totIng);
  $("evolGastos").textContent = formatoMonto(totGas);

  const ejeY = `
    <div class="grafico-eje-y">
      <span>${abreviarNumero(max)}</span>
      <span>${abreviarNumero(max / 2)}</span>
      <span>0</span>
    </div>`;

  const barras = claves.map((clave) => {
    const [anio, mes] = clave.split("-");
    const { ing, gas } = porMes[clave];
    const altoIng = Math.max(2, Math.round((ing / max) * 100));
    const altoGas = Math.max(2, Math.round((gas / max) * 100));
    const neto = ing - gas;
    const label = `${NOMBRES_MES_CORTO[Number(mes) - 1]} ${anio.slice(2)}`;
    return `
      <div class="barra-mes" title="${escapeHTML(label)}: ${t("lblIngresos")} ${formatoMonto(ing)} · ${t("lblGastos")} ${formatoMonto(gas)}">
        <div class="barra-par">
          <div class="barra barra-ingreso" style="height:${altoIng}%"></div>
          <div class="barra barra-gasto" style="height:${altoGas}%"></div>
        </div>
        <span class="barra-mes-label">${escapeHTML(label)}</span>
        <span class="barra-mes-neto ${neto >= 0 ? "color-ingreso" : "color-gasto"}">${neto >= 0 ? "+" : ""}${abreviarNumero(neto)}</span>
      </div>`;
  }).join("");

  cont.innerHTML = `
    <div class="grafico-barras-fila">
      ${ejeY}
      <div class="grafico-barras">${barras}</div>
    </div>
    <div class="grafico-leyenda">
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#1FB58F"></span>${t("lblIngresos")}</span>
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#FF6B4A"></span>${t("lblGastos")}</span>
    </div>`;
}

function pathSuave(puntos) {
  if (puntos.length < 2) return "";
  let d = `M ${puntos[0][0]},${puntos[0][1]}`;
  for (let i = 0; i < puntos.length - 1; i++) {
    const [x0, y0] = puntos[i];
    const [x1, y1] = puntos[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q ${x0},${y0} ${mx},${my}`;
  }
  const [xu, yu] = puntos[puntos.length - 1];
  d += ` L ${xu},${yu}`;
  return d;
}

function renderDiaADia() {
  const cont = $("graficoDiaADia");
  const delMes = contablesDelMes(movimientos, claveMesVista());
  const { ing: totIng, gas: totGas, balance } = calcularResumenLista(delMes);
  $("diaBalance").textContent = formatoMonto(balance);
  $("diaIngresos").textContent = formatoMonto(totIng);
  $("diaGastos").textContent = formatoMonto(totGas);

  if (!delMes.length) {
    cont.innerHTML = `<div class="vacio" data-i18n="analisisSinDatos">${escapeHTML(t("analisisSinDatos"))}</div>`;
    return;
  }
  const anio = fechaVista.getFullYear();
  const mes = fechaVista.getMonth();
  const ultimoDia = new Date(anio, mes + 1, 0).getDate();

  const porDia = {};
  for (let d = 1; d <= ultimoDia; d++) porDia[d] = { ing: 0, gas: 0 };
  delMes.forEach((m) => {
    const dia = Number(m.fecha.slice(8, 10));
    if (!porDia[dia]) return;
    if (m.tipo === "Ingreso") porDia[dia].ing += montoBase(m);
    else porDia[dia].gas += montoBase(m);
  });

  let accIng = 0, accGas = 0;
  const valoresIng = [], valoresGas = [];
  for (let d = 1; d <= ultimoDia; d++) {
    accIng += porDia[d].ing;
    accGas += porDia[d].gas;
    valoresIng.push(accIng);
    valoresGas.push(accGas);
  }
  const max = Math.max(1, accIng, accGas);
  const ancho = 320, alto = 190, padIzq = 8, padDer = 8, padArriba = 12, padAbajo = 26;
  const baseY = alto - padAbajo;
  const pasoX = (ancho - padIzq - padDer) / (ultimoDia - 1 || 1);
  const x = (i) => padIzq + i * pasoX;
  const y = (v) => baseY - (v / max) * (baseY - padArriba);

  const puntosIng = valoresIng.map((v, i) => [x(i), y(v)]);
  const puntosGas = valoresGas.map((v, i) => [x(i), y(v)]);
  const lineaIng = pathSuave(puntosIng);
  const lineaGas = pathSuave(puntosGas);
  const areaIng = `${lineaIng} L ${x(ultimoDia - 1)},${baseY} L ${x(0)},${baseY} Z`;
  const areaGas = `${lineaGas} L ${x(ultimoDia - 1)},${baseY} L ${x(0)},${baseY} Z`;

  const gridY = [0, 0.5, 1].map((f) => {
    const yy = baseY - f * (baseY - padArriba);
    return `
      <line x1="${padIzq}" y1="${yy}" x2="${ancho - padDer}" y2="${yy}" stroke="#E4DDD1" stroke-width="1" />
      <text x="${padIzq}" y="${yy - 3}" font-size="9" fill="#6B7580">${abreviarNumero(max * f)}</text>`;
  }).join("");

  const diasEtiqueta = ultimoDia >= 20
    ? [1, Math.round(ultimoDia * 0.5), ultimoDia]
    : [1, ultimoDia];
  const ejeX = diasEtiqueta.map((d) => `
    <text x="${x(d - 1)}" y="${alto - 8}" font-size="9" fill="#6B7580" text-anchor="${d === 1 ? "start" : d === ultimoDia ? "end" : "middle"}">${d}</text>`).join("");

  cont.innerHTML = `
    <svg viewBox="0 0 ${ancho} ${alto}">
      <defs>
        <linearGradient id="gradIngreso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1FB58F" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#1FB58F" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="gradGasto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FF6B4A" stop-opacity="0.30" />
          <stop offset="100%" stop-color="#FF6B4A" stop-opacity="0" />
        </linearGradient>
      </defs>
      ${gridY}
      <path d="${areaGas}" fill="url(#gradGasto)" stroke="none" />
      <path d="${areaIng}" fill="url(#gradIngreso)" stroke="none" />
      <path class="linea-anim" d="${lineaGas}" fill="none" stroke="#FF6B4A" stroke-width="3.5" stroke-linecap="round" />
      <path class="linea-anim" d="${lineaIng}" fill="none" stroke="#1FB58F" stroke-width="3.5" stroke-linecap="round" />
      ${ejeX}
    </svg>
    <div class="grafico-leyenda">
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#1FB58F"></span>${t("lblIngresos")} ${formatoMonto(accIng)}</span>
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#FF6B4A"></span>${t("lblGastos")} ${formatoMonto(accGas)}</span>
    </div>`;
}

function actualizarSubVistaAnalisis() {
  $("subVistaCategorias").hidden = subVistaAnalisis !== "categorias";
  $("subVistaEvolucion").hidden = subVistaAnalisis !== "evolucion";
  $("subVistaDiaADia").hidden = subVistaAnalisis !== "diaadia";
  $("subVistaPresupuesto").hidden = subVistaAnalisis !== "presupuesto";
  if (subVistaAnalisis === "presupuesto") renderPresupuesto();
  if (subVistaAnalisis === "evolucion") renderEvolucionMensual();
  if (subVistaAnalisis === "diaadia") renderDiaADia();
}

document.querySelectorAll("#segmentadoVistaAnalisis .segmentado-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#segmentadoVistaAnalisis .segmentado-item").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    subVistaAnalisis = btn.dataset.vistaAnalisis;
    actualizarSubVistaAnalisis();
  });
});




// ============================================================
// TENGO: saldo por cuenta y transferencias entre cuentas
// ============================================================
let transferencias = [];
let tengoDisponible = null; // null = sin comprobar, false = faltan las tablas/columnas en Supabase
let tengoCalculo = null;    // { filas: [{cuenta, moneda, saldo, id}], total, sinCotiz: [moneda] }
let tengoUsuario = null;

async function cargarTengo() {
  if (!usuario) return;
  await cargarPrestamos();
  if (tengoUsuario !== usuario.id) { tengoUsuario = usuario.id; tengoDisponible = null; tengoCalculo = null; }
  try {
    const tr = await listarTransferencias(usuario.id);
    if (tr && tr.noDisponible) { tengoDisponible = false; tengoCalculo = null; return; }
    if (cuentas.some((c) => c.saldo_inicial === undefined)) { tengoDisponible = false; tengoCalculo = null; return; }
    transferencias = tr;
    const todos = soloContables(await listarTodosLosMovimientos(usuario.id));
    const saldos = {};
    cuentas.forEach((c) => { saldos[c.nombre] = Number(c.saldo_inicial) || 0; });
    todos.forEach((m) => { if (m.cuenta in saldos) saldos[m.cuenta] += (m.tipo === "Ingreso" ? 1 : -1) * Number(m.monto); });
    transferencias.forEach((x) => {
      if (x.cuenta_origen in saldos) saldos[x.cuenta_origen] -= Number(x.monto_origen);
      if (x.cuenta_destino in saldos) saldos[x.cuenta_destino] += Number(x.monto_destino);
    });
    // Préstamos: al prestar sale plata de la cuenta (o entra, si me prestaron); cada devolución hace lo contrario.
    prestamos.forEach((p) => { if (p.cuenta in saldos) saldos[p.cuenta] += (p.sentido === "me_deben" ? -1 : 1) * Number(p.monto); });
    prestamoPagos.forEach((g) => {
      const p = prestamos.find((x) => x.id === g.prestamo_id);
      if (p && g.cuenta in saldos) saldos[g.cuenta] += (p.sentido === "me_deben" ? 1 : -1) * Number(g.monto);
    });
    const base = monedaBase(), cot = { ...leerCotiz() };
    // Los dólares se valúan al dólar oficial del Banco Nación (venta); si no se puede consultar, se usa el último valor guardado.
    let refUSD = null;
    if (base === "ARS" && cuentas.some((c) => c.moneda === "USD")) {
      const d = await obtenerDolarBNA();
      if (d && d.venta > 0) { cot.USD = d.venta; refUSD = d.venta; }
    }
    let total = 0; const sinCotiz = [];
    const filas = cuentas.map((c) => {
      const moneda = c.moneda || base, saldo = Math.round(saldos[c.nombre] * 100) / 100;
      if (moneda === base) total += saldo;
      else if (Number(cot[moneda]) > 0) total += saldo * Number(cot[moneda]);
      else if (saldo !== 0 && !sinCotiz.includes(moneda)) sinCotiz.push(moneda);
      return { id: c.id, cuenta: c.nombre, moneda, saldo };
    });
    tengoCalculo = { filas, total, sinCotiz, refUSD, cotUsada: cot };
    tengoDisponible = true;
  } catch { tengoDisponible = false; tengoCalculo = null; }
}

function tengoRefrescarVista() {
  if (vistaActiva === "vistaSituacion") renderSituacion();
}

function formatoMontoMoneda(n, moneda) {
  const d = decimalesDe(n);
  const s = Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  return (moneda === monedaBase() ? "" : moneda + " ") + (moneda === monedaBase() ? formatoMonto(n) : s);
}

function tengoHTML() {
  if (!tengoCalculo) return `<div class="sit-vacio">…</div>`;
  const { filas, total, sinCotiz } = tengoCalculo;
  let h = cuentas.length && cuentas.every((c) => !Number(c.saldo_inicial)) ? `<div class="tengo-cartel">${escapeHTML(t("tengoCartel"))}</div>` : "";
  h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("tengoTotal"))}</span></div><div class="sit-grande ${total < 0 ? "sit-mal" : "sit-bien"}">${escapeHTML(formatoMonto(total))}</div></div>`;
  if (sinCotiz.length) h += `<p class="texto-ayuda">${escapeHTML(t("tengoSinCotiz").replace("{m}", sinCotiz.join(", ")))}</p>`;
  if (tengoCalculo.refUSD) h += `<p class="texto-ayuda">${escapeHTML(t("tengoDolarRef").replace("{v}", formatoMonto(tengoCalculo.refUSD)))}</p>`;
  else if (filas.some((f) => f.moneda !== monedaBase()) && tengoCalculo.cotUsada.USD) h += `<p class="texto-ayuda">${escapeHTML(t("tengoDolarGuardado").replace("{v}", formatoMonto(Number(tengoCalculo.cotUsada.USD))))}</p>`;
  h += `<div class="sit-lista">` + filas.map((f) => `<div class="pend-fila"><div class="pend-info"><div class="pend-cat">${escapeHTML(f.cuenta)}</div>
      <div class="pend-sub">${escapeHTML(f.moneda)}</div></div>
      <div class="pend-derecha"><div class="mov-monto ${f.saldo < 0 ? "gasto" : "ingreso"}">${escapeHTML(formatoMontoMoneda(f.saldo, f.moneda))}</div>
      <button type="button" class="boton boton-secundario pend-cerrar" data-tengo-ajustar="${f.id}">${escapeHTML(t("tengoAjustar"))}</button></div></div>`).join("") + `</div>`;
  h += `<button type="button" class="boton boton-primario boton-ancho" data-tengo-transferir style="margin-top:12px">${escapeHTML(t("tengoTransferir"))}</button>`;
  h += `<p class="texto-ayuda">${escapeHTML(t("tengoNota"))}</p>`;
  if (transferencias.length) {
    h += `<h3 class="titulo-subseccion">${escapeHTML(t("tengoUltimas"))}</h3><div class="sit-lista">` + transferencias.slice(0, 8).map((x) => `<div class="pend-fila"><div class="pend-info">
      <div class="pend-cat">${escapeHTML(x.cuenta_origen)} → ${escapeHTML(x.cuenta_destino)}</div><div class="pend-sub">${escapeHTML(formatoFecha(x.fecha))}</div></div>
      <div class="pend-derecha"><div class="mov-monto">${escapeHTML(formatoMontoMoneda(Number(x.monto_origen), monedaDeCuentaNombre(x.cuenta_origen)))}</div>
      <button type="button" class="icono-btn" data-tengo-borrar="${x.id}" aria-label="${escapeHTML(t("fijoBorrar"))}">🗑️</button></div></div>`).join("") + `</div>`;
  }
  return h;
}

// Ventana propia para pedir uno o varios datos (reemplaza los cuadros feos del navegador).
// campos: [{ id, etiqueta, valor, tipo: "texto" | "numero" | "dia" }]. Devuelve {id: valor} o null si se cancela.
function pedirDatos(titulo, campos) {
  return new Promise((resolve) => {
    const modal = $("modalPedir"), form = $("pedirForm");
    $("pedirTitulo").textContent = titulo;
    $("pedirCampos").innerHTML = campos.map((c) =>
      `<label>${escapeHTML(c.etiqueta)}<input id="pedir_${c.id}" type="text" autocomplete="off" inputmode="${c.tipo === "texto" ? "text" : c.tipo === "dia" ? "numeric" : "decimal"}" value="${escapeHTML(c.valor ?? "")}"></label>`).join("");
    $("pedirError").hidden = true;
    modal.hidden = false;
    const primero = $("pedir_" + campos[0].id);
    setTimeout(() => { primero.focus(); primero.select(); }, 50);
    let listo = false;
    const cerrar = (res) => {
      if (listo) return; listo = true;
      modal.hidden = true;
      form.onsubmit = null; $("pedirCancelar").onclick = null; $("pedirCerrar").onclick = null; modal.onclick = null;
      resolve(res);
    };
    form.onsubmit = (e) => {
      e.preventDefault();
      const res = {};
      for (const c of campos) {
        const v = $("pedir_" + c.id).value.trim();
        if (c.tipo === "numero") {
          const n = numeroDesdeTexto(v);
          if (!Number.isFinite(n)) { $("pedirError").textContent = t("pedirNumero"); $("pedirError").hidden = false; return; }
          res[c.id] = n;
        } else if (c.tipo === "dia") {
          const n = parseInt(v, 10);
          if (!Number.isInteger(n) || n < 1 || n > 31) { $("pedirError").textContent = t("pedirNumero"); $("pedirError").hidden = false; return; }
          res[c.id] = n;
        } else {
          if (!v) { $("pedirError").textContent = t("fijoError"); $("pedirError").hidden = false; return; }
          res[c.id] = v;
        }
      }
      cerrar(res);
    };
    $("pedirCancelar").onclick = () => cerrar(null);
    $("pedirCerrar").onclick = () => cerrar(null);
    modal.onclick = (e) => { if (e.target === modal) cerrar(null); };
  });
}

async function tengoAjustar(id) {
  const f = tengoCalculo?.filas.find((x) => x.id === id);
  const c = cuentas.find((x) => x.id === id);
  if (!f || !c) return;
  const r = await pedirDatos(t("tengoAjustarPide").replace("{c}", f.cuenta), [{ id: "saldo", etiqueta: t("tengoAjustarPide").replace("{c}", f.cuenta), valor: String(f.saldo).replace(".", ","), tipo: "numero" }]);
  if (!r) return;
  const nuevo = r.saldo;
  try {
    await actualizarSaldoInicial(id, Math.round(((Number(c.saldo_inicial) || 0) + (nuevo - f.saldo)) * 100) / 100);
    await cargarCuentasYCategorias();
    await cargarTengo();
    tengoRefrescarVista();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
}

let trMovId = null; // movimiento que esta transferencia va a reemplazar (si viene de "Es un movimiento interno")
function abrirTransferencia(pre) {
  if (cuentas.length < 2) return mostrarToast(t("tengoNecesitaDos"));
  trMovId = pre && pre.movId ? pre.movId : null;
  $("trAvisoMov").hidden = !trMovId;
  const op = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}${c.moneda && c.moneda !== monedaBase() ? " (" + escapeHTML(c.moneda) + ")" : ""}</option>`).join("");
  $("trDesde").innerHTML = op; $("trHacia").innerHTML = op;
  $("trHacia").selectedIndex = 1;
  $("trMonto").value = ""; $("trMontoDestino").value = "";
  $("trFecha").value = hoyISO();
  if (pre) {
    if (pre.desde) $("trDesde").value = pre.desde;
    if (pre.hacia) $("trHacia").value = pre.hacia;
    if (pre.desde && !pre.hacia) $("trHacia").value = (cuentas.find((c) => c.nombre !== pre.desde) || cuentas[0]).nombre;
    if (pre.hacia && !pre.desde) $("trDesde").value = (cuentas.find((c) => c.nombre !== pre.hacia) || cuentas[0]).nombre;
    if (pre.monto) $("trMonto").value = pre.monto;
    if (pre.fecha) $("trFecha").value = pre.fecha;
  }
  $("trError").hidden = true;
  trSincronizar();
  $("modalTransfer").hidden = false;
}
function cerrarTransferencia() { $("modalTransfer").hidden = true; }

function trSincronizar() {
  const mo = monedaDeCuentaNombre($("trDesde").value), md = monedaDeCuentaNombre($("trHacia").value);
  $("trFilaDestino").hidden = mo === md;
  $("trLabelDestino").textContent = t("trMontoDestino").replace("{m}", md);
}
$("trDesde").addEventListener("change", trSincronizar);
$("trHacia").addEventListener("change", trSincronizar);
$("btnCerrarTransfer").addEventListener("click", cerrarTransferencia);
$("modalTransfer").addEventListener("click", (e) => { if (e.target === $("modalTransfer")) cerrarTransferencia(); });

$("formTransfer").addEventListener("submit", async (e) => {
  e.preventDefault();
  const desde = $("trDesde").value, hacia = $("trHacia").value;
  if (desde === hacia) return mostrarAviso($("trError"), t("trErrIguales"));
  const mo = numeroDesdeTexto($("trMonto").value);
  const distinta = monedaDeCuentaNombre(desde) !== monedaDeCuentaNombre(hacia);
  const md = distinta ? numeroDesdeTexto($("trMontoDestino").value) : mo;
  if (!Number.isFinite(mo) || mo <= 0 || !Number.isFinite(md) || md <= 0) return mostrarAviso($("trError"), t("trErrMonto"));
  try {
    await crearTransferencia(usuario.id, { fecha: $("trFecha").value || hoyISO(), cuenta_origen: desde, cuenta_destino: hacia, monto_origen: mo, monto_destino: md });
    if (trMovId) {
      const reemplazado = movimientos.find((x) => x.id === trMovId) || pendientes.find((x) => x.id === trMovId);
      await borrarMovimiento(trMovId);
      if (reemplazado && reemplazado.comprobante) borrarComprobante(reemplazado.comprobante);
      trMovId = null;
    }
    cerrarTransferencia();
    await cargarMesActual();
    await cargarTengo();
    tengoRefrescarVista();
    mostrarToast(t("trToast"));
  } catch (err) { mostrarAviso($("trError"), traducirErrorDatos(err)); }
});

// ============================================================
// PRÉSTAMOS: Me deben / Debo, con devoluciones parciales (no cuentan como ingreso ni gasto)
// ============================================================
let prestamos = [], prestamoPagos = [];
let prestamosDisponible = null; // false = faltan las tablas en Supabase (se esconde la función)

async function cargarPrestamos() {
  if (!usuario) return;
  try {
    const r = await listarPrestamos(usuario.id);
    if (r.noDisponible) { prestamosDisponible = false; prestamos = []; prestamoPagos = []; }
    else { prestamosDisponible = true; prestamos = r.prestamos; prestamoPagos = r.pagos; }
  } catch { prestamosDisponible = false; prestamos = []; prestamoPagos = []; }
}
function prRedondeo(n) { return Math.round(n * 100) / 100; }
function prDevuelto(p) { return prRedondeo(prestamoPagos.filter((g) => g.prestamo_id === p.id).reduce((a, g) => a + Number(g.monto), 0)); }
function prPendiente(p) { return Math.max(0, prRedondeo(Number(p.monto) - prDevuelto(p))); }
function prEstado(p) { return prDevuelto(p) <= 0 ? "Pendiente" : prPendiente(p) > 0 ? "Parcial" : "Saldado"; }
function prMoneda(p) { return monedaDeCuentaNombre(p.cuenta); }
function prAbiertos(sentido) { return prestamos.filter((p) => p.sentido === sentido && !p.en_cuotas && prPendiente(p) > 0); }
function prEnCuotasLista() { return prestamos.filter((p) => p.en_cuotas); }
function prBase(p) {
  const mon = prMoneda(p), pend = prPendiente(p);
  if (mon === monedaBase()) return pend;
  const cot = Number(((tengoCalculo && tengoCalculo.cotUsada) || leerCotiz())[mon]);
  return cot > 0 ? pend * cot : 0;
}
function prSuma(sentido) { return prAbiertos(sentido).reduce((a, p) => a + prBase(p), 0); }
function prTextoMonto(n, p) { return formatoMontoMoneda(n, prMoneda(p)); }

function prFilaHTML(p) {
  if (p.en_cuotas) {
    return `<div class="pend-fila pr-fila" data-pr-id="${p.id}">
    <div class="pend-info"><div class="pend-cat">${escapeHTML(p.persona)}</div>
      <div class="pend-sub"><span class="pr-tag pr-pendiente">${escapeHTML(t("prEstCuotas"))}</span></div></div>
    <div class="pend-derecha"><div class="mov-monto pr-monto">${escapeHTML(prTextoMonto(Number(p.monto), p))}</div><div class="mov-equiv">${escapeHTML(t("prRecibido"))}</div></div></div>`;
  }
  const est = prEstado(p);
  const dev = p.fecha_devolucion ? `<div class="pend-venc${diasHasta(p.fecha_devolucion) < 0 && prPendiente(p) > 0 ? " vencido" : ""}">${escapeHTML(textoVencimiento(p.fecha_devolucion))}</div>` : "";
  const parcial = est === "Parcial" ? `<div class="mov-equiv">${escapeHTML(t("prDe"))} ${escapeHTML(prTextoMonto(Number(p.monto), p))}</div>` : "";
  const btn = prPendiente(p) > 0 ? `<button type="button" class="boton boton-secundario pend-cerrar">${escapeHTML(t(p.sentido === "me_deben" ? "prBtnMeDeben" : "prBtnDebo"))}</button>` : "";
  return `<div class="pend-fila pr-fila" data-pr-id="${p.id}">
    <div class="pend-info">
      <div class="pend-cat">${escapeHTML(p.persona)}</div>
      <div class="pend-sub"><span class="pr-tag pr-${est.toLowerCase()}">${escapeHTML(t("prEst" + est))}</span></div>${p.nota ? `<div class="pend-sub">${escapeHTML(p.nota)}</div>` : ""}${dev}
    </div>
    <div class="pend-derecha"><div class="mov-monto pr-monto">${escapeHTML(prTextoMonto(est === "Saldado" ? Number(p.monto) : prPendiente(p), p))}</div>${parcial}${btn}</div></div>`;
}

function prSeccionHTML(sentido) {
  if (prestamosDisponible === false) return "";
  const todos = prestamos.filter((p) => p.sentido === sentido);
  const abiertos = prAbiertos(sentido).sort((a, b) => String(a.fecha_devolucion || "9999").localeCompare(String(b.fecha_devolucion || "9999")));
  const saldados = todos.filter((p) => !p.en_cuotas && prPendiente(p) <= 0).slice(0, 10);
  const encuotas = sentido === "debo" ? prEnCuotasLista() : [];
  let h = `<h3 class="titulo-subseccion">${escapeHTML(t(sentido === "me_deben" ? "prSeccionMeDeben" : "prSeccionDebo"))}</h3>`;
  h += abiertos.length ? `<div class="sit-lista">${abiertos.map(prFilaHTML).join("")}</div>` : `<div class="sit-vacio">${escapeHTML(t("prNada"))}</div>`;
  h += `<button type="button" class="boton boton-primario boton-ancho" data-pr-nuevo="${sentido}" style="margin-top:12px">${escapeHTML(t("prAnotar"))}</button>`;
  if (encuotas.length) h += `<h3 class="titulo-subseccion">${escapeHTML(t("prSeccionCuotas"))}</h3><div class="sit-lista">${encuotas.map(prFilaHTML).join("")}</div>`;
  if (saldados.length) h += `<h3 class="titulo-subseccion">${escapeHTML(t("prSaldados"))}</h3><div class="sit-lista">${saldados.map(prFilaHTML).join("")}</div>`;
  return h;
}

// ----- Nuevo préstamo -----
let prSentidoActual = "me_deben";
function prAplicarSentido(sentido) {
  prSentidoActual = sentido;
  document.querySelectorAll("#segmentadoPrestamo .segmentado-item").forEach((b) => b.classList.toggle("activo", b.dataset.sentido === sentido));
  const md = sentido === "me_deben";
  $("prLabelPersona").textContent = t(md ? "prPersonaMeDeben" : "prPersonaDebo");
  $("prLabelCuenta").textContent = t(md ? "prCuentaSale" : "prCuentaEntra");
  $("prAyudaSentido").textContent = t(md ? "prAyudaMeDeben" : "prAyudaDebo");
  $("prBloqueCuotas").hidden = md;
  if (md && $("prEnCuotas").checked) $("prEnCuotas").checked = false;
  prAplicarCuotas();
}
function prAplicarCuotas() {
  const on = $("prEnCuotas").checked && prSentidoActual === "debo";
  $("prCuotasCampos").hidden = !on;
  $("prLblFechaDev").hidden = on;
  $("prLabelCuenta").textContent = on ? t("prCuentaCuotas") : t(prSentidoActual === "me_deben" ? "prCuentaSale" : "prCuentaEntra");
}
$("prEnCuotas").addEventListener("change", prAplicarCuotas);
function abrirPrestamo(sentido) {
  if (!cuentas.length) return mostrarToast(t("prErrCuenta"));
  $("prCuenta").innerHTML = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}${c.moneda && c.moneda !== monedaBase() ? " (" + escapeHTML(c.moneda) + ")" : ""}</option>`).join("");
  $("prPersona").value = ""; $("prMonto").value = ""; $("prNota").value = ""; $("prFechaDev").value = "";
  $("prFecha").value = hoyISO();
  $("prError").hidden = true;
  $("prEnCuotas").checked = false;
  $("prCuotasN").value = ""; $("prCuotaValor").value = ""; $("prCuotaFecha").value = ""; $("prQuedo").value = "si";
  const catsG = categorias.filter((c) => (c.tipo || "Gasto") === "Gasto");
  $("prCuotaCat").innerHTML = catsG.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
  const catPres = catsG.find((c) => /pr[eé]stamo|empr[eé]stimo|loan/i.test(c.nombre));
  if (catPres) $("prCuotaCat").value = catPres.nombre;
  prAplicarSentido(sentido === "debo" ? "debo" : "me_deben");
  $("modalPrestamo").hidden = false;
}
function cerrarPrestamo() { $("modalPrestamo").hidden = true; }
document.querySelectorAll("#segmentadoPrestamo .segmentado-item").forEach((b) => b.addEventListener("click", () => prAplicarSentido(b.dataset.sentido)));
$("btnCerrarPrestamo").addEventListener("click", cerrarPrestamo);
$("modalPrestamo").addEventListener("click", (e) => { if (e.target === $("modalPrestamo")) cerrarPrestamo(); });

async function prRefrescar() {
  await cargarTengo();
  tengoRefrescarVista();
}

$("formPrestamo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const persona = $("prPersona").value.trim();
  const monto = numeroDesdeTexto($("prMonto").value);
  const cuenta = $("prCuenta").value;
  const fecha = $("prFecha").value || hoyISO();
  const fdev = $("prFechaDev").value || null;
  if (!persona) return mostrarAviso($("prError"), t("prErrPersona"));
  if (!Number.isFinite(monto) || monto <= 0) return mostrarAviso($("prError"), t("prErrMonto"));
  if (!cuenta) return mostrarAviso($("prError"), t("prErrCuenta"));
  if (prSentidoActual === "debo" && $("prEnCuotas").checked) return prGuardarEnCuotas({ persona, monto, cuenta, fecha });
  if (fdev && fdev < fecha) return mostrarAviso($("prError"), t("prErrFechaDev"));
  try {
    await crearPrestamo(usuario.id, { sentido: prSentidoActual, persona, monto: prRedondeo(monto), cuenta, fecha, fecha_devolucion: fdev, nota: $("prNota").value.trim() || null });
    cerrarPrestamo();
    await prRefrescar();
    mostrarToast(t("prToast"));
  } catch (err) { mostrarAviso($("prError"), traducirErrorDatos(err)); }
});

// Préstamo del banco en cuotas: una cuota pendiente por mes (como "Compras en cuotas") y,
// si la plata entró a la cuenta, un préstamo marcado "en cuotas" que solo suma al "Tengo".
async function prGuardarEnCuotas({ persona, monto, cuenta, fecha }) {
  const n = parseInt($("prCuotasN").value, 10);
  const valor = numeroDesdeTexto($("prCuotaValor").value);
  const primera = $("prCuotaFecha").value || fecha;
  const cat = $("prCuotaCat").value;
  if (!Number.isInteger(n) || n < 2 || n > 120) return mostrarAviso($("prError"), t("prErrCuotas"));
  if (!Number.isFinite(valor) || valor <= 0) return mostrarAviso($("prError"), t("prErrCuotaValor"));
  if (!cat) return mostrarAviso($("prError"), t("prErrCuotasCat"));
  if (monedaDeCuentaNombre(cuenta) !== monedaBase()) return mostrarAviso($("prError"), t("prErrCuotasMoneda"));
  const cuotas = [];
  for (let k = 0; k < n; k++) {
    const f = sumarMesesISO(primera, k);
    cuotas.push({ tipo: "Gasto", fecha: f, cuenta, categoria: cat, monto: prRedondeo(valor), moneda: monedaBase(), cotizacion: 1,
      detalle: persona + " · " + t("textoCuota") + " " + (k + 1) + "/" + n, estado: "pendiente", fecha_pago: f });
  }
  const quedo = $("prQuedo").value === "si";
  let creado = false;
  try {
    if (quedo) {
      await crearPrestamo(usuario.id, { sentido: "debo", persona, monto: prRedondeo(monto), cuenta, fecha, fecha_devolucion: null, nota: $("prNota").value.trim() || null, en_cuotas: true });
      creado = true;
    }
    await crearMovimientos(usuario.id, cuotas);
    cerrarPrestamo();
    await cargarMesActual();
    await prRefrescar();
    mostrarToast(t("prToastCuotas").replace("{n}", n));
  } catch (err) {
    if (creado) {
      try {
        await cargarPrestamos();
        const c = prestamos.filter((p) => p.en_cuotas && p.persona === persona && p.fecha === fecha).pop();
        if (c) await borrarPrestamo(c.id);
      } catch (_) {}
    }
    mostrarAviso($("prError"), traducirErrorDatos(err));
  }
}

// ----- Detalle y devoluciones -----
let prDetId = null;
function abrirPrestamoDet(id) {
  prDetId = id;
  renderPrestamoDet();
  $("modalPrestamoDet").hidden = false;
}
function cerrarPrestamoDet() { $("modalPrestamoDet").hidden = true; prDetId = null; }
$("btnCerrarPrestamoDet").addEventListener("click", cerrarPrestamoDet);
$("modalPrestamoDet").addEventListener("click", (e) => { if (e.target === $("modalPrestamoDet")) cerrarPrestamoDet(); });

function renderPrestamoDet() {
  const p = prestamos.find((x) => x.id === prDetId);
  if (!p) return cerrarPrestamoDet();
  const md = p.sentido === "me_deben";
  const est = prEstado(p), pend = prPendiente(p), pagos = prestamoPagos.filter((g) => g.prestamo_id === p.id);
  const mon = prMoneda(p);
  $("pdTitulo").textContent = p.persona;
  const fila = (k, v, cls) => `<div class="pr-linea"><span>${escapeHTML(t(k))}</span><b${cls ? ` class="${cls}"` : ""}>${escapeHTML(v)}</b></div>`;
  if (p.en_cuotas) {
    $("pdCuerpo").innerHTML = `<div><span class="pr-tag pr-pendiente">${escapeHTML(t("prEstCuotas"))}</span> <span class="pr-sentido">${escapeHTML(t("prDebo"))}</span></div>`
      + fila("prRecibido", prTextoMonto(Number(p.monto), p)) + fila("prDesde", formatoFecha(p.fecha))
      + (p.nota ? `<p class="texto-ayuda">${escapeHTML(p.nota)}</p>` : "")
      + `<p class="texto-ayuda">${escapeHTML(t("prCuotasDet"))}</p>`
      + `<button type="button" class="boton boton-secundario boton-ancho" data-pd-borrar>${escapeHTML(t("prBorrar"))}</button>`;
    return;
  }
  let h = `<div><span class="pr-tag pr-${est.toLowerCase()}">${escapeHTML(t("prEst" + est))}</span> <span class="pr-sentido">${escapeHTML(t(md ? "prMeDeben" : "prDebo"))}</span></div>`;
  h += fila("prPrestado", prTextoMonto(Number(p.monto), p)) + fila("prDevuelto", prTextoMonto(prDevuelto(p), p)) + fila("prFalta", prTextoMonto(pend, p), pend > 0 ? "pr-falta" : "");
  h += fila("prDesde", formatoFecha(p.fecha));
  if (p.fecha_devolucion) h += `<div class="pr-linea"><span>${escapeHTML(t("prFechaDev").replace(/ \(.*\)/, ""))}</span><b>${escapeHTML(formatoFecha(p.fecha_devolucion))}</b></div>`;
  if (p.nota) h += `<p class="texto-ayuda">${escapeHTML(p.nota)}</p>`;
  h += `<h3 class="titulo-subseccion">${escapeHTML(t("prDevoluciones"))}</h3>`;
  h += pagos.length ? `<div class="sit-lista">` + pagos.map((g) => `<div class="pend-fila"><div class="pend-info"><div class="pend-cat">${escapeHTML(formatoFecha(g.fecha))}</div><div class="pend-sub">${escapeHTML(g.cuenta)}</div></div>
    <div class="pend-derecha"><div class="mov-monto pr-monto">${escapeHTML(prTextoMonto(Number(g.monto), p))}</div><button type="button" class="icono-btn" data-pd-borrar-pago="${g.id}" aria-label="${escapeHTML(t("fijoBorrar"))}">🗑️</button></div></div>`).join("") + `</div>`
    : `<div class="sit-vacio">${escapeHTML(t("prSinDev"))}</div>`;
  if (pend > 0) {
    const ops = cuentas.filter((c) => (c.moneda || monedaBase()) === mon).map((c) => `<option value="${escapeHTML(c.nombre)}"${c.nombre === p.cuenta ? " selected" : ""}>${escapeHTML(c.nombre)}</option>`).join("");
    h += `<h3 class="titulo-subseccion">${escapeHTML(t(md ? "prFormMeDeben" : "prFormDebo"))}</h3>
      <label><span>${escapeHTML(t("prMonto"))} (${escapeHTML(mon)})</span><input type="text" inputmode="decimal" id="pdMonto" value="${escapeHTML(String(pend).replace(".", ","))}"></label>
      <label><span>${escapeHTML(t(md ? "prCuentaDevMeDeben" : "prCuentaDevDebo"))}</span><select id="pdCuenta">${ops}</select></label>
      <label><span>${escapeHTML(t("labelFecha"))}</span><input type="date" id="pdFecha" value="${hoyISO()}"></label>
      <p class="texto-ayuda">${escapeHTML(t("prAvisoDeMas"))}</p>
      <div id="pdError" class="aviso aviso-error" hidden></div>
      <button type="button" class="boton boton-primario boton-ancho" data-pd-devolver>${escapeHTML(t("prBtnDev"))}</button>`;
  }
  if (pagos.length) h += `<p class="texto-ayuda">${escapeHTML(t("prBorrarNo"))}</p>`;
  else h += `<button type="button" class="boton boton-secundario boton-ancho" data-pd-borrar>${escapeHTML(t("prBorrar"))}</button>`;
  $("pdCuerpo").innerHTML = h;
}

$("pdCuerpo").addEventListener("click", async (e) => {
  const p = prestamos.find((x) => x.id === prDetId);
  if (!p) return;
  try {
    if (e.target.closest("[data-pd-devolver]")) {
      const monto = numeroDesdeTexto($("pdMonto").value), pend = prPendiente(p);
      if (!Number.isFinite(monto) || monto <= 0) return mostrarAviso($("pdError"), t("prErrMonto"));
      if (monto > pend + 0.001) return mostrarAviso($("pdError"), t("prErrMasQueFalta").replace("{m}", prTextoMonto(pend, p)));
      if (!$("pdCuenta").value) return mostrarAviso($("pdError"), t("prErrCuenta"));
      await crearPagoPrestamo(usuario.id, { prestamo_id: p.id, monto: prRedondeo(monto), cuenta: $("pdCuenta").value, fecha: $("pdFecha").value || hoyISO() });
      await prRefrescar();
      renderPrestamoDet();
      mostrarToast(t("prToastDev"));
      return;
    }
    const bp = e.target.closest("[data-pd-borrar-pago]");
    if (bp) {
      if (!confirm(t("prConfBorrarPago"))) return;
      await borrarPagoPrestamo(bp.dataset.pdBorrarPago);
      await prRefrescar();
      renderPrestamoDet();
      return;
    }
    if (e.target.closest("[data-pd-borrar]")) {
      if (!confirm(t("prConfBorrar"))) return;
      await borrarPrestamo(p.id);
      cerrarPrestamoDet();
      await prRefrescar();
      mostrarToast(t("prToastBorrado"));
    }
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

// ============================================================
// GASTOS FIJOS: se repiten todos los meses y aparecen solos en Pendientes
// ============================================================
let fijos = [];
let fijosDisponible = null; // null = sin comprobar, false = la tabla no existe todavía
let fijosUsuario = null;

function diaDelMesISO(mes, dia) {
  const [a, m] = mes.split("-").map(Number);
  const ultimo = new Date(a, m, 0).getDate();
  return mes + "-" + String(Math.min(dia, ultimo)).padStart(2, "0");
}

async function cargarFijos() {
  if (fijosUsuario !== usuario.id) { fijosUsuario = usuario.id; fijosDisponible = null; fijos = []; }
  try {
    const r = await listarFijos(usuario.id);
    if (r && r.noDisponible) { fijosDisponible = false; fijos = []; }
    else { fijosDisponible = true; fijos = r; }
  } catch { fijosDisponible = false; fijos = []; }
  $("tarjetaFijos").hidden = !fijosDisponible;
}

// Una vez por apertura: crea en Pendientes los fijos de este mes que todavía no se crearon.
async function generarFijosDelMes() {
  await cargarFijos();
  if (!fijosDisponible) return;
  const mes = hoyISO().slice(0, 7);
  let creados = 0;
  for (const f of fijos.filter((x) => x.activo !== false && String(x.ultimo_mes || "") < mes)) {
    if (monedaDeCuentaNombre(f.cuenta) !== monedaBase()) continue;
    let ganado = false;
    try { ganado = await reclamarFijoDelMes(f.id, mes); } catch { continue; }
    if (!ganado) continue;
    const fecha = diaDelMesISO(mes, f.dia);
    try {
      await crearMovimiento(usuario.id, {
        tipo: f.tipo || "Gasto", fecha, cuenta: f.cuenta, categoria: f.categoria, detalle: f.detalle,
        monto: Number(f.monto), moneda: monedaBase(), cotizacion: 1, estado: "pendiente", fecha_pago: fecha,
      });
      creados++;
    } catch { try { await devolverFijoDelMes(f.id, f.ultimo_mes); } catch {} }
  }
  if (creados) {
    await cargarFijos();
    await cargarMesActual();
    mostrarToast(t("fijoToastGenerados").replace("{n}", creados), 6000);
  }
}

function renderFijos() {
  if (!fijosDisponible) return;
  const base = monedaBase();
  const lista = $("listaFijos");
  const activos = fijos.filter((f) => f.activo !== false);
  const totG = activos.filter((f) => f.tipo !== "Ingreso").reduce((s, f) => s + Number(f.monto), 0);
  const totI = activos.filter((f) => f.tipo === "Ingreso").reduce((s, f) => s + Number(f.monto), 0);
  $("fijosTotal").textContent = formatoMonto(totG);
  $("fijosIngTotal").textContent = formatoMonto(totI);
  $("fijosIngBloque").hidden = !activos.some((f) => f.tipo === "Ingreso");
  lista.innerHTML = fijos.length
    ? fijos.map((f) => `<div class="editable-item"><div class="fijo-info"><b>${f.tipo === "Ingreso" ? "↑ " : ""}${escapeHTML(f.detalle)}</b>
        <small>${escapeHTML(t("fijoDiaN").replace("{d}", f.dia))} · ${escapeHTML(f.cuenta)} · ${escapeHTML(f.categoria)}</small></div>
        <span class="fijo-monto ${f.tipo === "Ingreso" ? "ingreso" : ""}">${escapeHTML(formatoMonto(Number(f.monto)))}</span>
        <button type="button" class="icono-btn" data-editar-fijo="${f.id}" aria-label="${escapeHTML(t("fijoEditar"))}">✏️</button>
        <button type="button" class="icono-btn" data-borrar-fijo="${f.id}" aria-label="${escapeHTML(t("fijoBorrar"))}">🗑️</button></div>`).join("")
    : `<div class="vacio">${escapeHTML(t("fijoSinFijos"))}</div>`;
  const selTipo = $("fijoTipo"), tipoActual = selTipo.value || "Gasto";
  selTipo.innerHTML = `<option value="Gasto">${escapeHTML(t("segGasto"))}</option><option value="Ingreso">${escapeHTML(t("segIngreso"))}</option>`;
  selTipo.value = tipoActual;
  const cu = cuentas.filter((c) => (c.moneda || base) === base);
  $("fijoCuenta").innerHTML = cu.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
  renderFijoCategorias();
  $("fijoNotaMoneda").textContent = cuentas.length > cu.length ? t("fijoNotaMoneda").replace("{m}", base) : "";
}

function renderFijoCategorias() {
  const tipo = $("fijoTipo").value || "Gasto";
  $("fijoCategoria").innerHTML = categorias.filter((c) => c.tipo === tipo)
    .map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
}
$("fijoTipo").addEventListener("change", renderFijoCategorias);

$("tarjetaFijos").addEventListener("click", () => { cargarFijos().then(renderFijos); });

$("btnAgregarFijo").addEventListener("click", async () => {
  const detalle = $("fijoDetalle").value.trim();
  const cuenta = $("fijoCuenta").value, categoria = $("fijoCategoria").value;
  const monto = numeroDesdeTexto($("fijoMonto").value);
  const dia = parseInt($("fijoDia").value, 10);
  if (!detalle || !cuenta || !categoria || !Number.isFinite(monto) || monto <= 0 || !Number.isInteger(dia) || dia < 1 || dia > 31) {
    return mostrarAviso($("fijoError"), t("fijoError"));
  }
  $("fijoError").hidden = true;
  const hoy = hoyISO();
  // Si el día de este mes ya pasó, el primero se genera el mes que viene (no se carga hacia atrás).
  const ultimo_mes = diaDelMesISO(hoy.slice(0, 7), dia) < hoy ? hoy.slice(0, 7) : null;
  try {
    await crearFijo(usuario.id, { tipo: $("fijoTipo").value === "Ingreso" ? "Ingreso" : "Gasto", detalle, cuenta, categoria, monto, dia, activo: true, ultimo_mes });
    $("fijoDetalle").value = ""; $("fijoMonto").value = ""; $("fijoDia").value = "";
    await cargarFijos();
    renderFijos();
    mostrarToast(t("fijoToastAgregado"));
    await generarFijosDelMes();
  } catch (err) { mostrarAviso($("fijoError"), traducirErrorDatos(err)); }
});

$("listaFijos").addEventListener("click", async (e) => {
  const ed = e.target.closest("[data-editar-fijo]");
  if (ed) {
    const f = fijos.find((x) => x.id === ed.dataset.editarFijo);
    if (!f) return;
    const r = await pedirDatos(f.detalle || t("fijoPideDetalle"), [
      { id: "detalle", etiqueta: t("fijoPideDetalle"), valor: f.detalle || "", tipo: "texto" },
      { id: "monto", etiqueta: t("fijoPideMonto"), valor: String(f.monto).replace(".", ","), tipo: "numero" },
      { id: "dia", etiqueta: t("fijoPideDia"), valor: String(f.dia), tipo: "dia" }]);
    if (!r) return;
    const { dia, monto, detalle } = r;
    if (monto <= 0) return mostrarToast(t("fijoError"));
    try { await actualizarFijo(f.id, { dia, monto, detalle }); await cargarFijos(); renderFijos(); mostrarToast(t("fijoToastAgregado")); }
    catch (err) { mostrarToast(traducirErrorDatos(err)); }
    return;
  }
  const b = e.target.closest("[data-borrar-fijo]");
  if (!b || !confirm(t("fijoConfirmarBorrar"))) return;
  try { await borrarFijo(b.dataset.borrarFijo); await cargarFijos(); renderFijos(); }
  catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

// ============================================================
// PRESUPUESTO: reparto del ingreso (fijos / vida y salidas / ahorro)
// ============================================================
let presupuesto = null;           // fila del usuario (o null si todavía no guardó nada)
let presupuestoDisponible = null; // null = sin comprobar, false = la tabla no existe todavía
let presupuestoUsuario = null;

const PRES_FIJAS = ["vivienda", "servicios", "salud", "educación", "educacion", "transporte",
  "moradia", "serviços", "servicos", "saúde", "saude", "educação",
  "housing", "utilities", "health", "education", "transport"];

async function cargarPresupuesto() {
  if (presupuestoUsuario !== usuario.id) { presupuestoUsuario = usuario.id; presupuestoDisponible = null; presupuesto = null; }
  if (presupuestoDisponible !== null) return;
  try {
    const r = await obtenerPresupuesto(usuario.id);
    if (r && r.noDisponible) { presupuestoDisponible = false; }
    else { presupuestoDisponible = true; presupuesto = r || null; }
  } catch { presupuestoDisponible = false; }
  $("btnVistaPresupuesto").hidden = !presupuestoDisponible;
}

function presGrupoDe(nombre) {
  const g = (presupuesto?.grupos || {})[nombre];
  if (g === "fijo" || g === "vida") return g;
  return PRES_FIJAS.includes(String(nombre).toLowerCase()) ? "fijo" : "vida";
}

function presPorcentajes() {
  const f = Number.isFinite(presupuesto?.pct_fijos) ? presupuesto.pct_fijos : 50;
  const v = Number.isFinite(presupuesto?.pct_vida) ? presupuesto.pct_vida : 30;
  return { f, v, a: Math.max(0, 100 - f - v) };
}

async function presGuardar() {
  try {
    const { f, v } = presPorcentajes();
    await guardarPresupuesto(usuario.id, {
      ingreso_base: presupuesto?.ingreso_base > 0 ? presupuesto.ingreso_base : null,
      pct_fijos: f, pct_vida: v, grupos: presupuesto?.grupos || {},
    });
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
}

// Una tarjeta del reparto: título con su %, "gastado / límite" a la derecha, barra y una línea de estado.
function presTarjeta(titulo, derecha, pct, color, estado, clase) {
  return `<div class="analisis-item pres-tarjeta ${clase || ""}">
    <div class="pres-fila-l"><span>${escapeHTML(titulo)}</span><span>${escapeHTML(derecha)}</span></div>
    <div class="analisis-barra-fondo"><div class="analisis-barra" style="width:${Math.min(100, Math.max(0, pct))}%;background:${color}"></div></div>
    <div class="pres-detalle pres-detalle-2">${escapeHTML(estado)}</div>
  </div>`;
}

function renderPresupuesto() {
  if (!presupuestoDisponible) return;
  const lista = contablesDelMes(movimientos, claveMesVista());
  let ingReal = 0, gF = 0, gV = 0;
  lista.forEach((m) => {
    if (m.tipo === "Ingreso") ingReal += montoBase(m);
    else if (presGrupoDe(m.categoria) === "fijo") gF += montoBase(m);
    else gV += montoBase(m);
  });
  const base = presupuesto?.ingreso_base > 0 ? presupuesto.ingreso_base : ingReal;
  const { f, v, a } = presPorcentajes();

  const inIng = $("presIngreso");
  const manual = presupuesto?.ingreso_base > 0;
  if (document.activeElement !== inIng) {
    const fmt = (n) => Number(n).toLocaleString("de-DE", { maximumFractionDigits: 2 });
    inIng.value = manual ? fmt(presupuesto.ingreso_base) : (ingReal > 0 ? fmt(ingReal) : "");
  }
  $("presIngresoNota").textContent = manual ? t("presNotaManual") : (ingReal > 0 ? t("presNotaAuto") : "");
  $("btnPresUsarReal").hidden = !manual;
  if (document.activeElement !== $("presPctFijos")) $("presPctFijos").value = f;
  if (document.activeElement !== $("presPctVida")) $("presPctVida").value = v;
  $("presPctAhorro").textContent = a;

  $("presTotal").textContent = base > 0 ? formatoMonto(base) : "—";
  $("presReparto").innerHTML = [[f, "#2F6F5E"], [v, "#6FAE9A"], [a, "#C98A1B"]]
    .filter(([p]) => p > 0).map(([p, c]) => `<i style="width:${p}%;background:${c}">${p}%</i>`).join("");

  const cont = $("presGrupos");
  if (!(base > 0)) {
    cont.innerHTML = `<div class="vacio">${escapeHTML(t("presSinIngreso"))}</div>`;
  } else {
    const color = (p) => (p > 100 ? "#C4562E" : p >= 85 ? "#D9A441" : "#2F6F5E");
    const grupo = (clave, pctGrupo, gastado) => {
      const limite = base * pctGrupo / 100;
      const p = limite > 0 ? gastado / limite * 100 : (gastado > 0 ? 101 : 0);
      const resto = limite - gastado;
      const estado = resto < 0 ? t("presPasaste").replace("{r}", formatoMonto(-resto))
        : p < 85 ? t("presVasBien") : t("presQueda").replace("{r}", formatoMonto(resto));
      return presTarjeta(`${t(clave)} · ${pctGrupo}%`, `${formatoMonto(gastado)} / ${formatoMonto(limite)}`, p, color(p), estado, resto < 0 ? "pres-pasado" : "");
    };
    const meta = base * a / 100;
    const ahorroPosible = Math.max(0, base - gF - gV);
    const pA = meta > 0 ? ahorroPosible / meta * 100 : 0;
    const estadoA = ahorroPosible >= meta ? t("presMetaCumplida") : t("presTeFaltan").replace("{r}", formatoMonto(meta - ahorroPosible));
    cont.innerHTML = grupo("presGrupoFijos", f, gF) + grupo("presGrupoVida", v, gV) +
      presTarjeta(`${t("presGrupoAhorro")} · ${a}%`, `${formatoMonto(ahorroPosible)} / ${formatoMonto(meta)}`, pA, pA >= 100 ? "#2F6F5E" : "#5B7FBF", estadoA, "pres-ahorro");
  }

  const cats = categorias.filter((c) => c.tipo === "Gasto");
  $("presListaCats").innerHTML = cats.map((c) => {
    const g = presGrupoDe(c.nombre);
    return `<div class="pres-cat-fila"><span>${escapeHTML(c.nombre)}</span>
      <select data-pres-cat="${escapeHTML(c.nombre)}">
        <option value="fijo"${g === "fijo" ? " selected" : ""}>${escapeHTML(t("presOpcFijo"))}</option>
        <option value="vida"${g === "vida" ? " selected" : ""}>${escapeHTML(t("presOpcVida"))}</option>
      </select></div>`;
  }).join("");
}

function presAsegurarObjeto() { if (!presupuesto) presupuesto = { ingreso_base: null, pct_fijos: 50, pct_vida: 30, grupos: {} }; }

$("presIngreso").addEventListener("change", async () => {
  presAsegurarObjeto();
  const n = numeroDesdeTexto($("presIngreso").value);
  presupuesto.ingreso_base = Number.isFinite(n) && n > 0 ? n : null;
  renderPresupuesto();
  await presGuardar();
});
["presPctFijos", "presPctVida"].forEach((id) => {
  $(id).addEventListener("change", async () => {
    presAsegurarObjeto();
    let f = parseInt($("presPctFijos").value, 10), v = parseInt($("presPctVida").value, 10);
    f = Number.isFinite(f) ? Math.min(100, Math.max(0, f)) : 50;
    v = Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 30;
    if (f + v > 100) { if (id === "presPctFijos") f = 100 - v; else v = 100 - f; }
    presupuesto.pct_fijos = f; presupuesto.pct_vida = v;
    renderPresupuesto();
    await presGuardar();
  });
});
$("btnPresUsarReal").addEventListener("click", async () => {
  presAsegurarObjeto();
  presupuesto.ingreso_base = null;
  $("presIngreso").blur();
  renderPresupuesto();
  await presGuardar();
});
$("btnPresReset").addEventListener("click", async () => {
  presAsegurarObjeto();
  presupuesto.pct_fijos = 50; presupuesto.pct_vida = 30;
  renderPresupuesto();
  await presGuardar();
});
$("presListaCats").addEventListener("change", async (e) => {
  const sel = e.target.closest("select[data-pres-cat]");
  if (!sel) return;
  presAsegurarObjeto();
  presupuesto.grupos = { ...(presupuesto.grupos || {}), [sel.dataset.presCat]: sel.value };
  renderPresupuesto();
  await presGuardar();
});

// ============================================================
// RENDER: Configuración (cuentas / categorías)
// ============================================================
function renderCuentasConfig() {
  const cont = $("listaCuentas");
  cont.innerHTML = cuentas.length
    ? cuentas.map((c) => filaEditable(c, "cuenta")).join("")
    : `<div class="vacio">${escapeHTML(t("sinCuentas"))}</div>`;
  enlazarAccionesEditables("cuenta");
  cont.querySelectorAll(".sel-moneda-cuenta").forEach((sel) => {
    sel.addEventListener("change", async () => {
      try {
        await actualizarMonedaCuenta(sel.dataset.id, sel.value);
        await cargarCuentasYCategorias();
        await cargarMesActual();
        mostrarToast(t("toastMonedaGuardada"));
      } catch (err) { mostrarToast(traducirErrorDatos(err)); }
    });
  });
}

function renderMonedasConfig() {
  const base = monedaBase();
  if ($("selectMonedaBase")) $("selectMonedaBase").innerHTML = opcionesMonedas(base);
  if ($("selectMonedaNuevaCuenta")) $("selectMonedaNuevaCuenta").innerHTML = opcionesMonedas(base, true);
  const cont = $("listaMonedas");
  if (cont) {
    cont.innerHTML = monedasUsuario.length
      ? monedasUsuario.map((m) => `<div class="editable-item" data-id="${m.id}"><span>${escapeHTML(m.nombre)} · ${escapeHTML(m.codigo)} (${escapeHTML(m.simbolo || "")})</span><div class="editable-acciones"><button data-borrar-moneda="${m.id}" title="Borrar">🗑️</button></div></div>`).join("")
      : `<div class="vacio">${escapeHTML(t("vacioMonedas"))}</div>`;
    cont.querySelectorAll("[data-borrar-moneda]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try { await borrarMoneda(btn.dataset.borrarMoneda); await cargarCuentasYCategorias(); mostrarToast(t("toastMonedaGuardada")); }
        catch (err) { mostrarToast(traducirErrorDatos(err)); }
      });
    });
  }
}

if ($("selectMonedaBase")) {
  $("selectMonedaBase").addEventListener("change", async (e) => {
    const nueva = e.target.value;
    if (nueva === monedaBase()) return;
    if (!confirm(t("confirmCambioBase"))) { e.target.value = monedaBase(); return; }
    try {
      const simbolo = todasLasMonedas().find((m) => m.codigo === nueva)?.simbolo || nueva;
      await actualizarMonedaBase(usuario.id, nueva);
      await actualizarMoneda(usuario.id, simbolo);
      perfil.moneda_base = nueva;
      perfil.moneda = simbolo;
      $("inputMoneda").value = simbolo;
      renderMonedasConfig();
      await cargarCuentasYCategorias();
      await cargarMesActual();
      mostrarToast(t("toastMonedaGuardada"));
    } catch (err) { mostrarToast(traducirErrorDatos(err)); e.target.value = monedaBase(); }
  });
}

if ($("btnAgregarMoneda")) {
  $("btnAgregarMoneda").addEventListener("click", async () => {
    const nombre = $("inputNuevaMonedaNombre").value.trim();
    const codigo = $("inputNuevaMonedaCodigo").value.trim().toUpperCase();
    const simbolo = $("inputNuevaMonedaSimbolo").value.trim();
    if (!nombre || !/^[A-Z]{3}$/.test(codigo) || !simbolo) return mostrarToast(t("errMonedaDatos"));
    try {
      await crearMoneda(usuario.id, nombre, codigo, simbolo);
      $("inputNuevaMonedaNombre").value = ""; $("inputNuevaMonedaCodigo").value = ""; $("inputNuevaMonedaSimbolo").value = "";
      await cargarCuentasYCategorias();
      mostrarToast(t("toastMonedaGuardada"));
    } catch (err) { mostrarToast(traducirErrorDatos(err)); }
  });
}

function renderCategoriasConfig() {
  $("bloqueCatSugeridas").hidden = categorias.length > 0;
  const gasto = categorias.filter((c) => (c.tipo || "Gasto") === "Gasto");
  const ingreso = categorias.filter((c) => c.tipo === "Ingreso");
  $("listaCategoriasGasto").innerHTML = gasto.length
    ? gasto.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">${escapeHTML(t("sinCatGasto"))}</div>`;
  $("listaCategoriasIngreso").innerHTML = ingreso.length
    ? ingreso.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">${escapeHTML(t("sinCatIngreso"))}</div>`;
  enlazarAccionesEditables("categoria");
}

function filaEditable(item, tipo) {
  const esCategoria = tipo === "categoria";
  const selMoneda = tipo === "cuenta"
    ? `<select class="sel-moneda-cuenta" data-id="${item.id}" aria-label="${escapeHTML(t("ariaMonedaCuenta"))}">${opcionesMonedas(item.moneda || monedaBase(), true)}</select>`
    : "";
  const tipoItem = item.tipo || "Gasto";
  const botonTipo = esCategoria
    ? `<button data-accion="cambiar-tipo" data-tipo="${tipo}" title="${escapeHTML(t(tipoItem === "Gasto" ? "cambiarAIngresoTit" : "cambiarAGastoTit"))}">${escapeHTML(t(tipoItem === "Gasto" ? "pasarAIngreso" : "pasarAGasto"))}</button>`
    : "";
  return `
    <div class="editable-item" data-id="${item.id}">
      <span>${escapeHTML(item.nombre)}</span>
      <div class="editable-acciones">
        ${selMoneda}
        ${botonTipo}
        <button data-accion="editar" data-tipo="${tipo}" title="Editar">✏️</button>
        <button data-accion="borrar" data-tipo="${tipo}" title="Borrar">🗑️</button>
      </div>
    </div>`;
}

function enlazarAccionesEditables(tipo) {
  const selector = tipo === "cuenta"
    ? "#listaCuentas [data-accion]"
    : "#listaCategoriasGasto [data-accion], #listaCategoriasIngreso [data-accion]";
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const item = e.target.closest(".editable-item");
      const id = item.dataset.id;
      const accion = btn.dataset.accion;
      const lista = tipo === "cuenta" ? cuentas : categorias;
      const actual = lista.find((x) => x.id === id);

      if (accion === "editar") {
        const r = await pedirDatos(t("pedirNombre"), [{ id: "nombre", etiqueta: t("pedirNombre"), valor: actual.nombre, tipo: "texto" }]);
        if (!r) return;
        try {
          if (tipo === "cuenta") await renombrarCuenta(id, r.nombre);
          else await renombrarCategoria(id, r.nombre);
          await cargarCuentasYCategorias();
          mostrarToast(t("toastGuardado"));
        } catch (err) { mostrarToast(traducirErrorDatos(err)); }
      }

      if (accion === "borrar") {
        if (!confirm(t("confBorrarCat").replace("{n}", actual.nombre))) return;
        try {
          if (tipo === "cuenta") await borrarCuenta(id);
          else await borrarCategoria(id);
          await cargarCuentasYCategorias();
          mostrarToast(t("toastBorrado"));
        } catch (err) { mostrarToast(t("toastNoBorrar")); }
      }

      if (accion === "cambiar-tipo") {
        const nuevoTipo = (actual.tipo || "Gasto") === "Gasto" ? "Ingreso" : "Gasto";
        try {
          await cambiarTipoCategoria(id, nuevoTipo);
          await cargarCuentasYCategorias();
          mostrarToast(`"${actual.nombre}" ahora es una categoría de ${nuevoTipo === "Gasto" ? "gasto" : "ingreso"}.`);
        } catch (err) { mostrarToast(traducirErrorDatos(err)); }
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

if ($("selectIdioma")) {
  $("selectIdioma").addEventListener("change", async (e) => {
    const nuevoIdioma = e.target.value;
    aplicarIdioma(nuevoIdioma);
    try {
      await actualizarIdioma(usuario.id, nuevoIdioma);
      if (perfil) perfil.idioma = nuevoIdioma;
    } catch (err) {
      mostrarToast(traducirErrorDatos(err));
    }
    renderResumen();
    renderMovimientos();
    renderCuentasConfig();
    renderCategoriasConfig();
    await renderVistaAnalisis();
  });
}

if ($("selectIdiomaTopbar")) {
  $("selectIdiomaTopbar").addEventListener("change", async (e) => {
    const nuevoIdioma = e.target.value;
    aplicarIdioma(nuevoIdioma);
    try {
      await actualizarIdioma(usuario.id, nuevoIdioma);
      if (perfil) perfil.idioma = nuevoIdioma;
    } catch (err) {
      mostrarToast(traducirErrorDatos(err));
    }
    renderResumen();
    renderMovimientos();
    renderCuentasConfig();
    renderCategoriasConfig();
    await renderVistaAnalisis();
  });
}

$("btnAgregarCuenta").addEventListener("click", async () => {
  const input = $("inputNuevaCuenta");
  const v = input.value.trim();
  if (!v) return;
  try {
    await crearCuenta(usuario.id, v, $("selectMonedaNuevaCuenta")?.value || monedaBase());
    input.value = "";
    await cargarCuentasYCategorias();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

let tipoNuevaCategoria = "Gasto";
document.querySelectorAll("#segmentadoTipoNuevaCategoria .segmentado-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#segmentadoTipoNuevaCategoria .segmentado-item").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    tipoNuevaCategoria = btn.dataset.tipoNuevaCategoria;
  });
});

$("btnAgregarCategoria").addEventListener("click", async () => {
  const input = $("inputNuevaCategoria");
  const v = input.value.trim();
  if (!v) {
    mostrarToast(t("avisoFaltaNombreCategoria"));
    input.focus();
    return;
  }
  try {
    await crearCategoria(usuario.id, v, tipoNuevaCategoria);
    input.value = "";
    await cargarCuentasYCategorias();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

$("inputNuevaCategoria").addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    $("btnAgregarCategoria").click();
  }
});

function renderSelectCategorias(tipo) {
  const tipoActivo = tipo || document.querySelector("#segmentadoTipo .activo")?.dataset.tipo || "Gasto";
  const filtradas = categorias.filter((c) => (c.tipo || "Gasto") === tipoActivo);
  $("movCategoria").innerHTML = filtradas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") || `<option value="">-- Agregá una categoría en Config --</option>`;
}

function renderSelects() {
  $("movCuenta").innerHTML = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}${c.moneda && c.moneda !== monedaBase() ? " (" + escapeHTML(simboloDe(c.moneda)) + ")" : ""}</option>`).join("") || `<option value="">-- Agregá una cuenta en Config --</option>`;
  renderSelectCategorias();
}

// Si el movimiento tiene una cuenta o categoría que ya no está en la lista
// de Config (por ejemplo, se borró después, o es un dato de otro origen),
// la agregamos como opción temporal para no perder ni pisar el dato real.
function asegurarOpcionSelect(id, valor) {
  const el = $(id);
  if (!el || !valor) return;
  const yaExiste = [...el.options].some((o) => o.value === valor);
  if (!yaExiste) {
    const opt = document.createElement("option");
    opt.value = valor;
    opt.textContent = valor + " (no está en tu Config)";
    el.appendChild(opt);
  }
}

// ============================================================
// MODAL: Nuevo / Editar movimiento
// ============================================================
$("btnNuevo").addEventListener("click", () => abrirModalNuevo());
activarFormatoImporte($("movMonto"));
$("btnCerrarModal").addEventListener("click", cerrarModal);
$("modalFondo").addEventListener("click", (e) => { if (e.target.id === "modalFondo") cerrarModal(); });

// Cotización: solo aparece si la cuenta elegida está en otra moneda que la base.
function actualizarFilaCotizacion(valorGuardado) {
  const fila = $("filaCotizacion");
  if (!fila) return;
  const cod = monedaDeCuentaNombre($("movCuenta").value);
  const base = monedaBase();
  if (cod === base) { fila.hidden = true; return; }
  fila.hidden = false;
  $("labelMonedaMov").textContent = t("ayudaCotizacion").replace(/\{c\}/g, () => simboloDe(cod)).replace(/\{b\}/g, () => simboloDe(base));
  const inp = $("movCotizacion");
  if (valorGuardado > 0) inp.value = formatearImporteEscrito(String(valorGuardado).replace(".", ","));
  else if (!inp.value && leerCotiz()[cod] > 0) inp.value = formatearImporteEscrito(String(leerCotiz()[cod]).replace(".", ","));
  mostrarDolarSugerido(cod, base);
}

// Botón "Usar el dólar de hoy": solo para dólares contra pesos argentinos.
let dolarSugeridoActual = 0;
async function mostrarDolarSugerido(cod, base) {
  const btn = $("btnCotizSugerida");
  btn.hidden = true;
  if (cod !== "USD" || base !== "ARS") return;
  const r = await obtenerDolarBNA();
  if (!r || monedaDeCuentaNombre($("movCuenta").value) !== "USD") return;
  dolarSugeridoActual = r.venta;
  const v = r.venta.toLocaleString("es-AR", { maximumFractionDigits: 2 });
  btn.textContent = t("cotizSugerida").replace("{v}", v);
  btn.hidden = false;
}
$("btnCotizSugerida").addEventListener("click", () => {
  if (dolarSugeridoActual > 0) $("movCotizacion").value = formatearImporteEscrito(String(dolarSugeridoActual).replace(".", ","));
});
$("movCuenta").addEventListener("change", () => { $("movCotizacion").value = ""; actualizarFilaCotizacion(); });
activarFormatoImporte($("movCotizacion"));



// ============================================================
// QUÉ SIGUE: guía rápida (sale sola tras el primer gasto de alguien nuevo)
// ============================================================
function claveGuia() { return "fs_guia_vista_" + (usuario ? usuario.id : ""); }
function guiaYaVista() { try { return localStorage.getItem(claveGuia()) === "1"; } catch { return true; } }
function guiaMarcarVista() { try { localStorage.setItem(claveGuia(), "1"); } catch { /* ignorar */ } }
function abrirGuia() { $("guiaPantalla").hidden = false; }
function cerrarGuia() { $("guiaPantalla").hidden = true; guiaMarcarVista(); }

$("btnGuiaCerrar").addEventListener("click", cerrarGuia);
// Pantalla vacía de Movimientos: cargar con voz o a mano
$("listaMovimientos").addEventListener("click", (e) => {
  const b = e.target.closest("[data-vacio]");
  if (!b) return;
  $("btnNuevo").click();
  if (b.dataset.vacio === "voz") setTimeout(() => $("btnCargarVoz").click(), 350);
});
$("tarjetaGuia").addEventListener("click", () => abrirBienvenida());
$("guiaPantalla").addEventListener("click", (e) => {
  const b = e.target.closest("[data-guia-ir]");
  if (!b) return;
  const destino = b.dataset.guiaIr;
  cerrarGuia();
  if (destino === "voz") {
    $("btnNuevo").click();
    setTimeout(() => $("btnCargarVoz").click(), 350);
  } else {
    const nav = document.querySelector(`.navbar-item[data-vista="${destino}"]`);
    if (nav) nav.click();
  }
});

// Antes de guardar: ¿es alguien que todavía no cargó nada? Solo se consulta mientras la guía no se haya visto.
async function guiaEraPrimerMovimiento() {
  if (guiaYaVista()) return false;
  try { return (await listarTodosLosMovimientos(usuario.id)).length === 0; }
  catch { return false; }
}
function guiaDespuesDeGuardar(eraPrimero) {
  if (guiaYaVista()) return;
  if (eraPrimero) setTimeout(abrirGuia, 900);
  else guiaMarcarVista(); // ya usaba la app: no corresponde mostrarle la guía
}

// ============================================================
// FOTO DEL COMPROBANTE
// ============================================================
let comprobantesDisponible = false;
let foto = { actual: null, nueva: null, quitar: false, previa: null };

function fotoReset(rutaActual) {
  if (foto.previa) URL.revokeObjectURL(foto.previa);
  foto = { actual: rutaActual, nueva: null, quitar: false, previa: null };
  $("movFoto").value = ""; $("movFotoCamara").value = "";
  ocultarAviso($("fotoError"));
  fotoUI();
  if (rutaActual) {
    urlComprobante(rutaActual).then((u) => {
      if (foto.actual === rutaActual && !foto.nueva && !foto.quitar) { $("fotoMini").src = u; $("fotoMini").hidden = false; }
    }).catch(() => {});
  }
}

function fotoUI() {
  $("bloqueFoto").hidden = !comprobantesDisponible || $("movCuotas").checked;
  const hay = !!foto.nueva || (!!foto.actual && !foto.quitar);
  $("fotoBtnTxt").textContent = t(hay ? "fotoCambiar" : "fotoAdjuntar");
  $("btnFotoQuitar").hidden = !hay;
  if (foto.nueva) { $("fotoMini").src = foto.previa; $("fotoMini").hidden = false; }
  else if (!hay) { $("fotoMini").hidden = true; $("fotoMini").removeAttribute("src"); }
}

// Achica la foto (máx. 1280 px, JPG) para que ocupe poco: unos 150–300 KB.
function comprimirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, 1280 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("blob"))), "image/jpeg", 0.72);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("img")); };
    img.src = url;
  });
}

["movFoto", "movFotoCamara"].forEach((idInput) => $(idInput).addEventListener("change", async () => {
  const f = $(idInput).files[0];
  if (!f) return;
  ocultarAviso($("fotoError"));
  try {
    const blob = await comprimirImagen(f);
    if (foto.previa) URL.revokeObjectURL(foto.previa);
    foto.nueva = blob; foto.quitar = false; foto.previa = URL.createObjectURL(blob);
    fotoUI();
  } catch { mostrarAviso($("fotoError"), t("fotoErr")); }
  $(idInput).value = "";
}));
$("btnFotoQuitar").addEventListener("click", () => {
  if (foto.previa) URL.revokeObjectURL(foto.previa);
  foto.nueva = null; foto.previa = null; foto.quitar = true;
  fotoUI();
});
$("movCuotas").addEventListener("change", fotoUI);
$("fotoMini").addEventListener("click", () => {
  const s = $("fotoMini").src;
  if (!s) return;
  $("visorFotoImg").src = s; $("visorFoto").hidden = false;
});
$("visorFoto").addEventListener("click", () => { $("visorFoto").hidden = true; $("visorFotoImg").removeAttribute("src"); });

function abrirModalNuevo() {
  if (!cuentas.length || !categorias.length) {
    return mostrarToast("Primero agregá al menos una cuenta y una categoría en Config.");
  }
  $("formMovimiento").reset();
  delete $("formMovimiento").dataset.rapCatElegida;
  fotoReset(null);
  $("movId").value = "";
  $("modalTitulo").textContent = t("modalNuevoTitulo");
  $("btnBorrarMov").hidden = true;
  $("btnMovInterno").hidden = true;
  seleccionarTipo("Gasto");
  $("movFecha").value = hoyISO();
  $("movFechaPago").value = "";
  $("movCuotas").checked = false;
  $("movCuotaN").value = "6";
  $("movCuotaFecha").value = "";
  sincronizarDiferidoUI();
  renderSelects();
  $("movCotizacion").value = "";
  actualizarFilaCotizacion();
  ocultarAviso($("movError"));
  rapidoActivar(true);
  abrirVentanaMovimiento();
  fsVozPrepararNuevo();
}

function abrirModalEditar(id) {
  const m = movimientos.find((x) => x.id === id) || pendientes.find((x) => x.id === id);
  if (!m) return;
  rapidoActivar(false);
  seleccionarTipo(m.tipo);
  renderSelects();
  asegurarOpcionSelect("movCuenta", m.cuenta);
  asegurarOpcionSelect("movCategoria", m.categoria);
  fotoReset(m.comprobante || null);
  $("movId").value = m.id;
  $("modalTitulo").textContent = t("modalEditarTitulo");
  $("btnBorrarMov").hidden = false;
  $("btnMovInterno").hidden = false;
  $("movFecha").value = m.fecha;
  $("movCuenta").value = m.cuenta;
  $("movCategoria").value = m.categoria;
  $("movMonto").value = formatearImporteEscrito(String(m.monto).replace(".", ","));
  $("movDetalle").value = m.detalle || "";
  $("movDiferido").checked = esDiferido(m);
  $("movFechaPago").value = m.fecha_pago || "";
  $("movYaPagado").checked = !esPendiente(m);
  $("movCuotas").checked = false;
  sincronizarDiferidoUI();
  $("movCotizacion").value = "";
  actualizarFilaCotizacion(monedaDeMov(m) !== monedaBase() ? Number(m.cotizacion) : 0);
  ocultarAviso($("movError"));
  abrirVentanaMovimiento();
  fsVoiceOcultar();
}

function abrirVentanaMovimiento() {
  if ($("modalFondo").hidden) guardarPasoAtras("modal");
  $("modalFondo").hidden = false;
}

function cerrarModal() {
  if ($("modalFondo").hidden) return;
  $("modalFondo").hidden = true;
  volverUnPaso("modal");
}

// ---------- "Lo voy a pagar / cobrar después" dentro del formulario ----------
function tipoDelFormulario() {
  return document.querySelector("#segmentadoTipo .activo")?.dataset.tipo === "Ingreso" ? "Ingreso" : "Gasto";
}

function actualizarTextosDiferido() {
  if (!$("labelDiferido")) return;
  const g = tipoDelFormulario();
  $("labelDiferido").textContent = t("labelDiferido" + g);
  $("labelFechaPago").textContent = t("labelFechaPago" + g);
  $("labelYaPagado").textContent = t("labelYaPagado" + g);
}

function sincronizarDiferidoUI() {
  actualizarTextosDiferido();
  const activo = $("movDiferido").checked;
  $("filaDiferido").hidden = !activo;
  // "Ya se pagó" solo tiene sentido al editar un movimiento que ya existe.
  $("filaYaPagado").hidden = !activo || !$("movId").value;
  sincronizarCuotasUI();
}

// ---------- Pagar en cuotas (solo al crear un movimiento nuevo) ----------
function sincronizarCuotasUI() {
  const nuevo = !$("movId").value;
  const diferido = $("movDiferido").checked;
  // Las cuotas y "lo pago después" no se mezclan: se elige una u otra.
  $("bloqueCuotas").hidden = !nuevo || diferido;
  const cuotas = nuevo && !diferido && $("movCuotas").checked;
  $("filaCuotas").hidden = !cuotas;
  document.querySelector(".bloque-diferido:not(#bloqueCuotas)").hidden = cuotas;
  if (cuotas && !$("movCuotaFecha").value) $("movCuotaFecha").value = $("movFecha").value || hoyISO();
  actualizarVistaCuotas();
}

// Cartel con el total de la compra en cuotas y las fechas de la primera y la última.
function repartirCuotas(total, n) {
  const base = Math.floor((total * 100) / n) / 100;
  const ultima = Math.round((total - base * (n - 1)) * 100) / 100;
  return { base, ultima };
}
function actualizarVistaCuotas() {
  const cuotas = !$("filaCuotas").hidden;
  $("labelMontoTexto").textContent = t(cuotas ? "labelMontoCuota" : "labelMonto");
  const vista = $("vistaCuotas");
  const monto = numeroDesdeTexto($("movMonto").value);
  const n = parseInt($("movCuotaN").value, 10);
  const primera = $("movCuotaFecha").value;
  if (!cuotas || !Number.isFinite(monto) || monto <= 0 || !Number.isInteger(n) || n < 2 || n > 60 || !primera) {
    vista.hidden = true;
    return;
  }
  const rp = repartirCuotas(monto, n);
  vista.textContent = t("vistaCuotas")
    .replace("{n}", n)
    .replace("{c}", formatoMonto(rp.base))
    .replace("{t}", formatoMonto(monto))
    .replace("{p}", formatoFecha(primera))
    .replace("{u}", formatoFecha(sumarMesesISO(primera, n - 1)))
    + (rp.ultima !== rp.base ? " " + t("vistaCuotaUlt").replace("{l}", formatoMonto(rp.ultima)) : "");
  vista.hidden = false;
}
["movMonto", "movCuotaN", "movCuotaFecha"].forEach((id) => $(id).addEventListener("input", actualizarVistaCuotas));

// Misma fecha, k meses despues (si el mes es mas corto, el ultimo dia).
function sumarMesesISO(fechaISO, k) {
  const [a, m, d] = fechaISO.split("-").map(Number);
  const ultimo = new Date(a, m - 1 + k + 1, 0).getDate();
  const f = new Date(a, m - 1 + k, Math.min(d, ultimo));
  return f.getFullYear() + "-" + String(f.getMonth() + 1).padStart(2, "0") + "-" + String(f.getDate()).padStart(2, "0");
}

$("movCuotas").addEventListener("change", sincronizarCuotasUI);

// Misma fecha del mes siguiente (o el último día, si el mes siguiente es más corto).
function sumarUnMes(fechaISO) {
  const [a, m, d] = fechaISO.split("-").map(Number);
  const ultimo = new Date(a, m + 1, 0).getDate();
  const f = new Date(a, m, Math.min(d, ultimo));
  return f.getFullYear() + "-" + String(f.getMonth() + 1).padStart(2, "0") + "-" + String(f.getDate()).padStart(2, "0");
}

$("movDiferido").addEventListener("change", () => {
  if ($("movDiferido").checked && !$("movFechaPago").value) {
    $("movFechaPago").value = sumarUnMes($("movFecha").value || hoyISO());
  }
  sincronizarDiferidoUI();
});

function seleccionarTipo(tipo) {
  document.querySelectorAll("#segmentadoTipo .segmentado-item").forEach((b) => {
    b.classList.toggle("activo", b.dataset.tipo === tipo);
  });
  const aviso = $("avisoTipoMovimiento");
  if (aviso) {
    const esGasto = tipo === "Gasto";
    aviso.textContent = (esGasto ? t("avisoVasACargarGasto") : t("avisoVasACargarIngreso"));
    aviso.classList.toggle("aviso-tipo-gasto", esGasto);
    aviso.classList.toggle("aviso-tipo-ingreso", !esGasto);
  }
  actualizarTextosDiferido();
}
document.querySelectorAll("#segmentadoTipo .segmentado-item").forEach((b) => {
  b.addEventListener("click", () => {
    seleccionarTipo(b.dataset.tipo);
    renderSelectCategorias(b.dataset.tipo);
    rapidoRefrescar();
  });
});

// ============================================================
// CARGA POR VOZ — pantalla dedicada. Un dato por vez; arriba siempre se ve
// en qué paso estás y lo ya cargado. Los valores se escriben en el formulario
// real, así que al final "Guardar" usa el mismo camino de siempre.
// ============================================================
let fsVozIdx = 0;
let fsVoiceRec = null;
let fsVozAvance = null;
let fsVozUltimo = null; // { id, previo } para Deshacer
let fsVozFiltro = null; // { id, vals } cuando lo dicho coincide con varias opciones

function fsVozPasos() {
  const p = ["tipo", "movCuenta", "movCategoria"];
  const fila = $("filaCotizacion");
  if (fila && !fila.hidden) p.push("movCotizacion");
  p.push("movMonto", "movDetalle");
  // "Pagar después" y "En cuotas" son opcionales: solo entran si se eligen al final.
  if ($("movDiferido").checked) p.push("movFechaPago");
  else if ($("movCuotas").checked) p.push("movCuotaN", "movCuotaFecha");
  return p;
}
function fsVozNombrePaso(id) {
  return t({ tipo: "vozPTipo", movCuenta: "vozPCuenta", movCategoria: "vozPCat", movCotizacion: "vozPCotiz", movMonto: "vozPMonto", movDetalle: "vozPDetalle", movDiferido: "vozPDif", movFechaPago: "vozPFechaPago", movCuotas: "vozPCuotas", movCuotaN: "vozPCuotaN", movCuotaFecha: "vozPCuotaF" }[id]);
}
function fsVozPregunta(id) {
  return t({ tipo: "vozQTipo", movCuenta: "vozQCuenta", movCategoria: "vozQCat", movCotizacion: "vozQCotiz", movMonto: "vozQMonto", movDetalle: "vozQDetalle", movDiferido: "vozQDif", movFechaPago: "vozQFechaPago", movCuotas: "vozQCuotas", movCuotaN: "vozQCuotaN", movCuotaFecha: "vozQCuotaF" }[id]);
}
function fsVozValorMostrado(id) {
  if (id === "tipo") {
    const a = document.querySelector("#segmentadoTipo .segmentado-item.activo");
    return a ? a.textContent.trim() : "";
  }
  const el = $(id);
  if (el && el.type === "checkbox") return el.checked ? t("vozSi") : t("vozNo");
  if (!el || !el.value) return "";
  if (el.type === "date") return el.value.split("-").reverse().join("/");
  if (el.tagName === "SELECT") return el.selectedOptions[0] ? el.selectedOptions[0].textContent : "";
  if (id === "movMonto") {
    const cod = monedaDeCuentaNombre($("movCuenta").value);
    return simboloDe(cod) + " " + el.value;
  }
  return el.value;
}

// Se pasa a "ya cargado" solo lo que el usuario realmente dijo/eligió en esta pantalla.
let fsVozHecho = {};

function fsVozDibujar() {
  const pasos = fsVozPasos();
  const fin = fsVozIdx >= pasos.length;
  const total = pasos.length;
  $("vozProgresoTxt").textContent = fin ? t("vozListoTitulo") : t("vozPaso").replace("{n}", () => fsVozIdx + 1).replace("{total}", () => total);
  $("vozBarra").style.width = Math.round(((fin ? total : fsVozIdx) / total) * 100) + "%";

  const lista = $("vozLista");
  lista.innerHTML = "";
  pasos.forEach((id, i) => {
    const li = document.createElement("button");
    li.type = "button";
    const hecho = !!fsVozHecho[id];
    li.className = "voz-item" + (i === fsVozIdx ? " actual" : "") + (hecho ? " hecho" : "");
    const v = hecho ? fsVozValorMostrado(id) : "";
    li.innerHTML = '<span class="voz-marca">' + (hecho ? "✓" : (i + 1)) + '</span><span class="voz-textos"><span class="voz-nombre"></span><span class="voz-valor"></span></span>';
    li.querySelector(".voz-nombre").textContent = fsVozNombrePaso(id);
    li.querySelector(".voz-valor").textContent = hecho ? (v || "—") : "";
    li.onclick = () => { fsVozCancelarAvance(); fsVozFiltro = null; fsVozIdx = i; fsVozDibujar(); };
    lista.appendChild(li);
  });

  const cont = $("vozPaso");
  cont.innerHTML = "";
  $("vozDeshacer").hidden = !fsVozUltimo;
  if (fin) {
    $("vozPregunta").textContent = t("vozListoPreg");
    $("vozEscuchado").textContent = "";
    $("vozEstado").textContent = "";
    $("vozMic").hidden = true;
    $("vozFin").hidden = false;
    const sinExtra = !$("movDiferido").checked && !$("movCuotas").checked;
    $("vozAddDif").hidden = !sinExtra;
    $("vozAddCuotas").hidden = !sinExtra || !!$("movId").value;
    return;
  }
  $("vozFin").hidden = true;
  $("vozMic").hidden = false;
  const id = pasos[fsVozIdx];
  $("vozPregunta").textContent = fsVozPregunta(id);
  $("vozEscuchado").textContent = "";
  $("vozEstado").textContent = t("vozToque");

  if (id === "tipo") {
    [["Gasto", t("segGasto")], ["Ingreso", t("segIngreso")]].forEach(([val, txt]) => fsVozChip(cont, txt, () => fsVozAplicar(id, val)));
  } else if (id === "movCuenta" || id === "movCategoria") {
    const filtro = fsVozFiltro && fsVozFiltro.id === id ? fsVozFiltro.vals : null;
    [...$(id).options].filter((o) => o.value && (!filtro || filtro.includes(o.value))).forEach((o) => fsVozChip(cont, o.textContent, () => fsVozAplicar(id, o.value)));
  } else if (id === "movDiferido" || id === "movCuotas") {
    fsVozChip(cont, t("vozSi"), () => fsVozAplicar(id, "si", true));
    fsVozChip(cont, t("vozNo"), () => fsVozAplicar(id, "no", true));
  } else if (id === "movFechaPago" || id === "movCuotaFecha" || id === "movCuotaN") {
    const quitar = document.createElement("button");
    quitar.type = "button"; quitar.className = "boton boton-texto"; quitar.textContent = t("vozQuitar");
    quitar.onclick = () => {
      ["movDiferido", "movCuotas"].forEach((k) => { if ($(k).checked) { $(k).checked = false; $(k).dispatchEvent(new Event("change", { bubbles: true })); } });
      ["movFechaPago", "movCuotaN", "movCuotaFecha"].forEach((k) => delete fsVozHecho[k]);
      fsVozUltimo = null;
      fsVozIdx = fsVozPasos().length;
      fsVozDibujar();
    };
    const fila = document.createElement("div");
    fila.className = "voz-entrada";
    const inp = document.createElement("input");
    inp.id = "vozInput";
    if (id === "movCuotaN") { inp.type = "number"; inp.min = 2; inp.max = 60; inp.inputMode = "numeric"; }
    else inp.type = "date";
    inp.value = $(id).value || "";
    const ok = document.createElement("button");
    ok.type = "button"; ok.className = "boton boton-primario"; ok.textContent = "OK";
    ok.onclick = () => { if (inp.value) fsVozAplicar(id, inp.value); };
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); ok.click(); } });
    fila.appendChild(inp); fila.appendChild(ok);
    cont.appendChild(fila);
    cont.appendChild(quitar);
  } else {
    const fila = document.createElement("div");
    fila.className = "voz-entrada";
    const inp = document.createElement("input");
    inp.type = "text";
    inp.id = "vozInput";
    inp.inputMode = id === "movDetalle" ? "text" : "decimal";
    inp.placeholder = id === "movDetalle" ? t("placeholderDetalle") : "0,00";
    if (id !== "movDetalle") activarFormatoImporte(inp);
    const ok = document.createElement("button");
    ok.type = "button";
    ok.className = "boton boton-primario";
    ok.textContent = id === "movDetalle" ? t("vozSeguir") : "OK";
    ok.onclick = () => {
      const v = inp.value.trim();
      if (id === "movDetalle") return fsVozAplicar(id, v, true);
      if (!v) return;
      fsVozAplicar(id, v.replace(/\./g, "").replace(",", "."), false, true);
    };
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); ok.click(); } });
    fila.appendChild(inp); fila.appendChild(ok);
    cont.appendChild(fila);
    if (id === "movDetalle") {
      const om = document.createElement("button");
      om.type = "button"; om.className = "boton boton-texto"; om.textContent = t("vozOmitir");
      om.onclick = () => fsVozAplicar(id, "", true);
      cont.appendChild(om);
    }
  }
}
function fsVozChip(cont, txt, fn) {
  const b = document.createElement("button");
  b.type = "button"; b.className = "voz-chip"; b.textContent = txt; b.onclick = fn;
  cont.appendChild(b);
}

function fsVozCancelarAvance() { if (fsVozAvance) { clearTimeout(fsVozAvance); fsVozAvance = null; } }

// Escribe el dato en el formulario real y avanza.
function fsVozAplicar(id, val, vacioOk, esNumero) {
  fsVozCancelarAvance();
  fsVozFiltro = null;
  if (fsVoiceRec) { try { fsVoiceRec.abort(); } catch {} }
  const previo = id === "tipo" ? (document.querySelector("#segmentadoTipo .segmentado-item.activo") || {}).dataset?.tipo
    : ($(id) && $(id).type === "checkbox") ? $(id).checked : ($(id) || {}).value;
  if (id === "tipo") {
    seleccionarTipo(val);
    renderSelectCategorias(val);
  } else if (id === "movCuenta" || id === "movCategoria") {
    $(id).value = val;
    $(id).dispatchEvent(new Event("change", { bubbles: true })); // la cuenta puede abrir el paso de cotización
  } else if (id === "movMonto" || id === "movCotizacion") {
    if (!(Number(val) > 0)) { $("vozEstado").textContent = t("vozNoEntendi"); return; }
    $(id).value = formatearImporteEscrito(String(val).replace(".", ","));
  } else if (id === "movDiferido" || id === "movCuotas") {
    $(id).checked = val === "si";
    $(id).dispatchEvent(new Event("change", { bubbles: true }));
  } else if (id === "movFechaPago" || id === "movCuotaFecha") {
    $(id).value = val;
    $(id).dispatchEvent(new Event("change", { bubbles: true }));
  } else if (id === "movCuotaN") {
    const n = parseInt(val, 10);
    if (!(n >= 2 && n <= 60)) { $("vozEstado").textContent = t("vozNoCuotas"); return; }
    $(id).value = n;
    $(id).dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    if (!val && !vacioOk) return;
    $("movDetalle").value = val;
  }
  fsVozHecho[id] = true;
  fsVozUltimo = { id, previo };
  const pasos = fsVozPasos();
  // Siguiente paso = el primero no hecho a partir del actual
  let sig = pasos.indexOf(id) + 1;
  fsVozIdx = sig;
  if (id !== "movDetalle") {
    $("vozEstado").textContent = "✓ " + fsVozValorMostrado(id);
  }
  fsVozDibujar();
  if (fsVozIdx >= fsVozPasos().length) $("vozEstado").textContent = "";
  $("vozEscuchado").textContent = "✓ " + fsVozNombrePaso(id) + ": " + (fsVozValorMostrado(id) || "—");
}

function fsVozDeshacer() {
  if (!fsVozUltimo) return;
  fsVozCancelarAvance();
  const { id, previo } = fsVozUltimo;
  delete fsVozHecho[id];
  if (id === "tipo") { if (previo) { seleccionarTipo(previo); renderSelectCategorias(previo); } }
  else if (id === "movCuenta" || id === "movCategoria") { $(id).value = previo || ""; $(id).dispatchEvent(new Event("change", { bubbles: true })); }
  else if ($(id).type === "checkbox") { $(id).checked = !!previo; $(id).dispatchEvent(new Event("change", { bubbles: true })); }
  else $(id).value = previo || "";
  fsVozUltimo = null;
  const pasos = fsVozPasos();
  fsVozIdx = Math.max(0, pasos.indexOf(id));
  fsVozDibujar();
}

function fsVozAbrir() {
  fsVozHecho = {}; fsVozUltimo = null; fsVozIdx = 0; fsVozFiltro = null;
  $("vozPantalla").hidden = false;
  document.body.classList.add("voz-abierta");
  fsVozDibujar();
}
function fsVozCerrar() {
  fsVozCancelarAvance();
  if (fsVoiceRec) { try { fsVoiceRec.abort(); } catch {} }
  const p = $("vozPantalla");
  if (p) p.hidden = true;
  document.body.classList.remove("voz-abierta");  if (typeof rapidoActivo === "function" && rapidoActivo()) rapidoRefrescar();
}

function fsVozPrepararNuevo() {
  const b = $("btnCargarVoz");
  if (!b) return;
  b.hidden = false;
  b.onclick = fsVozAbrir;
  $("vozCerrar").onclick = fsVozCerrar;
  $("vozMic").onclick = fsVoiceEscuchar;
  $("vozFrase").onclick = fsVoiceFrase;
  $("vozDeshacer").onclick = fsVozDeshacer;
  $("vozGuardar").onclick = () => { fsVozCerrar(); $("formMovimiento").requestSubmit(); };
  $("vozRevisar").onclick = fsVozCerrar;
  const extra = (chk) => {
    $(chk).checked = true;
    $(chk).dispatchEvent(new Event("change", { bubbles: true }));
    fsVozUltimo = null;
    fsVozIdx = fsVozPasos().length - (chk === "movCuotas" ? 2 : 1);
    fsVozDibujar();
  };
  $("vozAddDif").onclick = () => extra("movDiferido");
  $("vozAddCuotas").onclick = () => extra("movCuotas");
}
function fsVoiceOcultar() {
  const b = $("btnCargarVoz");
  if (b) b.hidden = true;
  fsVozCerrar();
}

function fsVoiceEscuchar() {
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const st = $("vozEstado"), heard = $("vozEscuchado"), mic = $("vozMic");
  if (!Reconocimiento) { st.textContent = t("vozSinSoporte"); return; }
  const pasos = fsVozPasos();
  const id = pasos[fsVozIdx];
  if (!id) return;
  let pendiente = "";
  fsVoiceRec = new Reconocimiento();
  fsVoiceRec.lang = LOCALES_POR_IDIOMA[idiomaActual] || "es-AR";
  fsVoiceRec.continuous = false;
  fsVoiceRec.interimResults = false;
  fsVoiceRec.maxAlternatives = 5;
  fsVoiceRec.onstart = () => { st.textContent = t("vozEscuchando"); mic.classList.add("grabando"); };
  fsVoiceRec.onresult = (e) => {
    const cand = [];
    for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) cand.push(e.results[i][j].transcript.trim());
    let elegido = cand.find((x) => !!fsVozInterpretar(id, x))
      || ((id === "movCuenta" || id === "movCategoria") ? cand.find((x) => fsVoiceOpcionLista(id, x).length > 1) : "")
      || cand[0] || "";
    if (id === "movMonto" || id === "movCotizacion") {
      const esc = cand.find((x) => /\bmil\b|\bthousand\b|\bmill[oó]n(?:es)?\b|\bmilh[aã]o\b|\bmilh[oõ]es\b|\bmillion\b/i.test(x) && !!fsVoiceMonto(x));
      if (esc) elegido = esc;
    }
    pendiente = elegido;
    heard.textContent = "“" + elegido + "”";
  };
  fsVoiceRec.onerror = (e) => {
    mic.classList.remove("grabando");
    if (e.error === "not-allowed" || e.error === "permission-denied") st.textContent = t("vozMicBloq");
    else if (e.error === "no-speech") st.textContent = t("vozNoEscuche");
    else if (e.error !== "aborted") st.textContent = t("vozNoPude") + " (" + e.error + ")";
    pendiente = "";
  };
  fsVoiceRec.onend = () => {
    mic.classList.remove("grabando");
    if (!pendiente) { if (!st.textContent || st.textContent === t("vozEscuchando")) st.textContent = t("vozNoEscuche"); return; }
    const val = fsVozInterpretar(id, pendiente);
    if (!val && (id === "movCuenta" || id === "movCategoria")) {
      const l = fsVoiceOpcionLista(id, pendiente);
      if (l.length > 1) {
        fsVozFiltro = { id, vals: l };
        fsVozDibujar();
        $("vozEscuchado").textContent = "“" + pendiente + "”";
        $("vozEstado").textContent = t("vozCual");
        return;
      }
    }
    if (!val) { st.textContent = id === "tipo" ? t("vozNoTipo") : (id === "movDiferido" || id === "movCuotas") ? t("vozNoSiNo") : t("vozNoEntendi"); return; }
    fsVozAplicar(id, val, true);
  };
  try { fsVoiceRec.start(); } catch (err) { st.textContent = t("vozNoPude"); }
}
// ---------- Voz: todo en una sola frase ----------
// Devuelve lo que se entendió de una frase como "Gasté 32 mil en el súper con la Visa, en 3 cuotas, ayer".
function fsVozFraseInterpretar(texto) {
  let q = fsVoiceNorm(texto);
  const r = {};
  let m = q.match(/\b(?:en|em|in|a)\s+([a-z0-9]+)\s+(?:cuotas?|pagos?|parcelas?|installments?|payments?)\b/)
    || q.match(/\b([a-z0-9]+)\s+(?:cuotas?|parcelas?|installments?)\b/);
  if (m) { const n = fsVozNum(m[1]); if (n >= 2 && n <= 60) r.cuotas = n; q = q.replace(m[0], " "); }
  const base = new Date(); base.setHours(12, 0, 0, 0);
  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const dia = (n) => { const d = new Date(base); d.setDate(d.getDate() + n); return iso(d); };
  if (/\b(anteayer|antes de ontem|day before yesterday)\b/.test(q)) { r.fecha = dia(-2); q = q.replace(/\b(anteayer|antes de ontem|day before yesterday)\b/, " "); }
  else if (/\b(ayer|ontem|yesterday)\b/.test(q)) { r.fecha = dia(-1); q = q.replace(/\b(ayer|ontem|yesterday)\b/, " "); }
  else if (/\b(hoy|hoje|today)\b/.test(q)) { r.fecha = dia(0); q = q.replace(/\b(hoy|hoje|today)\b/, " "); }
  const tipo = fsVoiceTipo(q);
  if (tipo) r.tipo = tipo;
  const monto = fsVoiceMonto(q);
  if (monto && Number(monto) > 0) r.monto = monto;
  const c = fsVoiceOpcionLista("movCuenta", q);
  if (c.length === 1) r.cuenta = c[0];
  r.texto = q;
  return r;
}
function fsVozAplicarFrase(texto) {
  const r = fsVozFraseInterpretar(texto);
  const st = $("vozEstado");
  if (!r.monto) { st.textContent = t("vozFraseNada"); return false; }
  fsVozHecho = {}; fsVozUltimo = null;
  if (r.tipo) fsVozAplicar("tipo", r.tipo, true);
  if (r.cuenta) fsVozAplicar("movCuenta", r.cuenta, true);
  const cats = fsVoiceOpcionLista("movCategoria", r.texto);
  if (cats.length === 1) fsVozAplicar("movCategoria", cats[0], true);
  fsVozAplicar("movMonto", r.monto, true, true);
  if (r.cuotas) { fsVozAplicar("movCuotas", "si", true); fsVozAplicar("movCuotaN", String(r.cuotas), true); }
  if (r.fecha) { $("movFecha").value = r.fecha; $("movFecha").dispatchEvent(new Event("change", { bubbles: true })); }
  const pasos = fsVozPasos();
  const falta = pasos.findIndex((id) => !fsVozHecho[id]);
  fsVozIdx = falta === -1 ? pasos.length : falta;
  fsVozDibujar();
  $("vozEscuchado").textContent = "“" + texto + "”";
  st.textContent = t("vozFraseListo");
  return true;
}
function fsVoiceFrase() {
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const st = $("vozEstado"), heard = $("vozEscuchado"), mic = $("vozMic");
  if (!Reconocimiento) { st.textContent = t("vozSinSoporte"); return; }
  let pendiente = "";
  fsVoiceRec = new Reconocimiento();
  fsVoiceRec.lang = LOCALES_POR_IDIOMA[idiomaActual] || "es-AR";
  fsVoiceRec.continuous = false;
  fsVoiceRec.interimResults = false;
  fsVoiceRec.maxAlternatives = 5;
  fsVoiceRec.onstart = () => { st.textContent = t("vozEscuchando"); mic.classList.add("grabando"); };
  fsVoiceRec.onresult = (e) => {
    const cand = [];
    for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) cand.push(e.results[i][j].transcript.trim());
    pendiente = cand.find((x) => fsVozFraseInterpretar(x).monto) || cand[0] || "";
    heard.textContent = "“" + pendiente + "”";
  };
  fsVoiceRec.onerror = (e) => {
    mic.classList.remove("grabando");
    if (e.error === "not-allowed" || e.error === "permission-denied") st.textContent = t("vozMicBloq");
    else if (e.error === "no-speech") st.textContent = t("vozNoEscuche");
    else if (e.error !== "aborted") st.textContent = t("vozNoPude") + " (" + e.error + ")";
    pendiente = "";
  };
  fsVoiceRec.onend = () => {
    mic.classList.remove("grabando");
    if (!pendiente) { if (!st.textContent || st.textContent === t("vozEscuchando")) st.textContent = t("vozNoEscuche"); return; }
    fsVozAplicarFrase(pendiente);
  };
  try { fsVoiceRec.start(); } catch (err) { st.textContent = t("vozNoPude"); }
}

// movCotizacion se interpreta igual que un monto.
function fsVoiceIdInterno(id) { return id === "movCotizacion" ? "movMonto" : id; }

function fsVozNum(w) { w = String(w || "").trim(); return /^\d+$/.test(w) ? parseInt(w, 10) : fsVoiceNumeroPalabras(w); }
function fsVozFecha(txt) {
  const q = fsVoiceNorm(txt), base = new Date();
  base.setHours(12, 0, 0, 0);
  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const add = (n) => { const d = new Date(base); d.setDate(d.getDate() + n); return iso(d); };
  if (/\b(pasado manana|depois de amanha|day after tomorrow)\b/.test(q)) return add(2);
  if (/\b(manana|amanha|tomorrow)\b/.test(q)) return add(1);
  if (/\b(hoy|hoje|today)\b/.test(q)) return add(0);
  let m = q.match(/\ben ([a-z0-9]+) (dias?|semanas?)\b/);
  if (m) { const n = fsVozNum(m[1]); if (n) return add(/sem/.test(m[2]) ? n * 7 : n); }
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  m = q.match(/\b([a-z0-9]+) de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/);
  if (m) {
    const dia = fsVozNum(m[1]);
    if (dia >= 1 && dia <= 31) {
      let d = new Date(base.getFullYear(), meses.indexOf(m[2]), dia, 12);
      if (d < new Date(base.getFullYear(), base.getMonth(), base.getDate())) d = new Date(base.getFullYear() + 1, meses.indexOf(m[2]), dia, 12);
      return iso(d);
    }
  }
  m = q.match(/\bel ([a-z0-9]+)\b/);
  if (m) {
    const dia = fsVozNum(m[1]);
    if (dia >= 1 && dia <= 31) {
      let d = new Date(base.getFullYear(), base.getMonth(), dia, 12);
      if (d < new Date(base.getFullYear(), base.getMonth(), base.getDate())) d = new Date(base.getFullYear(), base.getMonth() + 1, dia, 12);
      return iso(d);
    }
  }
  return "";
}
function fsVozInterpretar(id, texto) {
  if (id === "movDiferido" || id === "movCuotas") {
    const q = fsVoiceNorm(texto);
    if (/\b(no|nao|nope)\b/.test(q)) return "no";
    if (/\b(si|dale|claro|ok|afirmativo|obvio|sim|yes|yeah|sure)\b/.test(q)) return "si";
    return "";
  }
  if (id === "movFechaPago" || id === "movCuotaFecha") return fsVozFecha(texto);
  if (id === "movCuotaN") { const m = fsVoiceNorm(texto).match(/\b(\d+)\b/); const n = m ? parseInt(m[1], 10) : fsVoiceNumeroPalabras(fsVoiceNorm(texto)); return n ? String(n) : ""; }
  return fsVoiceInterpretar(fsVoiceIdInterno(id), texto);
}

function fsVoiceNorm(t) {
  return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
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
  if (/\b(gasto|gastos|gaste|gaste|pague|pago|pagar|compre|compra|compre|sali[oó]|salida|egreso|debito|d[eé]bito|debitaron|despesa|despesas|gastei|paguei|comprei|saida|expense|expenses|spent|paid|bought|cost)\b/.test(t)) return "Gasto";
  if (/\b(ingreso|ingresos|cobre|cobro|cobrar|recibi|recibo|entro|entrada|deposito|dep[oó]sito|acredito|acreditaron|sueldo|cobranza|receita|receitas|renda|recebi|recebo|salario|income|earned|received|salary|deposit)\b/.test(t)) return "Ingreso";
  return "";
}

// Suena igual en español rioplatense: b/v, s/z/c, ll/y, h muda. Se compara por sonido.
function fsVoiceFon(t) {
  return fsVoiceNorm(t).replace(/v/g, "b").replace(/z/g, "s").replace(/c(?=[ei])/g, "s").replace(/ll/g, "y").replace(/h/g, "");
}
// Lista de opciones que coinciden con lo dicho (de más a menos exacta).
function fsVoiceOpcionLista(id, t) {
  const el = $(id);
  if (!el) return [];
  t = fsVoiceFon(t);
  const ops = [...el.options].filter((x) => x.value);
  const nom = (o) => fsVoiceFon(o.value);
  let r = ops.filter((o) => t.includes(nom(o)) || t.includes(fsVoiceFon(o.textContent)));
  if (r.length) return r.map((o) => o.value);
  r = ops.filter((o) => t.length >= 3 && nom(o).includes(t));
  if (r.length) return r.map((o) => o.value);
  const palabras = t.split(/\s+/).filter((w) => w.length >= 4 && !["cuenta", "categoria", "banco", "tarjeta"].includes(w));
  r = ops.filter((o) => palabras.some((w) => nom(o).split(/\s+/).includes(w)));
  return r.map((o) => o.value);
}
// Devuelve la opción solo si es única; si hay dudas, devuelve vacío.
function fsVoiceOpcion(id, t) {
  const l = fsVoiceOpcionLista(id, t);
  return l.length === 1 ? l[0] : "";
}

function fsVoiceNumeroPalabras(txt) {
  txt = fsVoiceNorm(txt).replace(/\b(y|e|and)\b/g, " ").replace(/\s+/g, " ").trim();
  const u = { cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,
    diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18,diecinueve:19,
    veinte:20,veintiuno:21,veintidos:22,veintitres:23,veinticuatro:24,veinticinco:25,veintiseis:26,veintisiete:27,veintiocho:28,veintinueve:29,
    treinta:30,cuarenta:40,cincuenta:50,sesenta:60,setenta:70,ochenta:80,noventa:90,
    cien:100,ciento:100,doscientos:200,trescientos:300,cuatrocientos:400,quinientos:500,seiscientos:600,setecientos:700,ochocientos:800,novecientos:900,
    // portugués
    um:1,uma:1,dois:2,duas:2,quatro:4,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,
    vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,oitenta:80,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,
    // inglés
    zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,
    twenty:20,thirty:30,forty:40,fifty:50,seventy:70,eighty:80,ninety:90 };
  let total = 0, actual = 0, vio = false;
  for (const w of txt.split(" ")) {
    if (w in u) { actual += u[w]; vio = true; continue; }
    if (/^\d+$/.test(w)) { actual += parseInt(w, 10); vio = true; continue; } // "15 mil", "5 mil 500"
    if (w === "hundred") { actual = (actual || 1) * 100; vio = true; continue; }
    if (w === "mil" || w === "thousand") { total += (actual || 1) * 1000; actual = 0; vio = true; continue; }
    if (w === "millon" || w === "millones" || w === "milhao" || w === "milhoes" || w === "million") { total += (actual || 1) * 1000000; actual = 0; vio = true; continue; }
  }
  return vio ? total + actual : null;
}

function fsVoiceMonto(t) {
  let q = fsVoiceNorm(t).replace(/\$/g, " ").replace(/\s+/g, " ").trim();
  // "32 dollars and 50 cents" / "32 reais e 50 centavos" => "32 con 50"
  q = q.replace(/\b(dollars?|bucks|reais|real|euros?)\s+(?:and|e)\s+/, " con ").replace(/\b(cents?)\b/g, "centavos");
  function vp(txt) { txt = (txt || "").trim(); if (!txt) return null; if (/^\d+$/.test(txt)) return parseInt(txt, 10); return fsVoiceNumeroPalabras(txt); }
  function cents(txt) { txt = (txt || "").replace(/\bcentavos?\b/g, " ").trim(); let m = txt.match(/\b(\d{1,2})\b/); if (m) return Math.min(99, parseInt(m[1], 10)); let n = vp(txt); return n === null ? null : Math.min(99, n); }
  if (/\bmillon(?:es)?\b/.test(q)) {
    let mm = q.match(/^(.*?)\bmillon(?:es)?\b\s*(.*)$/), pref = mm ? mm[1].trim() : "", resto = mm ? mm[2].trim() : "";
    let mult = vp(pref); if (mult === null || mult === 0) mult = 1; let total = mult * 1000000;
    let p = resto.split(/\bcon\b/), pesos = (p[0] || "").replace(/\bde\b/g, " ").replace(/\bpesos?\b/g, " ").trim(), cent = p.length > 1 ? p.slice(1).join(" ").trim() : "";
    if (pesos && /\bmil\b/.test(pesos)) { let n = vp(pesos); if (n !== null) total += n; } else if (pesos) { let nr = pesos.match(/\b(\d{1,3}(?:[.,]\d{3})+|\d{1,6})\b/); if (nr) total += parseInt(nr[1].replace(/[.,]/g, ""), 10); else { let n = vp(pesos); if (n !== null) total += n; } }
    let c = cents(cent); return c !== null ? (total + c / 100).toFixed(2) : String(total);
  }
  let m = q.match(/\b(\d{1,3}(?:,\d{3})+)\.(\d{1,2})\b/); if (m) return (parseInt(m[1].replace(/,/g, ""), 10) + parseInt((m[2] + "0").slice(0, 2), 10) / 100).toFixed(2);
  m = q.match(/\b(\d{1,3}(?:\.\d{3})+),(\d{1,2})\b/); if (m) return (parseInt(m[1].replace(/\./g, ""), 10) + parseInt((m[2] + "0").slice(0, 2), 10) / 100).toFixed(2);
  m = q.match(/\b(\d{4,})[.,](\d{1,2})\b/); if (m) return (parseInt(m[1], 10) + parseInt((m[2] + "0").slice(0, 2), 10) / 100).toFixed(2);
  let p = q.split(/\bcon\b/), principal = p[0].replace(/\bpesos?\b/g, " ").trim(), resto = p.length > 1 ? p.slice(1).join(" ").trim() : "", base = null;
  m = principal.match(/\b(\d{1,3}(?:[.,]\d{3})+|\d{4,})\b/); if (m) base = parseInt(m[1].replace(/[.,]/g, ""), 10);
  if (base === null) { let n = vp(principal); if (n !== null) base = n; }
  let c = cents(resto); if (base !== null) return c !== null ? (base + c / 100).toFixed(2) : String(base);
  return "";
}

function fsVoiceInterpretar(id, t) {
  if (id === "tipo") return fsVoiceTipo(t);
  if (id === "movMonto") return fsVoiceMonto(t);
  if (id === "movCuenta" || id === "movCategoria") return fsVoiceOpcion(id, t);
  if (id === "movDetalle") { let x = String(t || "").trim().replace(/[.,;:]+$/, ""); return x ? x[0].toUpperCase() + x.slice(1) : ""; }
  return "";
}


$("btnMovInterno").addEventListener("click", () => {
  const id = $("movId").value;
  const m = movimientos.find((x) => x.id === id) || pendientes.find((x) => x.id === id);
  if (!m) return;
  if (cuentas.length < 2) return mostrarToast(t("tengoNecesitaDos"));
  cerrarModal();
  const esGasto = m.tipo === "Gasto";
  abrirTransferencia({
    desde: esGasto ? m.cuenta : null,
    hacia: esGasto ? null : m.cuenta,
    monto: formatearImporteEscrito(String(m.monto).replace(".", ",")),
    fecha: m.fecha_pago || m.fecha,
    movId: m.id,
  });
});

$("btnBorrarMov").addEventListener("click", async () => {
  const id = $("movId").value;
  if (!id) return;
  if (!confirm(t("confBorrarMov"))) return;
  const mBorrar = movimientos.find((x) => x.id === id) || pendientes.find((x) => x.id === id);
  try {
    await borrarMovimiento(id);
    if (mBorrar && mBorrar.comprobante) borrarComprobante(mBorrar.comprobante);
    cerrarModal();
    await cargarMesActual();
    mostrarToast("Movimiento borrado.");
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

async function guardarMovimientoSubmit(e) {
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
  if (!cuenta) return mostrarAviso($("movError"), t("errElegirCuenta"));
  if (!categoria) return mostrarAviso($("movError"), t("errElegirCategoria"));
  if (!Number.isFinite(monto) || monto <= 0) return mostrarAviso($("movError"), "El monto tiene que ser mayor a cero.");

  // Moneda y cotización: la moneda es la de la cuenta; si no es la base, hace falta la cotización.
  const monedaMov = monedaDeCuentaNombre(cuenta);
  let cotizacion = 1;
  if (monedaMov !== monedaBase()) {
    cotizacion = numeroDesdeTexto($("movCotizacion").value);
    if (!Number.isFinite(cotizacion) || cotizacion <= 0) return mostrarAviso($("movError"), t("errCotizacion"));
    guardarCotiz(monedaMov, cotizacion);
  }

  // Si se paga/cobra después: queda "pendiente" hasta que se marque como pagado.
  let estado = "pagado";
  let fechaPago = null;
  if ($("movDiferido").checked) {
    fechaPago = $("movFechaPago").value;
    if (!fechaPago) return mostrarAviso($("movError"), t("errFaltaFechaPago"));
    if (fechaPago < fecha) return mostrarAviso($("movError"), t("errFechaPagoAnterior"));
    estado = id && $("movYaPagado").checked ? "pagado" : "pendiente";
  }

  // Pagar en cuotas: se crea una por mes, cada una pendiente hasta que se marque pagada.
  if (!id && $("movCuotas").checked && !$("movDiferido").checked) {
    const n = parseInt($("movCuotaN").value, 10);
    const primera = $("movCuotaFecha").value || fecha;
    if (!Number.isInteger(n) || n < 2 || n > 60) return mostrarAviso($("movError"), t("errCuotas"));
    const eraPrimeroCuotas = await guiaEraPrimerMovimiento();
    const rp = repartirCuotas(monto, n);
    if (!(rp.base > 0)) return mostrarAviso($("movError"), t("errCuotas"));
    const cuotas = [];
    for (let k = 0; k < n; k++) {
      const f = sumarMesesISO(primera, k);
      cuotas.push({
        tipo, fecha: f, cuenta, categoria, monto: k === n - 1 ? rp.ultima : rp.base, moneda: monedaMov, cotizacion,
        detalle: (detalle ? detalle + " · " : "") + t("textoCuota") + " " + (k + 1) + "/" + n,
        estado: "pendiente", fecha_pago: f,
      });
    }
    try {
      await crearMovimientos(usuario.id, cuotas);
      cerrarModal();
      await cargarMesActual();
      mostrarToast(t("toastCuotas").replace("{n}", n));
      guiaDespuesDeGuardar(eraPrimeroCuotas);
    } catch (err) {
      mostrarAviso($("movError"), traducirErrorDatos(err));
    }
    return;
  }

  const datos = { tipo, fecha, cuenta, categoria, detalle, monto, moneda: monedaMov, cotizacion, estado, fecha_pago: fechaPago };
  const eraPrimero = id ? false : await guiaEraPrimerMovimiento();

  try {
    if (comprobantesDisponible) {
      if (foto.nueva) {
        try { datos.comprobante = await subirComprobante(usuario.id, foto.nueva); }
        catch { return mostrarAviso($("movError"), t("fotoErr")); }
      } else if (foto.quitar) datos.comprobante = null;
    }
    if (id) await actualizarMovimiento(id, datos);
    else await crearMovimiento(usuario.id, datos);
    if (comprobantesDisponible && foto.actual && (foto.nueva || foto.quitar)) borrarComprobante(foto.actual);
    cerrarModal();
    await cargarMesActual();
    mostrarToast(id ? "Movimiento actualizado." : "Movimiento guardado.");
    if (!id) guiaDespuesDeGuardar(eraPrimero);
  } catch (err) {
    mostrarAviso($("movError"), traducirErrorDatos(err));
  }
}
// Un solo guardado a la vez: si se toca Guardar dos veces seguidas (o la conexión es lenta), no se duplica el movimiento.
let guardandoMov = false;
$("formMovimiento").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (guardandoMov) return;
  guardandoMov = true;
  const botones = document.querySelectorAll('#formMovimiento button[type="submit"]');
  botones.forEach((b) => { b.disabled = true; });
  try { await guardarMovimientoSubmit(e); }
  finally { guardandoMov = false; botones.forEach((b) => { b.disabled = false; }); }
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

// Trae los movimientos a exportar, según el período elegido (por la fecha del
// movimiento). Con las dos fechas vacías devuelve todos. Devuelve null si
// ya avisó con un cartel por qué no hay nada para exportar.
async function movimientosParaExportar() {
  const desde = $("exportDesde").value; // "AAAA-MM-DD" o ""
  const hasta = $("exportHasta").value;
  if (desde && hasta && desde > hasta) {
    mostrarToast(t("toastExportRangoInvalido"));
    return null;
  }
  mostrarToast("Preparando archivo...");
  const todos = await listarTodosLosMovimientos(usuario.id);
  if (!todos.length) {
    mostrarToast(t("toastNadaExportar"));
    return null;
  }
  const elegidos = todos.filter((m) => {
    const f = String(m.fecha || "").slice(0, 10);
    return (!desde || f >= desde) && (!hasta || f <= hasta);
  });
  if (!elegidos.length) {
    mostrarToast(t("toastExportSinMovs"));
    return null;
  }
  return elegidos;
}

// Número de serie de Excel para una fecha "AAAA-MM-DD" (días desde 1899-12-30).
function serialExcel(fechaISO) {
  const [y, m, d] = String(fechaISO || "").slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return null;
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000);
}
function montoFirmado(m) {
  return m.tipo === "Gasto" ? -Math.abs(m.monto) : Math.abs(m.monto);
}
function montoBaseFirmado(m) {
  return m.tipo === "Gasto" ? -Math.abs(montoBase(m)) : Math.abs(montoBase(m));
}

// ---- Archivo .xlsx real (zip sin comprimir + XML), sin librerías ----
const tablaCRC = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(bytes) { let c = 0xFFFFFFFF; for (let i = 0; i < bytes.length; i++) c = tablaCRC[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function zipSinComprimir(archivos) {
  const enc = new TextEncoder();
  const partes = [], central = [];
  let offset = 0;
  const u16 = (v) => [v & 255, (v >>> 8) & 255];
  const u32 = (v) => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
  archivos.forEach(({ nombre, texto }) => {
    const nom = enc.encode(nombre), dat = enc.encode(texto), crc = crc32(dat);
    const cab = [...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(dat.length), ...u32(dat.length), ...u16(nom.length), ...u16(0)];
    partes.push(new Uint8Array(cab), nom, dat);
    central.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(dat.length), ...u32(dat.length), ...u16(nom.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset)]), nom);
    offset += cab.length + nom.length + dat.length;
  });
  const tamCentral = central.reduce((n, x) => n + x.length, 0);
  const fin = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(archivos.length), ...u16(archivos.length), ...u32(tamCentral), ...u32(offset), ...u16(0)]);
  return new Blob([...partes, ...central, fin], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
function letraCol(i) { return String.fromCharCode(65 + i); }
function xmlEsc(v) { return String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ""); }
// estilos: 0 normal, 1 fecha, 2 numero con 2 decimales, 3 encabezado en negrita
function celdaX(col, fila, v, tipo) {
  const ref = letraCol(col) + fila;
  if (v === null || v === undefined || v === "") return "";
  if (tipo === "num" && Number.isFinite(Number(v))) return `<c r="${ref}" s="2"><v>${Number(v)}</v></c>`;
  if (tipo === "fecha") { const n = serialExcel(v); return n === null ? "" : `<c r="${ref}" s="1"><v>${n}</v></c>`; }
  return `<c r="${ref}" t="inlineStr"${tipo === "enc" ? ' s="3"' : ""}><is><t xml:space="preserve">${xmlEsc(v)}</t></is></c>`;
}
function armarXlsx(encabezados, filas, anchos) {
  const f = (cols, n) => `<row r="${n}">${cols}</row>`;
  let n = 1;
  let datos = f(encabezados.map((h, i) => celdaX(i, n, h, "enc")).join(""), n);
  filas.forEach((fila) => { n++; datos += f(fila.map((c, i) => celdaX(i, n, c.v, c.t)).join(""), n); });
  const hoja = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${anchos.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols><sheetData>${datos}</sheetData></worksheet>`;
  const estilos = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="dd/mm/yyyy"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
  return zipSinComprimir([
    { nombre: "[Content_Types].xml", texto: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>` },
    { nombre: "_rels/.rels", texto: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { nombre: "xl/workbook.xml", texto: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Ingasto" sheetId="1" r:id="rId1"/></sheets></workbook>` },
    { nombre: "xl/_rels/workbook.xml.rels", texto: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
    { nombre: "xl/styles.xml", texto: estilos },
    { nombre: "xl/worksheets/sheet1.xml", texto: hoja },
  ]);
}

$("btnExportarExcel").addEventListener("click", async () => {
  try {
    const todos = await movimientosParaExportar();
    if (!todos) return;
    const encabezados = ["Fecha", "Tipo", "Cuenta", "Categoría", "Detalle", "Monto", "Estado", "Fecha de pago", "Moneda", "Cotización", "Monto en " + monedaBase()];
    const filas = todos.map((m) => {
      const cot = cotizDeMov(m);
      return [
        { v: m.fecha, t: "fecha" }, { v: m.tipo }, { v: m.cuenta }, { v: m.categoria }, { v: m.detalle || "" },
        { v: montoFirmado(m), t: "num" }, { v: esPendiente(m) ? "Pendiente" : "Pagado" }, { v: m.fecha_pago, t: "fecha" },
        { v: monedaDeMov(m) }, { v: cot, t: "num" }, { v: cot === null ? "" : montoBaseFirmado(m), t: "num" },
      ];
    });
    const blob = armarXlsx(encabezados, filas, [12, 10, 18, 18, 30, 14, 11, 13, 9, 11, 16]);
    descargarArchivo(`Ingasto_${fechaParaNombreArchivo()}.xlsx`, blob, blob.type);
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
    const todos = await movimientosParaExportar();
    if (!todos) return;
    // En español y portugués los programas esperan ";" como separador y coma decimal.
    const coma = idiomaActual !== "en";
    const sep = coma ? ";" : ",";
    const num = (v) => (v === null || v === undefined || v === "" ? "" : coma ? String(v).replace(".", ",") : String(v));
    const celda = (v) => valorCSV(v);
    const encabezado = ["Fecha", "Tipo", "Cuenta", "Categoría", "Detalle", "Monto", "Estado", "Fecha de pago", "Moneda", "Cotización", "Monto en " + monedaBase()].map(celda).join(sep);
    const filas = todos.map((m) => {
      const cot = cotizDeMov(m);
      return [celda(formatoFecha(m.fecha)), celda(m.tipo), celda(m.cuenta), celda(m.categoria), celda(m.detalle || ""), num(montoFirmado(m)), celda(esPendiente(m) ? "Pendiente" : "Pagado"), celda(m.fecha_pago ? formatoFecha(m.fecha_pago) : ""), celda(monedaDeMov(m)), num(cot === null ? "" : cot), num(cot === null ? "" : montoBaseFirmado(m))].join(sep);
    }).join("\n");
    descargarArchivo(`Ingasto_${fechaParaNombreArchivo()}.csv`, "﻿" + encabezado + "\n" + filas, "text/csv;charset=utf-8");
    mostrarToast("Archivo descargado.");
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

// ============================================================
// REINICIAR DATOS
// ============================================================
$("btnReiniciarDatos").addEventListener("click", async () => {
  const paso1 = confirm(t("reiniciarConf1"));
  if (!paso1) return;
  const paso2 = confirm(t("reiniciarConf2"));
  if (!paso2) return;

  try {
    await reiniciarDatosUsuario(usuario.id);
    await cargarCuentasYCategorias();
    await cargarMesActual();
    mostrarToast(t("reiniciarOk"));
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

// ============================================================
// ELIMINAR CUENTA
// ============================================================
$("btnEliminarCuenta").addEventListener("click", async () => {
  const paso1 = confirm(t("eliminarConf1"));
  if (!paso1) return;
  const paso2 = confirm(t("eliminarConf2"));
  if (!paso2) return;

  try {
    await eliminarCuenta();
    location.href = location.origin + location.pathname;
  } catch (err) {
    mostrarToast(traducirErrorAuth(err));
  }
});

// ============================================================
// Utilidad de escape HTML
// ============================================================
// Ícono por nombre de categoría (es/pt/en). Si no hay coincidencia, devuelve "" y se usa la flecha.
const ICONOS_CATEGORIA = [
  ["pregunta", /\b(sin clasificar|sem classific|unclassified|uncategori|sin categoria|sem categoria)/],
  ["tarjeta", /\b(tarjeta|cartao|card)/],
  ["fuel", /\b(combustible|combustivel|nafta|fuel|gasolin|gasoil)/],
  ["bus", /\b(transport|colectivo|taxi|uber|peaje|pedagio|toll)/],
  ["luz", /\b(servicio|servico|utilit|luz\b|agua\b|gas\b|internet|electric)/],
  ["super", /\b(super|aliment|comida|food|almacen|verduler|grocer|feira)/],
  ["casa", /\b(viviend|alquiler|aluguel|moradia|housing|rent\b|hogar|casa\b|home\b|expensas|condominio)/],
  ["salud", /\b(salud|saude|health|medic|farmac|pharmac)/],
  ["educ", /\b(educ|escuela|colegio|curso|school|universidad|faculdade)/],
  ["imp", /\b(impuest|imposto|tax)/],
  ["ropa", /\b(ropa|roupa|cloth|calzado)/],
  ["ocio", /\b(salida|saidas|ocio|lazer|leisure|going out|entreten|restaurant)/],
  ["mascota", /\b(mascota|animais|animal|pet\b|pets\b|veterinar)/],
  ["regalo", /\b(regalo|presente|gift)/],
  ["sueldo", /\b(sueldo|salario|salary|honorario|trabajo|trabalho)/],
  ["venta", /\b(venta|vendas|sales)/],
  ["otro", /\b(otro|outra|outro|other)/],
];
// Cada categoría tiene siempre el mismo color (se calcula con su nombre).
function tonoCategoria(nombre) {
  const n = String(nombre || "").toLowerCase();
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}

function iconoCategoria(nombre) {
  const n = String(nombre || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const [clave, re] of ICONOS_CATEGORIA) if (re.test(n)) return svgIcono(clave);
  return "";
}

function escapeHTML(txt) {
  return String(txt ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ============================================================
// SEGURIDAD: cerrar la sesión sola si la app estuvo mucho tiempo sin usarse (Ajustes → Seguridad)
// ============================================================
const CLAVE_ULT_ACTIVIDAD = "ingasto_ultima_actividad";
const CLAVE_INACTIVIDAD = "ingasto_inactividad_horas";
let ultimoAnotado = 0;
let cerrandoPorInactividad = false;

function horasInactividad() {
  try { return localStorage.getItem(CLAVE_INACTIVIDAD) || "0"; } catch (_) { return "0"; }
}
function limiteInactividadMs() {
  const h = parseInt(horasInactividad(), 10);
  return h > 0 ? h * 3600000 : 0;
}
function anotarActividad(forzar) {
  const ahora = Date.now();
  if (!forzar && ahora - ultimoAnotado < 20000) return;
  ultimoAnotado = ahora;
  try { localStorage.setItem(CLAVE_ULT_ACTIVIDAD, String(ahora)); } catch (_) {}
}
function revisarInactividad() {
  const lim = limiteInactividadMs();
  if (!lim || !usuario) return false;
  let ult = 0;
  try { ult = parseInt(localStorage.getItem(CLAVE_ULT_ACTIVIDAD) || "0", 10); } catch (_) {}
  if (ult && Date.now() - ult > lim) { cerrarPorInactividad(); return true; }
  return false;
}
async function cerrarPorInactividad() {
  if (cerrandoPorInactividad) return;
  cerrandoPorInactividad = true;
  try { sessionStorage.setItem("ingasto_aviso_inact", "1"); } catch (_) {}
  try { await cerrarSesion(); } catch (_) {}
  location.reload();
}
["pointerdown", "keydown", "touchstart", "scroll"].forEach((ev) =>
  document.addEventListener(ev, () => { if (usuario) anotarActividad(false); }, { passive: true, capture: true }));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && usuario && !revisarInactividad()) anotarActividad(true);
});
setInterval(revisarInactividad, 60000);

function pintarSeguridad() {
  const h = horasInactividad();
  document.querySelectorAll("[data-inact]").forEach((b) => b.classList.toggle("activo", b.dataset.inact === h));
}
document.querySelectorAll("[data-inact]").forEach((b) => b.addEventListener("click", () => {
  try { localStorage.setItem(CLAVE_INACTIVIDAD, b.dataset.inact); } catch (_) {}
  anotarActividad(true);
  pintarSeguridad();
}));
pintarSeguridad();
if ($("chkRecordar")) $("chkRecordar").checked = recordarSesion();

// ============================================================
// INICIO
// ============================================================
// Si el link del mail de "olvidé mi clave" nos trae acá, no arrancamos
// la app normal: dejamos que se muestre la pantalla de nueva clave.
const esLinkDeRecuperacion = /type=recovery/.test(location.hash);

(async function init() {
  if (!esLinkDeRecuperacion) {
    const u = await usuarioActual();
    if (u) await arrancarApp(u);
  }
  try {
    if (sessionStorage.getItem("ingasto_aviso_inact")) {
      sessionStorage.removeItem("ingasto_aviso_inact");
      if (!usuario) mostrarAviso($("loginOk"), t("avisoInactividad"));
    }
  } catch (_) {}

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then((registro) => {
      swRegistro = registro;
      // Cada vez que volvés a esta pestaña (la traés al frente), le
      // preguntamos al servidor si hay una versión nueva. Así no
      // dependemos de que el navegador lo revise solo cada tanto.
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) registro.update().catch(() => {});
      });
      // Además, mientras la pestaña está a la vista, preguntamos cada
      // 10 segundos (aparte del latido de datos, que es cada 30s).
      setInterval(() => {
        if (!document.hidden) registro.update().catch(() => {});
      }, 10000);
    }).catch(() => {});

    // Cuando una versión nueva del Service Worker toma el control
    // (porque subimos un cambio), recargamos la página solos, una
    // sola vez, para que se vea al toque sin que el usuario tenga
    // que acordarse de apretar F5 o recargar a mano. Si justo está
    // cargando un movimiento (modal abierto), esperamos a que lo
    // cierre para no hacerle perder lo que estaba escribiendo.
    let yaSeRecargoPorActualizacion = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (yaSeRecargoPorActualizacion) return;
      yaSeRecargoPorActualizacion = true;
      const haySeguro = () => $("modalFondo") && !$("modalFondo").hidden;
      if (!haySeguro()) {
        location.reload();
        return;
      }
      const esperar = setInterval(() => {
        if (!haySeguro()) {
          clearInterval(esperar);
          location.reload();
        }
      }, 2000);
    });
  }
})();

// Cargar una lista típica de categorías cuando el usuario no tiene ninguna.
$("btnCatSugeridas").addEventListener("click", async () => {
  const b = $("btnCatSugeridas"); b.disabled = true;
  try {
    const tengo = new Set(categorias.map((c) => (c.tipo || "Gasto") + "|" + c.nombre.toLowerCase()));
    for (const [tipo, clave] of [["Gasto", "catSugGasto"], ["Ingreso", "catSugIngreso"]]) {
      for (const nombre of t(clave).split("|")) {
        if (!tengo.has(tipo + "|" + nombre.toLowerCase())) await crearCategoria(usuario.id, nombre, tipo);
      }
    }
    await cargarCuentasYCategorias();
    mostrarToast(t("catSugOk"));
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
  b.disabled = false;
});

// ============================================================
// CLASIFICAR VARIOS: tildar movimientos y ponerles categoría de una sola vez
// ============================================================
function clasifListaVisible() { return movimientos.filter(pasaBusqueda); }

function clasifActualizarPanel() {
  const elegidos = movimientos.filter((m) => clasifSel.has(m.id));
  const tipos = new Set(elegidos.map((m) => m.tipo));
  const mezcla = tipos.size > 1;
  $("clasifCuenta").textContent = !elegidos.length ? t("clasifNada") : mezcla ? t("clasifMezcla") : t("clasifN").replace("{n}", elegidos.length);
  const tipo = !elegidos.length || mezcla ? null : [...tipos][0];
  const sel = $("clasifCategoria"), anterior = sel.value;
  sel.innerHTML = tipo ? categorias.filter((c) => c.tipo === tipo).map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") : "";
  if (anterior && [...sel.options].some((o) => o.value === anterior)) sel.value = anterior;
  sel.disabled = !tipo;
  $("clasifAplicar").disabled = !tipo || !sel.value;
}

function clasifAlternar(id) {
  if (clasifSel.has(id)) clasifSel.delete(id); else clasifSel.add(id);
  renderMovimientos();
  clasifActualizarPanel();
}

function clasifActivar(si) {
  modoClasificar = si;
  clasifSel.clear();
  $("clasifPanel").hidden = !si;
  botonAcceso($("btnClasificar"), "clasificar", si ? t("accTerminar") : t("accClasificar"));
  $("btnClasificar").classList.toggle("activo", si);
  renderMovimientos();
  clasifActualizarPanel();
}

$("btnClasificar").addEventListener("click", () => clasifActivar(!modoClasificar));

$("clasifSinClasif").addEventListener("click", () => {
  clasifListaVisible().forEach((m) => { if (normalizarTexto(m.categoria).includes("sin clasificar")) clasifSel.add(m.id); });
  renderMovimientos();
  clasifActualizarPanel();
});

$("clasifCategoria").addEventListener("change", clasifActualizarPanel);

$("clasifAplicar").addEventListener("click", async () => {
  const cat = $("clasifCategoria").value;
  const ids = movimientos.filter((m) => clasifSel.has(m.id)).map((m) => m.id);
  if (!cat || !ids.length) return;
  $("clasifAplicar").disabled = true;
  try {
    for (const id of ids) await actualizarMovimiento(id, { categoria: cat });
    mostrarToast(t("clasifHecho").replace("{n}", ids.length));
    clasifActivar(false);
    await cargarMesActual();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); clasifActualizarPanel(); }
});

// Importes con puntos y comas mientras se escriben
["fijoMonto", "trMonto", "trMontoDestino", "presIngreso"].forEach((id) => activarFormatoImporte($(id)));

// ============================================================
// BIENVENIDA: 4 pantallas para quien entra por primera vez (con botón "Ya sé")
// ============================================================
const BIENV_PASOS = [
  { ic: "👋", t: "bienv1T", x: "bienv1X" },
  { ic: "➕", t: "bienv2T", x: "bienv2X" },
  { ic: "🧭", t: "bienv3T", x: "bienv3X" },
  { ic: "📊", t: "bienv4T", x: "bienv4X" },
  { ic: "🔒", t: "bienv5T", x: "bienv5X" },
];
let bienvPaso = 0;
function claveBienvenida() { return "fs_bienvenida_vista_" + (usuario ? usuario.id : ""); }
function bienvenidaYaVista() { try { return localStorage.getItem(claveBienvenida()) === "1"; } catch { return true; } }
function bienvenidaMarcarVista() { try { localStorage.setItem(claveBienvenida(), "1"); } catch { /* ignorar */ } }

function bienvPintar() {
  const p = BIENV_PASOS[bienvPaso];
  $("bienvIc").textContent = p.ic;
  $("bienvTitulo").textContent = t(p.t);
  $("bienvTexto").textContent = t(p.x);
  $("bienvPuntos").innerHTML = BIENV_PASOS.map((_, i) => `<span class="bienv-punto${i === bienvPaso ? " activo" : ""}"></span>`).join("");
  $("bienvAtras").hidden = bienvPaso === 0;
  $("bienvSig").textContent = bienvPaso === BIENV_PASOS.length - 1 ? t("bienvEmpezar") : t("bienvSig");
}
function abrirBienvenida() { bienvPaso = 0; bienvPintar(); $("bienvenidaPantalla").hidden = false; }
function cerrarBienvenida() { $("bienvenidaPantalla").hidden = true; bienvenidaMarcarVista(); }

$("bienvSig").addEventListener("click", () => {
  if (bienvPaso >= BIENV_PASOS.length - 1) return cerrarBienvenida();
  bienvPaso++; bienvPintar();
});
$("bienvAtras").addEventListener("click", () => { if (bienvPaso > 0) { bienvPaso--; bienvPintar(); } });
$("bienvSaltar").addEventListener("click", cerrarBienvenida);
$("listaMovimientos").addEventListener("click", (e) => { if (e.target.closest("[data-ver-bienvenida]")) abrirBienvenida(); });

// Solo la ve quien todavía no cargó nada; a quien ya usa la app no se le muestra.
async function bienvenidaSiCorresponde() {
  if (!usuario || bienvenidaYaVista()) return;
  try {
    const todos = await listarTodosLosMovimientos(usuario.id);
    if (todos.length === 0) abrirBienvenida(); else bienvenidaMarcarVista();
  } catch { /* si falla la consulta, no molestamos */ }
}
