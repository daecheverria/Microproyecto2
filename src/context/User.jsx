import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { getUserById } from "./userss";


export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [name, setName] = useState(null);
    const [userbd, setUserbd] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            setIsLoadingUser(true);
            if (firebaseUser) {
                setUser(firebaseUser);
                const user = await getUserById(firebaseUser.uid);
                console.log(firebaseUser, "hola");
                if (!firebaseUser.emailVerified) {

                    setUserbd(user._document.data.value.mapValue.fields);
                   
                    setName(user._document.data.value.mapValue.fields.firstName.stringValue);
                    console.log(user._document.data.value.mapValue.fields.firstName.stringValue);
                }

            } else {
                setUser(null);
            }
            setIsLoadingUser(false);
        });
    }, []);
    console.log(user)
    console.log(userbd, "jola")
    return (
        <UserContext.Provider
            value={{
                user,
                name,
                setUser,
                isLoadingUser,
                setIsLoadingUser,
                userbd
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}