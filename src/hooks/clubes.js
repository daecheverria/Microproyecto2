import { useEffect, useState } from "react"
import { getClub, getClubes } from "../controllers/club"

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