import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">QuickEats</div>
      <img src={assets.profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navbar;
