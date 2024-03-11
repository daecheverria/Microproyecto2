import "./App.modules.css";
import { useClubes } from "../hooks/clubes"
import AppLayout from "../layout/AppLayout"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function App(){
    const clubes = useClubes();
    const { user,  userData } = useContext(UserContext);
    
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [afiliados, setClubes] = useState(userData?.afiliados || "");
  console.log(firstName,afiliados)

    const handleSubscription = (clubID) => {
        if (afiliados.includes(clubID)) {
          setClubes(afiliados.filter((id) => id !== clubID));
        } else {
          setClubes([...afiliados, clubID]);
        }
        handleSaveChanges()
      };
      useEffect(() => {
        if (userData) {
          setClubes(userData.afiliados || "");
        }
      }, [userData]);

      const handleSaveChanges = async () => {
        try {
          const userRef = doc(db, "Users", user.uid);
          await updateDoc(userRef, {
            afiliados
          });
          console.log("Datos actualizados correctamente.");
        } catch (error) {
          console.error("Error al actualizar datos del usuario:", error);
        }
      };
    return (
    <div   className="containerapp">
        <AppLayout>
        {clubes ? (
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet" , width: "auto", height:"auto"}}>
            {userData?(
                clubes?.map(club=>
            <div className="clubes" key={club.ID} >
                <div>{club.nombre}</div>
                <div>{club.descripcion}</div>
                <div className="buttoncontainer">
                <button onClick={() => handleSubscription(club.ID)}>
                    {afiliados.includes(club.ID) ? "Desuscribir" : "Suscribir"}
                    
   { console.log(firstName, afiliados)}
                </button >
                <Link className="buttonlink" to={`/app/clubes/${club.ID}`}>
                <button className="botonver">
                    Ver
                </button></Link>
                
                </div>
            </div>)):(
                "Cargando..."
            )}
            </div>
            ) : (
                "Cargando..."
              )}
        </AppLayout>
    </div>)
}