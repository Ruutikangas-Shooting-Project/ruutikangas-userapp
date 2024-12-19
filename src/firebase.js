// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//put api key here for while, it will move .env avoid hacker get
const firebaseConfig = {
  apiKey: "AIzaSyDeYfQwYWdZ1r5VvRbrXBC5FW5G2hiI4P4", // from Firebase
  authDomain: "ruutinkangas.firebaseapp.com",
  projectId: "ruutinkangas",
  storageBucket: "ruutinkangas.appspot.com",
  messagingSenderId: "1039433779034",// from Firebase
  appId: "1:1039433779034:web:47f6bc31723c7907381563",// from Firebase
  measurementId: "G-F4JT0LZ73R" // optional, only if you use Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);// Initialize Firestore
const auth = getAuth(app); 
const db = getFirestore(app); 
// Export Firestore to be used in other components
export { db, auth };
//export { auth };