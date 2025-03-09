import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name; // Gets the name attribute of the input
    const value = event.target.value; // Gets the input's current value

    setData((data) => ({ ...data, [name]: value })); // { name: "Raj" }
  };

  const onLogin = async (event) => {
    event.preventDefault(); // Stops the page from refreshing when the form is submitted.

    let newUrl = url;

    if (currState === "Login") {
      newUrl += "api/user/login";
    } else {
      newUrl += "api/user/register";
    }

    const response = await axios.post(newUrl, data);

    console.log("Login Response is : ", response);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        {/* First Row */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        {/* Form Fields */}
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <>Hello Login Page</>
          ) : (
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              onChange={onChangeHandler}
              value={data.name} //Ensures UI updates when state changes
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            onChange={onChangeHandler}
            value={data.email}
          />
          <input
            name="password"
            type="password"
            placeholder="Your password"
            required
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>

        {/* Text to toggle */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            {" "}
            Already have an accont{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
