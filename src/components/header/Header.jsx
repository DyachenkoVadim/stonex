import React from "react";
import logo from "../../assets/logo.png";

function Header({ onNavigate }) {
  return (
    <div className="z-1000 flex justify-center items-center h-[20%]">
      <div className="m-auto flex w-[70%] justify-center items-center">
        <img
          className="w-xl cursor-pointer"
          src={logo}
          alt="StoneX logo"
          onClick={(e) => onNavigate("home", e)}
        />
      </div>
    </div>
  );
}

export default Header;
