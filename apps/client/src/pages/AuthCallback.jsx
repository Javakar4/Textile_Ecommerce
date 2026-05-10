import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { parseJwt } from "../utils/authUtils";

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            // Save token
            localStorage.setItem("authToken", token);

            // Decode user info
            const decoded = parseJwt(token);
            if (decoded) {
                setUser(decoded);
            }

            // Redirect to home or intended page
            navigate("/");
        } else {
            // Handle error or missing token
            console.error("No token found in callback URL");
            navigate("/auth");
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl">Processing login...</div>
        </div>
    );
};

export default AuthCallback;
