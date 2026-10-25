# Ingasto — guía para trabajar en este repositorio

Este archivo lo lee Claude al empezar cada sesión. Si lo cambiás, que quede claro y corto.

## Qué es
Ingasto (ingasto.com) es una app web instalable (PWA) de finanzas personales: movimientos, cuentas, categorías, pendientes ("Situación"), análisis y carga por voz. Cuesta $4.000 ARS por mes (Mercado Pago) y tiene 15 días de prueba. Edu lidera la app y toma las decisiones. Marcelo es el dueño de las cuentas (a su nombre), participa y puede ver y opinar cuando quiera.

## Cómo está armada
- Sitio estático: HTML, CSS y JavaScript sin framework. Se publica con GitHub Pages desde la rama `main` (dominio en `CNAME`).
- Base de datos, usuarios y funciones: Supabase (Postgres con RLS, Auth, Edge Functions). Plan gratuito.
- Archivos que SÍ se usan: `index.html`, `css/styles.css`, `css/pendientes.css`, `js/supabaseClient.js`, `js/auth.js`, `js/data.js`, `js/app.js`, `sw.js`, `manifest.json`. Páginas aparte: `antesala.html` (entrada/login), `panel.html`, `terminos.html`, `privacidad.html`.
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

## Pendientes ya acordados (orden)
Cotización sugerida del dólar (fuente: Banco Nación, precio de venta; mientras tanto se escribe a mano) → gastos fijos/recurrentes → "Tengo" (saldo por cuenta; requiere transferencia entre cuentas) → presupuesto simple → importar Excel/CSV. No: conexión con bancos.
