// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJQuEfzXOw6rJYZLLiLedO-elDquULEOI",
  authDomain: "project-the-holy-quran.firebaseapp.com",
  projectId: "project-the-holy-quran",
  storageBucket: "project-the-holy-quran.appspot.com",
  messagingSenderId: "360431702022",
  appId: "1:360431702022:web:9ae2a04e7681ac57e4b387"
};

const app = initializeApp(firebaseConfig);

export default app;
