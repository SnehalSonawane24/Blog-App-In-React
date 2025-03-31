// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANC9eMgmYEtYVNdvAIZd_Sv4Uzv8QMRdg",
  authDomain: "test-project-bb56d.firebaseapp.com",
  projectId: "test-project-bb56d",
  storageBucket: "test-project-bb56d.firebasestorage.app",
  messagingSenderId: "1042545626534",
  appId: "1:1042545626534:web:6b2385f7f4735b541d5367",
  measurementId: "G-KSZPMHKVLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);