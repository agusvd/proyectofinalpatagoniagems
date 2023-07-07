import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
    console.log(token);

    if (token) {
        const decodedToken = jwtDecode(token.split('=')[1].trim());
        const isAdmin = decodedToken.isAdmin; // Verificar el valor del campo 'isAdmin'
        return isAdmin; // Devolver true si es un administrador, de lo contrario, devolver false
    }

    return false; // Si no hay token, no es un administrador
};

const PrivateRoute = () => {
    const auth = useAuth();
    console.log(auth);

    return auth ? <Outlet /> : <Navigate to="/404" />;
};

export default PrivateRoute;
