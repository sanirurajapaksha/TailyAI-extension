// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

if ("function" === typeof importScripts) {
  importScripts("firebase/firebase-app.js", "firebase/firebase-auth.js");
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDWQxDBidHNWUOIoc2C-UllBK389TUuQxw",
    authDomain: "test-cbdbf.firebaseapp.com",
    projectId: "test-cbdbf",
    storageBucket: "test-cbdbf.appspot.com",
    messagingSenderId: "882038101179",
    appId: "1:882038101179:web:9e9c2318bf8e7d6bf1459e",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const user = firebase.auth().currentUser;

  self.addEventListener("message", function (event) {
    if (event.data === "hi") {
      self.clients.matchAll().then((all) =>
        all.forEach((client) => {
          if (user) {
            client.postMessage("User is logged in");
          } else {
            client.postMessage("User is not logged in");
          }
        })
      );
    } else {
      self.clients.matchAll().then((all) =>
        all.forEach((client) => {
          client.postMessage("wrong command");
        })
      );
    }
  });

  const createUser = () => {};
  const signIn = () => {};
  const signOut1 = () => {};
}
