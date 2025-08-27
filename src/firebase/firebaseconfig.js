// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA977BDpowhV8cUk_yIYUI2zcVwslViNqs",
  authDomain: "nextjspro-b68a7.firebaseapp.com",
  projectId: "nextjspro-b68a7",
  storageBucket: "nextjspro-b68a7.firebasestorage.app",
  messagingSenderId: "172021877546",
  appId: "1:172021877546:web:04c01e3bb92f80b1b16c53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
