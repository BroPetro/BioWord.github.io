const CACHE_NAME = 'bioworld-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-for-app.png',
  '/123.html',
  '/Forum.html',
  '/Info.txt',
  '/InfoCrator.html',
  '/InfoUpdate.html',
  '/Nots.html',
  '/Profil.html',
  '/QUZ.html',
  '/Quz.html',
  '/Test.html',
  '/prizes.html',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
