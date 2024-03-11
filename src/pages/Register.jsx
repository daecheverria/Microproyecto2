import { Link, Navigate, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAdditionalUserInfo, signInWithPopup, signOut, updateProfile } from "firebase/auth"

import { auth, db, googleProvider } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import {useJuegos} from "../hooks/juegos";
import "./Register.modules.css";
import { useUserContext } from "../context/User";


function Register() {
  
const navigate = useNavigate()
  const { user } = useUserContext();
  if (user) {
    navigate("/app")
  }
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
const handleSubmit = async(event) => {
  if (username.trim() === ''|| firstName.trim() === '' || lastName.trim() === ''|| email.trim() === ''|| password.trim() === '' || favoriteGame.trim() === '' ) {
    alert('El nombre de usuario no puede estar vacío');
    return;
  }
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
//await signInWithPopup(auth, googleProvider);
//Navigate('/app');

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