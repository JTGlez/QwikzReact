/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";

const {
    NEXT_PUBLIC_VITE_API_KEY,
    NEXT_PUBLIC_VITE_AUTH_DOMAIN,
    NEXT_PUBLIC_VITE_PROJECT_ID,
    NEXT_PUBLIC_VITE_STORAGE_BUCKET,
    NEXT_PUBLIC_VITE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_VITE_APP_ID
} = getEnvironments();

const env = getEnvironments();

console.log('Las env', env)

const firebaseConfig = {
    apiKey: NEXT_PUBLIC_VITE_API_KEY,
    authDomain: NEXT_PUBLIC_VITE_AUTH_DOMAIN,
    projectId: NEXT_PUBLIC_VITE_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_VITE_STORAGE_BUCKET,
    messagingSenderId: NEXT_PUBLIC_VITE_MESSAGING_SENDER_ID,
    appId: NEXT_PUBLIC_VITE_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);