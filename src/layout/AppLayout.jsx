import { Link,  } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import "./Layaout.modules.css";

export default function AppLayout({children}){
    async function cerrarSesion() {
        await signOut(auth);
      }
    return(
        <div className="layaout">
            <nav>
                <button onClick={cerrarSesion}>Cerrar sesion</button>
                <Link to="/app/perfil">
                <button >Perfil</button>
                </Link>
                
            </nav>
            <main>{children}</main>
        </div>
    )
}