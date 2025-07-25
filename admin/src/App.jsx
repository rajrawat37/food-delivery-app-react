import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://backend-url-from-env ";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            {/* <Route path='/orders' element={<Orders url={url} />}/> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
