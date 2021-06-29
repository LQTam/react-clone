import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-3FHg6UO5Cj2HlPH3RAcrjC7HlSZarQE",
  authDomain: "facebook-mern-3c59a.firebaseapp.com",
  projectId: "facebook-mern-3c59a",
  storageBucket: "facebook-mern-3c59a.appspot.com",
  messagingSenderId: "244716209146",
  appId: "1:244716209146:web:0b11822ba487cec716da43",
  measurementId: "G-GEEKQ62VDZ",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
