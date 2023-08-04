// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuxwatrSo3zGapwiVyS_3dx9E7WZACLMc",
  authDomain: "quran-c04a0.firebaseapp.com",
  projectId: "quran-c04a0",
  storageBucket: "quran-c04a0.appspot.com",
  messagingSenderId: "303009846934",
  appId: "1:303009846934:web:6b63642f68298874f954b7",
  measurementId: "G-TCCBGTGW1C",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
