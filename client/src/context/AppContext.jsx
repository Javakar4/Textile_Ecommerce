import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from '../assets/assets'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);

    const value = { navigate, user, setUser, admin, setAdmin, showUserLogin, setShowUserLogin, assets};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const UseAppContext = () => {
    return useContext(AppContext);
};
