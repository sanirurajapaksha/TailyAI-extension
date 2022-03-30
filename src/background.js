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

  const user1 = firebase.auth().currentUser;
  const provider = new firebase.auth.GoogleAuthProvider();

  self.addEventListener("message", function (event) {
    if (event.data === "checkAuth") {
      self.clients.matchAll().then((all) =>
        all.forEach((client) => {
          if (user1) {
            client.postMessage(true);
          } else {
            client.postMessage(false);
          }
        })
      );
    } else if (event.data === "login") {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          self.clients.matchAll().then((all) =>
            all.forEach((client) => {
              client.postMessage(user);
            })
          );
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });
    }
  });

  const createUser = () => {};
  const signIn = () => {};
  const signOut1 = () => {};
}
