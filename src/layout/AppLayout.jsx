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
    const { user } = useUserContext();
  if (!user) {
    navigate("/login")
  }
    return (
        <div className="layaout">
            <nav>
                <Link to="/login">
                    <button onClick={cerrarSesion}>Cerrar sesion</button>
                </Link>
                <Link to="/app/perfil">
                    <button >Perfil</button>
                </Link>

            </nav>
            <main>{children}</main>
        </div>
    )
}