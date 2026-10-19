// ============================================================
// Ingasto - Lógica principal
// ============================================================

let usuario = null;
let perfil = null;
let cuentas = [];
let categorias = [];
let movimientos = [];
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
    btnCrearCuenta: "Crear una cuenta nueva",
    linkConocer: "Conocé qué es Ingasto",
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
    textoAvisoWhatsapp: "Si después de verificar no se activa, avisanos por WhatsApp con el mail que usaste para registrarte.",
    btnVerificarPago: "Ya pagué, verificar",
    verificandoPago: "Verificando tu pago…",
    pagoNoEncontrado: "Todavía no encontramos tu pago. Puede demorar unos minutos: probá de nuevo en un rato.",
    btnAvisarWhatsapp: "Avisar por WhatsApp",
    btnSalir2: "Salir",
    btnCrearCuentaSubmit: "Crear cuenta",
    btnYaTengoCuenta: "Ya tengo cuenta",
    ariaMesAnterior: "Mes anterior",
    ariaMesSiguiente: "Mes siguiente",
    ariaSalir: "Salir",
    confirmarSalir: "¿Querés cerrar tu sesión?",
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
    tituloEvolucionMensual: "Evolución mensual",
    textoEvolucionMensual: "Ingresos y egresos totales de los últimos meses.",
    tituloDiaADia: "Ingresos y egresos del mes",
    textoDiaADia: "Acumulado de ingresos y egresos, día a día, del mes que estás viendo.",
    analisisSinDatos: "Todavía no hay movimientos cargados.",
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
    ayudaCuotas: "El monto es el valor de cada cuota. Se crea una por mes y quedan como pendientes hasta que las marques como pagadas.",
    textoCuota: "Cuota",
    toastCuotas: "Se crearon {n} cuotas.",
    errCuotas: "Las cuotas tienen que ser entre 2 y 60.",
    errFechaPagoAnterior: "La fecha de pago no puede ser anterior a la fecha del movimiento.",
    pendTitulo: "⏳ Todavía no salió",
    pendPorPagar: "Por pagar",
    pendPorCobrar: "Por cobrar",
    pendVencidos: "vencidos",
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
    badgePendienteGasto: "⏳ por pagar · {f}",
    badgePendienteIngreso: "⏳ por cobrar · {f}",
    badgeOrigenGasto: "↪ se paga el {f}",
    badgeOrigenIngreso: "↪ se cobra el {f}",
    badgeOrigenPagadoGasto: "↪ pagado el {f}",
    badgeOrigenPagadoIngreso: "↪ cobrado el {f}",
    badgeCerradoGasto: "✔ pagado",
    badgeCerradoIngreso: "✔ cobrado",
    previstoLinea: "⏳ Con lo pendiente: Balance {b}",
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
    btnCrearCuenta: "Criar uma conta nova",
    linkConocer: "Conheça o Ingasto",
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
    textoAvisoWhatsapp: "Se depois de verificar não ativar, avise-nos pelo WhatsApp com o e-mail que você usou para se cadastrar.",
    btnVerificarPago: "Já paguei, verificar",
    verificandoPago: "Verificando seu pagamento…",
    pagoNoEncontrado: "Ainda não encontramos seu pagamento. Pode demorar alguns minutos: tente de novo daqui a pouco.",
    btnAvisarWhatsapp: "Avisar pelo WhatsApp",
    btnSalir2: "Sair",
    btnCrearCuentaSubmit: "Criar conta",
    btnYaTengoCuenta: "Já tenho conta",
    ariaMesAnterior: "Mês anterior",
    ariaMesSiguiente: "Próximo mês",
    ariaSalir: "Sair",
    confirmarSalir: "Quer encerrar a sessão?",
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
    tituloEvolucionMensual: "Evolução mensal",
    textoEvolucionMensual: "Receitas e despesas totais dos últimos meses.",
    tituloDiaADia: "Receitas e despesas do mês",
    textoDiaADia: "Acumulado de receitas e despesas, dia a dia, do mês que você está vendo.",
    analisisSinDatos: "Ainda não há movimentos cadastrados.",
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
    ayudaCuotas: "O valor é o de cada parcela. Cria-se uma por mês e ficam pendentes até você marcá-las como pagas.",
    textoCuota: "Parcela",
    toastCuotas: "{n} parcelas criadas.",
    errCuotas: "As parcelas devem ser entre 2 e 60.",
    errFechaPagoAnterior: "A data de pagamento não pode ser anterior à data do lançamento.",
    pendTitulo: "⏳ Ainda não saiu",
    pendPorPagar: "A pagar",
    pendPorCobrar: "A receber",
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
    badgePendienteGasto: "⏳ a pagar · {f}",
    badgePendienteIngreso: "⏳ a receber · {f}",
    badgeOrigenGasto: "↪ será pago em {f}",
    badgeOrigenIngreso: "↪ será recebido em {f}",
    badgeOrigenPagadoGasto: "↪ pago em {f}",
    badgeOrigenPagadoIngreso: "↪ recebido em {f}",
    badgeCerradoGasto: "✔ pago",
    badgeCerradoIngreso: "✔ recebido",
    previstoLinea: "⏳ Com o pendente: Saldo {b}",
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
    btnCrearCuenta: "Create a new account",
    linkConocer: "What is Ingasto?",
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
    textoAvisoWhatsapp: "If it doesn't activate after checking, message us on WhatsApp with the email you used to sign up.",
    btnVerificarPago: "I've paid, check now",
    verificandoPago: "Checking your payment…",
    pagoNoEncontrado: "We haven't found your payment yet. It can take a few minutes: please try again shortly.",
    btnAvisarWhatsapp: "Message us on WhatsApp",
    btnSalir2: "Log out",
    btnCrearCuentaSubmit: "Create account",
    btnYaTengoCuenta: "I already have an account",
    ariaMesAnterior: "Previous month",
    ariaMesSiguiente: "Next month",
    ariaSalir: "Log out",
    confirmarSalir: "Do you want to log out?",
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
    tituloEvolucionMensual: "Monthly trend",
    textoEvolucionMensual: "Total income and expenses over the last few months.",
    tituloDiaADia: "Income and expenses this month",
    textoDiaADia: "Cumulative income and expenses, day by day, for the month you're viewing.",
    analisisSinDatos: "No transactions logged yet.",
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
    ayudaCuotas: "The amount is the value of each installment. One is created per month and they stay pending until you mark them as paid.",
    textoCuota: "Installment",
    toastCuotas: "{n} installments created.",
    errCuotas: "Installments must be between 2 and 60.",
    errFechaPagoAnterior: "The payment date can't be earlier than the entry date.",
    pendTitulo: "⏳ Not settled yet",
    pendPorPagar: "To pay",
    pendPorCobrar: "To receive",
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
    badgePendienteGasto: "⏳ to pay · {f}",
    badgePendienteIngreso: "⏳ to receive · {f}",
    badgeOrigenGasto: "↪ will be paid on {f}",
    badgeOrigenIngreso: "↪ will be received on {f}",
    badgeOrigenPagadoGasto: "↪ paid on {f}",
    badgeOrigenPagadoIngreso: "↪ received on {f}",
    badgeCerradoGasto: "✔ paid",
    badgeCerradoIngreso: "✔ received",
    previstoLinea: "⏳ With what's pending: Balance {b}",
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
  mostrarFechaHoy();
  // Botones de login, si está en modo registro
  if ($("btnIngresar") && $("btnMostrarRegistro")) {
    $("btnIngresar").textContent = modoRegistro ? t("btnCrearCuentaSubmit") : t("btnEntrar");
    $("btnMostrarRegistro").textContent = modoRegistro ? t("btnYaTengoCuenta") : t("btnCrearCuenta");
  }
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
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  el.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Da formato de miles mientras se escribe un importe: 1000000,5 -> 1.000.000,5
function formatearImporteEscrito(texto) {
  let s = String(texto || "");
  // Un punto escrito al final (teclado sin coma) se toma como coma decimal.
  if (/\.$/.test(s) && !s.includes(",")) s = s.slice(0, -1) + ",";
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

// Botón "ojito" para mostrar/ocultar cualquier campo de clave
document.querySelectorAll(".btn-ojito").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = $(btn.dataset.target);
    if (!input) return;
    const mostrando = input.type === "text";
    input.type = mostrando ? "password" : "text";
    btn.textContent = mostrando ? "👁️" : "🙈";
  });
});

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
      const claveConfirmar = $("inputClaveConfirmar").value;
      if (clave !== claveConfirmar) {
        throw { message: "Las claves no coinciden." };
      }
      const resultado = await registrarUsuario(email, clave);
      // Si Supabase pide confirmar el mail, no llega una sesión activa todavía.
      if (resultado?.user && !resultado.session) {
        mostrarAviso($("loginOk"), "¡Casi! Te enviamos un mail a " + email + " para confirmar tu cuenta. Abrilo y tocá el link antes de entrar.");
      } else {
        mostrarAviso($("loginOk"), "Cuenta creada. Ya podés entrar con tu email y clave.");
      }
      modoRegistro = false;
      $("formLogin").reset();
      actualizarTextosDinamicosIdioma();
    } else {
      const resultadoLogin = await iniciarSesion(email, clave);
      await arrancarApp(resultadoLogin?.user);
    }
  } catch (err) {
    mostrarAviso($("loginError"), err?.message === "Las claves no coinciden." ? err.message : traducirErrorAuth(err));
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
const DIAS_DE_PRUEBA = 15;

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
  const creado = new Date(usuario.created_at).getTime();
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
  aplicarIdioma(perfil?.idioma || localStorage.getItem("fs_idioma") || "es");
  if ($("selectIdioma")) $("selectIdioma").value = idiomaActual;

  // Estas dos cargas no dependen una de la otra (los movimientos ya
  // traen el nombre de categoría/cuenta como texto), así que las
  // pedimos en paralelo en vez de una detrás de la otra: reduce
  // bastante el tiempo de arranque, sobre todo con conexión lenta.
  try {
    await sembrarDatosInicialesSiHaceFalta(usuario.id, idiomaActual);
  } catch {}
  await Promise.all([cargarCuentasYCategorias(), cargarMesActual()]);
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
  [cuentas, categorias] = await Promise.all([
    listarCuentas(usuario.id),
    listarCategorias(usuario.id),
  ]);
  renderCuentasConfig();
  renderCategoriasConfig();
  renderSelects();
}

async function cargarMesActual() {
  const [delMes, losPendientes] = await Promise.all([
    listarMovimientosDelMes(usuario.id, fechaVista.getFullYear(), fechaVista.getMonth()),
    listarPendientes(usuario.id),
  ]);
  movimientos = delMes;
  pendientes = losPendientes;
  renderResumen();
  renderPendientes();
  renderMovimientos();
  await renderVistaAnalisis();
  if (subVistaAnalisis === "diaadia") renderDiaADia();
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
    mostrarToast(t(m.tipo === "Ingreso" ? "toastMarcadoCobrado" : "toastMarcadoPagado"));
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
}

function renderPendientes() {
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
    if (m.tipo === "Ingreso") porCobrar += Number(m.monto);
    else porPagar += Number(m.monto);
    if (m.fecha_pago < hoy) vencidos++;
  });
  const partes = [];
  if (porPagar) partes.push(`${escapeHTML(t("pendPorPagar"))} <b>${escapeHTML(formatoMonto(porPagar))}</b>`);
  if (porCobrar) partes.push(`${escapeHTML(t("pendPorCobrar"))} <b>${escapeHTML(formatoMonto(porCobrar))}</b>`);

  const filas = pendientes.map((m) => {
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
          <div class="mov-monto ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "-" : "+"}${escapeHTML(formatoMonto(m.monto))}</div>
          <button type="button" class="boton boton-secundario pend-cerrar" data-id="${m.id}">${escapeHTML(t(esGasto ? "pendMarcarPagado" : "pendMarcarCobrado"))}</button>
        </div>
      </div>`;
  }).join("");

  cont.innerHTML = `
    <div class="pend-cabecera">
      <div class="pend-textos">
        <div class="pend-titulo">${escapeHTML(t("pendTitulo"))} (${pendientes.length})</div>
        <div class="pend-resumen">${vencidos ? `<span class="pend-alerta">⚠ ${escapeHTML(t("pendVencidos"))}: ${vencidos}</span>` : ""}${partes.join(" · ")}</div>
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
      if (m.tipo === "Ingreso") ingPend += Number(m.monto);
      else gasPend += Number(m.monto);
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

function renderResumen() {
  const { ing, gas } = calcularResumenLista(contablesDelMes(movimientos, claveMesVista()));
  $("valorBalance").textContent = formatoMonto(ing - gas);
  $("valorIngresos").textContent = formatoMonto(ing);
  $("valorGastos").textContent = formatoMonto(gas);
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
  btnBuscar.textContent = t("btnBuscarSimple");

  // Filtros y buscador en una sola fila para ganar lugar para la lista.
  const filaAccesos = document.createElement("div");
  filaAccesos.id = "filaAccesosLista";
  filaAccesos.style.cssText = "display:flex;gap:8px;align-items:stretch;margin-bottom:8px;";
  filaAccesos.append(segmentado, btnBuscar);
  if (filaBusqueda && filaBusqueda.parentElement) {
    filaBusqueda.parentElement.insertBefore(filaAccesos, filaBusqueda);
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
  $("etiquetaMes").textContent = nombreMes(fechaVista);
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
  const clave = claveMesVista();
  cont.innerHTML = visibles.map((m) => {
    const esGasto = m.tipo === "Gasto";
    const papel = papelEnMes(m, clave);
    const badge = badgeMovimiento(m, papel);
    const clases = "mov-item"
      + (papel === "origen" ? " mov-origen" : "")
      + (papel === "pago" && esPendiente(m) ? " mov-pendiente" : "");
    const botonCerrar = papel === "pago" && esPendiente(m)
      ? `<button type="button" class="boton boton-secundario pend-cerrar" data-id="${m.id}">${escapeHTML(t(esGasto ? "pendMarcarPagado" : "pendMarcarCobrado"))}</button>`
      : "";
    return `
      <div class="${clases}" data-id="${m.id}">
        <div class="mov-icono ${esGasto ? "gasto" : "ingreso"}" role="img" aria-label="${esGasto ? t("segGasto") : t("segIngreso")}">${esGasto ? "↓" : "↑"}</div>
        <div class="mov-info">
          <div class="mov-categoria">${escapeHTML(m.categoria)}</div>
          <div class="mov-detalle">${escapeHTML(m.cuenta)}${m.detalle ? " · " + escapeHTML(m.detalle) : ""}</div>
          <div class="mov-fecha">${formatoFecha(m.fecha)}</div>
          ${badge ? `<div class="mov-badge ${badge.clase}">${escapeHTML(badge.texto)}</div>` : ""}
        </div>
        <div class="mov-derecha">
          <div class="mov-monto ${esGasto ? "gasto" : "ingreso"}">${esGasto ? "-" : "+"}${formatoMonto(m.monto)}</div>
          ${botonCerrar}
        </div>
      </div>`;
  }).join("");

  cont.querySelectorAll(".mov-item").forEach((el) => {
    el.addEventListener("click", () => abrirModalEditar(el.dataset.id));
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

let tipoAnalisis = "Gasto";
let ultimaListaAnalisis = [];

function renderCategoriasAnalisis(lista, tipo) {
  const cont = $("listaAnalisis");
  const esGasto = tipo === "Gasto";
  $("tituloListaAnalisis").textContent = esGasto ? t("tituloGastosPorCategoria") : t("tituloIngresosPorCategoria");
  const porCategoria = {};
  let total = 0;
  lista.filter((m) => m.tipo === tipo).forEach((m) => {
    porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + Number(m.monto);
    total += Number(m.monto);
  });
  const entradas = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  if (!entradas.length) {
    cont.innerHTML = `
      <div class="grafico-dona grafico-dona-vacio"></div>
      <div class="vacio">${esGasto ? t("analisisSinGastos") : t("analisisSinIngresos")}</div>`;
    return;
  }
  const colores = esGasto
    ? ["#C4562E", "#2F6F5E", "#D9A441", "#5B7FBF", "#8B5FBF", "#4FA3A0", "#C2707C", "#7A8B4F"]
    : ["#2F6F5E", "#4FA3A0", "#5B7FBF", "#D9A441", "#8B5FBF", "#C4562E", "#7A8B4F", "#C2707C"];
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
    if (m.tipo === "Ingreso") porMes[clave].ing += Number(m.monto);
    else porMes[clave].gas += Number(m.monto);
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
    cont.innerHTML = `<div class="vacio" data-i18n="analisisSinDatos">Todavía no hay movimientos cargados.</div>`;
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
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#2F6F5E"></span>${t("lblIngresos")}</span>
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#C4562E"></span>${t("lblGastos")}</span>
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
    cont.innerHTML = `<div class="vacio" data-i18n="analisisSinDatos">Todavía no hay movimientos cargados.</div>`;
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
    if (m.tipo === "Ingreso") porDia[dia].ing += Number(m.monto);
    else porDia[dia].gas += Number(m.monto);
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
          <stop offset="0%" stop-color="#2F6F5E" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#2F6F5E" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="gradGasto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C4562E" stop-opacity="0.30" />
          <stop offset="100%" stop-color="#C4562E" stop-opacity="0" />
        </linearGradient>
      </defs>
      ${gridY}
      <path d="${areaGas}" fill="url(#gradGasto)" stroke="none" />
      <path d="${areaIng}" fill="url(#gradIngreso)" stroke="none" />
      <path d="${lineaGas}" fill="none" stroke="#C4562E" stroke-width="2.5" stroke-linecap="round" />
      <path d="${lineaIng}" fill="none" stroke="#2F6F5E" stroke-width="2.5" stroke-linecap="round" />
      ${ejeX}
    </svg>
    <div class="grafico-leyenda">
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#2F6F5E"></span>${t("lblIngresos")} ${formatoMonto(accIng)}</span>
      <span class="grafico-leyenda-item"><span class="grafico-leyenda-swatch" style="background:#C4562E"></span>${t("lblGastos")} ${formatoMonto(accGas)}</span>
    </div>`;
}

function actualizarSubVistaAnalisis() {
  $("subVistaCategorias").hidden = subVistaAnalisis !== "categorias";
  $("subVistaEvolucion").hidden = subVistaAnalisis !== "evolucion";
  $("subVistaDiaADia").hidden = subVistaAnalisis !== "diaadia";
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
  const gasto = categorias.filter((c) => (c.tipo || "Gasto") === "Gasto");
  const ingreso = categorias.filter((c) => c.tipo === "Ingreso");
  $("listaCategoriasGasto").innerHTML = gasto.length
    ? gasto.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">Todavía no agregaste ninguna categoría de gasto.</div>`;
  $("listaCategoriasIngreso").innerHTML = ingreso.length
    ? ingreso.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">Todavía no agregaste ninguna categoría de ingreso.</div>`;
  enlazarAccionesEditables("categoria");
}

function filaEditable(item, tipo) {
  const esCategoria = tipo === "categoria";
  const tipoItem = item.tipo || "Gasto";
  const botonTipo = esCategoria
    ? `<button data-accion="cambiar-tipo" data-tipo="${tipo}" title="Cambiar a ${tipoItem === "Gasto" ? "Ingreso" : "Gasto"}">${tipoItem === "Gasto" ? "↔️ Pasar a Ingreso" : "↔️ Pasar a Gasto"}</button>`
    : "";
  return `
    <div class="editable-item" data-id="${item.id}">
      <span>${escapeHTML(item.nombre)}</span>
      <div class="editable-acciones">
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
    await crearCuenta(usuario.id, v);
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
  $("movCuenta").innerHTML = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("") || `<option value="">-- Agregá una cuenta en Config --</option>`;
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

function abrirModalNuevo() {
  if (!cuentas.length || !categorias.length) {
    return mostrarToast("Primero agregá al menos una cuenta y una categoría en Config.");
  }
  $("formMovimiento").reset();
  $("movId").value = "";
  $("modalTitulo").textContent = t("modalNuevoTitulo");
  $("btnBorrarMov").hidden = true;
  seleccionarTipo("Gasto");
  $("movFecha").value = hoyISO();
  $("movFechaPago").value = "";
  $("movCuotas").checked = false;
  $("movCuotaN").value = "6";
  $("movCuotaFecha").value = "";
  sincronizarDiferidoUI();
  renderSelects();
  ocultarAviso($("movError"));
  abrirVentanaMovimiento();
  fsVozPrepararNuevo();
}

function abrirModalEditar(id) {
  const m = movimientos.find((x) => x.id === id) || pendientes.find((x) => x.id === id);
  if (!m) return;
  seleccionarTipo(m.tipo);
  renderSelects();
  asegurarOpcionSelect("movCuenta", m.cuenta);
  asegurarOpcionSelect("movCategoria", m.categoria);
  $("movId").value = m.id;
  $("modalTitulo").textContent = t("modalEditarTitulo");
  $("btnBorrarMov").hidden = false;
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
}

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
  });
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
      $("movMonto").value = formatearImporteEscrito(String(val).replace(".", ","));
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
    const cuotas = [];
    for (let k = 0; k < n; k++) {
      const f = sumarMesesISO(primera, k);
      cuotas.push({
        tipo, fecha: f, cuenta, categoria, monto,
        detalle: (detalle ? detalle + " · " : "") + t("textoCuota") + " " + (k + 1) + "/" + n,
        estado: "pendiente", fecha_pago: f,
      });
    }
    try {
      await crearMovimientos(usuario.id, cuotas);
      cerrarModal();
      await cargarMesActual();
      mostrarToast(t("toastCuotas").replace("{n}", n));
    } catch (err) {
      mostrarAviso($("movError"), traducirErrorDatos(err));
    }
    return;
  }

  const datos = { tipo, fecha, cuenta, categoria, detalle, monto, estado, fecha_pago: fechaPago };

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
    mostrarToast("Todavía no tenés movimientos para exportar.");
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

$("btnExportarExcel").addEventListener("click", async () => {
  try {
    const todos = await movimientosParaExportar();
    if (!todos) return;
    const filas = todos.map((m) => {
      const montoConSigno = m.tipo === "Gasto" ? -Math.abs(m.monto) : Math.abs(m.monto);
      return `<tr>
        <td>${valorEscapadoExcel(formatoFecha(m.fecha))}</td>
        <td>${valorEscapadoExcel(m.tipo)}</td>
        <td>${valorEscapadoExcel(m.cuenta)}</td>
        <td>${valorEscapadoExcel(m.categoria)}</td>
        <td>${valorEscapadoExcel(m.detalle || "")}</td>
        <td style="mso-number-format:'0.00';">${montoConSigno}</td>
        <td>${valorEscapadoExcel(esPendiente(m) ? "Pendiente" : "Pagado")}</td>
        <td>${valorEscapadoExcel(m.fecha_pago ? formatoFecha(m.fecha_pago) : "")}</td>
      </tr>`;
    }).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>
      <table border="1"><thead><tr><th>Fecha</th><th>Tipo</th><th>Cuenta</th><th>Categoría</th><th>Detalle</th><th>Monto</th><th>Estado</th><th>Fecha de pago</th></tr></thead>
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
    const todos = await movimientosParaExportar();
    if (!todos) return;
    const encabezado = ["Fecha", "Tipo", "Cuenta", "Categoría", "Detalle", "Monto", "Estado", "Fecha de pago"].map(valorCSV).join(",");
    const filas = todos.map((m) => {
      const montoConSigno = m.tipo === "Gasto" ? -Math.abs(m.monto) : Math.abs(m.monto);
      return [formatoFecha(m.fecha), m.tipo, m.cuenta, m.categoria, m.detalle || "", montoConSigno, esPendiente(m) ? "Pendiente" : "Pagado", m.fecha_pago ? formatoFecha(m.fecha_pago) : ""].map(valorCSV).join(",");
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
// ELIMINAR CUENTA
// ============================================================
$("btnEliminarCuenta").addEventListener("click", async () => {
  const paso1 = confirm("Vas a ELIMINAR TU CUENTA por completo: tu usuario, tu clave y todos tus datos (movimientos, cuentas, categorías).\n\nEsta acción no se puede deshacer.\n\n¿Continuar?");
  if (!paso1) return;
  const paso2 = confirm("Última confirmación: tu cuenta se va a borrar ahora mismo y no vas a poder recuperarla.\n\n¿Eliminar mi cuenta para siempre?");
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
    if (u) await arrancarApp(u);
  }

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