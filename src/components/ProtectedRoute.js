import React from "react";

const ProtectedRoute = ({ children, authUser }) => {
  if (!authUser) {
    return (
      <h1 className="login-notification">
        Please signin to access the favourite list.
      </h1>
    );
  }
  return children;
};

export default ProtectedRoute;
