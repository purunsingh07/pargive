import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxMJ8A7NDrC4W8m7dt9A9BKXRw57zAS7Y",
  authDomain: "golf-xy.firebaseapp.com",
  projectId: "golf-xy",
  storageBucket: "golf-xy.firebasestorage.app",
  messagingSenderId: "1082853619097",
  appId: "1:1082853619097:web:b96eb4355567cec3ae0f08",
  measurementId: "G-12E09P96ET"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
