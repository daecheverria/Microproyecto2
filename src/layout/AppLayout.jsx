import { Link, useNavigate, } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import "./Layaout.modules.css";
import { useUserContext } from "../context/User";

export default function AppLayout({ children }) {
    async function cerrarSesion() {
        await signOut(auth);
    }
    const navigate = useNavigate();
    const  { user } = useUserContext();
  if (!user || user === undefined || user === null) {
    navigate("/Login")
  }
    return ((
        <div className="layaout">
            <nav style={{display:"flex",justifyContent:"space-between"}}>
                <Link to="/login">
                    <button onClick={cerrarSesion}>Cerrar sesion</button>
                </Link>
                <Link to="/app/perfil">
                    <button >Perfil</button>
                </Link>
                <Link to="/app">
                    <button >Inicio</button>
                </Link>
                <div className="search-bar">
                    <input type="text" placeholder="Buscar"/>
                    <Link to={`/app/search/${user}`}><button type="submit">Buscar</button></Link>
                    
                </div>
                
            </nav>
            <main>{children}</main>
        </div>
    ))

}