import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,isAuthenticated }) => {

  console.log("isAuthenticated===>>>>", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
