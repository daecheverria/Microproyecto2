import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider, loginWithEmailAndPassword } from "../firebase";
import { getAdditionalUserInfo, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import "./Login.modules.css";
//import styles from "./Login.modules.css";

export default function Login() {

  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSuccess = () => {
    navigate("/app");
  };

  const onFail = (_error) => {
    console.log("LOGIN FAILED, Try Again");
    alert("Se produjo un error al iniciar sesión");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await loginWithEmailAndPassword({ userData: formData, onSuccess, onFail });
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((oldData) => ({ ...oldData, [name]: value }));
  };

  

  async function handleClick() {
    //const [user, setUser] = useState(null)
    //const result = await signInWithPopup(auth, googleProvider);
    //const coleccionUsuario = collection(db, "Users");
    //const infoRelativaU = await getAdditionalUserInfo(result);

    // if (infoRelativaU.isNewUser) {
    //   await setDoc(doc(coleccionUsuario, result.user.email), {
    //     email: result.user.email,
    //     name: result.user.displayName,
    //     picture: result.user.photoURL,
    //   });
    // } else{
    // console.log("LOGIN FAILED, Try Again");
    // }

    

      try {
        const result = await signInWithPopup(auth, googleProvider);
        const coleccionUsuario = collection(db, "Users");
        const querySnapshot = await getDocs(coleccionUsuario);
        const users = querySnapshot.docs.map((doc) => doc.data());
        const currentUser = users.find((user) => user.email === result.user.email);
        if (currentUser) {
          console.log("Inicio de sesión exitoso:", currentUser.name);
          console.log("Usuario autenticado:", result.user.displayName);
          const [user, setUser] = useState(currentUser);
          setUser(currentUser);
          const navigate = useNavigate()
          
          // Aquí puedes realizar acciones después de iniciar sesión exitosamente
        } else {
          console.log("Usuario no encontrado. Inicia sesión con un usuario válido.");}
 
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    
  }

  async function cerrarSesion() {
    await signOut(auth);
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Devuelve una función de limpieza para cancelar la suscripción al cambiar de componente o desmontar
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <div className="formContainer">
          <h1 className="title">Iniciar Sesión</h1>

          <div className="input">
            <label  htmlFor="email">
              <span>Ingrese su correo</span>
            </label>
            <input type="email" name="email" id="email" placeholder="correo@example.com" onChange={onChange} />
          </div>

          <div className="input">
            <label htmlFor="password">
              <span>Ingrese su contraseña</span>
            </label>
            <input type="password" name="password" id="password" placeholder="********" onChange={onChange} />
          </div>

          <button className="submitBtn" type="submit">Iniciar Sesión</button>

          <button className="googleBtn" type="button" onClick={handleClick}>
            Iniciar Sesión con Google
          </button>

          <Link className="redirect" to={"/Register"}>
            ¿Aún no tienes una cuenta? <span>Regístrate</span>
          </Link>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
        
      </form>

      
    </div>
  );
}