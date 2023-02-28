import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Header = ({ handleLogInBox, authUser }) => {
  const [isButtonOn, setIsbuttonOn] = useState(false);

  const hadleMenu = () => {
    setIsbuttonOn(!isButtonOn);
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <div className="header-title">
        <span className="logo">Logo</span>
        {authUser && (
          <>
            <p>{`Hello, ${authUser.displayName}!`}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        )}
        {!authUser && (
          <span className="signInButton" onClick={() => handleLogInBox()}>
            Sign In
          </span>
        )}

        <button
          onClick={hadleMenu}
          className={`nav-button ${isButtonOn ? "expended" : ""}`}
        >
          <div className="nav-icon"></div>
        </button>
      </div>

      <nav className={isButtonOn ? "expended" : ""}>
        <ul>
          <li>
            <a href="">Favourite</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
