import { Link, useNavigate, } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import "./Layaout.modules.css";
import { useUserContext } from "../context/User";
import { useState } from "react";

export default function AppLayout({ children }) {
    async function cerrarSesion() {
        await signOut(auth);
    }

    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Texto del input:", inputText);
    };


    const navigate = useNavigate();
    const  { user } = useUserContext();
  if (!user || user === undefined || user === null) {
    navigate("/")
  }
    return ((
        <div className="layaout" >
            <nav style={{display:"flex",justifyContent:"space-between"}}>
                <Link to="/">
                    <button onClick={cerrarSesion}>Cerrar sesion</button>
                </Link>
                <Link to="/app/perfil">
                    <button >Perfil</button>
                </Link>
                <Link to="/app">
                    <button >Inicio</button>
                </Link>
                <form className="search-bar" onSubmit={handleSubmit}>
                    <input type="text" value={inputText} placeholder="Buscar" onChange={handleInputChange}/>
                    
                    <Link to={`/app/search/${inputText}`}><button type="submit">Buscar</button></Link>
                    
                </form>
                
            </nav>
            <main>{children}</main>
        </div>
    ))

}

export function offAppLayout() {
    const registroSection = document.querySelector(".inicio");
        const bingoSection = document.querySelector(".bingo");
        const ptssection = document.querySelector(".pts");

        registroSection.style.display = "block";
        bingoSection.style.display = "none";
        button.style.display = "block";
        ptssection.style.display = "none"
    
    bingoSection.style.display = "none"}