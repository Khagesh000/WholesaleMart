import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// 🔴 Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAermKP0NQbh3I5HJPI3klEzF5OcpzaXmc",
  authDomain: "wholesale-market-5848e.firebaseapp.com",
  projectId: "wholesale-market-5848e",
  storageBucket: "wholesale-market-5848e.firebasestorage.app",
  messagingSenderId: "835474282185",
  appId: "1:835474282185:web:6f64630037c132a1fa1f18",
  measurementId: "G-5VFMHQ38ZG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber };
