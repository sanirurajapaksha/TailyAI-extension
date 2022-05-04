chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    fetch("https://tailyai.herokuapp.com/api/v1/extension-data/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("generations").innerHTML = data.generations;
        document.getElementById("available_genarations").innerText =
          data.available_genarations;
      });
  } else {
    window.location.replace("login.html");
  }
});
