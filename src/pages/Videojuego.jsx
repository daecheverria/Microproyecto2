import { useParams } from "react-router"
import AppLayout from "../layout/AppLayout"
import { useClub } from "../hooks/clubes"
import "./Club.modules.css";
import { useJuegoByName } from "../hooks/juegos";
export default function Videojuego() {
    const { nombre } = useParams()
    console.log(nombre)
    const juegoInfo = useJuegoByName(nombre)

    return (
        <div className="container">
            <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet"}}>
                {juegoInfo ? (
                    <div key={juegoInfo.id}>
                        <div className="tituloclub">{juegoInfo.titulo}</div>
                        <div className="infoclub">{juegoInfo.descripcion}</div>
                    </div>
                ) : (
                    "Cargando..."
                )}
            </div>
        </AppLayout>
        </div>
        
    );
}