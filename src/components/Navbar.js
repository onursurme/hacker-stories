import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Home </Link><br />
      <Link to="/about">About Us </Link><br />
      <Link to="/shop">Shop Now </Link><br />
    </div>
  );
};

export default Navbar;