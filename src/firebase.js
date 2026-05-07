// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbipnXTWv-VSH2pTkIdNSdPFmvzCx_VNY",
  authDomain: "placepro-ai-recruitx.firebaseapp.com",
  projectId: "placepro-ai-recruitx",
  storageBucket: "placepro-ai-recruitx.firebasestorage.app",
  messagingSenderId: "516211123494",
  appId: "1:516211123494:web:2803f4384dee1cc3348de7",
  measurementId: "G-9ZTH7L272B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Social Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();