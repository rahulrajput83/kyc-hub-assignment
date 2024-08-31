import React from "react";
import logo from "../../assets/logo.png";
import { CiUser } from "react-icons/ci";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

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
