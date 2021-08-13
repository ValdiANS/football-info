
import 'regenerator-runtime';
import {skipWaiting, clientsClaim} from "workbox-core";
import {registerRoute, Cach} from "workbox-routing";
import {precacheAndRoute} from "workbox-precaching";
import {StaleWhileRevalidate, CacheFirst} from "workbox-strategies";
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration'

// Cache google font. Kalau tidak dicache manual, nanti size cache-nya  jadi tinggi.
const linkToCache = [
    {url: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap', revision: '1'},
    {url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap', revision: '1'},
];

skipWaiting();
clientsClaim();

precacheAndRoute(
    self.__WB_MANIFEST, 
    {
        ignoreURLParametersMatching: [/.*/]
    }
);

precacheAndRoute(linkToCache, {
    ignoreURLParametersMatching: [/.*/]
});

registerRoute(
    ({url}) => url.origin === 'https://api.football-data.org',
    new StaleWhileRevalidate({
        cacheName: 'Football-API-data'
    })
);

// Font caching
registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'Google-Font-Stylesheets'
    })
)

registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: "Google-Font-Webfonts",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30
            })
        ]
    })
)

// Font Awesome caching
registerRoute(
    ({url}) => url.origin === 'https://cdnjs.cloudflare.com',
    new StaleWhileRevalidate({
        cacheName: 'Font-Awesome'
    })
)

self.addEventListener('push', event => {
    let body;
    if(event.data){
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: './icon/logo-512x512-transparent.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
}); 

