// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.VITE_API_KEY,
  authDomain: "crud-1-e1038.firebaseapp.com",
  projectId: "crud-1-e1038",
  storageBucket: "crud-1-e1038.appspot.com",
  messagingSenderId: "509601518790",
  appId: "1:509601518790:web:a2c2117fd552996b84b3c7",
  measurementId: "G-8SW4Z79CDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
