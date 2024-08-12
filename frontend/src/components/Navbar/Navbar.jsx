import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [option, setOption] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div class="navbar">
      {/*  1st component  */}
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {/* 2nd component  */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setOption("home")}
          className={option === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setOption("menu")}
          className={option === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setOption("mobile-app")}
          className={option === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setOption("contact-us")}
          className={option === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      {/* 3rd component  */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() > 0 ? <div className="dot"></div> : ""}
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
