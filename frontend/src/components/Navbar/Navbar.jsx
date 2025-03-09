import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { motion } from "framer-motion";

const Navbar = ({ setShowLogin }) => {
  const [option, setOption] = useState("home");
  const {
    getTotalCartAmount,
    getTotalCartItems,
    token,
    setToken,
    setCartItems,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });

    if (window.location.pathname !== "/") return; // Avoid redirecting on other pages

    setOption("home");

    // Check if the URL starts with a hash
    if (window.location.hash.startsWith("#")) {
      navigate("/", { replace: true });
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    // clear the cartData that was being fetched
    setCartItems([]);
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/" className={`navbar-logo ${isScrolled ? "hidden" : ""}`}>
        <div>QuickEats</div>
      </Link>

      {/* 2nd component: Menu with simple cursor */}
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="navbar-menu"
      >
        <Tab setPosition={setPosition} isActive={option === "home"}>
          <Link
            to="/"
            onClick={(e) => {
              setOption("home"); // Reset state
              navigate("/"); // Ensure navigation
              window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
            }}
            className={option === "home" ? "active" : ""}
          >
            Home
          </Link>
        </Tab>
        <Tab setPosition={setPosition} isActive={option === "menu"}>
          <a
            href="#explore-menu"
            onClick={() => setOption("menu")}
            className={option === "menu" ? "active" : ""}
          >
            Menu
          </a>
        </Tab>
        <Tab setPosition={setPosition} isActive={option === "mobile-app"}>
          <a
            href="#app-download"
            onClick={() => setOption("mobile-app")}
            className={option === "mobile-app" ? "active" : ""}
          >
            Download
          </a>
        </Tab>
        <Tab setPosition={setPosition} isActive={option === "contact-us"}>
          <a
            href="#footer"
            onClick={() => setOption("contact-us")}
            className={option === "contact-us" ? "active" : ""}
          >
            Contact us
          </a>
        </Tab>

        <Cursor position={position} />
      </ul>

      {/* 3rd component: Right section */}
      <div className="navbar-right">
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
          <button
            onClick={() => setShowLogin(true)}
            className={isScrolled ? "hidden" : ""}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt=""
              className={isScrolled ? "hidden" : ""}
            />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
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

const Tab = ({ children, setPosition, isActive }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`navbar-menu-item ${isActive ? "active" : ""}`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ duration: 0.15 }}
      className="navbar-menu-cursor"
    />
  );
};

export default Navbar;
