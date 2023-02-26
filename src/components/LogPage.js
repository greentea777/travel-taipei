import React from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import AuthDetails from "./AuthDetails";

const LogPage = () => {
  return (
    <div className="logInPage">
      <SignUpPage />
      <SignInPage />
      <AuthDetails />
    </div>
  );
};

export default LogPage;
