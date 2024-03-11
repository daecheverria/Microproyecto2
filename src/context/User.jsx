import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth, db } from "../firebase";
import { doc, getDoc } from "@firebase/firestore";
export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
    const [user, loading] = useAuthState(auth); 

    const [userData, setUserData] = useState(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                setIsLoadingUserData(true);
                try {
                    const userRef = doc(db, "Users", user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists) {
                        setUserData(userDoc.data());
                    } else {
                        console.log("No se encontraron datos para el usuario en Firestore.");
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                }
                setIsLoadingUserData(false);
            }
        };

        fetchUserData();
    }, [user]);
    console.log(userData,"hola")
    return (
        <UserContext.Provider
            value={{
                user,
                userData,
                loading,
                isLoadingUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
