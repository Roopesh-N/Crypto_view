import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto=createContext();

const CryptoContext = ({children}) => {
    const [currency, setcurrency] = useState("USD");
    const [symbol, setsymbol] = useState("$");
    
    useEffect(()=>{
        if(currency==="USD") setsymbol("$");
        else if(currency==="INR") setsymbol("Rs");
    },[currency])



  return <Crypto.Provider value={{currency,setcurrency,symbol}}>{children}</Crypto.Provider>
  
}

export const CryptoState=()=>{

    return useContext(Crypto);
}

export default CryptoContext