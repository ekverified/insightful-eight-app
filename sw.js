const CACHE_NAME = 'i8-portal-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // Externals (CDNs) cached on first fetch; no precache to avoid bloat
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all([
        cache.addAll(urlsToCache),
        self.skipWaiting()  // Activate immediately
      ]))
      .catch(err => console.error('Cache install failed:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => cacheName !== CACHE_NAME ? caches.delete(cacheName) : null)
    )).then(() => self.clients.claim())  // Take control of all pages
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
          // Fallback to cached home for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
          return new Response('Offline - Please check connection', { status: 503 });
        });
      })
  );
});
