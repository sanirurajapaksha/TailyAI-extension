chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    chrome.storage.sync.get(["generations"], (result) => {
      document.getElementById("generations").innerHTML = result.generations;
    });
    chrome.storage.sync.get(["available_genarations"], (result) => {
      document.getElementById("available_genarations").innerText =
        result.available_genarations;
    });
  } else {
    window.location.replace("login.html");
  }
});

{
  /*Here you have to mess with the popup page.
  Should get the data from the chrome storage and store it in variables to use within the popup page.*/
}
