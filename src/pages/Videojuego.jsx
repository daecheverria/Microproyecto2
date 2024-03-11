import { useParams } from "react-router"
import AppLayout from "../layout/AppLayout"
import { useClub } from "../hooks/clubes"
import "./Club.modules.css";
import { useJuegoByName } from "../hooks/juegos";
export default function Videojuego() {
    const { nombre } = useParams()
    const juegoInfo = useJuegoByName(nombre)

    return (
        <div className="container">
            {juegoInfo ? (
            <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet"}}>
                
                    <div className="containergame" key={juegoInfo.id}>
                        <div className="tituloclub">{juegoInfo.titulo}</div>
                        <div className="infoclub">{juegoInfo.descripcion}</div>
                        <div className="genero">Género: {juegoInfo.genero}</div>
                        <img className="imgS" src={juegoInfo.foto} alt={juegoInfo.titulo} />
                    </div>
                    </div>
            </AppLayout>
                ) : (
                    "JUEGO NO ENCONTRADO"
                )}
         
        </div>
        
    );
}