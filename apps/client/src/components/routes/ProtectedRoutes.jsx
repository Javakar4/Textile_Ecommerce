import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoutes() {
    const { user } = useAuth();
    const token = localStorage.getItem("authToken");

    // If a token exists, allow access even while AuthContext hydrates user state
    if (token) {
        return <Outlet />;
    }

    // No token and no user — redirect to auth
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}