import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, actions as boundActionsCreator } from "../store";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    const actions = boundActionsCreator(dispatch);

    return (
        <GlobalContext.Provider value={{ store, actions }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalReducer debe ser usado dentro de un GlobalProvider');
    }
    return context;
}