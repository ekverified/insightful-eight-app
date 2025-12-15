const CACHE_NAME = 'i8-portal-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Externals fetched live
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Cache install failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).catch(() => caches.match('/')) ) // Enhancement: Fallback to home on fetch fail
  );
});
