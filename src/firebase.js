import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwIE-s57pn3VJXBZx0WCGCiVbqeJ-Y8R8",
  authDomain: "cloudnotes2-a74f9.firebaseapp.com",
  projectId: "cloudnotes2-a74f9",
  storageBucket: "cloudnotes2-a74f9.firebasestorage.app",
  messagingSenderId: "778487445777",
  appId: "1:778487445777:web:c33c6ee03678f38a19f4b0",
  measurementId: "G-63GPLZDTYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Add these for Auth & Firestore usage
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
