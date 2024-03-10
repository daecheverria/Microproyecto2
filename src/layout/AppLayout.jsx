import { useNavigate } from "react-router-dom"
import { useUser } from "../context/User"
import { useEffect } from "react"

export default function AppLayout({children}){
    const user = useUser()
    const navigate = useNavigate()
    // useEffect(()=>{
    //     if(!user){
    //         navigate("/login", {replace: true})
    //     }
    // }, [user, navigate])
    return(
        <div>
            <nav>

            </nav>
            <main>{children}</main>
        </div>
    )
}