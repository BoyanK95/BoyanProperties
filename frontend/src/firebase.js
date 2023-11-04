// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-properties.firebaseapp.com",
  projectId: "mern-stack-properties",
  storageBucket: "mern-stack-properties.appspot.com",
  messagingSenderId: "1044807821185",
  appId: "1:1044807821185:web:02e28e9a06b04e9c8aaa80"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);