const CACHE_NAME = 'bioworld-v1.0.2-F'; // 🔥 змінюй цю версію при оновленнях
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-for-app.png',
  '123.html',
  'Forum.html',
  'Info.txt',
  'InfoCrator.html',
  'InfoUpdate.html',
  'Nots.html',
  'Profil.html',
  'QUZ.html',
  'Quz.html',
  'Test.html',
  'prizes.html',
  'offline.html',
  'Assets/assets1.jpg',
  'Assets',
  'Lesson',
  'Quz',
  // ➕ додай решту файлів
];

self.addEventListener('install', event => {
  self.skipWaiting(); // 🚨 одразу активує SW
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name); // 🔥 Видаляємо старі версії
          }
        })
      );
    }).then(() => self.clients.claim())
  );
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
