// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS2Ato2tK3kuijw4V0dJH-HggO4dKUGqc",
  authDomain: "pythonforkids-b7682.firebaseapp.com",
  projectId: "pythonforkids-b7682",
  storageBucket: "pythonforkids-b7682.appspot.com",
  messagingSenderId: "796296102792",
  appId: "1:796296102792:web:b672d4439ffc52599e303d",
  measurementId: "G-MPQG8STP89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);