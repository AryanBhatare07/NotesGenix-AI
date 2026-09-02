import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-4c65b.firebaseapp.com",
  projectId: "authexamnotes-4c65b",
  storageBucket: "authexamnotes-4c65b.firebasestorage.app",
  messagingSenderId: "143928999914",
  appId: "1:143928999914:web:57b86b7c2a8d934e85bc93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
