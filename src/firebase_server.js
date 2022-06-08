import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8FzFopNt1Yz-fFXMn3dHTOhwrJ6WKy3A",
  authDomain: "iresource-4d1dd.firebaseapp.com",
  projectId: "iresource-4d1dd",
  storageBucket: "iresource-4d1dd.appspot.com",
  messagingSenderId: "338857511975",
  appId: "1:338857511975:web:92aad071dae083cf55d202",
  measurementId: "G-2ZRVYDB243"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db };
