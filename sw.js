/* Cache a complete app version. Required modules install together so an
   offline upgrade cannot leave the page with only half its scripts.
   Bump CACHE on every release. Progress lives separately in localStorage. */
const PREFIX = 'sujimichi-' + new URL(self.registration.scope).pathname + '-';
const CACHE = PREFIX + 'v7-20260925-practice';
const CORE = ['./', './index.html', './grammar.js', './book-checklist.js', './mastery-content.js', './mastery.js', './mastery.css', './lesson-guides.js', './comparison-guides.js', './simple.js', './simple.css', './jlpt-content.js', './jlpt-official.js', './jlpt-n2-practice.js', './jlpt.js', './jlpt.css', './map-content.js', './map.js', './map.css', './practice.js'];
const ASSETS = ['./manifest.json','./favicon.ico','./apple-touch-icon.png','./icons/paper.png','./icons/icon.svg','./icons/icon-16.png','./icons/icon-32.png','./icons/icon-48.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(async cache => {
    await cache.addAll(CORE.map(url => new Request(url, {cache:'reload'})));
    await Promise.all(ASSETS.map(url => cache.add(url).catch(() => null)));
    await self.skipWaiting();
  }));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request, url = new URL(req.url);
  if(req.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req, {ignoreSearch:req.mode === 'navigate'});
    if(hit) return hit;
    try { return await fetch(req); }
    catch(error) {
      if(req.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    }
  }));
});
