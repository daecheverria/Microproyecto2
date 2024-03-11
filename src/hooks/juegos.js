import { useEffect, useState } from "react"
import { getJuego, getJuegoByName, getJuegos } from "../controllers/juego"

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
            setJuego(data)
        }
        load()
    }, [id])
    return juego
}


export function useJuegoByName(nombre){
    const [juego, setJuego] = useState(null)

    useEffect(()=>{
        const load = async()=>{
            const data = await getJuegoByName (nombre)
            setJuego(data)
        }
        load()
    }, [nombre])
    return juego
}