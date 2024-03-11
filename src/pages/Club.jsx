import { useParams } from "react-router"
import AppLayout from "../layout/AppLayout"
import { useClub } from "../hooks/clubes"
import "./Club.modules.css";
export default function Club() {
    const { id } = useParams()
    console.log(id)
    const clubInfo = useClub(id)

    return (
        <div className="container">
            <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet"}}>
                {clubInfo ? (
                    <div key={clubInfo.id}>
                        <div className="tituloclub">{clubInfo.nombre}</div>
                        <div className="infoclub">{clubInfo.descripcion}</div>
                        <div className="containerdatagame">
                            {clubInfo.videojuegos.map((juego, index) => (
                                <div className="containergame" key={index}>
                                    <div className="titulogame">{juego.titulo}</div>
                                    <div className="descripcion">{juego.descripcion}</div>
                                    <div className="genero">Género: {juego.genero}</div>
                                    <img src={juego.foto} alt={juego.titulo} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    "Cargando..."
                )}
            </div>
        </AppLayout>
        </div>
        
    );
}