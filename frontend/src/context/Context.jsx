import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";


const Context = createContext()

export const ContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    
    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
}

export const State = () => useContext(Context)