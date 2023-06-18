import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

function Container({ children }) {
  console.log(children);
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
