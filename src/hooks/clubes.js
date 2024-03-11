import { useEffect, useState } from "react"
import { getClub, getClubes } from "../controllers/club"
import { doc, getDoc } from "@firebase/firestore"
import { db } from "../firebase"

export function useClubes(){
    const [clubes, setClub] = useState(null)

    useEffect(()=>{
        const load = async()=>{
            const data = await getClubes()
            setClub(data)
        }
        load()
    }, [])
    return clubes
}
export function useClub(id){
    const [club, setClub] = useState(null)

    useEffect(()=>{
        const load = async()=>{
            const data = await getClub(id)
            console.log(getClub(id))
            setClub(data)
        }
        load()
    }, [id])
    return club
}

export function useClubGames(id){
    const [club, setClub] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getClub(id);
      setClub(data);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (club && club.videojuegos) {
      const loadGames = async () => {
        const gamePromises = club.videojuegos.map(async (gameId) => {
          const game = await getGame(gameId);
          return game;
        });
        const gameNames = await Promise.all(gamePromises);
        setGames(gameNames);
      };
      loadGames();
    }
  }, [club]);
  return games;
}

async function getGame(gameId) {
    try {
      const gameDocRef = doc(db, "Videojuegos", gameId); // Suponiendo que "games" es la colección en la base de datos que contiene los juegos
      const gameDocSnapshot = await getDoc(gameDocRef);
      
      if (gameDocSnapshot.exists()) {
        const gameData = await gameDocSnapshot.data();
        await console.log(`${gameData.titulo}`)
        // Aquí puedes realizar cualquier transformación o procesamiento adicional de los datos del juego si es necesario
        return gameData;
      } else {
        // El documento del juego no existe
        throw new Error("El juego no fue encontrado.");
      }
    } catch (error) {
      console.error("Error al obtener el juego:", error);
      throw error;
    }
  }

  export function useClubGames2(club){
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (club && club.videojuegos) {
      const loadGames = async () => {
        const gamePromises = club.videojuegos.map(async (gameId) => {
          const game = await getGame(gameId);
          console.log(game.titulo)
          return game;
        });
        const gameNames = await Promise.all(gamePromises);
        setGames(gameNames);
      };
      loadGames();
    }
  }, [club]);
  return games;
}