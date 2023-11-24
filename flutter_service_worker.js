'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "35c6e511f4e4f545d4af5b7db24d397c",
"assets/AssetManifest.json": "469681371c87f9af8544a9dbd5d69848",
"assets/assets/fonts/HindSiliguri-Bold.ttf": "09e7451bd892e6af09275b701369b454",
"assets/assets/fonts/HindSiliguri-Light.ttf": "8265fea97f78727b251c512253942467",
"assets/assets/fonts/HindSiliguri-Medium.ttf": "41fd138da9f718913aa98aae255b859b",
"assets/assets/fonts/HindSiliguri-Regular.ttf": "5858488e9870f755271e8a71754eda49",
"assets/assets/fonts/HindSiliguri-SemiBold.ttf": "c75e4224905a200c868801e66480b7d3",
"assets/assets/images/App%2520devlopment.jpg": "9ef91b58f2dbd8e0dab5f160885d126c",
"assets/assets/images/c++.jpg": "f625e58137364ba0bdf04dc6a6e1c9e1",
"assets/assets/images/cont2.png": "feba2221f64565ee4f8e21d5a243b347",
"assets/assets/images/container1.png": "b39bef3fe4449144cf16068fd40717a6",
"assets/assets/images/Container11.svg": "3e4e300bce82e91649f57a34f5a2573d",
"assets/assets/images/container3.png": "f1a3e74b0d2b1eb647c11fbcc64f2771",
"assets/assets/images/htm.jpg": "04a84b98351f9eb8ce98ec9abaffc633",
"assets/assets/images/java.jpg": "ab93d5227d44ca118187cf26a3695ddd",
"assets/assets/images/linkedin-logo-png-2026.png": "d84e3465583d72fdb5b9f93d6e0e781a",
"assets/assets/images/logo.png": "6ce9e2fa121a152113226db866cf0aec",
"assets/assets/images/logo2.png": "930f65e919168879e4febbdc79454abb",
"assets/assets/images/python1.jpg": "d4d120307e3fb98f37c16373b2cddb5a",
"assets/assets/images/undraw_Futuristic_interface_re_0cm6.png": "179df514b1e5706414441ef44727bd14",
"assets/assets/images/undraw_Opened_re_i38e.png": "2edd15625eff735e6474b9f7e557a8ed",
"assets/assets/images/undraw_team_work_k80m.png": "12d3c0c4f24cf4227eb74fea190d8fd7",
"assets/assets/images/undraw_The_world_is_mine_re_j5cr.png": "8e63c378c485e2b236d6717f81a00e68",
"assets/assets/images/undraw_Time_management_re_tk5w.png": "d1fb9ee23a85d11f8148787df19c8391",
"assets/FontManifest.json": "746d9bb46f219558ee0cbc6938fccc23",
"assets/fonts/MaterialIcons-Regular.otf": "24e4be29e0a2134e6fc27409f1dfd42b",
"assets/NOTICES": "931852b1a77260e012e218c0bf7f4c83",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/android-chrome-192x192.png": "0a7271c0c46567211b1911fd3c8d2033",
"icons/android-chrome-512x512.png": "6fae5ea8d97e9832ef748c963fd10fdc",
"icons/apple-touch-icon.png": "fe8637c372ff8ea13718d95ff7919862",
"index.html": "fe0fc0a296a456ee0d8e521b537d68b1",
"/": "fe0fc0a296a456ee0d8e521b537d68b1",
"logo.png": "6ce9e2fa121a152113226db866cf0aec",
"main.dart.js": "39190551354ed3d3ede22d0b20a61e76",
"manifest.json": "21e08071c68a5f97a1b8bfc72446cc5f",
"version.json": "ba8674f7d3e388907cd8ebf593789357"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
