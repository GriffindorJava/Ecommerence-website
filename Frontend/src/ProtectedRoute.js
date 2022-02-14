import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ path, component: RouteComponent }) => {
    const auth = useSelector((state) => state.auth);

    if(auth.isLoggedIn){
        return <RouteComponent/>
    }
    return <Navigate to="/" />
};

export default ProtectedRoute;