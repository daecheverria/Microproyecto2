
import { useClubes } from "../hooks/clubes"
import AppLayout from "../layout/AppLayout"

export default function App(){
    const clubes = useClubes()
    return (<div   style={{backgroundColor:"red"}}>
        <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20, textAlign:"center" ,backgroundColor:"cyan"}}>
            {clubes?(
                clubes?.map(club=>
            <div key={club.id} style={{margin:10}}>
                <div>{club.nombre}</div>
                <div>{club.descripcion}</div>
            </div>)):(
                "Cargando..."
            )}
            </div>
        </AppLayout></div>)
}