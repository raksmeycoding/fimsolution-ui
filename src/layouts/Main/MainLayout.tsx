import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
