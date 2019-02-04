importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('pwa-media').then(function(cache) {
     return cache.addAll([
       'public/index.html',
       'public/myapp.js',
       'public/images/startrek.jpg',
       'public/images/sintel.jpg',
       'public/images/tears-of-steel.jpg',
       'public/images/helio-centrism.jpg',
       'public/images/bg1.jpg',
       'public/images/bga.jpg',
       'public/javascripts/shaka-player.compiled.js',
       'public/shaka-player.ui.js',
       'public/stylesheets/style.css',
       'public/controls.css',
       'app.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   })