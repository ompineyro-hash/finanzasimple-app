// Service worker mínimo: permite que la app sea instalable.
// Los datos siempre se piden a Supabase (no se cachean), así el usuario
// nunca ve información vieja. El "esqueleto" visual se guarda en caché
// solo como respaldo para cuando no hay internet, pero SIEMPRE se intenta
// primero traer la versión más nueva del servidor.
const CACHE_NAME = "finanzasimple-v9";
const ARCHIVOS_ESQUELETO = [
  "./index.html",
  "./css/styles.css",
  "./js/supabaseClient.js",
  "./js/auth.js",
  "./js/data.js",
  "./js/app.js",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_ESQUELETO))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(nombres.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Nunca cachear llamadas a Supabase: siempre datos frescos.
  if (url.hostname.includes("supabase.co")) return;

  // "Network first": siempre intenta traer la versión más nueva del
  // servidor. Solo usa la copia guardada si no hay internet.
  // Solo se intervienen pedidos GET; el resto sigue su camino normal.
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((respuesta) => {
        // Solo se guarda lo que salio bien (no errores ni redirecciones).
        if (respuesta.ok && respuesta.type === "basic") {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia)).catch(() => {});
        }
        return respuesta;
      })
      .catch(async () => {
        // Sin red: copia guardada (ignorando los parametros de la direccion,
        // como ?preapproval_id=... que agrega Mercado Pago al volver).
        const guardada = await caches.match(event.request, { ignoreSearch: true });
        if (guardada) return guardada;
        // Si es una pagina y no esta guardada, se muestra la app.
        if (event.request.mode === "navigate") {
          const app = await caches.match("./index.html");
          if (app) return app;
        }
        return Response.error();
      })
  );
});
