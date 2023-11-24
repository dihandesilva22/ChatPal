// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEYt8PH27Z1ExvoPgSwmZF9lK0I5LaRNw",
  authDomain: "palchat-a79ae.firebaseapp.com",
  projectId: "palchat-a79ae",
  storageBucket: "palchat-a79ae.appspot.com",
  messagingSenderId: "589713761723",
  appId: "1:589713761723:web:a294e75679c328528b909e",
  measurementId: "G-GZW9VB1S7S"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)