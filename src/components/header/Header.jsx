import React from "react";
import logo from "../../assets/logo.png";
import "./header.css";

function Header({ onNavigate }) {
  return (
    <div className="header-wrapper">
      <div className="header">
        <img
          src={logo}
          alt="StoneX logo"
          onClick={(e) => onNavigate("home", e)}
        />
      </div>
    </div>
  );
}

export default Header;
