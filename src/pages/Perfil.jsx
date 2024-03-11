// import { useEffect, useState } from 'react';
// import { useUser } from '../context/User';
// import { getUserData } from '../controllers/user';
// import AppLayout from '../layout/AppLayout';
// import { useJuegos } from '../hooks/juegos';

// export default function Perfil() {
//   // const user = useUser();
//   // const juegazos = useJuegos();
//   // const [userinfo, setUserinfo] = useState(null);

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     if (user && user.uid) { // Verifica que user y user.uid no sean null antes de acceder a user.uid
//   //       try {
//   //         const userData = await getUserData(user.uid);
//   //         setUserinfo(userData);
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, [user]);

//   // // Solo renderiza el componente si el usuario no es null
//   // if (!user) {
//   //   return null; // O podrías renderizar un mensaje indicando que el usuario no está autenticado
//   // }

//   // console.log(userinfo, "chao");
//   // return (
//   //   <div className="container">
//   //     <AppLayout>
//   //       <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "center", backgroundColor: "violet" }}>
//   //         {userinfo ? (
//   //           <div className="formContainerR">
//   //             <h1 className="title">PERFIL</h1>
//   //             <div className="input">
//   //               <label htmlFor="firstName">Nombre:</label>
//   //               <input type="text" id="firstName" name="firstName" value="" placeholder={userinfo.firstName} onChange="" />
//   //             </div>

//   //             <div className="input">
//   //               <label htmlFor="lastName">Apellido:</label>
//   //               <input type="text" id="lastName" name="lastName" value="" placeholder={userinfo.lastName} onChange="" />
//   //             </div>

//   //             <div className="input">
//   //               <label htmlFor="favoriteGame">Videojuego preferido:</label>
//   //               <select id="favoriteGame" name="favoriteGame" value={userinfo.favoriteGame} placeholder={userinfo.favoriteGame} onChange="">
//   //                 {juegazos?.map((game) => (
//   //                   <option key={game.ID} value={game.titulo}>
//   //                     {game.titulo}
//   //                   </option>
//   //                 ))}
//   //               </select>
//   //             </div>
//   //           </div>
//   //         ) : (
//   //           "Cargando..."
//   //         )}
//   //       </div>
//   //     </AppLayout>
//   //   </div>
//   // );
// }
