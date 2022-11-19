// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk0E-FHiSKOakxe_sjjDkpfSnPaXsrabI",
  authDomain: "cloneoffb.firebaseapp.com",
  projectId: "cloneoffb",
  storageBucket: "cloneoffb.appspot.com",
  messagingSenderId: "846490347482",
  appId: "1:846490347482:web:514f6f81c57161526742e3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
