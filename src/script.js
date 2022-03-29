(function () {
  "use strict";

  console.log("TailyAI-extension: script.js");
  if (!navigator.serviceWorker || !navigator.serviceWorker.register) {
    console.log("This browser doesn't support service workers");
    return;
  }

  // Listen to messages from service workers.
  navigator.serviceWorker.addEventListener("message", function (event) {
    console.log("Got reply from service worker: " + event.data);
  });

  // Are we being controlled?
  if (navigator.serviceWorker.controller) {
    // Yes, send our controller a message.
    console.log("Sending 'hi' to controller");
    navigator.serviceWorker.controller.postMessage("hi");
  } else {
    // No, register a service worker to control pages like us.
    // Note that it won't control this instance of this page, it only takes effect
    // for pages in its scope loaded *after* it's installed.
    navigator.serviceWorker
      .register("background.js")
      .then(function (registration) {
        console.log("Service worker registered, scope: " + registration.scope);
        console.log("Refresh the page to talk to it.");
        // If we want to, we might do `location.reload();` so that we'd be controlled by it
      })
      .catch(function (error) {
        console.log("Service worker registration failed: " + error.message);
      });
  }
})();