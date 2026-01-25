import { createContext, useState, useEffect } from "react";
import assets from '../assets/assets';
import { parseJwt, isTokenExpired } from "../utils/authUtils";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAddresses, setUserAddresses] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        // Optional: clear other local storage if needed
    };

    const checkTokenExpiration = () => {
        const token = localStorage.getItem("authToken");
        
        // No token found
        if (!token) {
            setUser(null);
            return;
        }

        // Check if expired using util
        if (isTokenExpired(token)) {
            logout();
        } else {
            // Token is valid
            // If user state is not set, initialize it from token
            if (!user) {
                const decoded = parseJwt(token);
                if (decoded) {
                    setUser(decoded);
                }
            }
        }
    };

    useEffect(() => {
        checkTokenExpiration();
        // Check every 2 minutes (120000 ms)
        const interval = setInterval(checkTokenExpiration, 120000);
        return () => clearInterval(interval);
    }, []);

    const value = {
        user, setUser,
        userAddresses,setUserAddresses,
        admin, setAdmin,
        showUserLogin, setShowUserLogin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
