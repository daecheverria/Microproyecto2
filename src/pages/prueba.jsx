import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export  async function  loginprueba(email, password){
  
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    return user
  
  }
