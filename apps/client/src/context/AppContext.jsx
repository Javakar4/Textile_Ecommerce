import { createContext, useState } from "react";
import assets from '../assets/assets'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const value = {
        assets, 
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

