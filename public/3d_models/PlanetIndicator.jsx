import React, { useState } from "react";
import { Billboard, Text } from "@react-three/drei";

function PlanetIndicator({ position, outerRadius }) {
  return (
    <Billboard
      position={position}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      {/* Прозорий фон з circleGeometry */}
      <mesh>
        <ringGeometry args={[0, 0.13, 64]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>

      {/* Видимий індикатор */}
      <mesh>
        <ringGeometry args={[outerRadius - 0.02, outerRadius, 64]} />
        <meshStandardMaterial
          emissive={"white"} // Ефект світіння
          emissiveIntensity={2} // Інтенсивність світіння
          color={"white"}
          transparent={true}
        />
      </mesh>

      {/* Логіка для відображення тексту при наведенні */}
      <mesh
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      />
    </Billboard>
  );
}

export default PlanetIndicator;
