// ============================================================
// Ingasto - Lógica principal
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
    btnCrearCuenta: "Crear una cuenta nueva",
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
    textoAvisoWhatsapp: "Después de pagar, avisanos por WhatsApp con el mail que usaste para registrarte, así te activamos la cuenta.",
    btnAvisarWhatsapp: "Avisar por WhatsApp",
    btnSalir2: "Salir",
    btnCrearCuentaSubmit: "Crear cuenta",
    btnYaTengoCuenta: "Ya tengo cuenta",
    ariaMesAnterior: "Mes anterior",
    ariaMesSiguiente: "Mes siguiente",
    ariaSalir: "Salir",
    lblBalance: "Balance",
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
    analisisMesActual: "Mes actual",
    analisisResumenAnual: "Resumen anual",
    analisisAcumulado: "Acumulado",
    tituloGastosPorCategoria: "Gastos por categoría",
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
    placeholderNuevaCategoria: "Nueva categoría (ej: Alimentos)",
    tituloExportar: "Exportar mis datos",
    textoExportar: "Descarga todos tus movimientos, de todos los meses, en un archivo para abrir en Excel o Google Sheets.",
    btnExcel: "📊 Exportar a Excel",
    btnCSV: "📄 Exportar a CSV",
    tituloZonaRiesgo: "Zona de riesgo",
    textoZonaRiesgo: "Esto borra tus movimientos, cuentas y categorías para empezar de cero. Tu usuario y tu clave no se ven afectados.",
    btnReiniciar: "🧹 Reiniciar todos mis datos",
    ariaNuevoMov: "Nuevo movimiento",
    navMovimientos: "Movimientos",
    navAnalisis: "Análisis",
    navConfig: "Config",
    modalNuevoTitulo: "Nuevo movimiento",
    modalEditarTitulo: "Editar movimiento",
    ariaCerrarModal: "Cerrar",
    segGasto: "Gasto",
    segIngreso: "Ingreso",
    labelFecha: "Fecha",
    labelCuenta: "Cuenta",
    labelCategoria: "Categoría",
    labelMonto: "Monto",
    labelDetalle: "Detalle (opcional)",
    placeholderDetalle: "Ej: Supermercado del sábado",
    btnCargarVoz: "🎙️ Cargar por voz (opcional)",
    btnResponder: "🎤 Responder",
    btnRepetir: "↻ Repetir",
    btnSeguir: "✓ Seguir",
    btnBorrar: "Borrar",
    btnGuardarMov: "Guardar",
  },
  pt: {
    subtitulo: "Seus gastos e receitas, claros e simples.",
    labelEmail: "Email",
    labelClave: "Senha",
    placeholderClave: "Mínimo 6 caracteres",
    btnEntrar: "Entrar",
    separadorO: "ou",
    btnCrearCuenta: "Criar uma conta nova",
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
    textoAvisoWhatsapp: "Depois de pagar, avise-nos pelo WhatsApp com o e-mail que você usou para se cadastrar, para ativarmos sua conta.",
    btnAvisarWhatsapp: "Avisar pelo WhatsApp",
    btnSalir2: "Sair",
    btnCrearCuentaSubmit: "Criar conta",
    btnYaTengoCuenta: "Já tenho conta",
    ariaMesAnterior: "Mês anterior",
    ariaMesSiguiente: "Próximo mês",
    ariaSalir: "Sair",
    lblBalance: "Saldo",
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
    analisisMesActual: "Mês atual",
    analisisResumenAnual: "Resumo anual",
    analisisAcumulado: "Acumulado",
    tituloGastosPorCategoria: "Despesas por categoria",
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
    placeholderNuevaCategoria: "Nova categoria (ex: Alimentação)",
    tituloExportar: "Exportar meus dados",
    textoExportar: "Baixe todos os seus lançamentos, de todos os meses, em um arquivo para abrir no Excel ou Google Sheets.",
    btnExcel: "📊 Exportar para Excel",
    btnCSV: "📄 Exportar para CSV",
    tituloZonaRiesgo: "Zona de risco",
    textoZonaRiesgo: "Isso apaga seus lançamentos, contas e categorias para começar do zero. Seu usuário e sua senha não são afetados.",
    btnReiniciar: "🧹 Reiniciar todos os meus dados",
    ariaNuevoMov: "Novo lançamento",
    navMovimientos: "Lançamentos",
    navAnalisis: "Análise",
    navConfig: "Config",
    modalNuevoTitulo: "Novo lançamento",
    modalEditarTitulo: "Editar lançamento",
    ariaCerrarModal: "Fechar",
    segGasto: "Despesa",
    segIngreso: "Receita",
    labelFecha: "Data",
    labelCuenta: "Conta",
    labelCategoria: "Categoria",
    labelMonto: "Valor",
    labelDetalle: "Detalhe (opcional)",
    placeholderDetalle: "Ex: Supermercado de sábado",
    btnCargarVoz: "🎙️ Adicionar por voz (opcional)",
    btnResponder: "🎤 Responder",
    btnRepetir: "↻ Repetir",
    btnSeguir: "✓ Continuar",
    btnBorrar: "Excluir",
    btnGuardarMov: "Salvar",
  },
  en: {
    subtitulo: "Your expenses and income, clear and simple.",
    labelEmail: "Email",
    labelClave: "Password",
    placeholderClave: "Minimum 6 characters",
    btnEntrar: "Log in",
    separadorO: "or",
    btnCrearCuenta: "Create a new account",
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
    textoAvisoWhatsapp: "After paying, message us on WhatsApp with the email you used to sign up, so we can activate your account.",
    btnAvisarWhatsapp: "Message us on WhatsApp",
    btnSalir2: "Log out",
    btnCrearCuentaSubmit: "Create account",
    btnYaTengoCuenta: "I already have an account",
    ariaMesAnterior: "Previous month",
    ariaMesSiguiente: "Next month",
    ariaSalir: "Log out",
    lblBalance: "Balance",
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
    analisisMesActual: "Current month",
    analisisResumenAnual: "Yearly summary",
    analisisAcumulado: "All time",
    tituloGastosPorCategoria: "Expenses by category",
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
    placeholderNuevaCategoria: "New category (e.g: Groceries)",
    tituloExportar: "Export my data",
    textoExportar: "Download all your movements, from every month, in a file to open in Excel or Google Sheets.",
    btnExcel: "📊 Export to Excel",
    btnCSV: "📄 Export to CSV",
    tituloZonaRiesgo: "Danger zone",
    textoZonaRiesgo: "This deletes your movements, accounts and categories to start fresh. Your user and password are not affected.",
    btnReiniciar: "🧹 Reset all my data",
    ariaNuevoMov: "New movement",
    navMovimientos: "Movements",
    navAnalisis: "Analysis",
    navConfig: "Settings",
    modalNuevoTitulo: "New movement",
    modalEditarTitulo: "Edit movement",
    ariaCerrarModal: "Close",
    segGasto: "Expense",
    segIngreso: "Income",
    labelFecha: "Date",
    labelCuenta: "Account",
    labelCategoria: "Category",
    labelMonto: "Amount",
    labelDetalle: "Detail (optional)",
    placeholderDetalle: "E.g: Saturday groceries",
    btnCargarVoz: "🎙️ Voice entry (optional)",
    btnResponder: "🎤 Answer",
    btnRepetir: "↻ Repeat",
    btnSeguir: "✓ Next",
    btnBorrar: "Delete",
    btnGuardarMov: "Save",
  },
};

function t(clave) {
  return (TRADUCCIONES[idiomaActual] && TRADUCCIONES[idiomaActual][clave]) || TRADUCCIONES.es[clave] || clave;
}

function aplicarIdioma(idioma) {
  if (!TRADUCCIONES[idioma]) idioma = "es";
  idiomaActual = idioma;
  document.documentElement.lang = idioma;
  try { localStorage.setItem("fs_idioma", idioma); } catch {}

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
  // Botones de login, si está en modo registro
  if ($("btnIngresar") && $("btnMostrarRegistro")) {
    $("btnIngresar").textContent = modoRegistro ? t("btnCrearCuentaSubmit") : t("btnEntrar");
    $("btnMostrarRegistro").textContent = modoRegistro ? t("btnYaTengoCuenta") : t("btnCrearCuenta");
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
    btnBuscarSimple.textContent = filaOculta ? t("btnBuscarSimple") : t("btnOcultarBusqueda");
  }
}

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

// Antes de loguearse, aplicamos el último idioma usado en este dispositivo
// (o español por defecto) para que la pantalla de login también se vea traducida.
try {
  aplicarIdioma(localStorage.getItem("fs_idioma") || "es");
} catch {
  aplicarIdioma("es");
}

if ($("selectIdiomaLogin")) {
  $("selectIdiomaLogin").addEventListener("change", (e) => {
    aplicarIdioma(e.target.value);
  });
}

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
      actualizarTextosDinamicosIdioma();
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
  actualizarTextosDinamicosIdioma();
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

$("btnSalir").addEventListener("click", async () => {
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
const DIAS_DE_PRUEBA = 15;

function pruebaVencida() {
  if (perfil?.plan_activo) return false; // ya pagó, no hay bloqueo
  if (!usuario?.created_at) return false; // por las dudas, no bloqueamos si no sabemos la fecha
  const creado = new Date(usuario.created_at).getTime();
  const dias = (Date.now() - creado) / (1000 * 60 * 60 * 24);
  return dias > DIAS_DE_PRUEBA;
}

async function arrancarApp() {
  usuario = await usuarioActual();
  if (!usuario) return;

  try {
    perfil = await obtenerPerfil(usuario.id);
  } catch {
    perfil = { moneda: "$" };
  }

  if (pruebaVencida()) {
    $("pantallaLogin").hidden = true;
    $("app").hidden = true;
    $("pantallaPruebaVencida").hidden = false;
    return;
  }

  $("pantallaLogin").hidden = true;
  $("app").hidden = false;
  $("inputMoneda").value = moneda();
  aplicarIdioma(perfil?.idioma || localStorage.getItem("fs_idioma") || "es");
  if ($("selectIdioma")) $("selectIdioma").value = idiomaActual;

  await cargarCuentasYCategorias();
  await cargarMesActual();
  suscribirActualizacionEnVivo();
}

// ============================================================
// ACTUALIZACIÓN EN VIVO: cuando se guarda un movimiento, cuenta o
// categoría (desde este dispositivo o cualquier otro), Supabase
// nos avisa al instante y refrescamos, sin tener que preguntar
// "¿hay algo nuevo?" cada tanto.
// ============================================================
let canalActualizacionEnVivo = null;

function suscribirActualizacionEnVivo() {
  if (canalActualizacionEnVivo) return; // ya suscripto, no duplicar
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
  try {
    await cargarMesActual();
  } catch {}
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") actualizarDatosSiCorresponde();
});
window.addEventListener("focus", actualizarDatosSiCorresponde);

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
    if (panel) panel.hidden = false;
  });
});

document.querySelectorAll(".config-volver").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".config-panel").forEach((p) => (p.hidden = true));
    const menu = $("configMenu");
    if (menu) menu.hidden = false;
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
  segmentado.style.marginBottom = "10px";
  segmentado.innerHTML = `
    <button type="button" class="segmentado-item activo" data-tipolista="todo">${t("accesoTodo")}</button>
    <button type="button" class="segmentado-item" data-tipolista="Ingreso">${t("accesoIngresos")}</button>
    <button type="button" class="segmentado-item" data-tipolista="Gasto">${t("accesoGastos")}</button>
  `;

  const btnBuscar = document.createElement("button");
  btnBuscar.type = "button";
  btnBuscar.id = "btnBuscarSimple";
  btnBuscar.className = "boton boton-secundario";
  btnBuscar.style.marginBottom = "10px";
  btnBuscar.textContent = t("btnBuscarSimple");

  if (filaBusqueda && filaBusqueda.parentElement) {
    filaBusqueda.parentElement.insertBefore(segmentado, filaBusqueda);
    filaBusqueda.parentElement.insertBefore(btnBuscar, filaBusqueda);
  }
  filaBusqueda.hidden = true;

  btnBuscar.addEventListener("click", () => {
    filaBusqueda.hidden = !filaBusqueda.hidden;
    btnBuscar.textContent = filaBusqueda.hidden ? t("btnBuscarSimple") : t("btnOcultarBusqueda");
  });

  segmentado.querySelectorAll(".segmentado-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      segmentado.querySelectorAll(".segmentado-item").forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      tipoFiltroActivo = btn.dataset.tipolista;
      renderMovimientos();
    });
  });
})();

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
          <div class="mov-detalle">${escapeHTML(m.cuenta)}${m.detalle ? " · " + escapeHTML(m.detalle) : ""}</div>
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
$("btnCerrarModal").addEventListener("click", cerrarModal);
$("modalFondo").addEventListener("click", (e) => { if (e.target.id === "modalFondo") cerrarModal(); });

function abrirModalNuevo() {
  if (!cuentas.length || !categorias.length) {
    return mostrarToast("Primero agregá al menos una cuenta y una categoría en Config.");
  }
  $("formMovimiento").reset();
  $("movId").value = "";
  $("modalTitulo").textContent = t("modalNuevoTitulo");
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
  asegurarOpcionSelect("movCuenta", m.cuenta);
  asegurarOpcionSelect("movCategoria", m.categoria);
  $("movId").value = m.id;
  $("modalTitulo").textContent = t("modalEditarTitulo");
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
    let mult = vp(pref); if (mult === null || mult === 0) mult = 1; let total = mult * 1000000;
    let p = resto.split(/\bcon\b/), pesos = (p[0] || "").replace(/\bde\b/g, " ").replace(/\bpesos?\b/g, " ").trim(), cent = p.length > 1 ? p.slice(1).join(" ").trim() : "";
    if (pesos) { let nr = pesos.match(/\b(\d{1,3}(?:[.,]\d{3})+|\d{1,6})\b/); if (nr) total += parseInt(nr[1].replace(/[.,]/g, ""), 10); else { let n = vp(pesos); if (n !== null) total += n; } }
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

function fsVoicePregunta() {
  const q = $("voiceQuestion"), st = $("voiceStatus");
  fsVoiceResaltarCampoActual();
  if (!q) return;
  if (fsVoiceStep >= fsVoiceSteps.length) {
    q.textContent = "✅ Datos completos. Revisalos y tocá Guardar.";
    st.textContent = "Podés corregir cualquier campo manualmente antes de guardar.";
    $("voiceHeard").textContent = "La respuesta escuchada aparecerá acá.";
    return;
  }
  q.textContent = "Paso " + (fsVoiceStep + 1) + " de " + fsVoiceSteps.length + " — " + fsVoiceSteps[fsVoiceStep].q;
  st.textContent = "Tocá Responder. También podés completar el campo a mano.";
  $("voiceHeard").textContent = "La respuesta escuchada aparecerá acá.";
}

function fsVoiceCampoDeStep(id) {
  if (id === "tipo") return $("segmentadoTipo");
  return $(id);
}

function fsVoiceResaltarCampoActual() {
  fsVoiceSteps.forEach((s) => {
    const el = fsVoiceCampoDeStep(s.id);
    if (el) el.classList.remove("voz-campo-actual");
  });
  const paso = fsVoiceSteps[fsVoiceStep];
  if (!paso) return;
  const el = fsVoiceCampoDeStep(paso.id);
  if (el) el.classList.add("voz-campo-actual");
}

function fsVozPrepararNuevo() {
  const b = $("btnCargarVoz"), panel = $("voicePanel");
  if (!b || !panel) return;
  b.hidden = false;
  panel.hidden = true;
  b.onclick = () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) { fsVoiceStep = 0; fsVoicePregunta(); }
    else fsVoiceLimpiarResaltado();
  };
  const li = $("voiceListen"), rp = $("voiceRepeat"), nx = $("voiceNext");
  if (li) li.onclick = fsVoiceEscuchar;
  if (rp) rp.onclick = () => {
    fsVoicePending = "";
    $("voiceHeard").textContent = "Dato borrado. Tocá Responder otra vez.";
  };
  if (nx) nx.onclick = () => { fsVoiceStep++; fsVoicePregunta(); };
}

function fsVoiceLimpiarResaltado() {
  fsVoiceSteps.forEach((s) => {
    const el = fsVoiceCampoDeStep(s.id);
    if (el) el.classList.remove("voz-campo-actual");
  });
}

function fsVoiceOcultar() {
  const b = $("btnCargarVoz"), panel = $("voicePanel");
  if (b) b.hidden = true;
  if (panel) panel.hidden = true;
  fsVoiceLimpiarResaltado();
}

function fsVoiceEscuchar() {
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const st = $("voiceStatus"), heard = $("voiceHeard");
  if (!Reconocimiento) {
    st.textContent = "Este navegador no ofrece reconocimiento de voz. Probá desde Chrome, o cargá el dato a mano.";
    return;
  }

  fsVoicePending = "";
  fsVoiceRec = new Reconocimiento();
  fsVoiceRec.lang = "es-AR";
  fsVoiceRec.continuous = false;
  fsVoiceRec.interimResults = false;
  fsVoiceRec.maxAlternatives = 5;

  fsVoiceRec.onstart = () => { st.textContent = "🔴 Escuchando este dato…"; };

  fsVoiceRec.onresult = (e) => {
    let candidatos = [];
    for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) candidatos.push(e.results[i][j].transcript.trim());
    const pasoActual = fsVoiceSteps[fsVoiceStep];
    let elegido = candidatos[0] || "";
    if (pasoActual) {
      const interpretable = candidatos.find((x) => !!fsVoiceInterpretar(pasoActual.id, x));
      if (interpretable) elegido = interpretable;
    }
    if (pasoActual && pasoActual.id === "movMonto") {
      const esc = candidatos.find((x) => /\bmil\b|\bmill[oó]n(?:es)?\b/i.test(x) && !!fsVoiceMonto(x));
      if (esc) elegido = esc;
    }
    fsVoicePending = elegido;
    heard.textContent = elegido || "Escuchando…";
  };

  fsVoiceRec.onerror = (e) => {
    if (e.error === "not-allowed" || e.error === "permission-denied") {
      st.textContent = "El micrófono está bloqueado para esta página. Revisá los permisos de Chrome (candado junto a la dirección) y volvé a intentar.";
    } else if (e.error === "no-speech") {
      st.textContent = "No escuché nada. Tocá Responder y hablá apenas empiece a escuchar.";
    } else {
      st.textContent = "No pude escuchar (" + e.error + "). Podés repetir o escribir manualmente.";
    }
  };

  fsVoiceRec.onend = () => {
    if (!fsVoicePending) { if (st.textContent.indexOf("bloqueado") === -1) st.textContent = "No escuché nada. Intentá otra vez."; return; }
    const paso = fsVoiceSteps[fsVoiceStep];
    const val = fsVoiceInterpretar(paso.id, fsVoicePending);
    if (!val) {
      if (paso.id === "tipo") {
        st.textContent = "No entendí si es gasto o ingreso. Decí claramente \"gasto\" o \"ingreso\" (o elegilo con los botones de arriba) y tocá Responder de nuevo.";
      } else {
        st.textContent = "No pude interpretar este dato. Repetilo o escribilo manualmente.";
      }
      return;
    }

    let mostrado = val;
    if (paso.id === "tipo") {
      seleccionarTipo(val);
    } else if (paso.id === "movCuenta" || paso.id === "movCategoria") {
      fsVoiceSetSel(paso.id, val);
      mostrado = $(paso.id).selectedOptions[0] ? $(paso.id).selectedOptions[0].textContent : val;
    } else if (paso.id === "movMonto") {
      $("movMonto").value = String(val).replace(".", ",");
      mostrado = "$ " + Number(val).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      $(paso.id).value = val;
    }
    st.textContent = "✓ " + mostrado + " cargado. Tocá Seguir para continuar.";
  };

  try { fsVoiceRec.start(); } catch (err) { st.textContent = "No pude iniciar el micrófono. Podés continuar manualmente."; }
}

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
    descargarArchivo(`Ingasto_${fechaParaNombreArchivo()}.xls`, html, "application/vnd.ms-excel;charset=utf-8");
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
// Si el link del mail de "olvidé mi clave" nos trae acá, no arrancamos
// la app normal: dejamos que se muestre la pantalla de nueva clave.
const esLinkDeRecuperacion = /type=recovery/.test(location.hash);

(async function init() {
  if (!esLinkDeRecuperacion) {
    const u = await usuarioActual();
    if (u) await arrancarApp();
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
