import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfa451HgGlE0bEfUmzep-E-AozjM4yzaA",
  authDomain: "fir-practice-1c0b7.firebaseapp.com",
  databaseURL: "https://fir-practice-1c0b7-default-rtdb.firebaseio.com",
  projectId: "fir-practice-1c0b7",
  storageBucket: "fir-practice-1c0b7.appspot.com",
  messagingSenderId: "5292948471",
  appId: "1:5292948471:web:7c8381d68257c964d90cf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getFirestore(app);
