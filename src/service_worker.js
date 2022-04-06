// if ("function" === typeof importScripts) {
//   importScripts("firebase/firebase-app.js", "firebase/firebase-auth.js");
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyC-zn2-KXJnAQE9FgAA_djv7bL0ZA-2uGQ",
//     authDomain: "tailyai.firebaseapp.com",
//     projectId: "tailyai",
//     storageBucket: "tailyai.appspot.com",
//     messagingSenderId: "354149931716",
//     appId: "1:354149931716:web:6d7ea5852f1d2de1850791",
//     measurementId: "G-RSP1WH7FMB",
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   firebase.auth().onAuthStateChanged((user) => {
//     console.log("auth state changed", user);
//     if (user) {
//       chrome.storage.sync.set({ userStatus: true });
//     } else {
//       chrome.storage.sync.set({ userStatus: false });
//     }
//   });
// }

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.user) {
      chrome.storage.sync.set({ userStatus: true });
    } else {
      chrome.storage.sync.set({ userStatus: false });
    }
  }
);
