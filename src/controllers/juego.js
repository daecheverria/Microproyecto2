import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
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
    return juego
}

export async function getJuegoByName(nombre) {
    const videojuegosRef = collection(db, "Videojuegos");
    const q = query(videojuegosRef, where("titulo", "==", nombre));
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No se encontró ningún juego con ese nombre.");
        return null;
      }
  
      const juego = querySnapshot.docs[0].data();
      return juego;
    } catch (error) {
      console.error("Error al obtener el juego:", error);
      return null;
    }
  }