import "./App.modules.css";
import { useClubes } from "../hooks/clubes"
import AppLayout from "../layout/AppLayout"
import { Link } from "react-router-dom";

export default function App(){
    const clubes = useClubes()
    return (
    <div   className="containerapp">
        <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet" , width: "auto", height:"auto"}}>
            {clubes?(
                clubes?.map(club=>
            <div className="clubes" key={club.ID} >
                <div>{club.nombre}</div>
                <div>{club.descripcion}</div>
                <div className="buttoncontainer">
                <button className="">
                    Suscribir
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
        </AppLayout>
    </div>)
}