import React from "react";
import { MeshStandardMaterial, RingGeometry } from "three";

function Orbit({ radius }) {
  const orbitMaterial = new MeshStandardMaterial({
    color: "white",
    side: 2, // Двостороннє відображення
  });
  return (
    <mesh
      geometry={new RingGeometry(radius, radius + 0.01, 64)}
      material={orbitMaterial}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
}

export default Orbit;
