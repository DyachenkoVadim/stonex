import React from "react";
import "./planetInfo.css";
import { data } from "../../utils/data";

function PlanetInfo({ planetName }) {
  return (
    <div className="planet-info">
      <div className="planet-header">
        {data[planetName?.toLowerCase()]?.planetNameUkr}
      </div>
      <h1>Опис</h1>
      <div className="planet-description">
        <div>{data[planetName?.toLowerCase()]?.description}</div>
        <div className="planet-stats">
          <div>Відстань: </div>
          <div>Приблизний час доставки:</div>
          <div>Можливість попереднього замовлення:</div>
        </div>
      </div>
      <h1>Передогляд</h1>
    </div>
  );
}

export default PlanetInfo;
