importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.core.skipWaiting();
workbox.core.clientsClaim();

const staticAssets = [
  './',
  './app.js',
  './styles.css',
  './fallback.json',
  './images/fetch-dog.jpg'
];

workbox.precaching.precacheAndRoute(staticAssets);
workbox.routing.registerRoute(new RegExp('https://newsapi.org/(.*)'), new workbox.strategies.NetworkFirst());
//workbox.routing.registerRoute(new RegExp('/v2/'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp(/.*\.(png|jpg|jpeg|gif)/), new workbox.strategies.CacheFirst({
  cacheName: 'images-cache',
  plugins: [
    new workbox.expiration.Plugin({
      // Only cache requests for a week
      maxAgeSeconds: 7 * 24 * 60 * 60,
      // Only cache 10 requests.
      maxEntries: 20
    }),
  ]
}));

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});