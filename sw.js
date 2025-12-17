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
        cache.addAll(urlsToCache).catch(err => console.error('Precache failed:', err)),
        self.skipWaiting() // Activate immediately
      ]))
      .catch(err => console.error('Cache install failed:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => cacheName !== CACHE_NAME ? caches.delete(cacheName) : null)
    )).then(() => self.clients.claim()) // Take control of all pages
  );
});

self.addEventListener('fetch', event => {
  // Skip caching for invalid schemes (e.g., chrome-extension from browser extensions)
  if (event.request.url.startsWith('chrome-extension://') || event.request.url.startsWith('moz-extension://')) {
    return fetch(event.request);
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(networkResponse => {
          // Cache only successful responses for static assets (avoid caching API errors)
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache).catch(err => console.error('Cache put failed:', err));
            });
          }
          return networkResponse;
        }).catch(() => {
          // Fallback to cached home for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
          // For API calls, return offline message with JSON-like structure to avoid parse errors in frontend
          return new Response(JSON.stringify({ error: 'Offline - Please check connection' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        });
      })
  );
});
