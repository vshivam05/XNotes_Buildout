// import { children } from "react";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token , setToken]=useState(localStorage.getItem("token") || "");
    const [user, setUser]= useState(JSON.parse(localStorage.getItem("user")) || {});
       

    
    
    const login = (newToken, newUser)=>{
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        setToken(newToken);

        
        
    }
    
    
    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser({});
    }





    return (
       
        < AuthContext.Provider value={{token, user, login, logout}} >
        {children}
        </AuthContext.Provider>

    )



}


export const useAuth = () => useContext(AuthContext);