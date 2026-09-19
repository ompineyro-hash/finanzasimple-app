// ============================================================
// FinanzaSimple - Lógica principal
// ============================================================

let usuario = null;
let perfil = null;
let cuentas = [];
let categorias = [];
let monedasUsuario = [];
let movimientos = [];
let fechaVista = new Date();
let vistaActiva = "vistaMovimientos";
let periodoAnalisis = "mes";

const $ = (id) => document.getElementById(id);

// ============================================================
// IDIOMAS (Español / Português / English)
// Traduce todo el texto fijo de la interfaz Y los mensajes
// dinámicos (avisos, confirmaciones, carga por voz).
// ============================================================
let idiomaActual = "es";

const TRADUCCIONES = {
  es: {
    subtitulo: "Tu plata, clara y simple.",
    labelEmail: "Email",
    labelClave: "Clave",
    placeholderClave: "Mínimo 6 caracteres",
    btnEntrar: "Entrar",
    separadorO: "o",
    btnCrearCuenta: "Crear una cuenta nueva",
    btnOlvideClave: "Olvidé mi clave",
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
    totalGastos: "Total gastos",
    sinGastosPeriodo: "No hay gastos cargados en este período.",
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

    // ---- Mensajes dinámicos (antes fijos en español en el JS) ----
    msgCuentaCreada: "Cuenta creada. Ya podés entrar con tu email y clave.",
    msgEscribiEmail: "Escribí tu email arriba primero.",
    msgEmailRecuperacion: "Te enviamos un email para restablecer tu clave.",
    vacioMovimientos: "Todavía no cargaste movimientos este mes.<br>Tocá el botón <b>+</b> para agregar el primero.",
    vacioBusqueda: "No hay resultados para esa búsqueda.<br>Probá limpiarla o cambiar el filtro.",
    vacioCuentas: "Todavía no agregaste ninguna cuenta.",
    vacioCategorias: "Todavía no agregaste ninguna categoría.",
    promptNuevoNombre: "Nuevo nombre:",
    msgGuardado: "Guardado.",
    confirmBorrarItem: '¿Borrar "{nombre}"? Si tiene movimientos asociados, no se va a poder borrar.',
    msgBorrado: "Borrado.",
    msgNoPudoBorrar: "No se pudo borrar (¿tiene movimientos asociados?)",
    msgMonedaActualizada: "Moneda actualizada.",
    msgFaltaCuentaCategoria: "Primero agregá al menos una cuenta y una categoría en Config.",
    optAgregarCuentaConfig: "-- Agregá una cuenta en Config --",
    optAgregarCategoriaConfig: "-- Agregá una categoría en Config --",
    sufijoNoEnConfig: " (no está en tu Config)",
    vozPreguntaTipo: "¿Es un gasto o un ingreso?",
    vozPreguntaCuenta: "¿Con qué cuenta?",
    vozPreguntaCategoria: "¿Qué categoría?",
    vozPreguntaMonto: "¿Cuál es el monto? Podés decir pesos y centavos.",
    vozPreguntaDetalle: "¿Cuál es el detalle?",
    vozCompleto: "✅ Datos completos. Revisalos y tocá Guardar.",
    vozCorregirManual: "Podés corregir cualquier campo manualmente antes de guardar.",
    vozRespuestaPlaceholder: "La respuesta escuchada aparecerá acá.",
    vozPasoTemplate: "Paso {n} de {total} — {pregunta}",
    vozTocaResponder: "Tocá Responder. También podés completar el campo a mano.",
    vozDatoBorrado: "Dato borrado. Tocá Responder otra vez.",
    vozSinReconocimiento: "Este navegador no ofrece reconocimiento de voz. Probá desde Chrome, o cargá el dato a mano.",
    vozEscuchando: "🔴 Escuchando este dato…",
    vozMicBloqueado: "El micrófono está bloqueado para esta página. Revisá los permisos de Chrome (candado junto a la dirección) y volvé a intentar.",
    vozNoEscucheNada: "No escuché nada. Tocá Responder y hablá apenas empiece a escuchar.",
    vozErrorGenerico: "No pude escuchar ({error}). Podés repetir o escribir manualmente.",
    vozNoEscucheIntenta: "No escuché nada. Intentá otra vez.",
    vozNoEntendiTipo: 'No entendí si es gasto o ingreso. Decí claramente "gasto" o "ingreso" (o elegilo con los botones de arriba) y tocá Responder de nuevo.',
    vozNoPudeInterpretar: "No pude interpretar este dato. Repetilo o escribilo manualmente.",
    vozCargadoTemplate: "✓ {valor} cargado. Tocá Seguir para continuar.",
    vozNoPudeIniciarMic: "No pude iniciar el micrófono. Podés continuar manualmente.",
    confirmBorrarMov: "¿Borrar este movimiento? No se puede deshacer.",
    msgMovBorrado: "Movimiento borrado.",
    errFaltaFecha: "Falta la fecha.",
    errElegiCuenta: "Elegí una cuenta.",
    errElegiCategoria: "Elegí una categoría.",
    errMontoMayorCero: "El monto tiene que ser mayor a cero.",
    msgMovActualizado: "Movimiento actualizado.",
    msgMovGuardado: "Movimiento guardado.",
    msgPreparandoArchivo: "Preparando archivo...",
    msgSinMovExportar: "Todavía no tenés movimientos para exportar.",
    msgArchivoDescargado: "Archivo descargado.",
    confirmReiniciar1: "Vas a borrar TODOS tus movimientos, cuentas y categorías.\n\nTu usuario y tu clave no se ven afectados.\n\nEsta acción no se puede deshacer. ¿Continuar?",
    confirmReiniciar2: "Confirmación final: se van a borrar todos tus datos de trabajo ahora mismo.\n\n¿Reiniciar todo?",
    msgDatosReiniciados: "Tus datos fueron reiniciados.",
  },
  pt: {
    subtitulo: "Seu dinheiro, claro e simples.",
    labelEmail: "Email",
    labelClave: "Senha",
    placeholderClave: "Mínimo 6 caracteres",
    btnEntrar: "Entrar",
    separadorO: "ou",
    btnCrearCuenta: "Criar uma conta nova",
    btnOlvideClave: "Esqueci minha senha",
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
    totalGastos: "Total de despesas",
    sinGastosPeriodo: "Não há despesas registradas neste período.",
    tituloIdioma: "Idioma",
    tituloMoneda: "Moeda",
        tituloMonedaBase: "Minha moeda",
    textoMonedaBase: "É a moeda do seu país, para a qual tudo é convertido quando você registra um lançamento em outra moeda.",
    tituloMonedas: "Moedas",
    textoMonedas: "Adicione aqui as moedas que você usa de vez em quando (por exemplo, quando viaja), para poder atribuí-las a uma conta.",
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

    // ---- Mensajes dinámicos ----
    msgCuentaCreada: "Conta criada. Já pode entrar com seu email e senha.",
    msgEscribiEmail: "Digite seu email acima primeiro.",
    msgEmailRecuperacion: "Enviamos um email para redefinir sua senha.",
    vacioMovimientos: "Você ainda não lançou nada este mês.<br>Toque no botão <b>+</b> para adicionar o primeiro.",
    vacioBusqueda: "Nenhum resultado para essa busca.<br>Tente limpar ou mudar o filtro.",
    vacioCuentas: "Você ainda não adicionou nenhuma conta.",
    vacioCategorias: "Você ainda não adicionou nenhuma categoria.",
    promptNuevoNombre: "Novo nome:",
    msgGuardado: "Salvo.",
    confirmBorrarItem: 'Excluir "{nombre}"? Se tiver lançamentos associados, não será possível excluir.',
    msgBorrado: "Excluído.",
    msgNoPudoBorrar: "Não foi possível excluir (tem lançamentos associados?)",
    msgMonedaActualizada: "Moeda atualizada.",
    msgFaltaCuentaCategoria: "Primeiro adicione pelo menos uma conta e uma categoria em Config.",
    optAgregarCuentaConfig: "-- Adicione uma conta em Config --",
    optAgregarCategoriaConfig: "-- Adicione uma categoria em Config --",
    sufijoNoEnConfig: " (não está na sua Config)",
    vozPreguntaTipo: "É uma despesa ou uma receita?",
    vozPreguntaCuenta: "Com qual conta?",
    vozPreguntaCategoria: "Qual categoria?",
    vozPreguntaMonto: "Qual é o valor? Pode dizer reais e centavos.",
    vozPreguntaDetalle: "Qual é o detalhe?",
    vozCompleto: "✅ Dados completos. Revise e toque em Salvar.",
    vozCorregirManual: "Você pode corrigir qualquer campo manualmente antes de salvar.",
    vozRespuestaPlaceholder: "A resposta ouvida vai aparecer aqui.",
    vozPasoTemplate: "Passo {n} de {total} — {pregunta}",
    vozTocaResponder: "Toque em Responder. Também pode preencher o campo manualmente.",
    vozDatoBorrado: "Dado apagado. Toque em Responder novamente.",
    vozSinReconocimiento: "Este navegador não oferece reconhecimento de voz. Tente pelo Chrome, ou digite o dado manualmente.",
    vozEscuchando: "🔴 Ouvindo este dado…",
    vozMicBloqueado: "O microfone está bloqueado para esta página. Verifique as permissões do Chrome (cadeado ao lado do endereço) e tente novamente.",
    vozNoEscucheNada: "Não ouvi nada. Toque em Responder e fale assim que começar a ouvir.",
    vozErrorGenerico: "Não consegui ouvir ({error}). Pode repetir ou digitar manualmente.",
    vozNoEscucheIntenta: "Não ouvi nada. Tente novamente.",
    vozNoEntendiTipo: 'Não entendi se é despesa ou receita. Diga claramente "despesa" ou "receita" (ou escolha com os botões acima) e toque em Responder novamente.',
    vozNoPudeInterpretar: "Não consegui interpretar este dado. Repita ou digite manualmente.",
    vozCargadoTemplate: "✓ {valor} carregado. Toque em Continuar para seguir.",
    vozNoPudeIniciarMic: "Não consegui iniciar o microfone. Você pode continuar manualmente.",
    confirmBorrarMov: "Excluir este lançamento? Não pode ser desfeito.",
    msgMovBorrado: "Lançamento excluído.",
    errFaltaFecha: "Falta a data.",
    errElegiCuenta: "Escolha uma conta.",
    errElegiCategoria: "Escolha uma categoria.",
    errMontoMayorCero: "O valor precisa ser maior que zero.",
    msgMovActualizado: "Lançamento atualizado.",
    msgMovGuardado: "Lançamento salvo.",
    msgPreparandoArchivo: "Preparando arquivo...",
    msgSinMovExportar: "Você ainda não tem lançamentos para exportar.",
    msgArchivoDescargado: "Arquivo baixado.",
    confirmReiniciar1: "Você vai apagar TODOS os seus lançamentos, contas e categorias.\n\nSeu usuário e sua senha não serão afetados.\n\nEsta ação não pode ser desfeita. Continuar?",
    confirmReiniciar2: "Confirmação final: todos os seus dados de trabalho serão apagados agora.\n\nReiniciar tudo?",
    msgDatosReiniciados: "Seus dados foram reiniciados.",
  },
  en: {
    subtitulo: "Your money, clear and simple.",
    labelEmail: "Email",
    labelClave: "Password",
    placeholderClave: "Minimum 6 characters",
    btnEntrar: "Log in",
    separadorO: "or",
    btnCrearCuenta: "Create a new account",
    btnOlvideClave: "Forgot my password",
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
    totalGastos: "Total expenses",
    sinGastosPeriodo: "No expenses recorded for this period.",
    tituloIdioma: "Language",
    tituloMoneda: "Currency",
        tituloMonedaBase: "My currency",
    textoMonedaBase: "This is your home currency — everything else gets converted to it when you log a movement in another currency.",
    tituloMonedas: "Currencies",
    textoMonedas: "Add here the currencies you use once in a while (for example, when traveling), so you can assign them to an account.",
    placeholderNombreMoneda: "Name (e.g: Dollars)",
    placeholderCodigoMoneda: "Code (e.g: USD)",
    placeholderSimboloMoneda: "Symbol (e.g: US$)",
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

    // ---- Dynamic messages ----
    msgCuentaCreada: "Account created. You can now log in with your email and password.",
    msgEscribiEmail: "Enter your email above first.",
    msgEmailRecuperacion: "We sent you an email to reset your password.",
    vacioMovimientos: "You haven't added any movements this month yet.<br>Tap the <b>+</b> button to add the first one.",
    vacioBusqueda: "No results for that search.<br>Try clearing it or changing the filter.",
    vacioCuentas: "You haven't added any accounts yet.",
    vacioCategorias: "You haven't added any categories yet.",
    promptNuevoNombre: "New name:",
    msgGuardado: "Saved.",
    confirmBorrarItem: 'Delete "{nombre}"? If it has linked movements, it won\'t be possible to delete it.',
    msgBorrado: "Deleted.",
    msgNoPudoBorrar: "Couldn't delete it (does it have linked movements?)",
    msgMonedaActualizada: "Currency updated.",
    msgFaltaCuentaCategoria: "First add at least one account and one category in Settings.",
    optAgregarCuentaConfig: "-- Add an account in Settings --",
    optAgregarCategoriaConfig: "-- Add a category in Settings --",
    sufijoNoEnConfig: " (not in your Settings)",
    vozPreguntaTipo: "Is it an expense or income?",
    vozPreguntaCuenta: "Which account?",
    vozPreguntaCategoria: "Which category?",
    vozPreguntaMonto: "What's the amount? You can say it including the cents.",
    vozPreguntaDetalle: "What's the detail?",
    vozCompleto: "✅ All set. Review it and tap Save.",
    vozCorregirManual: "You can correct any field manually before saving.",
    vozRespuestaPlaceholder: "What you say will appear here.",
    vozPasoTemplate: "Step {n} of {total} — {pregunta}",
    vozTocaResponder: "Tap Answer. You can also fill in the field by hand.",
    vozDatoBorrado: "Value cleared. Tap Answer again.",
    vozSinReconocimiento: "This browser doesn't offer voice recognition. Try Chrome, or enter the value by hand.",
    vozEscuchando: "🔴 Listening for this value…",
    vozMicBloqueado: "The microphone is blocked for this page. Check Chrome's permissions (the lock icon next to the address) and try again.",
    vozNoEscucheNada: "I didn't hear anything. Tap Answer and speak as soon as it starts listening.",
    vozErrorGenerico: "I couldn't listen ({error}). You can repeat or type it manually.",
    vozNoEscucheIntenta: "I didn't hear anything. Try again.",
    vozNoEntendiTipo: 'I didn\'t understand if it\'s an expense or income. Say clearly "expense" or "income" (or pick it with the buttons above) and tap Answer again.',
    vozNoPudeInterpretar: "I couldn't interpret this value. Repeat it or type it manually.",
    vozCargadoTemplate: "✓ {valor} loaded. Tap Next to continue.",
    vozNoPudeIniciarMic: "I couldn't start the microphone. You can continue manually.",
    confirmBorrarMov: "Delete this movement? This can't be undone.",
    msgMovBorrado: "Movement deleted.",
    errFaltaFecha: "Date is missing.",
    errElegiCuenta: "Choose an account.",
    errElegiCategoria: "Choose a category.",
    errMontoMayorCero: "The amount must be greater than zero.",
    msgMovActualizado: "Movement updated.",
    msgMovGuardado: "Movement saved.",
    msgPreparandoArchivo: "Preparing file...",
    msgSinMovExportar: "You don't have any movements to export yet.",
    msgArchivoDescargado: "File downloaded.",
    confirmReiniciar1: "You're about to delete ALL your movements, accounts and categories.\n\nYour user and password won't be affected.\n\nThis action can't be undone. Continue?",
    confirmReiniciar2: "Final confirmation: all your working data will be deleted right now.\n\nReset everything?",
    msgDatosReiniciados: "Your data has been reset.",
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
  // Estados vacíos, si están mostrándose ahora mismo
  if (movimientos && !movimientos.length && $("listaMovimientos") && !$("listaMovimientos").querySelector(".mov-item")) {
    renderMovimientos();
  }
}

// ---------- Utilidades ----------
function moneda() { return perfil?.moneda || "$"; }

function formatoMonto(n) {
  return moneda() + " " + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function montoEnBase(m) {
  return Number(m.monto) * Number(m.cotizacion || 1);
}

// ============================================================
// COTIZACIONES: consulta diaria a una API gratuita, sin necesidad
// de clave, con el valor de más de 150 monedas. Se guarda en el
// dispositivo por un día para no consultar de más.
// ============================================================
const FS_COTIZACIONES_CACHE = "fs_cotizaciones_cache";

async function obtenerTasasBase(monedaBase) {
  const clave = monedaBase.toLowerCase();
  const hoy = new Date().toISOString().slice(0, 10);
  try {
    const cache = JSON.parse(localStorage.getItem(FS_COTIZACIONES_CACHE) || "null");
    if (cache && cache.fecha === hoy && cache.base === clave) return cache.tasas;
  } catch {}
  try {
    const resp = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${clave}.json`);
    if (!resp.ok) throw new Error("no ok");
    const datos = await resp.json();
    const tasas = datos[clave] || {};
    try { localStorage.setItem(FS_COTIZACIONES_CACHE, JSON.stringify({ fecha: hoy, base: clave, tasas })); } catch {}
    return tasas;
  } catch {
    return null;
  }
}

async function obtenerCotizacionSugerida(monedaExtranjera, monedaBase) {
  if (!monedaExtranjera || !monedaBase || monedaExtranjera === monedaBase) return null;
  const tasas = await obtenerTasasBase(monedaBase);
  if (!tasas) return null;
  const tasa = tasas[monedaExtranjera.toLowerCase()];
  if (!tasa || tasa <= 0) return null;
  return 1 / tasa;
}

async function renderCotizacionesTopbar() {
  const cont = $("cotizacionesTopbar");
  if (!cont) return;
  if (!monedasUsuario.length) { cont.innerHTML = ""; return; }
  const monedaBase = perfil?.moneda_base || "ARS";
  const partes = [];
  for (const m of monedasUsuario) {
    const valor = await obtenerCotizacionSugerida(m.codigo, monedaBase);
    if (valor) {
      partes.push(`<span class="chip-cotizacion">${m.codigo} ${moneda()} ${valor.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`);
    }
  }
  cont.innerHTML = partes.join("");
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
      mostrarAviso($("loginOk"), t("msgCuentaCreada"));
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
  if (!email) return mostrarAviso($("loginError"), t("msgEscribiEmail"));
  try {
    await enviarRecuperacionClave(email);
    mostrarAviso($("loginOk"), t("msgEmailRecuperacion"));
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

  // El idioma que ya está elegido en pantalla (por ejemplo, el que tocaste
  // en el login) tiene prioridad. Si la cuenta tenía guardado otro distinto,
  // actualizamos la cuenta para que coincida, en vez de pisar tu elección.
  const idiomaElegido = localStorage.getItem("fs_idioma") || perfil?.idioma || "es";
  aplicarIdioma(idiomaElegido);
  if (perfil && perfil.idioma !== idiomaElegido) {
    try {
      await actualizarIdioma(usuario.id, idiomaElegido);
      perfil.idioma = idiomaElegido;
    } catch {}
  }

  await cargarCuentasYCategorias();
  await cargarMesActual();
}

async function cargarCuentasYCategorias() {
  cuentas = await listarCuentas(usuario.id);
  categorias = await listarCategorias(usuario.id);
  monedasUsuario = await listarMonedas(usuario.id);
  renderCuentasConfig();
  renderCategoriasConfig();
  renderMonedasConfig();
  renderSelects();
  renderSelectMonedaBase();
  renderSelectMonedaNuevaCuenta();
  renderCotizacionesTopbar();
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
    if (m.tipo === "Ingreso") ing += montoEnBase(m);
    else gas += montoEnBase(m);
  });
  $("valorBalance").textContent = formatoMonto(ing - gas);
  $("valorIngresos").textContent = formatoMonto(ing);
  $("valorGastos").textContent = formatoMonto(gas);
}
function normalizarTexto(v) {
  return String(v ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
    cont.innerHTML = `<div class="vacio">${t("vacioMovimientos")}</div>`;
    return;
  }
  if (!visibles.length) {
    cont.innerHTML = `<div class="vacio">${t("vacioBusqueda")}</div>`;
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
    if (m.tipo === "Ingreso") ing += montoEnBase(m);
    else gas += montoEnBase(m);
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
    const monto = montoEnBase(m);
    porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + monto;
    totalGastos += monto;
  });
  const entradas = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  if (!entradas.length) {
    cont.innerHTML = `
      <div class="grafico-dona grafico-dona-vacio"></div>
      <div class="vacio">${t("sinGastosPeriodo")}</div>`;
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
        <span class="grafico-dona-label">${t("totalGastos")}</span>
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
    : `<div class="vacio">${t("vacioCuentas")}</div>`;
  enlazarAccionesEditables("cuenta");
}

function renderCategoriasConfig() {
  const cont = $("listaCategorias");
  cont.innerHTML = categorias.length
    ? categorias.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">${t("vacioCategorias")}</div>`;
  enlazarAccionesEditables("categoria");
}

const MONEDAS_BASE = [
  { codigo: "ARS", nombre: "Peso argentino" },
  { codigo: "USD", nombre: "Dólar estadounidense" },
  { codigo: "BRL", nombre: "Real brasileño" },
  { codigo: "CLP", nombre: "Peso chileno" },
  { codigo: "COP", nombre: "Peso colombiano" },
  { codigo: "MXN", nombre: "Peso mexicano" },
  { codigo: "PEN", nombre: "Sol peruano" },
  { codigo: "UYU", nombre: "Peso uruguayo" },
  { codigo: "BOB", nombre: "Boliviano" },
  { codigo: "PYG", nombre: "Guaraní" },
  { codigo: "VES", nombre: "Bolívar" },
  { codigo: "GTQ", nombre: "Quetzal" },
  { codigo: "DOP", nombre: "Peso dominicano" },
  { codigo: "CRC", nombre: "Colón costarricense" },
  { codigo: "EUR", nombre: "Euro" },
];

function renderSelectMonedaBase() {
  const sel = $("selectMonedaBase");
  if (!sel) return;
  sel.innerHTML = MONEDAS_BASE.map((m) => `<option value="${m.codigo}">${m.codigo} - ${m.nombre}</option>`).join("");
  sel.value = perfil?.moneda_base || "ARS";
}

function renderSelectMonedaNuevaCuenta() {
  const sel = $("selectMonedaNuevaCuenta");
  if (!sel) return;
  const base = perfil?.moneda_base || "ARS";
  const opciones = [`<option value="${base}">${base} (tu moneda)</option>`];
  monedasUsuario.forEach((m) => {
    opciones.push(`<option value="${m.codigo}">${m.codigo} - ${m.nombre}</option>`);
  });
  sel.innerHTML = opciones.join("");
}

if ($("selectMonedaBase")) {
  $("selectMonedaBase").addEventListener("change", async (e) => {
    const v = e.target.value;
    try {
      await actualizarMonedaBase(usuario.id, v);
      perfil.moneda_base = v;
      mostrarToast(t("msgGuardado"));
      renderSelectMonedaNuevaCuenta();
    } catch (err) {
      mostrarToast(traducirErrorDatos(err));
    }
  });
}

function renderMonedasConfig() {
  const cont = $("listaMonedas");
  if (!cont) return;
  cont.innerHTML = monedasUsuario.map((m) => filaEditable(m, "moneda")).join("");
  enlazarAccionesEditables("moneda");
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
  const selector = tipo === "cuenta" ? "#listaCuentas" : tipo === "categoria" ? "#listaCategorias" : "#listaMonedas";
  document.querySelectorAll(`${selector} [data-accion]`).forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const item = e.target.closest(".editable-item");
      const id = item.dataset.id;
      const accion = btn.dataset.accion;
      const lista = tipo === "cuenta" ? cuentas : tipo === "categoria" ? categorias : monedasUsuario;
      const actual = lista.find((x) => x.id === id);

      if (accion === "editar") {
        const nuevo = prompt(t("promptNuevoNombre"), actual.nombre);
        if (nuevo === null || !nuevo.trim()) return;
        try {
          if (tipo === "cuenta") await renombrarCuenta(id, nuevo.trim());
          else if (tipo === "categoria") await renombrarCategoria(id, nuevo.trim());
          else await renombrarMoneda(id, nuevo.trim());
          await cargarCuentasYCategorias();
          mostrarToast(t("msgGuardado"));
        } catch (err) { mostrarToast(traducirErrorDatos(err)); }
      }

      if (accion === "borrar") {
        if (!confirm(t("confirmBorrarItem").replace("{nombre}", actual.nombre))) return;
        try {
          if (tipo === "cuenta") await borrarCuenta(id);
          else if (tipo === "categoria") await borrarCategoria(id);
          else await borrarMoneda(id);
          await cargarCuentasYCategorias();
          mostrarToast(t("msgBorrado"));
        } catch (err) { mostrarToast(t("msgNoPudoBorrar")); }
      }
    });
  });
}



$("btnGuardarMoneda").addEventListener("click", async () => {
  const v = $("inputMoneda").value.trim() || "$";
  await actualizarMoneda(usuario.id, v);
  perfil.moneda = v;
  mostrarToast(t("msgMonedaActualizada"));
  renderResumen();
  renderMovimientos();
});

async function cambiarIdiomaDesdeSelector(nuevoIdioma) {
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
}

if ($("selectIdioma")) {
  $("selectIdioma").addEventListener("change", (e) => cambiarIdiomaDesdeSelector(e.target.value));
}
if ($("selectIdiomaTopbar")) {
  $("selectIdiomaTopbar").addEventListener("change", (e) => cambiarIdiomaDesdeSelector(e.target.value));
}

$("btnAgregarCuenta").addEventListener("click", async () => {
  const input = $("inputNuevaCuenta");
  const v = input.value.trim();
  if (!v) return;
  const moneda = $("selectMonedaNuevaCuenta").value || perfil?.moneda_base || "ARS";
  try {
    await crearCuenta(usuario.id, v, moneda);
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
$("btnAgregarMoneda").addEventListener("click", async () => {
  const nombre = $("inputNuevaMonedaNombre").value.trim();
  const codigo = $("inputNuevaMonedaCodigo").value.trim().toUpperCase();
  const simbolo = $("inputNuevaMonedaSimbolo").value.trim();
  if (!nombre || !codigo) return;
  try {
    await crearMoneda(usuario.id, nombre, codigo, simbolo);
    $("inputNuevaMonedaNombre").value = "";
    $("inputNuevaMonedaCodigo").value = "";
    $("inputNuevaMonedaSimbolo").value = "";
    await cargarCuentasYCategorias();
    mostrarToast(t("msgGuardado"));
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
});

function renderSelects() {
  $("movCuenta").innerHTML = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") || `<option value="">${t("optAgregarCuentaConfig")}</option>`;
  $("movCategoria").innerHTML = categorias.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") || `<option value="">${t("optAgregarCategoriaConfig")}</option>`;
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
    opt.textContent = valor + t("sufijoNoEnConfig");
    el.appendChild(opt);
}
  }
function actualizarFilaCotizacion(valorPrellenado) {
  const fila = $("filaCotizacion");
  if (!fila) return;
  const cuentaSeleccionada = cuentas.find((c) => c.nombre === $("movCuenta").value);
  const monedaCuenta = cuentaSeleccionada?.moneda || perfil?.moneda_base || "ARS";
  const monedaBase = perfil?.moneda_base || "ARS";
  if (monedaCuenta !== monedaBase) {
    fila.hidden = false;
    $("labelMonedaMov").textContent = `1 ${monedaCuenta} = ? ${monedaBase}`;
    if (valorPrellenado) $("movCotizacion").value = String(valorPrellenado).replace(".", ",");
  } else {
    fila.hidden = true;
    $("movCotizacion").value = "";
  }
}
// ============================================================
// MODAL: Nuevo / Editar movimiento
// ============================================================
$("btnNuevo").addEventListener("click", () => abrirModalNuevo());
$("btnCerrarModal").addEventListener("click", cerrarModal);
  $("movCuenta").addEventListener("change", () => actualizarFilaCotizacion());
$("modalFondo").addEventListener("click", (e) => { if (e.target.id === "modalFondo") cerrarModal(); });

function abrirModalNuevo() {
  if (!cuentas.length || !categorias.length) {
    return mostrarToast(t("msgFaltaCuentaCategoria"));
  }
  $("formMovimiento").reset();
  $("movId").value = "";
  $("modalTitulo").textContent = t("modalNuevoTitulo");
  $("btnBorrarMov").hidden = true;
  seleccionarTipo("Gasto");
  $("movFecha").value = new Date().toISOString().slice(0, 10);
  renderSelects();
    actualizarFilaCotizacion();
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
    actualizarFilaCotizacion(m.cotizacion);
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
//
// El reconocimiento de voz (fsVoiceRec.lang) y las funciones de
// interpretación (fsVoiceTipo, fsVoiceNumeroPalabras, fsVoiceMonto)
// se adaptan al idioma activo (idiomaActual): español, portugués e inglés.
// ============================================================
let fsVoiceStep = 0;
let fsVoiceRec = null;
let fsVoicePending = "";
const fsVoiceSteps = [
  { id: "tipo", qKey: "vozPreguntaTipo" },
  { id: "movCuenta", qKey: "vozPreguntaCuenta" },
  { id: "movCategoria", qKey: "vozPreguntaCategoria" },
  { id: "movMonto", qKey: "vozPreguntaMonto" },
  { id: "movDetalle", qKey: "vozPreguntaDetalle" },
];

// Locale que se le pasa al reconocimiento de voz del navegador, según el idioma activo.
const FS_VOZ_LOCALE = { es: "es-AR", pt: "pt-BR", en: "en-US" };

// Palabras que indican "Gasto" o "Ingreso" al hablar, por idioma.
const FS_VOZ_PALABRAS_GASTO = {
  es: /\b(gasto|gastos|gaste|pague|pago|pagar|compre|compra|sali[oó]|salida|egreso|debito|d[eé]bito|debitaron)\b/,
  pt: /\b(despesa|despesas|gastei|gasto|paguei|pago|pagar|comprei|compra|saida|saiu|debito|d[eé]bito|debitaram)\b/,
  en: /\b(expense|expenses|spent|spend|paid|pay|bought|buy|purchase|purchased|withdrawal|debit|debited)\b/,
};
const FS_VOZ_PALABRAS_INGRESO = {
  es: /\b(ingreso|ingresos|cobre|cobro|cobrar|recibi|recibo|entro|entrada|deposito|dep[oó]sito|acredito|acreditaron|sueldo|cobranza)\b/,
  pt: /\b(receita|receitas|recebi|recebo|receber|entrada|entrou|deposito|dep[oó]sito|credito|cr[eé]dito|creditaram|salario|sal[aá]rio)\b/,
  en: /\b(income|incomes|received|receive|earned|earn|deposit|deposited|credit|credited|salary|paycheck)\b/,
};

// Números en palabras, por idioma. En inglés "hundred" funciona como
// multiplicador (five hundred = 5 x 100); en español/portugués las
// centenas ya son palabras propias (quinientos / quinhentos), así que
// no necesitan esa regla especial.
const FS_VOZ_NUMEROS = {
  es: { cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,
    diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18,diecinueve:19,
    veinte:20,veintiuno:21,veintidos:22,veintitres:23,veinticuatro:24,veinticinco:25,veintiseis:26,veintisiete:27,veintiocho:28,veintinueve:29,
    treinta:30,cuarenta:40,cincuenta:50,sesenta:60,setenta:70,ochenta:80,noventa:90,
    cien:100,ciento:100,doscientos:200,trescientos:300,cuatrocientos:400,quinientos:500,seiscientos:600,setecientos:700,ochocientos:800,novecientos:900 },
  pt: { zero:0,um:1,uma:1,dois:2,duas:2,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,
    dez:10,onze:11,doze:12,treze:13,catorze:14,quatorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,
    vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,
    cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900 },
  en: { zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,
    ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,
    twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90 },
};
const FS_VOZ_CONECTOR_Y = { es: "y", pt: "e", en: "and" };
const FS_VOZ_PALABRA_MIL = { es: ["mil"], pt: ["mil"], en: ["thousand"] };
const FS_VOZ_PALABRA_MILLON = { es: ["millon", "millones"], pt: ["milhao", "milhoes"], en: ["million", "millions"] };
const FS_VOZ_PALABRA_CIEN_MULT = { es: [], pt: [], en: ["hundred"] };
const FS_VOZ_CONECTOR_CENTAVOS = { es: "con", pt: "com", en: "with" };
const FS_VOZ_PALABRA_MONEDA = { es: /\bpesos?\b/g, pt: /\breais?\b/g, en: /\bdollars?\b/g };
const FS_VOZ_PALABRA_CENTAVOS = { es: /\bcentavos?\b/g, pt: /\bcentavos?\b/g, en: /\bcents?\b/g };
const FS_VOZ_PALABRA_DE = { es: /\bde\b/g, pt: /\bde\b/g, en: /\bof\b/g };
const FS_VOZ_MILLON_RE = { es: /\bmillon(?:es)?\b/, pt: /\bmilhao(?:es)?\b/, en: /\bmillion(?:s)?\b/ };
const FS_VOZ_MILLON_SPLIT = { es: /^(.*?)\bmillon(?:es)?\b\s*(.*)$/, pt: /^(.*?)\bmilhao(?:es)?\b\s*(.*)$/, en: /^(.*?)\bmillion(?:s)?\b\s*(.*)$/ };

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
  const idioma = FS_VOZ_PALABRAS_GASTO[idiomaActual] ? idiomaActual : "es";
  t = fsVoiceNorm(t);
  if (FS_VOZ_PALABRAS_GASTO[idioma].test(t)) return "Gasto";
  if (FS_VOZ_PALABRAS_INGRESO[idioma].test(t)) return "Ingreso";
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
  const idioma = FS_VOZ_NUMEROS[idiomaActual] ? idiomaActual : "es";
  const u = FS_VOZ_NUMEROS[idioma];
  const conector = FS_VOZ_CONECTOR_Y[idioma];
  const milWords = FS_VOZ_PALABRA_MIL[idioma];
  const millonWords = FS_VOZ_PALABRA_MILLON[idioma];
  const cienMultWords = FS_VOZ_PALABRA_CIEN_MULT[idioma];
  txt = fsVoiceNorm(txt).replace(new RegExp("\\b" + conector + "\\b", "g"), " ").replace(/\s+/g, " ").trim();
  let total = 0, actual = 0, vio = false;
  for (const w of txt.split(" ")) {
    if (w in u) { actual += u[w]; vio = true; continue; }
    if (cienMultWords.includes(w)) { actual = (actual || 1) * 100; vio = true; continue; }
    if (milWords.includes(w)) { total += (actual || 1) * 1000; actual = 0; vio = true; continue; }
    if (millonWords.includes(w)) { total += (actual || 1) * 1000000; actual = 0; vio = true; continue; }
  }
  return vio ? total + actual : null;
}

function fsVoiceMonto(t) {
  const idioma = FS_VOZ_MILLON_RE[idiomaActual] ? idiomaActual : "es";
  const conector = FS_VOZ_CONECTOR_CENTAVOS[idioma];
  const rePalabraMoneda = FS_VOZ_PALABRA_MONEDA[idioma];
  const rePalabraCentavos = FS_VOZ_PALABRA_CENTAVOS[idioma];
  const reDe = FS_VOZ_PALABRA_DE[idioma];
  const reMillon = FS_VOZ_MILLON_RE[idioma];
  const reMillonSplit = FS_VOZ_MILLON_SPLIT[idioma];

  let q = fsVoiceNorm(t).replace(/\$/g, " ").replace(/\s+/g, " ").trim();
  function vp(txt) { txt = (txt || "").trim(); if (!txt) return null; if (/^\d+$/.test(txt)) return parseInt(txt, 10); return fsVoiceNumeroPalabras(txt); }
  function cents(txt) { txt = (txt || "").replace(rePalabraCentavos, " ").trim(); let m = txt.match(/\b(\d{1,2})\b/); if (m) return Math.min(99, parseInt(m[1], 10)); let n = vp(txt); return n === null ? null : Math.min(99, n); }
  if (reMillon.test(q)) {
    let mm = q.match(reMillonSplit), pref = mm ? mm[1].trim() : "", resto = mm ? mm[2].trim() : "";
    let mult = vp(pref); if (mult === null || mult === 0) mult = 1; let total = mult * 1000000;
    let p = resto.split(new RegExp("\\b" + conector + "\\b")), pesos = (p[0] || "").replace(reDe, " ").replace(rePalabraMoneda, " ").trim(), cent = p.length > 1 ? p.slice(1).join(" ").trim() : "";
    if (pesos) { let nr = pesos.match(/\b(\d{1,3}(?:[.,]\d{3})+|\d{1,6})\b/); if (nr) total += parseInt(nr[1].replace(/[.,]/g, ""), 10); else { let n = vp(pesos); if (n !== null) total += n; } }
    let c = cents(cent); return c !== null ? (total + c / 100).toFixed(2) : String(total);
  }
  let m = q.match(/\b(\d{1,3}(?:,\d{3})+)\.(\d{1,2})\b/); if (m) return (parseInt(m[1].replace(/,/g, ""), 10) + parseInt((m[2] + "0").slice(0, 2), 10) / 100).toFixed(2);
  m = q.match(/\b(\d{1,3}(?:\.\d{3})+),(\d{1,2})\b/); if (m) return (parseInt(m[1].replace(/\./g, ""), 10) + parseInt((m[2] + "0").slice(0, 2), 10) / 100).toFixed(2);
  m = q.match(/\b(\d{4,})[.,](\d{1,2})\b/); if (m) return (parseInt(m[1], 10) + parseInt((m[2] + "0").slice(0, 2), 10) / 100).toFixed(2);
  let p = q.split(new RegExp("\\b" + conector + "\\b")), principal = p[0].replace(rePalabraMoneda, " ").trim(), resto = p.length > 1 ? p.slice(1).join(" ").trim() : "", base = null;
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
    q.textContent = t("vozCompleto");
    st.textContent = t("vozCorregirManual");
    $("voiceHeard").textContent = t("vozRespuestaPlaceholder");
    return;
  }
  q.textContent = t("vozPasoTemplate")
    .replace("{n}", fsVoiceStep + 1)
    .replace("{total}", fsVoiceSteps.length)
    .replace("{pregunta}", t(fsVoiceSteps[fsVoiceStep].qKey));
  st.textContent = t("vozTocaResponder");
  $("voiceHeard").textContent = t("vozRespuestaPlaceholder");
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
    $("voiceHeard").textContent = t("vozDatoBorrado");
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
    st.textContent = t("vozSinReconocimiento");
    return;
  }

  fsVoicePending = "";
  fsVoiceRec = new Reconocimiento();
  fsVoiceRec.lang = FS_VOZ_LOCALE[idiomaActual] || "es-AR";
  fsVoiceRec.continuous = false;
  fsVoiceRec.interimResults = false;
  fsVoiceRec.maxAlternatives = 5;

  fsVoiceRec.onstart = () => { st.textContent = t("vozEscuchando"); };

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
      const idiomaVoz = FS_VOZ_PALABRA_MIL[idiomaActual] ? idiomaActual : "es";
      const palabrasGrandes = [...FS_VOZ_PALABRA_MIL[idiomaVoz], ...FS_VOZ_PALABRA_MILLON[idiomaVoz], ...FS_VOZ_PALABRA_CIEN_MULT[idiomaVoz]];
      const reGrande = new RegExp("\\b(" + palabrasGrandes.join("|") + ")\\b", "i");
      const esc = candidatos.find((x) => reGrande.test(x) && !!fsVoiceMonto(x));
      if (esc) elegido = esc;
    }
    fsVoicePending = elegido;
    heard.textContent = elegido || t("vozEscuchando");
  };

  fsVoiceRec.onerror = (e) => {
    if (e.error === "not-allowed" || e.error === "permission-denied") {
      st.textContent = t("vozMicBloqueado");
    } else if (e.error === "no-speech") {
      st.textContent = t("vozNoEscucheNada");
    } else {
      st.textContent = t("vozErrorGenerico").replace("{error}", e.error);
    }
  };

  fsVoiceRec.onend = () => {
    if (!fsVoicePending) {
      const bloqueadoActual = t("vozMicBloqueado");
      if (st.textContent !== bloqueadoActual) st.textContent = t("vozNoEscucheIntenta");
      return;
    }
    const paso = fsVoiceSteps[fsVoiceStep];
    const val = fsVoiceInterpretar(paso.id, fsVoicePending);
    if (!val) {
      if (paso.id === "tipo") {
        st.textContent = t("vozNoEntendiTipo");
      } else {
        st.textContent = t("vozNoPudeInterpretar");
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
    st.textContent = t("vozCargadoTemplate").replace("{valor}", mostrado);
  };

  try { fsVoiceRec.start(); } catch (err) { st.textContent = t("vozNoPudeIniciarMic"); }
}

$("btnBorrarMov").addEventListener("click", async () => {
  const id = $("movId").value;
  if (!id) return;
  if (!confirm(t("confirmBorrarMov"))) return;
  try {
    await borrarMovimiento(id);
    cerrarModal();
    await cargarMesActual();
    mostrarToast(t("msgMovBorrado"));
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

  if (!fecha) return mostrarAviso($("movError"), t("errFaltaFecha"));
  if (!cuenta) return mostrarAviso($("movError"), t("errElegiCuenta"));
  if (!categoria) return mostrarAviso($("movError"), t("errElegiCategoria"));
  if (!Number.isFinite(monto) || monto <= 0) return mostrarAviso($("movError"), t("errMontoMayorCero"));

     const cuentaMov = cuentas.find((c) => c.nombre === cuenta);
    const monedaMov = cuentaMov?.moneda || perfil?.moneda_base || "ARS";
    const monedaBase = perfil?.moneda_base || "ARS";
    const cotizacion = monedaMov !== monedaBase ? (numeroDesdeTexto($("movCotizacion").value) || 1) : 1;
    const datos = { tipo, fecha, cuenta, categoria, detalle, monto, moneda: monedaMov, cotizacion };

  try {
    if (id) await actualizarMovimiento(id, datos);
    else await crearMovimiento(usuario.id, datos);
    cerrarModal();
    await cargarMesActual();
    mostrarToast(id ? t("msgMovActualizado") : t("msgMovGuardado"));
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
    mostrarToast(t("msgPreparandoArchivo"));
    const todos = await listarTodosLosMovimientos(usuario.id);
    if (!todos.length) return mostrarToast(t("msgSinMovExportar"));
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
    mostrarToast(t("msgArchivoDescargado"));
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

function valorCSV(v) {
  return '"' + String(v ?? "").replace(/"/g, '""') + '"';
}

$("btnExportarCSV").addEventListener("click", async () => {
  try {
    mostrarToast(t("msgPreparandoArchivo"));
    const todos = await listarTodosLosMovimientos(usuario.id);
    if (!todos.length) return mostrarToast(t("msgSinMovExportar"));
    const encabezado = ["Fecha", "Tipo", "Cuenta", "Categoría", "Detalle", "Monto"].map(valorCSV).join(",");
    const filas = todos.map((m) => {
      const montoConSigno = m.tipo === "Gasto" ? -Math.abs(m.monto) : Math.abs(m.monto);
      return [formatoFecha(m.fecha), m.tipo, m.cuenta, m.categoria, m.detalle || "", montoConSigno].map(valorCSV).join(",");
    }).join("\n");
    descargarArchivo(`FinanzaSimple_${fechaParaNombreArchivo()}.csv`, "\ufeff" + encabezado + "\n" + filas, "text/csv;charset=utf-8");
    mostrarToast(t("msgArchivoDescargado"));
  } catch (err) {
    mostrarToast(traducirErrorDatos(err));
  }
});

// ============================================================
// REINICIAR DATOS
// ============================================================
$("btnReiniciarDatos").addEventListener("click", async () => {
  const paso1 = confirm(t("confirmReiniciar1"));
  if (!paso1) return;
  const paso2 = confirm(t("confirmReiniciar2"));
  if (!paso2) return;

  try {
    await reiniciarDatosUsuario(usuario.id);
    await cargarCuentasYCategorias();
    await cargarMesActual();
    mostrarToast(t("msgDatosReiniciados"));
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
