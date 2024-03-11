import { useParams } from "react-router"
import AppLayout from "../layout/AppLayout"
import { useClub } from "../hooks/clubes"
import "./Club.modules.css";
import { useJuegos } from "../hooks/juegos";
import { useUser } from "../context/User";
import { getUserData } from "../controllers/user";
import { useEffect, useState } from "react";
export default function Perfil() {
    const { userId } = useParams();
  const juegazos = useJuegos();

  const [user, setUser] = useState(null);
  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await useUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          const userData = await getUserData(user.uid);
          setUserinfo(userData);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserData();
  }, [user]);
  
    console.log(userinfo, "chao");
    return (
        <div className="container">
            <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"violet"}}>
                { userinfo ? (
                
                    <div className="formContainerR">
                        <h1 className="title">PERFIL</h1>
                        <div className="input">
                            <label htmlFor="firstName">Nombre:</label>
                            <input type="text" id="firstName" name="firstName" value="" placeholder={userinfo.firstName} onChange="" />
                            
                        </div>

                        <div className="input">
                            <label htmlFor="lastName">Apellido:</label>
                            <input type="text" id="lastName" name="lastName" value="" placeholder={userinfo.lastName} onChange="" />
                        </div>
            
                        <div className="input">
                            <label htmlFor="favoriteGame">Videojuego preferido:</label>
                            <select id="favoriteGame" name="favoriteGame" value={userinfo.favoriteGame} placeholder={userinfo.favoriteGame} onChange="" >
                            {juegazos?.map((game) => (
                            <option key={game.ID} value={game.titulo}>
                            {game.titulo}
                            </option>
                            ))}
                            </select>
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