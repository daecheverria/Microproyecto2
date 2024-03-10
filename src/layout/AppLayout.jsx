import { useNavigate } from "react-router-dom"
import { useUser } from "../context/User"
import { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import "./Layaout.modules.css";

export default function AppLayout({children}){
    const user = useUser()
    console.log({user})
    // const navigate = useNavigate()
    // useEffect(()=>{
    //      if(!user){
    //          navigate("/login", {replace: true})
    //      }
    //  }, [user, navigate])

    async function cerrarSesion() {
        await signOut(auth);
      }
    
    return(
        <div className="layaout">
            <nav>
                <button onClick={cerrarSesion}>Cerrar sesion</button>
            </nav>
            <main>{children}</main>
        </div>
    )
}