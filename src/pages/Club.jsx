import { useParams } from "react-router"
import AppLayout from "../layout/AppLayout"
import { useClub } from "../hooks/clubes"

export default function Club(){
    const {id} = useParams()
    console.log(id)
    const clubInfo = useClub(id)
    return (
        <AppLayout>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {clubInfo ? ( 
                    <div key={clubInfo.id}>
                        <div>{clubInfo.nombre}</div>
                        <div>{clubInfo.descripcion}</div>
                    </div>
                ) : (
                    "Cargando..."
                )}
            </div>
        </AppLayout>
    );
}