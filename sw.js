const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "./main.js",
  "./images/logo512.png",
  "./images/logo192.png",
];

// const broadcast = new BroadcastChannel("sw-channel");

self.addEventListener("install", (event) => {
  // Perform install steps

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache", cache);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method === "POST") {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        const link = formData.get("file") || "";
        self.clients.matchAll().then(function (clients) {
          clients.forEach(function (client) {
            console.log(client);
            client.postMessage(link);
          });
        });
        return await fetch("index.html");
      })()
    );
  }
  event.respondWith(
    caches.match(event.request).then(async (response) => {
      try {
        return await fetch(event.request);
      } catch (error) {
        return response;
      }
    })
  );
});
