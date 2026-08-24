import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// REQUIRED ENVIRONMENT VARIABLES:
// VITE_FIREBASE_API_KEY
// VITE_FIREBASE_AUTH_DOMAIN
// VITE_FIREBASE_PROJECT_ID
// VITE_FIREBASE_STORAGE_BUCKET
// VITE_FIREBASE_MESSAGING_SENDER_ID
// VITE_FIREBASE_APP_ID

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env["VITE_FIREBASE_API_KEY"] || "placeholder-api-key",
  authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] || "placeholder-auth-domain",
  projectId: env["VITE_FIREBASE_PROJECT_ID"] || "placeholder-project-id",
  storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] || "placeholder-storage-bucket",
  messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "placeholder-messaging-sender-id",
  appId: env["VITE_FIREBASE_APP_ID"] || "placeholder-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
