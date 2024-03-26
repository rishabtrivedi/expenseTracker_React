// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEeGVsR1Q_mIzDW2TZEckX2mhQwhp10FE",
  authDomain: "expense-tracker-a732b.firebaseapp.com",
  projectId: "expense-tracker-a732b",
  storageBucket: "expense-tracker-a732b.appspot.com",
  messagingSenderId: "33631525795",
  appId: "1:33631525795:web:1673c2a733f09f5e905816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login 
// firebase init
// firebase deploy