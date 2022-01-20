const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;



//define which files we need to cache at the top of service worker js
//must use relative paths for it to work in production
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];


//self refers to the service worker object 
self.addEventListener('install', function(e) {
    //wait until tells the browser to wait until the work is complete before terminating the service worker 
    e.waitUntil(
        //caches.open opens a cache storage instance 
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function(e) {
    e.waitUntil(
        //.keys() returns an array of all cache names which we call KeyList 
        caches.keys().then(function (keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                //APP_PREFIX filters out cahches that have the app prefix 
                return key.indexOf(APP_PREFIX);
            });
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                //will only return -1 if a cache isnt found in the keep list, if its not in the keep liste delete it from the cache
                if (cacheKeepList.indexOf(key) === -1 ) {
                    console.log('deleting cache : ' + keyList[i] );
                    return caches.delete(keyList[i]);
                }
            })
           );
        })
    );
});

//listen for fetch event, log the URL of the requested resource and then define how to respond to the request 
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    //respond with intercepts the catch request it will deliver the resource correctly if it is stored in the cache 
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if(request) {
                console.log('responded with cache : ' + e.request.url)
                return request
                //if file is not stored in the cache the server will make a normal request from the resource 
            } else {
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request)
        })
    )
})