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

  if (user) {
    chrome.storage.sync.set({ userStatus: true });
  } else {
    chrome.storage.sync.set({ userStatus: false });
  }
}
