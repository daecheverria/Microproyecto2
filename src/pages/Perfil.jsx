import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { UserContext } from '../context/User';
import AppLayout from '../layout/AppLayout';
import { useJuegos } from '../hooks/juegos';

export default function Perfil() {
  const { user, userData, loading, isLoadingUserData } = useContext(UserContext);
  const juegazos = useJuegos();

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [favoriteGame, setFavoriteGame] = useState(userData?.favoriteGame || "");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleLastFavoriteGame = (e) => {
    setFavoriteGame(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        firstName,
        lastName,
        favoriteGame
      });
      console.log("Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
    }
  };

  return (
    <div className="container">
      {userData ? (
      <AppLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "center", backgroundColor: "violet", width: "auto",height:"auto" }}>
          
            <div className="formContainerR">
              <h1 className="title">PERFIL</h1>
              <div className="input">
                <label htmlFor="firstName">Nombre:</label>
                <input type="text" id="firstName" name="firstName" value={firstName} placeholder={userData.firstName} onChange={handleFirstNameChange} />
              </div>

              <div className="input">
                <label htmlFor="lastName">Apellido:</label>
                <input type="text" id="lastName" name="lastName" value={lastName} placeholder={userData.lastName} onChange={handleLastNameChange} />
              </div>

              <div className="input">
                <label htmlFor="favoriteGame">Videojuego preferido:</label>
                <select id="favoriteGame" name="favoriteGame" value={favoriteGame} placeholder={userData.favoriteGame} onChange={handleLastFavoriteGame}>
                  {juegazos?.map((game) => (
                    <option key={game.ID} value={game.titulo}>
                      {game.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleSaveChanges}>Guardar Cambios</button>
            </div>
            </div>
      </AppLayout>) : (
            "Cargando..."
          )}
        
    </div>
  );
}