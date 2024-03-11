import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

export async function getJuegos(){
    const juegosCollection = collection(db,"Videojuegos")
    const juegosDocs = await getDocs(juegosCollection)
    const juegos = juegosDocs.docs.map((doc)=>doc.data())
    return juegos
}

export async function getJuego(id){
    const juegoCollection = doc(db,"Videojuegos",id)
    const juegoDocs = await getDoc(juegoCollection)
    const juego = juegoDocs.data()
    console.log(juego)
    return juego
}