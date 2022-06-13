import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmut0pfJriZPVOeofhf9dUgdGeXkxP63Q",
  authDomain: "smart-hiring.firebaseapp.com",
  databaseURL: "https://smart-hiring-default-rtdb.firebaseio.com",
  projectId: "smart-hiring",
  storageBucket: "smart-hiring.appspot.com",
  messagingSenderId: "803074135969",
  appId: "1:803074135969:web:639a666e73d745d4461de0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db };
