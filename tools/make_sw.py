"""Writes sw.js with the full list of app files so the app works offline.
Run again after adding animals or pictures (it bumps the cache version from the file contents)."""
import sys, pathlib, hashlib

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path(__file__).parent.parent).resolve()
skip = {'sw.js', 'README.md', 'GEMINI-IMAGES.md', '.nojekyll', 'OFL-LICENSE.txt'}
files = sorted(p for p in root.rglob('*') if p.is_file() and p.name not in skip and '.git' not in p.parts and 'tools' not in p.parts)
h = hashlib.sha1()
for p in files:
    h.update(p.read_bytes())
version = h.hexdigest()[:10]
assets = ['./'] + [p.relative_to(root).as_posix() for p in files]
lines = ',\n  '.join(f"'{a}'" for a in assets)
sw = f"""/* Offline cache for Animal in My Mind. Version changes whenever app files change. */
const CACHE = 'aimm-{version}';
const ASSETS = [
  {lines}
];

self.addEventListener('install', (event) => {{
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
}});

self.addEventListener('activate', (event) => {{
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== PHOTO_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
}});

// Wikimedia photos: keep a copy after first view so they work offline.
const PHOTO_CACHE = 'aimm-photos';
const WIKI_HOSTS = ['commons.wikimedia.org', 'upload.wikimedia.org'];

self.addEventListener('fetch', (event) => {{
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (WIKI_HOSTS.includes(url.hostname)) {{
    const isApi = url.pathname.startsWith('/w/api.php');
    event.respondWith(caches.open(PHOTO_CACHE).then(async (cache) => {{
      const hit = await cache.match(req);
      if (hit && !isApi) return hit;
      try {{
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
        return res;
      }} catch (e) {{
        if (hit) return hit;
        throw e;
      }}
    }}));
    return;
  }}
  event.respondWith(
    caches.match(req, {{ ignoreSearch: true }}).then((hit) => hit || fetch(req))
  );
}});
"""
(root / 'sw.js').write_text(sw)
print('sw.js written:', len(assets), 'files, version', version)
