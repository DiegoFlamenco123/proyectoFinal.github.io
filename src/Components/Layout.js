import React from "react";
import { Outlet } from "react-router";

const Layout = ({ props }) => {
  console.log(props);

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
