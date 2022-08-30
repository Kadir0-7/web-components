/*import { offlineFallback } from 'workbox-recipes';
import { setCatchHandler, setDefaultHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

setDefaultHandler(new NetworkOnly());

offlineFallback();
const pageFallback = 'fallback.html';
const imageFallback = false;
const fontFallback = false;
 
setDefaultHandler(new NetworkOnly());

self.addEventListener('install', (event) => {
  const files = [pageFallback];
  if (imageFallback) {
    files.push(imageFallback);
  }
  if (fontFallback) {
    files.push(fontFallback);
  }

  event.waitUntil(
    self.caches
      .open('workbox-offline-fallbacks')
      .then((cache) => cache.addAll(files))
  );
});

const handler = async (options) => {
  const dest = options.request.destination;
  const cache = await self.caches.open('workbox-offline-fallbacks');

  if (dest === 'document') {
    return (await cache.match(pageFallback)) || Response.error();
  }

  if (dest === 'image' && imageFallback !== false) {
    return (await cache.match(imageFallback)) || Response.error();
  }

  if (dest === 'font' && fontFallback !== false) {
    return (await cache.match(fontFallback)) || Response.error();
  }

  return Response.error();
};

setCatchHandler(handler);*/
/*const cacheName = "v1"
const cacheAssests =['index.html','fallback.html','comment.js', 'style.css']

self.addEventListener('install', (e) =>{
  console.log('SW is installed')
  e.waitUntil(caches.open(cacheName) 
  .then(cache => {
    console.log('caching files');
    cache.addAll(cacheAssests);
  })
 
  );
});

self.addEventListener('activate', (e) =>{
  console.log('SW is activated')
  e.waitUntil(
    caches.keys().then(cacheName =>{
      return Promise.all(
        cacheName.map(cache => {
          if (cache !== cacheName){
            console.log('removing old chahes')
return caches.delete(cache)
          }
        })
      )
    }))

})

self.addEventListener('fetch', (e) =>{
console.log('SW Fetching');
e.respondWith(
  fetch(e.request).catch(() => caches.match(e.request))
)
})*/
