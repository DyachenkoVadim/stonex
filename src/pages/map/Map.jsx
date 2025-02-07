import React, { useState, Suspense, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./planet/Planet";
import Sun from "./../../../public/3d_models/sun/Sun";
import Mercury from "./../../../public/3d_models/planets/mercury/Mercury";
import Venus from "./../../../public/3d_models/planets/venus/Venus";
import Earth from "./../../../public/3d_models/planets/earth/Earth";
import Mars from "./../../../public/3d_models/planets/mars/Mars";
import Jupiter from "./../../../public/3d_models/planets/jupiter/Jupiter";
import Saturn from "./../../../public/3d_models/planets/saturn/Saturn";
import Uranus from "./../../../public/3d_models/planets/uranus/Uranus";
import Neptune from "./../../../public/3d_models/planets/neptune/Neptune";
import "./Map.css"; // Імпортуємо стилі
import Switch from "../../components/switch/Switch";
import GoBackArrow from "../../components/goBackArrow/GoBackArrow";
import PlanetInfo from "../../components/planetInfo/PlanetInfo";

function AutoCamera({ fov, position }) {
  const { camera } = useThree();
  camera.fov = fov;
  camera.position.set(...position);
  camera.updateProjectionMatrix();
  return null;
}

function Map() {
  const [viewMode, setViewMode] = useState("normal");
  const [cameraPosition, setCameraPosition] = useState([40, 5, 20]); // Початкова позиція для звичайного вигляду
  const [isZoomed, setIsZoomed] = useState(false);
  const [activePlanetName, setActivePlanetName] = useState(null);

  // Оновлюємо позицію камери при перемиканні режимів
  const cameraPos = useMemo(() => {
    return viewMode === "normal" ? cameraPosition : [0, 95, 0]; // Позиція для двомірного виду
  }, [viewMode, cameraPosition]);

  const handleSwitchChange = () => {
    const newMode = viewMode === "top" ? "normal" : "top";
    setViewMode(newMode);
  };

  return (
    <div className="relative size-[100%]">
      {!isZoomed ? (
        <Switch handleSwitchChange={handleSwitchChange} viewMode={viewMode} />
      ) : (
        <>
          <GoBackArrow
            setIsZoomed={setIsZoomed}
            setActivePlanetName={setActivePlanetName}
          />
          <PlanetInfo planetName={activePlanetName} />
        </>
      )}

      <Canvas className="my-auto">
        <AutoCamera fov={10} position={cameraPos} />
        <pointLight intensity={200} position={[0, 0, 0]} />
        <ambientLight intensity={0.4} />

        <Suspense fallback={null}>
          <Sun />

          <Planet
            planetName={"mercury"}
            planetNameUkr={"Меркурій"}
            orbitRadius={1}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Mercury}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
          <Planet
            key={"venus"}
            planetName={"venus"}
            planetNameUkr={"Венера"}
            orbitRadius={2}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Venus}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
          <Planet
            key={"earth"}
            planetName={"earth"}
            planetNameUkr={"Земля"}
            orbitRadius={3}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Earth}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
          <Planet
            key={"mars"}
            planetName={"mars"}
            planetNameUkr={"Марс"}
            orbitRadius={4}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Mars}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
          <Planet
            key={"jupiter"}
            planetName={"jupiter"}
            planetNameUkr={"Юпітер"}
            orbitRadius={5}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Jupiter}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
          <Planet
            key={"saturn"}
            planetName={"saturn"}
            planetNameUkr={"Сатурн"}
            orbitRadius={6}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Saturn}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />

          <Planet
            key={"uranus"}
            planetName={"uranus"}
            planetNameUkr={"Уран"}
            orbitRadius={7}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Uranus}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
          <Planet
            key={"neptune"}
            planetName={"neptune"}
            planetNameUkr={"Нептун"}
            orbitRadius={8}
            viewMode={viewMode}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            PlanetModel={Neptune}
            activePlanetName={activePlanetName}
            setActivePlanetName={setActivePlanetName}
          />
        </Suspense>

        <OrbitControls
          enableRotate={viewMode !== "top" && !isZoomed} // Блокуємо обертання камери в 2D
          enablePan={false} // Блокуємо панорамування камери в 2D
          enableZoom={false} // Блокуємо зум в 2D
        />
      </Canvas>
    </div>
  );
}

export default Map;
