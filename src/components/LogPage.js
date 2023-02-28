import React, { useEffect, useRef, useState } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

const LogPage = ({ isLogInBox, setIsLogInBox }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  let ref = useRef();

  const handleSignInButton = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };
  const handleSignUpButton = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  useEffect(() => {
    const handler = (event) => {
      if (isLogInBox && ref.current && !ref.current.contains(event.target)) {
        setIsLogInBox(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isLogInBox]);

  return (
    <div className="logIn-container">
      <div className="logInPage" ref={ref}>
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

        <SignUpPage isSignUp={isSignUp} setIsLogInBox={setIsLogInBox} />
        <SignInPage isSignIn={isSignIn} setIsLogInBox={setIsLogInBox} />
      </div>
      <div className="logCover"></div>
    </div>
  );
};

export default LogPage;
