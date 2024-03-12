import { useParams } from "react-router"
import AppLayout from "../layout/AppLayout"
import { useClub } from "../hooks/clubes"
import "./Club.modules.css";
import { useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../context/User";
import { db } from "../firebase";
export default function Club() {
    const { id } = useParams()
    const { user, userData } = useContext(UserContext);
    console.log(id)
    const clubInfo = useClub(id)
    const [afiliados, setClubes] = useState(userData?.afiliados || "");

    const handleSubscription = (clubID) => {
        if (afiliados.includes(clubID)) {
            setClubes(prevAfiliados => prevAfiliados.filter(id => id !== clubID));
        } else {
            setClubes(prevAfiliados => [...prevAfiliados, clubID]);
        }
        window.location.reload();
    };

    useEffect(() => {
        handleSaveChanges();
    }, [afiliados]);
    const handleSaveChanges = async () => {
        console.log(afiliados, "hola")
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
        <div className="container">
            {clubInfo ? (
                <AppLayout>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "center", backgroundColor: "violet" }}>

                        <div key={clubInfo.id}>
                            <div className="tituloclub">{clubInfo.nombre}</div>
                            <div className="infoclub">{clubInfo.descripcion}</div>
                            <div className="containerdatagame">
                                {clubInfo.videojuegos.map((juego, index) => (
                                    <div className="containergame" key={index}>
                                        <div className="titulogame">{juego.titulo}</div>
                                        <div className="descripcion">{juego.descripcion}</div>
                                        <div className="genero">Género: {juego.genero}</div>
                                        <img className="img" src={juego.foto} alt={juego.titulo} />
                                    </div>
                                ))}
                            </div>
                            
                <button onClick={() => handleSubscription(clubInfo.ID)}>
                    {afiliados.includes(clubInfo.ID) ? "Desuscribir" : "Suscribir"}
                </button >
                        </div>
                    </div>
                </AppLayout>
            ) : (
                "Cargando..."
            )}

        </div>

    );
}