import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ handleLogInBox, authUser, resetSearch }) => {
  const [isButtonOn, setIsbuttonOn] = useState(false);
  const navigate = useNavigate();

  const hadleMenu = () => {
    setIsbuttonOn(!isButtonOn);
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <div className="header-title">
        <Link to="/">
          <span onClick={() => resetSearch()} className="logo">
            Logo
          </span>
        </Link>

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
            <Link to="favourite" onClick={hadleMenu}>
              Favourite
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
