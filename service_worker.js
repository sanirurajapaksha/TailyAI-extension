//Service Worker Catch Any Errors...
try {
  //Import Firebase Local Scripts
  self.importScripts(
    "firebase/firebase-app.js",
    "firebase/firebase-auth.js",
    "firebase/firebase-database.js"
  );

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
} catch (e) {
  //error
  console.log(e);
}
