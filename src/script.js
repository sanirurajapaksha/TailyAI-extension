chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    window.location.replace("index.html");
  } else {
    window.location.replace("login.html");
  }
});

{
  /*Here you have to mess with the popup page.
  Should get the data from the chrome storage and store it in variables to use within the popup page.*/
}
