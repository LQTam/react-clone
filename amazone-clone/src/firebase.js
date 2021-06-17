import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCUlUMSFkle18rdbFJpRNgo8e8xTAR5zYU",
  authDomain: "clone1406.firebaseapp.com",
  projectId: "amazon-clone1406",
  storageBucket: "amazon-clone1406.appspot.com",
  messagingSenderId: "6826475972",
  appId: "1:6826475972:web:e3ae162e7fecf90cffa491"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export {db,auth}