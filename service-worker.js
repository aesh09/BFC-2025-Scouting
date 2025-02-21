self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('ftc-scouting-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/history.html',
                '/index-styles.css',
                '/history-styles.css',
                '/app.js',
                '/history.js',
                '/manifest.json',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
