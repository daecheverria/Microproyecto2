import { Link, Navigate, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"

import { auth, db, googleProvider } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import {useJuegos} from "../hooks/juegos";
import "./Register.modules.css";


function Register() {
const [formData, setFormData] = useState({
firstName: "",
lastName: "",
username: "",
email: "",
password: "",
favoriteGame: "",
afiliados: []
});

const juegazos = useJuegos();
const navigate = useNavigate()
const handleSubmit = async(event) => {
event.preventDefault();
// Aquí puedes agregar la lógica para enviar los datos del formulario a Firestore
const { firstName, lastName, username, email, password, favoriteGame, afiliados} = formData;

try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;

  const user = {
    firstName,
    lastName,
    username,
    email,
    favoriteGame,
    afiliados
  };
  await setDoc(doc(db, "Users", userId), user);
  
  console.log("Usuario registrado exitosamente en auth y Firestore");
  
  navigate("/app", {replace: true})
} catch (error) {
  console.log("Error al registrar el usuario en auth y Firestore", error);
}
};

const handleChange = (event) => {
const { name, value } = event.target;
setFormData((prevData) => ({
...prevData,
[name]: value
}));
};

const handleGoogleClick = async () => {
await signInWithPopup(auth, googleProvider);
Navigate('/app');
};

return (
    <div className="container">
      
    <form className="formR" onSubmit={handleSubmit}>
      <div className="formContainerR">
        <h1 className="title">Registro</h1>
        <div className="input">
          <label htmlFor="firstName">Nombre:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="Nombre" onChange={handleChange} />
        </div>

      <div className="input">
        <label htmlFor="lastName">Apellido:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>

      <div className="input">
        <label htmlFor="username">Nombre de usuario:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
      </div>

      <div className="input">
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      
      <div className="input">
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      
      <div className="input">
        <label htmlFor="favoriteGame">Videojuego preferido:</label>
        <select id="favoriteGame" name="favoriteGame" value={formData.favoriteGame} onChange={handleChange} >
        {juegazos?.map((game) => (
        <option key={game.ID} value={game.titulo}>
        {game.titulo}
        </option>
        ))}
        </select>
      </div>

      <button className="submitBtn" type="submit">Registrarse</button>
      <button className="googleBtn" type="button" onClick={handleGoogleClick}>Registrarse con Google</button>
      <Link className="redirect" to={"/Login"}>
                ¿Ya tines una cuenta? {" "}
                    <span className="txt">Iniciar Sesión</span>
                </Link>
      </div>
  </form>
  
               
</div>

);
}

export default Register;