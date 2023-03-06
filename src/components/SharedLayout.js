import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LogPage from "./LogPage";

const SharedLayout = ({ authUser, resetSearch }) => {
  const [isLogInBox, setIsLogInBox] = useState(false);
  const handleLogInBox = () => {
    setIsLogInBox(!isLogInBox);
  };
  return (
    <>
      <Header
        handleLogInBox={handleLogInBox}
        authUser={authUser}
        resetSearch={resetSearch}
      />
      {isLogInBox && (
        <LogPage isLogInBox={isLogInBox} setIsLogInBox={setIsLogInBox} />
      )}

      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
