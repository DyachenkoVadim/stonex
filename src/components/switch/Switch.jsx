import React from "react";
import "./switch.css";

function Switch({ handleSwitchChange, viewMode }) {
  return (
    <div className="switch-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>Режим мапи:</span>
        <span style={{ marginRight: "10px" }}>3D</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={viewMode === "top"}
            onChange={handleSwitchChange}
          />
          <span className="slider"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>2D</span>
      </div>
    </div>
  );
}

export default Switch;
