import "./App.modules.css";
import { useClubes } from "../hooks/clubes"
import AppLayout from "../layout/AppLayout"
import { Link } from "react-router-dom";

export default function App(){
    const clubes = useClubes()
    return (
    <div   className="container">
        <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet"}}>
            {clubes?(
                clubes?.map(club=>
            <div className="clubes" key={club.ID} >
                <div>{club.nombre}</div>
                <div>{club.descripcion}</div>
                <div>
                <button>
                    Suscribir
                </button>
                <Link to={`/app/clubes/${club.ID}`}><button>
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