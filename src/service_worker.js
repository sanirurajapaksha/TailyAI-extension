if ("function" === typeof importScripts) {
  importScripts("firebase/firebase-app.js", "firebase/firebase-auth.js");
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC-zn2-KXJnAQE9FgAA_djv7bL0ZA-2uGQ",
    authDomain: "tailyai.firebaseapp.com",
    projectId: "tailyai",
    storageBucket: "tailyai.appspot.com",
    messagingSenderId: "354149931716",
    appId: "1:354149931716:web:6d7ea5852f1d2de1850791",
    measurementId: "G-RSP1WH7FMB",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const user = firebase.auth().currentUser;

  if (user) {
    chrome.storage.sync.set({ userStatus: true });
  } else {
    chrome.storage.sync.set({ userStatus: false });
  }
}
