import { createContext, useState,useContext } from "react";

let UserAuth = createContext()

export let UserProvider = ({children}) =>{

    let [condata,setcondata] = useState({
        isLoggedIn:false,
        userName:null,
        userId:null,
        userData:null
    })  
    console.log('context says ', condata)
    
    let logout = ()=>{
        setcondata(
            {
                isLoggedIn:false,
                userName:null,
                userId:null,
                userData:null
            }
        )
    }

    return <UserAuth.Provider value = {{condata,setcondata,logout}}>
        {children}
    </UserAuth.Provider>

}

export let authUser= ()=> useContext(UserAuth)