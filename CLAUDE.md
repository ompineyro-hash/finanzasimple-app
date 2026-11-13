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

## Pendientes (orden sugerido)
1. Edu: activar verificación en dos pasos en Supabase y GitHub; copiar `mp-webhook` al repo (sin claves).
2. Probar el primer pago de alguien que nunca pagó (la renovación ya anda).
3. Revisión de un abogado de Privacidad y Términos.
4. Verificación en dos pasos opcional para usuarios (en Ajustes).
5. Cifrado de datos con clave del usuario (estudiar, p. ej. CipherStash con Supabase).
6. Grupo familiar (invitar a otra persona, dividir movimientos): para más adelante.
7. Aviso automático al dueño cuando entra un pago (en `mp-webhook`).
8. Videos que faltan, WhatsApp de ayuda con número propio, modo oscuro.
No: conexión con bancos.
