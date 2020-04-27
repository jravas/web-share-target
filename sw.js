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

onfetch = async (event) => {
  if (event.request.method !== "POST") return;
  if (
    event.request.url.startsWith("https://paul.kinlan.me/share/image/") ===
    false
  )
    return;

  /* This is to fix the issue Jake found */
  event.respondWith(Response.redirect("/share/image/"));

  event.waitUntil(
    (async function () {
      const data = await event.request.formData();
      const client = await self.clients.get(
        event.resultingClientId || event.clientId
      );
      // Get the data from the named element 'file'
      const file = data.get("file");

      console.log("file", file);
      client.postMessage({ file, action: "load-image" });
    })()
  );
};

self.addEventListener("fetch", function (event) {
  if (event.request.method === "POST") {
    // event.respondWith(
    //   (async () => {
    //     const formData = await event.request.formData();
    //     const link = formData.get("file") || "";
    //     return new Response("Bookmark saved: " + link);
    //   })()
    // );
    event.respondWith(Response.redirect("index.html"));

    event.waitUntil(
      (async function () {
        const data = await event.request.formData();
        const client = await self.clients.get(
          event.resultingClientId || event.clientId
        );
        // Get the data from the named element 'file'
        const file = data.get("file");

        console.log("file", file);
        client.postMessage({ file, action: "load-image" });
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
