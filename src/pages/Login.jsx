import { collection, doc, setDoc } from "firebase/firestore"
import { auth, db, googleProvider } from "../firebase"
import {getAdditionalUserInfo, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth"
import { useEffect, useState } from "react"

//import { useState } from "react";
export default function Login(){
  const [user,setUser] = useState(null);
  async function handleClick(){
    
    const result = await signInWithPopup(auth,googleProvider)
    
    const coleccionUsuario = collection(db,"Users");
    const infoRelativaU = await getAdditionalUserInfo(result)


    
    if (infoRelativaU.isNewUser){await setDoc(doc(coleccionUsuario,result.user.email),{
      email: result.user.email,
      name: result.user.displayName,
      picture: result.user.photoURL
    })}
  }
  async function cerrarSesion(){
    await signOut(auth)
    setUser(null)
  }


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })


  return (
    <div>
      <button onClick={handleClick}>
      Iniciar con google!
      </button>
      <button onClick={cerrarSesion}>
      cerrar sesion
      </button>
    </div>
  )
  }