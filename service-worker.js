// service-worker.js — cachea el "cascarón" de la app (íconos, manifest)
// para que abra rápido y no se rompa por completo sin internet.
// Los datos reales (mensajes, evaluación) siempre requieren conexión al
// backend — esto solo evita una pantalla en blanco si la red falla.
//
// IMPORTANTE: el HTML usa estrategia "red primero, caché como respaldo".
// Antes usaba "caché primero", lo cual causaba que actualizaciones nuevas
// del index.html NUNCA se vieran reflejadas para quien ya había visitado
// la app — quedaba atascado viendo la versión vieja para siempre.
const CACHE_NAME = "sociallevel-shell-v3"; // <-- subir este número fuerza que se limpie el caché viejo
const APP_SHELL = [
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Nunca cachea llamadas a la API — siempre deben ir a la red real.
  if (event.request.url.indexOf("/api/") > -1) return;

  var isHTML = event.request.mode === "navigate" ||
    (event.request.headers.get("accept") || "").indexOf("text/html") > -1;

  if (isHTML) {
    // RED PRIMERO: intenta traer la versión más nueva siempre que haya
    // internet. Solo usa la copia guardada si de verdad no hay conexión.
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          var copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Íconos, manifest, etc.: caché primero está bien, casi nunca cambian.
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
