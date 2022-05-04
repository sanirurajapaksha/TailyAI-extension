chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.user === true) {
      chrome.storage.sync.set(request);
    } else {
      chrome.storage.sync.set(request);
    }
  }
);
