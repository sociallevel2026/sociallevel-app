// service-worker.js — cachea el "cascarón" de la app (el HTML, íconos)
// para que abra rápido y no se rompa por completo sin internet.
// Los datos reales (mensajes, evaluación) siempre requieren conexión al
// backend — esto solo evita una pantalla en blanco si la red falla.
const CACHE_NAME = "sociallevel-shell-v2";
const APP_SHELL = [
  "./",
  "./index.html",
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

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});
