chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    document.getElementById("moon").innerHTML =
      "Start Using TailyAI right now! Go to Gmail and generate emails using TailyAI.";
  } else {
    window.location.replace("login.html");
  }
});
