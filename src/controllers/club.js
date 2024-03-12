import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase";
import { getJuego } from "./juego";

export async function getClubes(){
    const clubCollection = collection(db,"Clubes")
    const clubDocs = await getDocs(clubCollection)
    const clubs = await Promise.all(clubDocs.docs.map(async (doc) => {
        const clubData = doc.data();
        const videojuegosCompletos = await Promise.all(clubData.videojuegos.map(async (id) => {
            return await getJuego(id);
        }));
        clubData.videojuegos = videojuegosCompletos;
        return clubData;
    }));
    return clubs;
}

export async function getClub(id) {
    const clubDoc = doc(db, "Clubes", id);
    const clubData = (await getDoc(clubDoc)).data();
    const videojuegosCompletos = await Promise.all(clubData.videojuegos.map(async (id) => {
        return await getJuego(id);
    }));
    clubData.videojuegos = videojuegosCompletos;
    return clubData;
}