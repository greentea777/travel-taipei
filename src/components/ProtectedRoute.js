import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authUser }) => {
  if (!authUser) {
    return (
      <h1 className="login-notification">
        Please sign in to access the favourite list
      </h1>
    );
  }
  return children;
};

export default ProtectedRoute;
