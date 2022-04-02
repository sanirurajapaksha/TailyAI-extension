chrome.storage.sync.get(["userStatus"], (result) => {
  if (result.userStatus) {
    document.getElementById("moon").innerHTML =
      "Start Using TailyAI right now! Go to Gmail and generate emails using TailyAI.";
  } else {
    window.location.replace("login.html");
  }
});
