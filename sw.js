// Service worker mínimo: permite que la app sea instalable.
// Los datos siempre se piden a Supabase (no se cachean), así el usuario
// nunca ve información vieja. Solo se guarda en caché el "esqueleto" visual.
const CACHE_NAME = "finanzasimple-v1";
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

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
