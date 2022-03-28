import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const user = auth.currentUser;
if (user) {
  console.log("User logged in");
} else {
  console.log("User not logged in");
}

const createUser = () => {};
const signIn = () => {};
const signOut = () => {};
