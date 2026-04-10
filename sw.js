const CACHE_NAME = ‘rescuepro-v6’;
const ASSETS = [
‘./index.html’,
‘./manifest.json’,
‘./IMG_4138.png’,
‘https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap’
];

// Installazione: pre-carica tutti gli asset
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting();
});

// Attivazione: rimuove vecchie cache
self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

// Fetch: prima la cache, poi la rete (offline-first)
self.addEventListener(‘fetch’, event => {
event.respondWith(
caches.match(event.request).then(cached => {
return cached || fetch(event.request).catch(() => caches.match(’./index.html’));
})
);
});
