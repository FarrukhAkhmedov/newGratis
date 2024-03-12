import React, { createContext } from "react";
import AuthStore from "../Store/authStore";
import PostStore from "../Store/postStore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const authStore = new AuthStore();
    const postStore = new PostStore();
    return (
        <AuthContext.Provider value={{ authStore, postStore }}>
            {children}
        </AuthContext.Provider>
    );
};
