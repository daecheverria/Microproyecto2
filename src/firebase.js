// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email"); 

export const loginWithEmailAndPassword = async ({
  userData,
  onSuccess,
  onFail,
}) => {
  try {
      const { email, password } = userData;
      await signInWithEmailAndPassword(auth, email, password);

      if (onSuccess) {
          onSuccess();
      }
  } catch (error) {
      console.error("LOGIN FAILED", { error });

      if (onFail) {
          onFail();
      }
  }
};