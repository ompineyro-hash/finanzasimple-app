# Ingasto — guía para trabajar en este repositorio

Este archivo lo lee Claude al empezar cada sesión. Si lo cambiás, que quede claro y corto.

## Qué es
Ingasto (ingasto.com) es una app web instalable (PWA) de finanzas personales: movimientos, cuentas, categorías, pendientes ("Situación"), análisis y carga por voz. Cuesta $4.000 ARS por mes (Mercado Pago) y tiene 15 días de prueba. Edu lidera la app y toma las decisiones. Marcelo es el dueño de las cuentas (a su nombre), participa y puede ver y opinar cuando quiera.

## Cómo está armada
- Sitio estático: HTML, CSS y JavaScript sin framework. Se publica con GitHub Pages desde la rama `main` (dominio en `CNAME`).
- Base de datos, usuarios y funciones: Supabase (Postgres con RLS, Auth, Edge Functions). Plan gratuito.
- Archivos que SÍ se usan: `index.html`, `css/styles.css`, `css/pendientes.css`, `js/supabaseClient.js`, `js/auth.js`, `js/data.js`, `js/app.js`, `js/importar.js`, `sw.js`, `manifest.json`. Páginas aparte: `antesala.html` (entrada/login), `panel.html`, `terminos.html`, `privacidad.html`.
- OJO: en la raíz hay un `app.js` y un `styles.css` viejos que NO se usan. Editar esos no cambia nada. Los correctos están en `js/` y `css/`.
- Textos en tres idiomas (es, pt, en): objeto `TRADUCCIONES` en `js/app.js`, usando `t("clave")`. Todo texto nuevo va en los tres.
- Edge Function en el repo: `supabase/functions/verificar-pago`. El `mp-webhook` (activa planes al recibir el aviso de Mercado Pago) todavía NO está en el repo; hay que copiarlo.

## Datos importantes
- Tablas principales: `movimientos`, `cuentas`, `categorias`, `monedas`, `profiles`.
- Monedas: cada movimiento se guarda en la moneda de su cuenta, con la cotización del día (`cotizacion` = cuántas unidades de la moneda base vale 1 de la moneda extranjera). Los totales usan `montoBase(m)`. La moneda base está en `profiles.moneda_base`.
- Pagos pendientes: `estado` pendiente/pagado y `fecha_pago`. Cuotas = un movimiento pendiente por mes.

## Cómo se publica (importante)
1. Probar antes: abrir la página en local y revisar en pantalla de celular.
2. Subir el número de versión en `sw.js` (`CACHE_NAME = "finanzasimple-vNN"`) en CADA cambio de la app. Si no, los celulares siguen viendo la versión vieja.
3. Commit con un mensaje claro de qué cambió y por qué, y push a `main`.
4. GitHub Pages tarda 1–2 minutos. Para ver lo nuevo hay que cerrar la app del todo y abrirla otra vez (a veces dos veces).

## Reglas de trabajo (las definió Marcelo, y Edu puede ajustarlas)
- Un paso por vez. Explicar en español, simple, nombrando las pestañas y pantallas por su nombre.
- Investigar a fondo, contrastar con fuentes confiables, no inventar. Si no se sabe algo, decirlo.
- Cuestionar y marcar riesgos; no adular ni dar la razón sin más.
- No publicar ningún cambio de la app sin un "sí" explícito de Edu (quien lidera). Mostrar capturas antes. Marcelo no tiene que aprobar cada cambio.
- Cambios de precio, plan, textos legales o titularidad de cuentas: avisarle a Marcelo, que sigue siendo el dueño.
- NUNCA pedir ni aceptar contraseñas, claves, tokens o códigos por el chat. Cada uno entra con su propia cuenta.
- En el DNS de Namecheap no borrar ni cambiar registros; no tocar "Change Ownership" ni "Transfer Out".

## Para no pisarse entre dos personas
1. Publica una sola persona a la vez. Avisar antes de empezar.
2. Antes de trabajar: traer lo último (`git pull`).
3. Cada commit con una nota clara de qué cambió; no mezclar temas.

## Estado (nov 2026)
Hecho y publicado: movimientos, cuentas, categorías (con ícono por nombre), pendientes/Situación, "Tengo" (saldos + Ajustar), transferencias entre cuentas, gastos e ingresos fijos, presupuesto, análisis, voz, foto de comprobante, importar Excel/CSV (incluye Mercado Pago, solo moneda base), clasificar varios, cotización sugerida del dólar (Banco Nación, venta), bienvenida de 5 pantallas, textos legales (Privacidad y Términos).
- Cobro: Mercado Pago, suscripción mensual. Probado con renovación automática real (el panel muestra "Pago activo hasta…"). El usuario no debe avisar que pagó.
- Contacto de soporte: solo ingastosoporte@gmail.com. NO poner WhatsApp personal de nadie en la app (el WhatsApp de ayuda queda para cuando haya un número propio).
- Botón de Baja y Botón de Arrepentimiento (Disp. 954/2025): página `solicitud.html` (sin login), links en antesala (arriba y pie), pantalla de entrada, prueba vencida y tarjetas en Ajustes. Los pedidos se guardan en la tabla `solicitudes` (solo se pueden cargar, no leer desde la app; se ven en Supabase → Table Editor). SQL en `supabase/sql/solicitudes.sql`. Hay que atender cada pedido dentro de las 24 hs: cancelar la suscripción en Mercado Pago, devolver la plata si es arrepentimiento, y responder por mail con el código. Arrepentimiento: una sola vez, 10 días corridos desde el primer pago. Baja: sin devolución, sigue usando hasta fin del mes pago.
- Aviso por mail de cada pedido: Database Webhook `aviso_solicitud` (INSERT en `solicitudes`) → Edge Function `aviso-solicitud` → Resend (cuenta de ingastosoporte@gmail.com, plan gratis, solo puede mandar a esa dirección) → mail a ingastosoporte@gmail.com. Secreto `RESEND_API_KEY` en Supabase. Probado y funcionando (13/11/2026).
- OJO: en este proyecto las tablas nuevas NO reciben permisos solas: hay que hacer `grant` para anon/authenticated/service_role.
- OJO: "Eliminar mi cuenta" NO cancela la suscripción en Mercado Pago (aclarado en Términos).
- `panel.html`: panel del dueño (usuarios, estado de plan). Solo cantidades y fechas, nunca el contenido de los movimientos.
- Videos tutoriales: 5 videos en es/pt/en en un artifact "Videos de Ingasto" de Claude (compartido con Edu). Faltan: primeros pasos, voz, Tengo, transferir, fijos, Situación, importar, clasificar varios.
- Seguridad: Supabase y GitHub con verificación en dos pasos (Marcelo hecho; Edu pendiente). No prometer en la app que "nadie puede ver los datos": se guardan en Supabase y quien administra podría verlos.

## Seguridad (auditoría 17/11/2026)
- Revisado en Supabase: las 9 tablas tienen RLS y reglas `auth.uid() = user_id` (o `= id`); escrituras exigen `trial_vigente()`. `solicitudes` solo permite cargar.
- Arreglado: en `profiles` los usuarios podían editar `plan_activo`/`plan_vence`. Ahora solo `moneda`, `idioma`, `moneda_base` (SQL en `supabase/sql/profiles-permisos.sql`). Si se agrega una columna editable por el usuario a `profiles`, hay que darle `grant update (columna)`.
- Usuarios "Waiting for verification" (ej. amy_drees@rezult.org, defne_vandervelden12@bocah.team): registros sin confirmar mail, no pudieron entrar. Parecen bots. Se ven en Supabase → Authentication → Users.
- Rate limits de Auth revisados: se dejaron como están (muchos usuarios comparten IP de celular; bajarlos puede bloquear gente real). Mails: 30/h.
- **ANTES DE HACER PUBLICIDAD (pendiente de Edu):** (1) captcha en el registro (Supabase → Authentication → Attack Protection + cambio en la pantalla de registro de la app); (2) revisar reglas de Storage (fotos de comprobantes: que cada usuario vea solo las suyas y nadie anónimo suba); (3) pensar un freno para pedidos falsos en `solicitud.html` (no pide login); (4) borrar a mano las cuentas falsas sin confirmar.

## Pendientes (orden sugerido, unificado 14/11/2026)
Regla de diseño para todo: el público es mayormente de 55-60 años o más → letra grande (mínimo 16px en textos importantes), siempre palabra además del ícono, buen contraste (también en modo oscuro), botones grandes. Mantener la bandera 🇦🇷 en el selector de idioma.

A. Para salir al mercado (lo más urgente)
1. Probar el primer pago de alguien que nunca pagó (la renovación ya anda).
2. Delegación de Gmail de ingastosoporte: concedida a ompineyro@gmail.com (aceptada) y a edusosa84@gmail.com (15/11, falta que Edu acepte el mail). Se usa desde la compu. Falta decidir el acceso de Edu a Mercado Pago para atender bajas y devoluciones.
3. (Hecho 15/11) Filas de prueba borradas de `solicitudes`.
4. Nombre/razón social y CUIT en Términos y Privacidad (consultar contador); revisión de un abogado (incluye si el arrepentimiento aplica a renovaciones).
5. Edu: verificación en dos pasos en Supabase y GitHub; copiar `mp-webhook` al repo (sin claves).

B. Mejoras visuales (vienen del rediseño de Edu, aplicando la regla de diseño)
6. Retoques rápidos en Movimientos: resultado del mes grande con barrita "Gastaste el X%", movimientos agrupados por día (Hoy / Ayer / fecha), montos sin ",00", mejor contraste de "Gastos". Mantener la palabra "Buscar".
7. Modo oscuro: automático según el celular + opción Claro/Oscuro/Automático en Ajustes. Pasar los ~70 colores sueltos de css a variables.
8. Cambio Gasto/Ingreso más claro (dos botones grandes de colores distintos), le costó a Marcelo.
9. Carga rápida: monto primero, cuenta y fecha ya elegidas, categorías más usadas como botones.
10. Íconos de la barra inferior: si se cambian, gruesos y con nombre legible.

C. Más adelante
11. Movimientos con fecha de pago futura (tarjeta que se paga el mes siguiente).
12. Grupo familiar; aviso automático al dueño cuando entra un pago; videos que faltan; WhatsApp con número propio.
13. Verificación en dos pasos para usuarios; cifrado de datos con clave del usuario.
14. Ideas que cuestan plata o mucho trabajo: leer tickets automáticamente (OCR), bloqueo con huella, avisos tipo "gastás 18% más que el mes pasado".
No: conexión con bancos.
## Rediseño (publicado 15/11/2026, sw.js v74)
- El rediseño de Edu ya está en la app normal (`css/tema.css` nuevo; la carpeta `prueba/` se borró). Incluye modo oscuro (Ajustes → Modo oscuro), Movimientos nuevo, carga rápida con teclado propio (teclado y Guardar fijos abajo), Compras en cuotas, gráficos animados.
- Los videos tutoriales grabados antes del rediseño muestran la pantalla vieja de Nuevo movimiento: rehacer los que la muestran.
- Escanear QR de factura (publicado 16/11, sw.js v79): en Agregar → Gasto, botón "Escanear QR". Lector nativo del navegador (BarcodeDetector) y jsQR de respaldo (se baja de jsdelivr al usarlo, no probado en iPhone). Botón "Sacar foto del QR" (el que mejor anda en Android; la cámara en vivo a veces no lee). Lee importe, fecha y número de factura del QR de ARCA/AFIP (`?p=` en base64; ojo con el "+": no usar URLSearchParams). Si no hay QR, carga manual. Avisa si la factura ya está cargada. La línea de cámara/QR en Privacidad ya está publicada (16/11).
- Otros cambios 16/11: cuenta elegible con botones en Nuevo movimiento, cuotas con el total de la compra (la app divide, la última ajusta centavos), Compras en cuotas sigue el mes, avisos (toast) arriba, resumen de Movimientos que se esconde al bajar (celular), un solo guardado a la vez.
- Faltan (funciones nuevas, decidir con Edu): primer inicio en 3 pasos, leer el texto del ticket cuando no hay QR (OCR, falla con papel térmico).
