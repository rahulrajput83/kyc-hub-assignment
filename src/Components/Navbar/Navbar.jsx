import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { CiUser } from "react-icons/ci";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { MdLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

function Navbar({isDark}) {
  

  return (
    <div className={`Navbar`}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="navRight">
        <CiUser className={`profile`} />
        <Sidebar navbar={true} isDark={isDark} />
      </div>
    </div>
  );
}

export default Navbar;
