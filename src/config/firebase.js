import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCkrIHhjMi2w021Dute9qJWZwTX7MexWAw",
  authDomain: "whatsapp-clone-c028b.firebaseapp.com",
  projectId: "whatsapp-clone-c028b",
  storageBucket: "whatsapp-clone-c028b.appspot.com",
  messagingSenderId: "701944732479",
  appId: "1:701944732479:web:d93bd6afd631fe5c0bd18a",
  measurementId: "G-69GP8CHNM4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
