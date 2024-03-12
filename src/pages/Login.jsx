import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider, loginWithEmailAndPassword } from "../firebase";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import "./Login.modules.css";
import { useUserContext } from "../context/User";

export default function Login() {
  
  const navigate = useNavigate();
  const { user} = useUserContext();
  if (user && (user !== undefined)) {
    navigate("/app")
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

      const [user, setUser] =  useState(result.user);
    } else{
    console.log("LOGIN FAILED, Try Again usuario registrado previamente");
    }

        
  }


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
        </div>
        
      </form>

      
    </div>
  );
}