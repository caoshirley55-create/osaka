const version = 'kansai-handbook-v3';
const shell = [
  './index.html','./style.css','./app.js','./trip.js','./ledger.js','./manifest.webmanifest',
  './assets/icon.svg','./assets/icon.png','./assets/umeda-reference.webp','./assets/lucua-reference.webp'
];
const urls = new Set(shell.map(path => new URL(path,self.registration.scope).href));
self.addEventListener('install',event => {
  event.waitUntil(caches.open(version).then(cache => cache.addAll(shell)).then(() => self.skipWaiting()));
});
self.addEventListener('activate',event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key =>
    key.startsWith('kansai-handbook-') && key !== version
  ).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch',event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate' && new URL(event.request.url).origin === location.origin) {
    event.respondWith(fetch(event.request).catch(() => caches.match(new URL('./index.html',self.registration.scope).href)));
  } else if (urls.has(event.request.url)) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }
});
