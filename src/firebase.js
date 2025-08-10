import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCu9GlnsXZavQbEh3WceWjhrjSioXdJwDE",
  authDomain: "hirehub-d6eb6.firebaseapp.com",
  projectId: "hirehub-d6eb6",
  storageBucket: "hirehub-d6eb6.firebasestorage.app",
  messagingSenderId: "1061761392409",
  appId: "1:1061761392409:web:399d463a2a1f7fe0feef88",
  measurementId: "G-KC7FHNGWD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth, provider, db}
