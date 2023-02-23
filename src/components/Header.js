import React, { useState } from "react";

const Header = () => {
  const [isButtonOn, setIsbuttonOn] = useState(false);

  const hadleMenu = () => {
    setIsbuttonOn(!isButtonOn);
  };

  return (
    <header className="header">
      <div className="header-title">
        <span className="logo">Logo</span>

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
          <li>
            <a href="">Sign in</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
