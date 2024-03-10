import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

export async function getJuegos(){
    const juegosCollection = collection(db,"Videojuegos")
    const juegosDocs = await getDocs(juegosCollection)
    const juegos = juegosDocs.docs.map((doc)=>doc.data())
    return juegos
}

export async function getJuego(id){
    const juegoCollection = collection(db,"Videojuegos")
    const juegoDocs = await getDocs(juegoCollection, id)
    const juego = juegoDocs.data()
    return juego
}
