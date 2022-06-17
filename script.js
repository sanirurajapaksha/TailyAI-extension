chrome.storage.sync.get(["user"], (result) => {
  if (result.user === false) {
    chrome.storage.sync.get(["email"], (result) => {
      fetch(
        "https://tailyai-server-production.up.railway.app/api/v1/extension-data",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: result.email }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("generations").innerHTML = data.generations;
          document.getElementById("available_genarations").innerText =
            data.available_genarations;
        });
    });
  } else if (result.user === true) {
    window.location.replace("login.html");
  }
});

// change the shit when ready to release
