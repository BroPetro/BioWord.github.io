const CACHE_NAME = 'bioworld-v1.0.2';
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
  'Assets/', // додаємо саму папку
  'Lesson/', // додаємо папку Lesson
  'Quz/' // додаємо папку Quz
];

// Ти додав файли, але щоб додати вміст папок, ти повинен вручну вказати їхні файли
// Наприклад, якщо в папці Assets є файли assets1.jpg, assets2.jpg, то додаєш їх тут:

const assetsToCache = [
  'Assets/assets1.jpg',
  'Assets/assets2.jpg',
  'Assets/style.css',
  // додай тут усі файли з папки Assets
];

const lessonToCache = [
  'Lesson/lesson1.html',
  'Lesson/lesson2.html',
  'Lesson/style.css',
  // додай всі файли з папки Lesson
];

const quzToCache = [
  'Quz/quiz1.html',
  'Quz/quiz2.html',
  'Quz/style.css',
  // додай всі файли з папки Quz
];

// Об'єднуємо всі файли для кешування
const allUrlsToCache = urlsToCache.concat(assetsToCache, lessonToCache, quzToCache);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(allUrlsToCache);
    })
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

