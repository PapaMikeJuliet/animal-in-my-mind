/* Offline cache for Animal in My Mind. Version changes whenever app files change. */
const CACHE = 'aimm-11ed9af438';
const ASSETS = [
  './',
  'css/style.css',
  'fonts/andika-400.woff2',
  'fonts/andika-700.woff2',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'images/animals/beaver.svg',
  'images/animals/brown-bear.svg',
  'images/animals/caribou.svg',
  'images/animals/cheetah.svg',
  'images/animals/cockatoo.svg',
  'images/animals/crocodile.svg',
  'images/animals/dingo.svg',
  'images/animals/dolphin.svg',
  'images/animals/echidna.svg',
  'images/animals/elephant.svg',
  'images/animals/emu.svg',
  'images/animals/flamingo.svg',
  'images/animals/frill-necked-lizard.svg',
  'images/animals/frog.svg',
  'images/animals/giant-panda.svg',
  'images/animals/giraffe.svg',
  'images/animals/gorilla.svg',
  'images/animals/hippo.svg',
  'images/animals/kangaroo.svg',
  'images/animals/koala.svg',
  'images/animals/kookaburra.svg',
  'images/animals/lion.svg',
  'images/animals/loon.svg',
  'images/animals/monkey.svg',
  'images/animals/moose.svg',
  'images/animals/narwhal.svg',
  'images/animals/owl.svg',
  'images/animals/parrot.svg',
  'images/animals/penguin.svg',
  'images/animals/platypus.svg',
  'images/animals/polar-bear.svg',
  'images/animals/quokka.svg',
  'images/animals/raccoon.svg',
  'images/animals/rhino.svg',
  'images/animals/shark.svg',
  'images/animals/snake.svg',
  'images/animals/tasmanian-devil.svg',
  'images/animals/tiger.svg',
  'images/animals/wallaby.svg',
  'images/animals/wombat.svg',
  'images/animals/zebra.svg',
  'images/title.jpg',
  'index.html',
  'js/animals.js',
  'js/app.js',
  'js/icons.js',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== PHOTO_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Wikimedia photos: keep a copy after first view so they work offline.
const PHOTO_CACHE = 'aimm-photos';
const WIKI_HOSTS = ['commons.wikimedia.org', 'upload.wikimedia.org'];

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (WIKI_HOSTS.includes(url.hostname)) {
    const isApi = url.pathname.startsWith('/w/api.php');
    event.respondWith(caches.open(PHOTO_CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      if (hit && !isApi) return hit;
      try {
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
        return res;
      } catch (e) {
        if (hit) return hit;
        throw e;
      }
    }));
    return;
  }
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req))
  );
});
