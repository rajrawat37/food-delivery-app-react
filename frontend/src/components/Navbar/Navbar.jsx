import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {

   const [option,setOption] = useState("home");

  return (
    <div class='navbar'>

        {/*  1st component  */}
        <img src={assets.logo} alt="" className="logo" />

        {/* 2nd component  */}
        <ul className="navbar-menu">
            <li onClick={()=>setOption("home")} className={option==="home"?"active":""}>home</li>
            <li onClick={()=>setOption("menu")} className={option==="menu"?"active":""}>menu</li>
            <li onClick={()=>setOption("mobile-app")} className={option==="mobile-app"?"active":""}>mobile-app</li>
            <li onClick={()=>setOption("contact-us")} className={option==="contact-us"?"active":""}>contact us</li>
        </ul>

         {/* 3rd component  */}
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>sign in</button>
        </div>

    </div>
  )
}


export default Navbar