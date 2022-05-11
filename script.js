chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    chrome.storage.sync.get(["email"], (result) => {
      fetch("https://tailyai.onrender.com/api/v1/extension-data", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: result.email }),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("generations").innerHTML = data.generations;
          document.getElementById("available_genarations").innerText =
            data.available_genarations;
        });
    });
  } else {
    window.location.replace("login.html");
  }
});
