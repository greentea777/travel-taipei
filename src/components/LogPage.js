import React, { useState } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

const LogPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignInButton = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };
  const handleSignUpButton = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  return (
    <div className="logIn-container">
      <div className="logInPage">
        <button
          className={`swichInButton ${isSignIn ? "show" : ""}`}
          onClick={handleSignInButton}
        >
          Sign In
        </button>
        <button
          className={`swichUpButton ${isSignUp ? "show" : ""}`}
          onClick={handleSignUpButton}
        >
          Sign Up
        </button>

        <SignUpPage isSignUp={isSignUp} />
        <SignInPage isSignIn={isSignIn} />
      </div>
      <div className="logCover"></div>
    </div>
  );
};

export default LogPage;
