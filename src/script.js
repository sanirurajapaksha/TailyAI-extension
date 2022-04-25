chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    document.getElementById("moon").innerHTML =
      "Start Using TailyAI right now! Go to Gmail and generate emails using TailyAI.";
  } else {
    window.location.replace("login.html");
  }
});

{
  /*Here you have to mess with the popup page.
  Should get the data from the chrome storage and store it in variables to use within the popup page.*/
}
