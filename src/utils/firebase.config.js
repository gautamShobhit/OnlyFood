// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GOOGLE_FIREBASE_API_KEY,
  authDomain: "onlyfood-279f2.firebaseapp.com",
  projectId: "onlyfood-279f2",
  storageBucket: "onlyfood-279f2.firebasestorage.app",
  messagingSenderId: "821602059991",
  appId: "1:821602059991:web:d0844fc007c1749eefd292",
  measurementId: "G-LXVN4DQHMC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
