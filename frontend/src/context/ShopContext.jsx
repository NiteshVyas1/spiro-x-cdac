import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

 
export const ShopContext = createContext();

const ShopContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState("")
    const navigate = useNavigate();


    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {

            setToken(localStorage.getItem('token'))

        }
    },[])


    const value = {
        navigate, backendUrl,
        setToken, token

    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;