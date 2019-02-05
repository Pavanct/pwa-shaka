var CACHE_NAME = 'pwa-media';
var urlsToCache = [
  '/index.html',
  '/myapp.js',
  '/images/startrek.jpg',
  '/images/sintel.jpg',
  '/images/tears-of-steel.jpg',
  '/images/helio-centrism.jpg',
  '/images/bg1.jpg',
  '/shaka-player.ui.js',
  '/stylesheets/style.css',
  '/controls.css',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});