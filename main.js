if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
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

const broadcast = new BroadcastChannel("sw-channel");
const message = document.getElementById("share-target");

// Listen to the response
broadcast.onmessage = (event) => {
  message.innerHTML = JSON.stringify(event.data.payload);
};
