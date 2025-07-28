const CACHE_NAME = 'offline-BIOWORLD-V1.1';
const urlsToCache = [
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
  'offline.html'
];

// Кешування файлів під час встановлення
self.addEventListener('install', event => {
  console.log('📦 Встановлюємо Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Кешуємо файли...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // оновлюємо одразу
  );
});

// Очищення старих кешів
self.addEventListener('activate', event => {
  console.log('🧹 Активуємо Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('🗑️ Видаляємо старий кеш:', name);
            return caches.delete(name);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Обробка запитів
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response; // з інтернету
      })
      .catch(() => {
        return caches.match(event.request)
          .then(cached => cached || caches.match('offline.html')); // офлайн
      })
  );
});

// Повідомлення від клієнта
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting(); // миттєво активувати нову версію
  }
});
