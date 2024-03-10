import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"

import { auth, db, googleProvider } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";

function Register() {
const [formData, setFormData] = useState({
firstName: "",
lastName: "",
username: "",
email: "",
password: "",
favoriteGame: ""
});

const [games, setGames] = useState(["Mortal Kombat"]);

useEffect(() => {
// Obtiene la lista de videojuegos desde Firestore
const fetchGames = async () => {
try {
const gamesRef = collection(db, "Videojuegos");
const snapshot = await gamesRef.get();
const gamesList = snapshot.docs.map((doc) => doc.data().name);
setGames(gamesList);
} catch (error) {
console.log("Error al obtener la lista de videojuegos", error);
}
};

fetchGames();

}, []);

const handleSubmit = async(event) => {
event.preventDefault();
// Aquí puedes agregar la lógica para enviar los datos del formulario a Firestore
const { firstName, lastName, username, email, password, favoriteGame } = formData;

try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;

  // Agregar el userId al perfil del usuario en Auth
  //await updateProfile(auth.currentUser, { userId });


  await addDoc(collection(auth, "Users"), userCredential);

  console.log("Usuario registrado exitosamente");
} catch (error) {
  console.log("Error al registrar el usuario", error);
}

const user = {
  firstName,
  lastName,
  username,
  email,
  password,
  favoriteGame
};

// Guarda el usuario en Firestore
addDoc(collection(db, "Users"), user)
  .then(() => {
    console.log("Usuario registrado exitosamente");
  })
  .catch((error) => {
    console.log("Error al registrar el usuario", error);
  });

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
Navigate('/Homepage');
};

return (
<div>
<h1>Registro</h1>
<form onSubmit={handleSubmit}>
<div>
<label htmlFor="firstName">Nombre:</label>
<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
</div>
<div>
<label htmlFor="lastName">Apellido:</label>
<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
</div>
<div>
<label htmlFor="username">Nombre de usuario:</label>
<input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
</div>
<div>
<label htmlFor="email">Correo electrónico:</label>
<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
</div>
<div>
<label htmlFor="password">Contraseña:</label>
<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
</div>
<div>
<label htmlFor="favoriteGame">Videojuego preferido:</label>
<select id="favoriteGame" name="favoriteGame" value={formData.favoriteGame} onChange={handleChange} >
<option value="">Selecciona un videojuego</option>
{games.map((game) => (
<option key={game} value={game}>
{game}
</option>
))}
</select>
</div>
<button type="submit">Registrarse</button>
dust

  </form>
  <button type="button" onClick={handleGoogleClick}>Registrarse con Google</button>
                <Link to={"/Login"}>
                ¿Ya tines una cuenta? {" "}
                    <span>Iniciar Sesión</span>
                </Link>
</div>

);
}

export default Register;