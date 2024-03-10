
import { useClubes } from "../hooks/clubes"
import AppLayout from "../layout/AppLayout"

export default function App(){
    const clubes = useClubes()
    return (
        <AppLayout>
            <div style={{display:"flex", flexDirection: "column", gap:20}}>
            {clubes?(
                clubes?.map(club=>
            <div key={club.id}>
                <div>{club.nombre}</div>
                <div>{club.descripcion}</div>
            </div>)):(
                "Cargando..."
            )}
            </div>
        </AppLayout>)
}