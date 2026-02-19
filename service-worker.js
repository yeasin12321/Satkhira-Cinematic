const CACHE_NAME = 'satkhira-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/nature.mp3',
  '/video.mp4'
];

// ইনস্টল ইভেন্ট
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// অফলাইন এক্সেস লজিক
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
