const CACHE_NAME = 'offline-BIOWORLD-V1.1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon-for-app.png'
  '123.html'
  'Forum.html'
  'Info.txt'
  'InfoCrator.html'
  'InfoUpdate.html'
  'Nots.html'
  'Profil.html'
  'QUZ.html'
  'Quz.html'
  'Test.html'
  'prizes.html'
  
];

// Кешування файлів
self.addEventListener('install', event => {
  console.log('📦 Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // одразу активуємо новий SW
});

// Видалення старих кешів
self.addEventListener('activate', event => {
  console.log('🔁 Activating new service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('🗑️ Видаляємо старий кеш:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // одразу бере керування
});

// Відповідь на запити
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Повертаємо з кешу або качаємо з інтернету
        return response || fetch(event.request);
      })
  );
});
