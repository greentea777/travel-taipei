import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LogPage from "./LogPage";

const SharedLayout = ({ authUser }) => {
  const [isLogInBox, setIsLogInBox] = useState(false);
  const handleLogInBox = () => {
    setIsLogInBox(!isLogInBox);
  };
  return (
    <>
      <Header handleLogInBox={handleLogInBox} authUser={authUser} />
      {isLogInBox && (
        <LogPage isLogInBox={isLogInBox} setIsLogInBox={setIsLogInBox} />
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
