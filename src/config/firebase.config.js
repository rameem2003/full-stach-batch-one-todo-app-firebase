// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdC-SO996qCEUH_ctLOCNIvL-G7ORDCuM",
  authDomain: "fsb1-todo-app.firebaseapp.com",
  projectId: "fsb1-todo-app",
  storageBucket: "fsb1-todo-app.firebasestorage.app",
  messagingSenderId: "759841076807",
  appId: "1:759841076807:web:c1639af34d792f909ce362",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
