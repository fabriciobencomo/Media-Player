const VERSION = 'v1';

self.addEventListener('install', event => {
    event.waitUntil(precache())
})

self.addEventListener('fetch', event => {
    const request = event.request;
    if(request.method !== 'GET'){
        return;
    }
    event.respondWith(cachedResponse(request));

    event.waitUntil(updateCached(request))
})

async function precache(){
    const cache = await caches.open(VERSION);
    return cache.addAll([
        '/',
        '/index.html',
        '/javascript/index.js',
        '/javascript/plugins/Autoplay.js',
        '/javascript/plugins/Autopause.js',
        '/video/BigBuckBunny_512kb.mp4'
    ])
}

async function cachedResponse (request){
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);
    return response || fetch(request);
}

async function cachedResponse (request){
    const cache = await caches.open(VERSION);
    const response = await fetch(request);
    return cache.put(request, response);
}