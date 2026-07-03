const CACHE_NAME = "mtg-buddy-v1";
const ASSETS = ["/", "/index.html", "/manifest.webmanifest", "/icons/icon-192.svg", "/icons/icon-512.svg", "/backgrounds/forest-custom.svg", "/backgrounds/island-custom.svg", "/backgrounds/swamp-custom.svg", "/backgrounds/mountain-custom.svg", "/backgrounds/plains-custom.svg", "/backgrounds/colorless.svg", "/backgrounds/arcane.svg", "/backgrounds/dark-marble.svg", "/backgrounds/wood-table.svg"];

self.addEventListener("install", (event) => { event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", (event) => { event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))); self.clients.claim(); });
self.addEventListener("fetch", (event) => { if (event.request.method !== "GET") return; event.respondWith(caches.match(event.request).then((cached) => cached ?? fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response; }).catch(() => caches.match("/index.html")))); });
