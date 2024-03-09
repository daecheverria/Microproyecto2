// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestone } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAmSCN0sEl-ewDhqthCEqL0hI5avXSqRw",
  authDomain: "microproyecto2-96382.firebaseapp.com",
  projectId: "microproyecto2-96382",
  storageBucket: "microproyecto2-96382.appspot.com",
  messagingSenderId: "843400436000",
  appId: "1:843400436000:web:76bc143e6e6fb557879f45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestone(app)