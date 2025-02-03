import React from "react";
import "./goBackArrow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function GoBackArrow({ setIsZoomed, setActivePlanetName }) {
  const handleClick = () => {
    setIsZoomed(false);
    setActivePlanetName(null);
  };

  return (
    <button onClick={handleClick} className="go-back-button">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}

export default GoBackArrow;
