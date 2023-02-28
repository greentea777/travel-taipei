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
        <span
          className={`swichInButton ${isSignIn ? "show" : ""}`}
          onClick={handleSignInButton}
        >
          <span>Sign In</span>
        </span>
        <span
          className={`swichUpButton ${isSignUp ? "show" : ""}`}
          onClick={handleSignUpButton}
        >
          <span>Sign Up</span>
        </span>

        <SignUpPage isSignUp={isSignUp} setIsLogInBox={setIsLogInBox} />
        <SignInPage isSignIn={isSignIn} setIsLogInBox={setIsLogInBox} />
      </div>
      <div className="logCover"></div>
    </div>
  );
};

export default LogPage;
