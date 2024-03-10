import { createContext, useContext } from "react";

export const UserContext = createContext()

export function useUser(){
    const user = useContext(UserContext)
    return user
}