/* eslint-disable react/prop-types */
import React from "react";
import Navbar from "./Navbar";

function Container({ children }) {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

export default Container;
