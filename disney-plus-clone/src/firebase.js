import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDzSXpOeeiF0dSh4mLwucbmB1p28cSkdjU",
  authDomain: "disney-plus-clone-77f01.firebaseapp.com",
  projectId: "disney-plus-clone-77f01",
  storageBucket: "disney-plus-clone-77f01.appspot.com",
  messagingSenderId: "99608152218",
  appId: "1:99608152218:web:74412b072eaf5c6ac5f723",
  measurementId: "G-VW02BDJDPE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
