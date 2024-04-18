// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-91676.firebaseapp.com",
  projectId: "insta-next-91676",
  storageBucket: "insta-next-91676.appspot.com",
  messagingSenderId: "90382357888",
  appId: "1:90382357888:web:8d320848b9c2449509dd65",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
