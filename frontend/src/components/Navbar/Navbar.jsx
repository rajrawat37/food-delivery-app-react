import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [option, setOption] = useState("home");
  const { getTotalCartAmount, getTotalCartItems, token, setToken } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div class="navbar">
      {/*  1st component  */}
      <Link to="/">
        {/* <img src={assets.logo} alt="" className="logo" /> */}
        <div class="navbar-logo">QuickEats</div>
      </Link>

      {/* 2nd component  */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setOption("home")}
          className={option === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setOption("menu")}
          className={option === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setOption("mobile-app")}
          className={option === "mobile-app" ? "active" : ""}
        >
          Download
        </a>
        <a
          href="#footer"
          onClick={() => setOption("contact-us")}
          className={option === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>

      {/* 3rd component  */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() > 0 ? (
            <div className="number-dot">{getTotalCartItems()}</div>
          ) : (
            <div className="number-dot">0</div>
          )}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                {" "}
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                {" "}
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
