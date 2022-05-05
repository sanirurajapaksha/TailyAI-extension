let isButtonAdded1 = false;
let isButtonAdded2 = false;

let isLoggedIn;
let email;
let status_available;

chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    chrome.storage.sync.get(["status"], (result) => {
      status_available = result.status;
    });

    if (status_available === "paused" || status_available === "deleted") {
      isLoggedIn = false;
    }

    chrome.storage.sync.get(["email"], (result) => {
      email = result.email;
    });
  } else {
    isLoggedIn = false;
  }
});

const sendTextToServer1 = async () => {
  document
    .querySelector("div.divForRoot1")
    .shadowRoot.querySelector(
      "span.text-content1"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="80px" height="110px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" r="0" fill="none" stroke="#50dc5c" stroke-width="4">
      <animate attributeName="r" repeatCount="indefinite" dur="0.8695652173913042s" values="0;42" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
      <animate attributeName="opacity" repeatCount="indefinite" dur="0.8695652173913042s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
    </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#7df163" stroke-width="4">
      <animate attributeName="r" repeatCount="indefinite" dur="0.8695652173913042s" values="0;42" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.4347826086956521s"></animate>
      <animate attributeName="opacity" repeatCount="indefinite" dur="0.8695652173913042s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.4347826086956521s"></animate>
    </circle>
    <!-- [ldio] generated by https://loading.io/ --></svg>`;
  const textContent = document.querySelector(
    "div.Am.Al.editable.LW-avf.tS-tW"
  ).textContent;
  const trimedText = textContent.trim();
  if (trimedText.length === 0) {
    window.alert("Please enter some text to generate email");
    document
      .querySelector("div.divForRoot1")
      .shadowRoot.querySelector("span.text-content1").innerHTML = "Generate✨";
  } else if (trimedText.length > 500) {
    window.alert("Please enter less than 500 characters");
    document
      .querySelector("div.divForRoot1")
      .shadowRoot.querySelector("span.text-content1").innerHTML = "Generate✨";
  } else {
    const hehe = { text: trimedText, email: email };
    const jsonifiedText = JSON.stringify(hehe);
    try {
      console.log("starting to post to the server");
      await fetch("https://tailyai.herokuapp.com/api/v1/openai", {
        // change the url at production // done
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonifiedText,
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === "toxic") {
            window.alert(
              "We didn't generate this email since it was too toxic. Try generating once again"
            );
          } else if (data === "regenerate") {
            window.alert("Oopss! Try generating once again");
          } else if (data === "limit_reached") {
            window.alert(
              "You have reached the limit of emails generated. Upgrade your plan to generate more emails"
            );
          } else if (data === "cache_empty") {
            window.alert(
              "Error happend in our servers. A new window will open and dissapear to resolve the issue and then try Generating again"
            );
            var myWindow = window.open(
              "https://tailyai.vercel.app", // need to change in production
              "",
              "width=700,height=500,top=150,left=400"
            );
            setInterval(() => {
              myWindow.close();
            }, 5000);
          } else {
            const splitData = data.split("\n");
            const host = document.querySelector(
              "div.Am.Al.editable.LW-avf.tS-tW"
            );
            host.textContent = "";
            splitData.forEach((item, index) => {
              if (item === "" && (index === 0 || index === 1)) {
                const new_div = document.createElement("div");
                host.appendChild(new_div);
              } else if (item === "") {
                const new_div = document.createElement("div");
                new_div.innerHTML = "<br>";
                host.appendChild(new_div);
              } else {
                const new_div = document.createElement("div");
                new_div.innerHTML = item;
                host.appendChild(new_div);
              }
            });
          }
        });

      document
        .querySelector("div.divForRoot1")
        .shadowRoot.querySelector("span.text-content1").innerHTML =
        "Generate✨";
    } catch (error) {
      window.alert(
        "Oopss! Error happened on our end. Sorry for inconvenience occured. Report this error to customer support. Error: " +
          error
      );
      document
        .querySelector("div.divForRoot1")
        .shadowRoot.querySelector("span.text-content1").innerHTML =
        "Generate✨";
    }
  }
};

const sendTextToServer2 = async () => {
  document
    .querySelector("div.divForRoot2")
    .shadowRoot.querySelector(
      "span.text-content2"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="80px" height="110px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" r="0" fill="none" stroke="#50dc5c" stroke-width="4">
      <animate attributeName="r" repeatCount="indefinite" dur="0.8695652173913042s" values="0;42" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
      <animate attributeName="opacity" repeatCount="indefinite" dur="0.8695652173913042s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
    </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#7df163" stroke-width="4">
      <animate attributeName="r" repeatCount="indefinite" dur="0.8695652173913042s" values="0;42" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.4347826086956521s"></animate>
      <animate attributeName="opacity" repeatCount="indefinite" dur="0.8695652173913042s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.4347826086956521s"></animate>
    </circle>
    <!-- [ldio] generated by https://loading.io/ --></svg>`;
  const textContent = document.querySelector(
    "div.Am.aO9.Al.editable.LW-avf.tS-tW"
  ).textContent;
  const trimedText = textContent.trim();
  if (trimedText.length === 0) {
    window.alert("Please enter some text to generate email");
    document
      .querySelector("div.divForRoot2")
      .shadowRoot.querySelector("span.text-content2").innerHTML = "Generate✨";
  } else if (trimedText.length > 500) {
    window.alert("Please enter less than 500 characters");
    document
      .querySelector("div.divForRoot2")
      .shadowRoot.querySelector("span.text-content2").innerHTML = "Generate✨";
  } else {
    const hehe = { text: trimedText, email: email };
    const jsonifiedText = JSON.stringify(hehe);
    console.log(jsonifiedText);
    try {
      console.log("starting to post to the server");
      await fetch("https://tailyai.herokuapp.com/api/v1/openai", {
        // change the url at production
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonifiedText,
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === "toxic") {
            window.alert(
              "We didn't generate this email since it was too toxic. Try generating once again"
            );
          } else if (data === "regenerate") {
            window.alert("Oopss! Try generating once again");
          } else if (data === "limit_reached") {
            window.alert(
              "You have reached the limit of emails generated. Upgrade your plan to generate more emails"
            );
          } else if (data === "cache_empty") {
            window.alert(
              "Error happend in our servers. A new window will open and dissapear to resolve the issue and then try Generating again"
            );
            var myWindow = window.open(
              "https://tailyai.vercel.app",
              "",
              "width=700,height=500,top=150,left=400"
            );
            setInterval(() => {
              myWindow.close();
            }, 5000);
          } else {
            const splitData = data.split("\n");
            const host = document.querySelector(
              "div.Am.aO9.Al.editable.LW-avf.tS-tW"
            );
            host.textContent = "";
            splitData.forEach((item, index) => {
              if (item === "" && (index === 0 || index === 1)) {
                const new_div = document.createElement("div");
                host.appendChild(new_div);
              } else if (item === "") {
                const new_div = document.createElement("div");
                new_div.innerHTML = "<br>";
                host.appendChild(new_div);
              } else {
                const new_div = document.createElement("div");
                new_div.innerHTML = item;
                host.appendChild(new_div);
              }
            });
          }
        });
      document
        .querySelector("div.divForRoot2")
        .shadowRoot.querySelector("span.text-content2").innerHTML =
        "Generate✨";
    } catch (error) {
      window.alert(
        "Oopss! Error happened on our end. Sorry for inconvenience occured. Report this error to customer support. Error: " +
          error
      );
      document
        .querySelector("div.divForRoot2")
        .shadowRoot.querySelector("span.text-content2").innerHTML =
        "Generate✨";
    }
  }
};

setInterval(() => {
  if (document.readyState === "complete") {
    const textbox1 = document.querySelector("div.AD");
    const textbox2 = document.querySelector("div.ip.adB");
    if (textbox1 !== null && isButtonAdded1 === false && isLoggedIn === true) {
      const divForRoot1 = document.createElement("div");
      divForRoot1.className = "divForRoot1";
      document.querySelector("div.Ar.Au").appendChild(divForRoot1);
      const host = document.querySelector("div.divForRoot1");
      const root = host.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.className = "div1";
      div.innerHTML = `
      <style>
      .div1 {
        background-color: #10b981;
        border-radius: 20px;
        color: #FFFFFF;
        width: 108px;
        height: 30px;
        text-align: center;
        justify-content: center;
        cursor: pointer;
        position: fixed;
        bottom: 70px;
        right: 280px;
        z-index: 10;
        display: flex;
        box-shadow: 1px 1px 6px #10b981;
        align-items: center;
        justify-content: center;
       }

      </style>
      <span class="text-content1">Generate✨</span>`;
      div.onclick = sendTextToServer1;
      root.appendChild(div);
      isButtonAdded1 = true;
    } else if (textbox1 === null && isButtonAdded1 === true) {
      isButtonAdded1 = false;
    }

    if (textbox2 !== null && isButtonAdded2 === false && isLoggedIn === true) {
      const divForRoot2 = document.createElement("div");
      divForRoot2.className = "divForRoot2";
      document.querySelector("div.aO7").appendChild(divForRoot2);
      const host = document.querySelector("div.divForRoot2");
      const root = host.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.className = "div2";
      div.innerHTML = `
      <style>
      .div2 {
         background-color: #10b981;
         border-radius: 20px;
         color: #FFFFFF;
         width: 108px;
         height: 30px;
         text-align: center;
         justify-content: center;
         cursor: pointer;
         position: absolute;
         right: 90px;
         bottom: -22px;
         z-index: 10;
         display: flex;
         box-shadow: 1px 1px 6px #10b981;
         align-items: center;
         justify-content: center;
       }

      </style>
      <span class="text-content2">Generate✨</span>`;
      div.onclick = sendTextToServer2;
      root.appendChild(div);
      isButtonAdded2 = true;
    } else if (textbox2 === null && isButtonAdded2 === true) {
      isButtonAdded2 = false;
    }
  }
}, 500);
