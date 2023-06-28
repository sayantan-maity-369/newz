// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLHdUEkqip0NoR7zuf3cvwMA8GVq27OKg",
  authDomain: "newzzzzz.firebaseapp.com",
  projectId: "newzzzzz",
  storageBucket: "newzzzzz.appspot.com",
  messagingSenderId: "966447547974",
  appId: "1:966447547974:web:18d00f15edaa1531bb6c47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new  GoogleAuthProvider();
export const db = getFirestore(app);