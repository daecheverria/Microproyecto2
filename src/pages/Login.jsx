import { collection, doc, setDoc } from "firebase/firestore"
import { auth, db, googleProvider, loginWithEmailAndPassword } from "../firebase"
import {getAdditionalUserInfo, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

//import { useState } from "react";
export default function Login(){
  const navigate = useNavigate;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const onSuccess = () => {
    navigate("/Homepage");
};

const onFail = (_error) => {
    console.log("LOGIN FAILED, Try Again");
    alert("se produjo un error al iniciar sesión");
};

const onSubmit = async (event) => {
    event.preventDefault();
    await loginWithEmailAndPassword({ userData: formData, onSuccess, onFail });  
};

const onChange = (event) => {
    const { name, value } = event.target;

    setFormData((oldData) => ({ ...oldData, [name]: value }));
};


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
      <form onSubmit={onSubmit}>
        <div>       
                    <h1 >Iniciar Sesión</h1>
            
                    <div >
                        <label htmlFor="email"><span>Ingrese su correo</span></label>
                        <input type="email" name="email" id="email" placeholder="correo@email.com" onChange={onChange}/>
                    </div>
            
                    <div>
                        <label htmlFor="password"><span>Ingrese su contraseña</span></label>
                        <input type="password" name="password" id="password" placeholder="********" onChange={onChange}/>
                    </div>

                    <button type="submit" >Iniciar Sesión</button>
                    
                    <button type="button" onClick={handleClick}>Inciar Sesión con Google</button>

                    <Link to={"/Register"} >
                    ¿Aún no tines una cuenta? {" "}
                        <span >Regístrate</span>
                    </Link>

                    
                </div>
                <button onClick={cerrarSesion}>
                    cerrar sesion
                </button>
            </form>


      
    </div>
  )
  }