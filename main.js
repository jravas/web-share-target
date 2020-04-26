if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

navigator.serviceWorker.addEventListener("message", function (message) {
  const messageTarget = document.getElementById("share-target");
  messageTarget.innerHTML = "updating";
  messageTarget.innerHTML = JSON.stringify(message);
});

const broadcast = new BroadcastChannel("sw-channel");

function showData() {
  const messageTarget = document.getElementById("share-target");
}

// Listen to the response
