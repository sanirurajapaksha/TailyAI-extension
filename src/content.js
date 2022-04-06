let isButtonAdded1 = false;
let isButtonAdded2 = false;

let isLoggedIn;

const sendTextToServer1 = async () => {
  const textContent = document.querySelector(
    "div.Am.Al.editable.LW-avf.tS-tW"
  ).textContent;
  const trimedText = textContent.trim();
  if (trimedText.length === 0) {
    window.alert("Please enter some text to generate email");
  } else if (trimedText.length > 500) {
    window.alert("Please enter less than 500 characters");
  } else {
    const hehe = { text: trimedText };
    const jsonifiedText = JSON.stringify(hehe);
    try {
      console.log("starting to post to the server");
      await fetch("http://localhost:8080/api/v1/openai", {
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
          } else {
            document.querySelector(
              "div.Am.Al.editable.LW-avf.tS-tW"
            ).textContent = data;
          }
        });
    } catch (error) {
      window.alert(
        "Oopss! Error happened on our end. Sorry for inconvenience occured. Report this error to customer support. Error: " +
          error
      );
    }
  }
};

const sendTextToServer2 = async () => {
  const textContent = document.querySelector(
    "div.Am.aO9.Al.editable.LW-avf.tS-tW"
  ).textContent;
  const trimedText = textContent.trim();
  if (trimedText.length === 0) {
    window.alert("Please enter some text to generate email");
  } else if (trimedText.length > 500) {
    window.alert("Please enter less than 500 characters");
  } else {
    const hehe = { text: trimedText };
    const jsonifiedText = JSON.stringify(hehe);
    console.log(jsonifiedText);
    try {
      console.log("starting to post to the server");
      await fetch("http://localhost:8080/api/v1/openai", {
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
          } else {
            document.querySelector(
              "div.Am.aO9.Al.editable.LW-avf.tS-tW"
            ).textContent = data;
          }
        });
    } catch (error) {
      window.alert(
        "Oopss! Error happened on our end. Sorry for inconvenience occured. Report this error to customer support. Error: " +
          error
      );
    }
  }
};

setInterval(() => {
  chrome.storage.sync.get(["userStatus"], (result) => {
    if (result.userStatus === true) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  });
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
        background-color: #548EFC;
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
        box-shadow: 1px 1px 6px #548EFC;
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
         background-color: #548EFC;
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
         box-shadow: 1px 1px 6px #548EFC;
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
