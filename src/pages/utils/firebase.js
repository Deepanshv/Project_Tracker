// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyArvSS72uEOOYLsvktYvowIx9WQApYOs78",
  authDomain: "mini-project-tracker.firebaseapp.com",
  projectId: "mini-project-tracker",
  storageBucket: "mini-project-tracker.firebasestorage.app",
  messagingSenderId: "444250474467",
  appId: "1:444250474467:web:aa37ee07350720c3b002d6",
  measurementId: "G-FT36WNHGXL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
