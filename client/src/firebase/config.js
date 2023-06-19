// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALOC0DW32hhnQcIfhGm_Cy4sULAMx9-jU",
    authDomain: "yellow-31f0e.firebaseapp.com",
    projectId: "yellow-31f0e",
    storageBucket: "yellow-31f0e.appspot.com",
    messagingSenderId: "907921081264",
    appId: "1:907921081264:web:18506185d9b47641824c75",
    measurementId: "G-6ZJZN0NZ9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

export const signInwithGoogle = () => {
   return signInWithPopup(auth, googleProvider)
}