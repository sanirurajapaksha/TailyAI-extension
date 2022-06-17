let isButtonAdded1 = false;
let isButtonAdded2 = false;

let isLoggedIn;
var email = "sanirurajapaksha456@gmail.com";
let status_available;

chrome.storage.sync.get(["user"], (result) => {
  if (result.user) {
    chrome.storage.sync.get(["status"], (result) => {
      status_available = result.status;
    });

    if (status_available === "paused" || status_available === "deleted") {
      isLoggedIn = false;
    } else {
      isLoggedIn = true;
    }

    chrome.storage.sync.get(["email"], (result) => {
      email = result.email;
    });
  } else {
    isLoggedIn = true;
  }
});

// relevant HTML code for the modal

const html = `
<div id="myModal" class="tailyai_modal">
  <!-- Modal content -->
  <div class="tailyai_modal_content">
    <div class="close">&times;</div>
    <div class="container">
      <form class="tailyai-form" id="tailyai-form">
        <label for="text">Email Type: *</label>
        <select
          id="email-type"
          name="email-type"
          class="tailyai_modal_input"
          required
        >
          <option value="Cold-Email">Cold Email</option>
          <option value="Sales-Email">Sales Email</option>
          <option value="Reply-Email">Reply Email</option>
          <option value="Custom-Email">Custom Type</option>
          <option disabled value="Ice-Breakers">
            Ice Breakers (coming soon)
          </option>
        </select>

        <div id="email-intention">
          <label for="text">Intention of the Email:</label>
          <input
            id="email_intention_input"
            type="text"
            class="tailyai_modal_input"
            placeholder="max 200 characters"
            autocomplete="none"
          />
        </div>

        <div id="manual-email-type">
          <label for="email-intention">Email Type:</label>
          <input
            id="manual_email_intention_input"
            type="text"
            class="tailyai_modal_input"
            placeholder="Email to mom, Email to professor..."
          />
        </div>

        <div id="product-name">
          <label for="product-name">Product/Service Name:</label>
          <input id="product_name_input" type="text" class="tailyai_modal_input" />
        </div>

        <div id="product-description">
          <label id="product-description" for="product-description"
            >Product/Service Description:</label
          >
          <textarea
            id="product_description_input"
            class="tailyai_modal_input"
            maxlength="200"
            placeholder="max 200 characters"
            style="height: 80px"
          ></textarea>
        </div>

        <div id="simple">
          <label id="simple" for="simple">Summary of the received email:</label>
          <textarea
            id="simple_input"
            class="tailyai_modal_input"
            maxlength="200"
            placeholder="max 200 characters (optional)"
            style="height: 80px"
          ></textarea>
        </div>

        <div id="email-summary">
          <label for="summary">Summary of Email: *</label>
          <textarea
            id="summary"
            class="tailyai_modal_input"
            name="summary"
            maxlength="300"
            placeholder="max 300 characters"
            style="height: 130px"
            required
          ></textarea>
        </div>

        <button id="submit" class="submit">Generate</button>
      </form>
    </div>
  </div>

  <style>
    .tailyai_modal {
      display: none;
      position: fixed;
      z-index: 1000;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 50%);
    }

    .tailyai_modal_content {
      margin: auto;
      width: 30rem;
      margin-top: -3rem;
    }

    .close {
      display: flex;
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #aaaaaa;
      text-decoration: none;
      cursor: pointer;
    }

    input[class='tailyai_modal_input'],
    select,
    textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #56d1a8;
      border-radius: 5px;
      box-sizing: border-box;
      margin-top: 6px;
      margin-bottom: 16px;
      outline: none;
      resize: none;
    }

    .container {
      border-radius: 5px;
      background-color: #f2f2f2;
      padding: 27px;
      padding-bottom: 31rem;
    }

    .submit {
      background-color: #10b981;
      border: none;
      border-radius: 20px;
      color: #ffffff;
      width: 25%;
      font-size: 17px;
      margin-top: 15px;
      height: 35px;
      cursor: pointer;
      float: right;
    }

    .tailyai-form {
      width: 100%;
    }

  </style>
</div>
`;

// Loading SVG

const loading_svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto; margin-top: -37px;" width="80px" height="110px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#50dc5c" stroke-width="4">
  <animate attributeName="r" repeatCount="indefinite" dur="0.8695652173913042s" values="0;42" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="0.8695652173913042s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
</circle><circle cx="50" cy="50" r="0" fill="none" stroke="#7df163" stroke-width="4">
  <animate attributeName="r" repeatCount="indefinite" dur="0.8695652173913042s" values="0;42" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.4347826086956521s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="0.8695652173913042s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.4347826086956521s"></animate>
</circle>
<!-- [ldio] generated by https://loading.io/ --></svg>`;

// Add modal to the page but default to hidden

const overlay = document.createElement("div");
overlay.className = "tailyai_overlay";
overlay.innerHTML = `${html}`;
document.body.appendChild(overlay);

//                   Handle various element events that lies within the modal

window.addEventListener("load", () => {
  document.getElementById("product-name").style.display = "none";
  document.getElementById("product-description").style.display = "none";
  document.getElementById("manual-email-type").style.display = "none";
  document.getElementById("email-intention").style.display = "block";
  document.getElementById("simple").style.display = "none";
});

document.getElementById("email-type").addEventListener("change", (e) => {
  switch (e.target.value) {
    case "Cold-Email":
      document.getElementById("product-name").style.display = "none";
      document.getElementById("product-description").style.display = "none";
      document.getElementById("email-intention").style.display = "block";
      document.getElementById("manual-email-type").style.display = "none";
      document.getElementById("simple").style.display = "none";
      break;
    case "Reply-Email":
      document.getElementById("email-intention").style.display = "none";
      document.getElementById("product-name").style.display = "none";
      document.getElementById("product-description").style.display = "none";
      document.getElementById("manual-email-type").style.display = "none";
      document.getElementById("simple").style.display = "block";
      break;
    case "Sales-Email":
      document.getElementById("email-intention").style.display = "none";
      document.getElementById("product-name").style.display = "block";
      document.getElementById("product-description").style.display = "block";
      document.getElementById("manual-email-type").style.display = "none";
      document.getElementById("simple").style.display = "none";
      break;
    case "Custom-Email":
      document.getElementById("email-intention").style.display = "none";
      document.getElementById("product-name").style.display = "none";
      document.getElementById("product-description").style.display = "none";
      document.getElementById("manual-email-type").style.display = "block";
      document.getElementById("simple").style.display = "none";
      break;
  }
});

// Hide the modal when the close button is clicked
document.querySelector("div.close").addEventListener("click", () => {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
});

// Prevent form from refreshing the page once submitted
document.getElementById("tailyai-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Send the form data to the server
document.getElementById("submit").addEventListener("click", () => {
  const email_type = document.getElementById("email-type").value;
  switch (email_type) {
    case "Cold-Email":
      const intention = document.getElementById("email_intention_input").value;
      const summary = document.getElementById("summary").value;
      const trimed_intention = intention.trim();
      const trimed_summary = summary.trim();
      if (trimed_summary.length !== 0) {
        const data = {
          email_type: "Cold-Email",
          intention: trimed_intention,
          summary: trimed_summary,
          email: email,
        };
        sendText(data);
      }
      break;
    case "Sales-Email":
      const name = document.getElementById("product_name_input").value;
      const description = document.getElementById(
        "product_description_input"
      ).value;
      const summary_for_sales = document.getElementById("summary").value;
      const trimed_name = name.trim();
      const trimed_description = description.trim();
      const trimed_summary_for_sales = summary_for_sales.trim();
      if (trimed_summary_for_sales.length !== 0) {
        const data = {
          email_type: "Sales-Email",
          name: trimed_name,
          description: trimed_description,
          summary: trimed_summary_for_sales,
          email: email,
        };
        sendText(data);
      }
      break;
    case "Reply-Email":
      const summary_for_received =
        document.getElementById("simple_input").value;
      const summary_for_reply = document.getElementById("summary").value;
      const trimed_summary_for_received = summary_for_received.trim();
      const trimed_summary_for_reply = summary_for_reply.trim();
      if (trimed_summary_for_reply.length !== 0) {
        const data = {
          email_type: "Reply-Email",
          received_summary: trimed_summary_for_received,
          summary: trimed_summary_for_reply,
          email: email,
        };
        sendText(data);
      }
      break;
    case "Custom-Email":
      const custom_email_type = document.getElementById(
        "manual_email_intention_input"
      ).value;
      const summary_for_custom = document.getElementById("summary").value;
      const trimed_custom_email_type = custom_email_type.trim();
      const trimed_summary_for_custom = summary_for_custom.trim();
      if (trimed_summary_for_custom.length !== 0) {
        const data = {
          email_type: "Custom-Email",
          custom_type: trimed_custom_email_type,
          summary: trimed_summary_for_custom,
          email: email,
        };
        sendText(data);
      }
      break;
  }
});

//                  sends text to the server

const sendText = async (text) => {
  document.getElementById("submit").innerHTML = loading_svg;

  const jsonfied_text = JSON.stringify(text);

  try {
    await fetch(
      // "https://tailyai-server-production.up.railway.app/api/v1/openai",
      "http://localhost:8080/api/v1/openai",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonfied_text,
      }
    )
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
        } else {
          var modal = document.getElementById("myModal");
          modal.style.display = "none";
          const splitData = data.split("\n");
          let host;
          const text_box_1 = document.querySelector(
            "div.Am.Al.editable.LW-avf.tS-tW"
          );
          if (text_box_1) {
            host = document.querySelector("div.Am.Al.editable.LW-avf.tS-tW");
          } else {
            host = document.querySelector(
              "div.Am.aO9.Al.editable.LW-avf.tS-tW"
            );
          }
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

    document.getElementById("submit").innerHTML = "Generate";
  } catch (error) {
    window.alert(
      "Oopss! Error happened on our end. Sorry for inconvenience occured. Report this error to customer support. Error: " +
        error
    );
    document.getElementById("submit").innerHTML = "Generate";
  }
};

const sendTextToServer1 = async () => {
  document
    .querySelector("div.divForRoot1")
    .shadowRoot.querySelector("span.text-content1").innerHTML = loading_svg;
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
    const hehe = { text: trimedText, email: email, type: "direct" };
    const jsonifiedText = JSON.stringify(hehe);
    try {
      await fetch(
        "https://tailyai-server-production.up.railway.app/api/v1/openai",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonifiedText,
        }
      )
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
              "https://tailyai.co", // need to change in production
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
    .shadowRoot.querySelector("span.text-content2").innerHTML = loading_svg;
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
    const hehe = { text: trimedText, email: email, type: "reply" };
    const jsonifiedText = JSON.stringify(hehe);
    try {
      await fetch(
        "https://tailyai-server-production.up.railway.app/api/v1/openai",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonifiedText,
        }
      )
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
              "https://tailyai.co",
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
      div.onclick = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
      };
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
      div.onclick = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
      };
      root.appendChild(div);
      isButtonAdded2 = true;
    } else if (textbox2 === null && isButtonAdded2 === true) {
      isButtonAdded2 = false;
    }
  }
}, 500);
