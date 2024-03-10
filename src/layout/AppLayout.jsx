import { useNavigate } from "react-router-dom"
import { useUser } from "../context/User"
import { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

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
        <div>
            <nav>
                <button onClick={cerrarSesion}>Hola</button>
            </nav>
            <main>{children}</main>
        </div>
    )
}