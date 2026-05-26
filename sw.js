const CACHE = 'dc-health-ahu-v3';
const ASSETS = ['./', './index.html', './manifest-ahu.json', './icon-ahu-192.png', './icon-ahu-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if(e.request.url.includes('exceljs')){ e.respondWith(fetch(e.request)); return; }
  if(e.request.mode === 'navigate' || e.request.headers.get('accept')?.includes('text/html')){
    e.respondWith(fetch(e.request).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});