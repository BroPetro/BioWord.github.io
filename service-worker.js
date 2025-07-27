const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.png'
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Кешування файлів...');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('❌ Неможливо завантажити. Немає інтернету.'))
  );
});
