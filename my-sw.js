import { offlineFallback } from 'workbox-recipes';
import { setCatchHandler, setDefaultHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';


const pageFallback = './index.html';
const imageFallback = false;
const fontFallback = false;

setDefaultHandler(new NetworkOnly());
offlineFallback();

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

setCatchHandler(handler);
