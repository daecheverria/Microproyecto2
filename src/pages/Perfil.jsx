
import { useUserContext } from '../context/User';
import AppLayout from '../layout/AppLayout';
import { useJuegos } from '../hooks/juegos';

export default function Perfil() {
  const juegazos = useJuegos();
  const {userData} = useUserContext()
  return (
    <div className="container">
      <AppLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "center", backgroundColor: "violet" }}>
          {userData ? (
            <div className="formContainerR">
              <h1 className="title">PERFIL</h1>
              <div className="input">
                <label htmlFor="firstName">Nombre:</label>
                <input type="text" id="firstName" name="firstName" value="" placeholder={userData.firstName} onChange="" />
              </div>

              <div className="input">
                <label htmlFor="lastName">Apellido:</label>
                <input type="text" id="lastName" name="lastName" value="" placeholder={userData.lastName} onChange="" />
              </div>

              <div className="input">
                <label htmlFor="favoriteGame">Videojuego preferido:</label>
                <select id="favoriteGame" name="favoriteGame" value={userData.favoriteGame} placeholder={userData.favoriteGame} onChange="">
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
