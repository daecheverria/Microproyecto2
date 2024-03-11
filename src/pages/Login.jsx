import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider, loginWithEmailAndPassword } from "../firebase";
import { getAdditionalUserInfo, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import "./Login.modules.css";
import { useUserContext } from "../context/User";

export default function Login() {
  
  const navigate = useNavigate();
  const { user} = useUserContext();
  if (user && (user !== undefined)) {
    navigate("/app")
  } else {
    navigate("/Login")
  }

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

    
    
        // const result = await signInWithRedirect(auth, googleProvider);
        // const coleccionUsuario = collection(db, "Users");
        // const querySnapshot = await getDocs(coleccionUsuario);
        // const userss = await querySnapshot.docs.map((doc) => doc.data());
        // const currentUser2 = await userss.find((user) => user.email === result.user.email);
        // if (await currentUser2) {
        //   console.log("Inicio de sesión exitoso:", currentUser2.name);
        //   console.log("Usuario autenticado:", result.user.displayName);
        //   const [user, setUser] =  useState(currentUser2);
        //   //setUser(currentUser);
        //   //const navigate = useNavigate()
          
        //   // Aquí puedes realizar acciones después de iniciar sesión exitosamente
        // }else{
        //   await signOut(auth)
        //   alert("Usuario No esta en la base de datos, por favor registrese")
        // }

      // const [user, setUser] = useState(null)
    const result = await signInWithPopup(auth, googleProvider);
    const coleccionUsuario = collection(db, "Users");
    const infoRelativaU = await getAdditionalUserInfo(result);

    if (infoRelativaU.isNewUser) {

      const fullName = result.user.displayName;
      const namesArray = fullName.split(' ');

      const firstName2 = namesArray[0];
      const lastName2 = namesArray.slice(1).join(' ');

      const email = result.user.email;
      const emailArray = email.split('@');

      const username2 = emailArray[0];

      await setDoc(doc(coleccionUsuario, result.user.uid), {
        afiliados: [],
        email: result.user.email,
        favoriteGame: "",
        firstName: firstName2,
        lastName: lastName2,
        username: username2
      });

      // const querySnapshot = await getDocs(coleccionUsuario);
      // const userss = await querySnapshot.docs.map((doc) => doc.data());
      // const currentUser2 = await userss.find((user) => user.email === result.user.email);
      //   if (await currentUser2) {
      //     console.log("Inicio de sesión exitoso:", currentUser2.name);
      //     console.log("Usuario autenticado:", result.user.displayName);
      //     const [user, setUser] =  useState(currentUser2);

      const [user, setUser] =  useState(result.user);
    } else{
    console.log("LOGIN FAILED, Try Again usuario registrado previamente");
    }

        
  }

  // async function cerrarSesion() {
  //   await signOut(auth);
  //   setUser(null);
  // }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   Devuelve una función de limpieza para cancelar la suscripción al cambiar de componente o desmontar
  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <div className="formContainer" style={{display:"flex"}}>
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
            <input type="password" name="password" id="password" placeholder="**" onChange={onChange} />
          </div>

          <button className="submitBtn" type="submit">Iniciar Sesión</button>

          <button className="googleBtn" type="button" onClick={handleClick}>
            Iniciar Sesión con Google
          </button>

          <Link className="redirect" to={"/Register"}>
            ¿Aún no tienes una cuenta? <span>Regístrate</span>
          </Link>
          {/* <button onClick={cerrarSesion}>Cerrar sesión</button> */}
        </div>
        
      </form>

      
    </div>
  );
}