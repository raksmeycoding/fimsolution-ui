import React from "react";
import { Outlet } from "react-router";

function NoNavBarLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default NoNavBarLayout;
