import React, {createContext} from "react"
import Store from "../Store/store"
import UserStore from "../Store/userStore"


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const userStore = new UserStore()
    const store = new Store()
    return(
        <AuthContext.Provider value={{store, userStore}} >
            {children}
        </AuthContext.Provider>
    )
}
