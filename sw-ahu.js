const CACHE = 'dc-health-ahu-v1';
const ASSETS = ['./', './index.html', './manifest-ahu.json', './icon-ahu-192.png', './icon-ahu-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('fetch', e => {
  if(e.request.url.includes('exceljs')){ e.respondWith(fetch(e.request)); return; }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
