import React, { useState, useRef, useEffect } from "react";
import { Billboard, Text } from "@react-three/drei";
import { Vector3 } from "three";
import Orbit from "../../../../public/3d_models/Orbit";
import PlanetIndicator from "../../../../public/3d_models/PlanetIndicator";
import { useFrame, useThree } from "@react-three/fiber";
import { data } from "../../../utils/data";

const settings = data;

function convertKmToUnits(km, planetName, targetRadius) {
  const referenceAxisKm = settings[planetName.toLowerCase()].semiMajorAxesKm;
  return (km / referenceAxisKm) * targetRadius;
}

function normalizeToUnitCircle(x, z) {
  const distance = Math.sqrt(x * x + z * z);
  return { x: x / distance, z: z / distance };
}

export default function Planet({
  planetName,
  planetNameUkr,
  orbitRadius,
  viewMode,
  PlanetModel,
  isZoomed,
  setIsZoomed,
  activePlanetName,
  setActivePlanetName,
}) {
  const planetRef = useRef();
  const { camera } = useThree();
  const [indicatorSize, setIndicatorSize] = useState(0.16);
  const [isHovered, setIsHovered] = useState(false);
  const [activePlanet, setActivePlanet] = useState(null);
  let positionRef = useRef(new Vector3(0, 0, 0));
  const mouseOffset = useRef({ x: 0, y: 0 });

  const handlePlanetClick = () => {
    if (planetRef.current) {
      const targetPosition = planetRef.current.position.clone();
      setActivePlanet(targetPosition);
      setActivePlanetName(planetName);
      setIsZoomed(true);
      document.body.style.cursor = "default";
    }
  };

  useEffect(() => {
    if (planetRef.current) {
      if (isZoomed) {
        positionRef.current = planetRef.current.position.clone();
        document.addEventListener("mousemove", handleMouseMove);
        if (activePlanetName !== planetName.toLowerCase()) {
          planetRef.current.position.set(0, 0, 0);
        }
      } else {
        // Відновлюємо позицію планети
        document.removeEventListener("mousemove", handleMouseMove);
        planetRef.current.position.copy(positionRef.current);
        setActivePlanet(null);
        setActivePlanetName(null);
      }
    }
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isZoomed, activePlanetName]);

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    mouseOffset.current = {
      x: (event.clientX / innerWidth - 0.5) * 0.02, // Додатковий зсув по X
      y: -(event.clientY / innerHeight - 0.5) * 0.02, // Додатковий зсув по Y
    };
  };

  useFrame(() => {
    if (activePlanet) {
      const targetPosition = new Vector3(
        activePlanet.x +
          settings[planetName.toLowerCase()].cameraPosition.x +
          mouseOffset.current.x,
        activePlanet.y +
          settings[planetName.toLowerCase()].cameraPosition.y +
          mouseOffset.current.y,
        activePlanet.z + settings[planetName.toLowerCase()].cameraPosition.z
      );

      const lookAtPosition = new Vector3(
        activePlanet.x +
          settings[planetName.toLowerCase()].cameraLookAtPosition.x,
        activePlanet.y +
          settings[planetName.toLowerCase()].cameraLookAtPosition.y,
        activePlanet.z +
          settings[planetName.toLowerCase()].cameraLookAtPosition.z
      );

      camera.position.lerp(targetPosition, 0.05);
      camera.lookAt(lookAtPosition);
    }
  });

  const fetchPlanetPosition = async () => {
    const response = await fetch(
      `https://api.le-systeme-solaire.net/rest/bodies/${planetName.toLowerCase()}`
    );
    const data = await response.json();

    const { semimajorAxis, eccentricity, mainAnomaly } = data;
    const a = convertKmToUnits(semimajorAxis, planetName, orbitRadius);
    const e = eccentricity;
    const M = (mainAnomaly * Math.PI) / 180;

    let E = M;
    for (let i = 0; i < 5; i++) {
      E = M + e * Math.sin(E);
    }

    const v = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));
    const r = a * (1 - e * Math.cos(E));

    let x = r * Math.cos(v);
    let z = r * Math.sin(v);

    const normalized = normalizeToUnitCircle(x, z);
    x = normalized.x * orbitRadius;
    z = normalized.z * orbitRadius;
    console.log("test");

    if (planetRef.current && !isZoomed) {
      planetRef.current.position.set(x, 0, z);
    }
  };

  useEffect(() => {
    fetchPlanetPosition();
  }, []);

  return (
    <>
      {!isZoomed && <Orbit radius={orbitRadius} />}

      <group
        ref={planetRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setIndicatorSize(0.18);
          document.body.style.cursor = !isZoomed ? "pointer" : "default";
          setIsHovered(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setIndicatorSize(0.16);
          document.body.style.cursor = "default";
          setIsHovered(false);
        }}
        onClick={handlePlanetClick}
      >
        {isHovered && !isZoomed && (
          <Billboard position={[0, 0.2, 0]} follow={true}>
            <Text
              position={[0, viewMode === "normal" ? 0.1 : 0.4, 0]}
              color={"white"}
              fontSize={viewMode === "normal" ? 0.2 : 0.3}
              fontWeight={600}
              font="/font/Unbounded-VariableFont_wght.ttf"
            >
              {planetNameUkr}
            </Text>
          </Billboard>
        )}
        {!isZoomed && (
          <PlanetIndicator position={[0, 0, 0]} outerRadius={indicatorSize} />
        )}
        <PlanetModel />
      </group>
    </>
  );
}
