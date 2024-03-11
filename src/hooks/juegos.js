import { useEffect, useState } from "react"
import { getJuego, getJuegos } from "../controllers/juego"

export function useJuegos(){
    const [juegos, setJuego] = useState(null)

    useEffect(()=>{
        const load = async()=>{
            const data = await getJuegos()
            setJuego(data)
        }
        load()
    }, [])
    return juegos
}
export function useJuego(id){
    const [juego, setJuego] = useState(null)

    useEffect(()=>{
        const load = async()=>{
            const data = await getJuego(id)
            console.log(getJuego(id))
            setJuego(data)
        }
        load()
    }, [id])
    return juego
}