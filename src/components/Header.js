import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";

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

        <div className="header-title-right">
          {authUser ? (
            <>
              <p>{`Hello, ${authUser.displayName}!`}</p>
              <span className="signOutButton" onClick={userSignOut}>
                <RiUser5Fill />
                Sign Out
              </span>
            </>
          ) : (
            <span className="signInButton" onClick={() => handleLogInBox()}>
              <RiUser5Line />
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
