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

const broadcast = new BroadcastChannel("sw-channel");
let message;

const showData = () => {
  const messageTarget = document.getElementById("share-target");
  messageTarget.innerHTML = "updating";
  messageTarget.innerHTML = message;
};

// Listen to the response
broadcast.onmessage = (event) => {
  message = JSON.stringify(event.data.payload);
};
