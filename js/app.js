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
    lblResultadoMes: "Resultado del mes",
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
    tituloFijos: "Gastos fijos",
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
    fijosAyuda: "Cargá lo que pagás todos los meses. Cada mes, en el día elegido, te aparece en Pendientes para marcarlo como pagado.",
    fijosPorMes: "Fijos por mes",
    fijoPlaceholder: "Ej: Alquiler",
    fijoDia: "Día del mes",
    fijoDiaN: "Día {d}",
    fijoSinFijos: "Todavía no cargaste gastos fijos.",
    fijoToastAgregado: "Gasto fijo guardado.",
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
    ayudaCuotas: "El monto es el valor de cada cuota. Se crea una por mes y quedan como pendientes hasta que las marques como pagadas.",
    labelMontoCuota: "Valor de cada cuota",
    vistaCuotas: "{n} cuotas de {c} = {t} en total · primera {p}, última {u}",
    textoCuota: "Cuota",
    toastCuotas: "Se crearon {n} cuotas.",
    errCuotas: "Las cuotas tienen que ser entre 2 y 60.",
    errFechaPagoAnterior: "La fecha de pago no puede ser anterior a la fecha del movimiento.",
    pendTitulo: "⏳ Pendientes",
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
    lblResultadoMes: "Resultado do mês",
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
    tituloFijos: "Gastos fixos",
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
    fijosAyuda: "Registre o que você paga todo mês. Todo mês, no dia escolhido, aparece em Pendentes para marcar como pago.",
    fijosPorMes: "Fixos por mês",
    fijoPlaceholder: "Ex: Aluguel",
    fijoDia: "Dia do mês",
    fijoDiaN: "Dia {d}",
    fijoSinFijos: "Você ainda não registrou gastos fixos.",
    fijoToastAgregado: "Gasto fixo salvo.",
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
    ayudaCuotas: "O valor é o de cada parcela. Cria-se uma por mês e ficam pendentes até você marcá-las como pagas.",
    labelMontoCuota: "Valor de cada parcela",
    vistaCuotas: "{n} parcelas de {c} = {t} no total · primeira {p}, última {u}",
    textoCuota: "Parcela",
    toastCuotas: "{n} parcelas criadas.",
    errCuotas: "As parcelas devem ser entre 2 e 60.",
    errFechaPagoAnterior: "A data de pagamento não pode ser anterior à data do lançamento.",
    pendTitulo: "⏳ Pendentes",
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
    lblResultadoMes: "Month result",
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
    tituloFijos: "Fixed expenses",
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
    fijosAyuda: "Add what you pay every month. Each month, on the chosen day, it shows up in Pending so you can mark it as paid.",
    fijosPorMes: "Fixed per month",
    fijoPlaceholder: "E.g. Rent",
    fijoDia: "Day of the month",
    fijoDiaN: "Day {d}",
    fijoSinFijos: "You have not added fixed expenses yet.",
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
    ayudaCuotas: "The amount is the value of each installment. One is created per month and they stay pending until you mark them as paid.",
    labelMontoCuota: "Value of each installment",
    vistaCuotas: "{n} installments of {c} = {t} total · first {p}, last {u}",
    textoCuota: "Installment",
    toastCuotas: "{n} installments created.",
    errCuotas: "Installments must be between 2 and 60.",
    errFechaPagoAnterior: "The payment date can't be earlier than the entry date.",
    pendTitulo: "⏳ Pending",
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
  return Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

function mostrarToast(msg, ms) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.hidden = true; }, ms || 3000);
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
  $("btnReenviarConfirmacion").hidden = true;
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
  if (!email) return mostrarAviso($("loginError"), "Escribí tu email arriba primero.");
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
  generarFijosDelMes().catch(() => {});
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
  if (vistaActiva === "vistaSituacion") cargarTengo().then(tengoRefrescarVista);
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
  // En "Mi situación" no corresponde el selector de mes ni el resumen del mes.
  $("app").classList.toggle("modo-situacion", id === "vistaSituacion");
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
    if (!pendientes.length) {
      h += `<div class="sit-card sit-vacio-card">${escapeHTML(t("sitVacio"))}</div>`;
    } else {
      const venc = sitSuma(deudas.filter((m) => sitGrupo(m) === "venc"));
      const sem = sitSuma(deudas.filter((m) => sitGrupo(m) === "sem"));
      h += sitTarjeta("debo", "", t("sitDebo"), t("sitVerDetalle"), formatoMonto(sitSuma(deudas)),
        `${venc ? `<span class="sit-mal">${escapeHTML(t("sitVencido"))} ${escapeHTML(formatoMonto(venc))}</span> · ` : ""}${escapeHTML(t("sitProx7"))} ${escapeHTML(formatoMonto(sem))}`, "sit-mal");
      if (cobros.length) h += sitTarjeta("cobrar", "", t("sitMeDeben"), t("sitVerDetalle"), formatoMonto(sitSuma(cobros)), "", "sit-bien");
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
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitTotal"))}</span></div><div class="sit-grande">${escapeHTML(formatoMonto(sitSuma(deudas)))}</div></div>`;
    ["venc", "sem", "mas"].forEach((k) => {
      const l = deudas.filter((m) => sitGrupo(m) === k);
      h += sitTarjeta("grupo", k, sitNombreGrupo(k), t("sitVerN").replace("{n}", l.length), formatoMonto(sitSuma(l)), "", k === "venc" && l.length ? "sit-mal" : "");
    });
  } else if (s.v === "grupo") {
    const l = sitOrdenar(deudas.filter((m) => sitGrupo(m) === s.id));
    h = sitCabecera(sitNombreGrupo(s.id), `${inicio} › ${t("sitDebo")} › ${sitNombreGrupo(s.id)}`);
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitTotal"))}</span></div><div class="sit-grande">${escapeHTML(formatoMonto(sitSuma(l)))}</div></div>` + sitLista(l);
  } else if (s.v === "cobrar") {
    h = sitCabecera(t("sitMeDeben"), `${inicio} › ${t("sitMeDeben")}`);
    h += `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("sitTotal"))}</span></div><div class="sit-grande">${escapeHTML(formatoMonto(sitSuma(cobros)))}</div></div>` + sitLista(sitOrdenar(cobros));
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
  const partes = [];
  if (porPagar) partes.push(`${escapeHTML(t("pendPorPagar"))} <b>${escapeHTML(formatoMonto(porPagar))}</b>`);
  if (porCobrar) partes.push(`${escapeHTML(t("pendPorCobrar"))} <b>${escapeHTML(formatoMonto(porCobrar))}</b>`);

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

function renderResumen() {
  const { ing, gas } = calcularResumenLista(contablesDelMes(movimientos, claveMesVista()));
  $("valorBalance").textContent = formatoMonto(ing - gas);
  $("valorIngresos").textContent = formatoMonto(ing);
  $("valorGastos").textContent = formatoMonto(gas);
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
  }).join("");

  ajustarAnchoCategorias();
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
  const s = Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (moneda === monedaBase() ? "" : moneda + " ") + (moneda === monedaBase() ? formatoMonto(n) : s);
}

function tengoHTML() {
  if (!tengoCalculo) return `<div class="sit-vacio">…</div>`;
  const { filas, total, sinCotiz } = tengoCalculo;
  let h = `<div class="sit-card sit-resumen"><div class="sit-etq"><span>${escapeHTML(t("tengoTotal"))}</span></div><div class="sit-grande ${total < 0 ? "sit-mal" : "sit-bien"}">${escapeHTML(formatoMonto(total))}</div></div>`;
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

async function tengoAjustar(id) {
  const f = tengoCalculo?.filas.find((x) => x.id === id);
  const c = cuentas.find((x) => x.id === id);
  if (!f || !c) return;
  const r = prompt(t("tengoAjustarPide").replace("{c}", f.cuenta), String(f.saldo).replace(".", ","));
  if (r === null) return;
  const nuevo = numeroDesdeTexto(r);
  if (!Number.isFinite(nuevo)) return;
  try {
    await actualizarSaldoInicial(id, Math.round(((Number(c.saldo_inicial) || 0) + (nuevo - f.saldo)) * 100) / 100);
    await cargarCuentasYCategorias();
    await cargarTengo();
    tengoRefrescarVista();
  } catch (err) { mostrarToast(traducirErrorDatos(err)); }
}

function abrirTransferencia() {
  if (cuentas.length < 2) return mostrarToast(t("tengoNecesitaDos"));
  const op = cuentas.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}${c.moneda && c.moneda !== monedaBase() ? " (" + escapeHTML(c.moneda) + ")" : ""}</option>`).join("");
  $("trDesde").innerHTML = op; $("trHacia").innerHTML = op;
  $("trHacia").selectedIndex = 1;
  $("trMonto").value = ""; $("trMontoDestino").value = "";
  $("trFecha").value = hoyISO();
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
    cerrarTransferencia();
    await cargarTengo();
    tengoRefrescarVista();
    mostrarToast(t("trToast"));
  } catch (err) { mostrarAviso($("trError"), traducirErrorDatos(err)); }
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
  const total = fijos.filter((f) => f.activo !== false).reduce((s, f) => s + Number(f.monto), 0);
  $("fijosTotal").textContent = formatoMonto(total);
  lista.innerHTML = fijos.length
    ? fijos.map((f) => `<div class="editable-item"><div class="fijo-info"><b>${escapeHTML(f.detalle)}</b>
        <small>${escapeHTML(t("fijoDiaN").replace("{d}", f.dia))} · ${escapeHTML(f.cuenta)} · ${escapeHTML(f.categoria)}</small></div>
        <span class="fijo-monto">${escapeHTML(formatoMonto(Number(f.monto)))}</span>
        <button type="button" class="icono-btn" data-borrar-fijo="${f.id}" aria-label="${escapeHTML(t("fijoBorrar"))}">🗑️</button></div>`).join("")
    : `<div class="vacio">${escapeHTML(t("fijoSinFijos"))}</div>`;
  const cu = cuentas.filter((c) => (c.moneda || base) === base);
  $("fijoCuenta").innerHTML = cu.map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
  $("fijoCategoria").innerHTML = categorias.filter((c) => c.tipo === "Gasto")
    .map((c) => `<option value="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join("");
  $("fijoNotaMoneda").textContent = cuentas.length > cu.length ? t("fijoNotaMoneda").replace("{m}", base) : "";
}

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
    await crearFijo(usuario.id, { tipo: "Gasto", detalle, cuenta, categoria, monto, dia, activo: true, ultimo_mes });
    $("fijoDetalle").value = ""; $("fijoMonto").value = ""; $("fijoDia").value = "";
    await cargarFijos();
    renderFijos();
    mostrarToast(t("fijoToastAgregado"));
    await generarFijosDelMes();
  } catch (err) { mostrarAviso($("fijoError"), traducirErrorDatos(err)); }
});

$("listaFijos").addEventListener("click", async (e) => {
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
    : `<div class="vacio">Todavía no agregaste ninguna cuenta.</div>`;
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
    : `<div class="vacio">Todavía no agregaste ninguna categoría de gasto.</div>`;
  $("listaCategoriasIngreso").innerHTML = ingreso.length
    ? ingreso.map((c) => filaEditable(c, "categoria")).join("")
    : `<div class="vacio">Todavía no agregaste ninguna categoría de ingreso.</div>`;
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
$("tarjetaGuia").addEventListener("click", abrirGuia);
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
  fotoReset(null);
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
  $("movCotizacion").value = "";
  actualizarFilaCotizacion();
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
  fotoReset(m.comprobante || null);
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
  vista.textContent = t("vistaCuotas")
    .replace("{n}", n)
    .replace("{c}", formatoMonto(monto))
    .replace("{t}", formatoMonto(Math.round(monto * n * 100) / 100))
    .replace("{p}", formatoFecha(primera))
    .replace("{u}", formatoFecha(sumarMesesISO(primera, n - 1)));
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
  document.body.classList.remove("voz-abierta");
}

function fsVozPrepararNuevo() {
  const b = $("btnCargarVoz");
  if (!b) return;
  b.hidden = false;
  b.onclick = fsVozAbrir;
  $("vozCerrar").onclick = fsVozCerrar;
  $("vozMic").onclick = fsVoiceEscuchar;
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
  fsVoiceRec.lang = "es-AR";
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
      const esc = cand.find((x) => /\bmil\b|\bmill[oó]n(?:es)?\b/i.test(x) && !!fsVoiceMonto(x));
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
// movCotizacion se interpreta igual que un monto.
function fsVoiceIdInterno(id) { return id === "movCotizacion" ? "movMonto" : id; }

function fsVozNum(w) { w = String(w || "").trim(); return /^\d+$/.test(w) ? parseInt(w, 10) : fsVoiceNumeroPalabras(w); }
function fsVozFecha(txt) {
  const q = fsVoiceNorm(txt), base = new Date();
  base.setHours(12, 0, 0, 0);
  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const add = (n) => { const d = new Date(base); d.setDate(d.getDate() + n); return iso(d); };
  if (/\bpasado manana\b/.test(q)) return add(2);
  if (/\bmanana\b/.test(q)) return add(1);
  if (/\bhoy\b/.test(q)) return add(0);
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
    if (/\bno\b/.test(q)) return "no";
    if (/\b(si|dale|claro|ok|afirmativo|obvio)\b/.test(q)) return "si";
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
  if (/\b(gasto|gastos|gaste|gaste|pague|pago|pagar|compre|compra|compre|sali[oó]|salida|egreso|debito|d[eé]bito|debitaron)\b/.test(t)) return "Gasto";
  if (/\b(ingreso|ingresos|cobre|cobro|cobrar|recibi|recibo|entro|entrada|deposito|dep[oó]sito|acredito|acreditaron|sueldo|cobranza)\b/.test(t)) return "Ingreso";
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
  txt = fsVoiceNorm(txt).replace(/\by\b/g, " ").replace(/\s+/g, " ").trim();
  const u = { cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,
    diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18,diecinueve:19,
    veinte:20,veintiuno:21,veintidos:22,veintitres:23,veinticuatro:24,veinticinco:25,veintiseis:26,veintisiete:27,veintiocho:28,veintinueve:29,
    treinta:30,cuarenta:40,cincuenta:50,sesenta:60,setenta:70,ochenta:80,noventa:90,
    cien:100,ciento:100,doscientos:200,trescientos:300,cuatrocientos:400,quinientos:500,seiscientos:600,setecientos:700,ochocientos:800,novecientos:900 };
  let total = 0, actual = 0, vio = false;
  for (const w of txt.split(" ")) {
    if (w in u) { actual += u[w]; vio = true; continue; }
    if (/^\d+$/.test(w)) { actual += parseInt(w, 10); vio = true; continue; } // "15 mil", "5 mil 500"
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


$("btnBorrarMov").addEventListener("click", async () => {
  const id = $("movId").value;
  if (!id) return;
  if (!confirm("¿Borrar este movimiento? No se puede deshacer.")) return;
  const mBorrar = movimientos.find((x) => x.id === id) || pendientes.find((x) => x.id === id);
  try {
    await borrarMovimiento(id);
    if (mBorrar && mBorrar.comprobante) borrarComprobante(mBorrar.comprobante);
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
    const cuotas = [];
    for (let k = 0; k < n; k++) {
      const f = sumarMesesISO(primera, k);
      cuotas.push({
        tipo, fecha: f, cuenta, categoria, monto, moneda: monedaMov, cotizacion,
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
