importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('pwa-media').then(function(cache) {
     return cache.addAll([
       '/',
       'public/index.html',
       'public/myapp.js',
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   })