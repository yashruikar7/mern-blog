// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-fe082.firebaseapp.com",
  projectId: "mernblog-fe082",
  storageBucket: "mernblog-fe082.appspot.com",
  messagingSenderId: "434173398644",
  appId: "1:434173398644:web:1c1fb180abfd264f494b21",
  measurementId: "G-74BD5ZX2E9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
