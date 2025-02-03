import React from "react";
import "./sideBar.css";

function SideBar({ onNavigate }) {
  return (
    <div className="side-bar">
      <button
        className="link active"
        data-section="home"
        onClick={(e) => onNavigate("home", e)}
      >
        Головна
      </button>
      <button
        className="link"
        data-section="map"
        onClick={(e) => onNavigate("map", e)}
      >
        Мапа
      </button>
      <button
        className="link"
        data-section="about"
        onClick={(e) => onNavigate("about", e)}
      >
        Про нас
      </button>
      <button
        className="link"
        data-section="contacts"
        onClick={(e) => onNavigate("contacts", e)}
      >
        Контакти
      </button>
    </div>
  );
}

export default SideBar;
