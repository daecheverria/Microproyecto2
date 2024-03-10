import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

export async function getClubes(){
    const clubCollection = collection(db,"Clubes")
    const clubDocs = await getDocs(clubCollection)
    const club = clubDocs.docs.map((doc)=>doc.data())
    return club
}

export async function getClub(id){
    const clubCollection = doc(db,"Clubes",id)
    const clubDocs = await getDoc(clubCollection)
    const club = clubDocs.data()
    console.log(club)
    return club
}