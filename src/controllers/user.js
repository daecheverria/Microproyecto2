import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";

export async function getUserData(uid) {
    try {
        const userDoc = doc(db, "Users", uid);
        const userData = (await getDoc(userDoc)).data();
        return userData;
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        return null;
    }
}