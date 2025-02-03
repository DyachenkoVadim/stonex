import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Saturn() {
  const { nodes, materials } = useGLTF("/3d_models/planets/saturn/saturn.gltf");

  return (
    <group rotation={[-Math.PI / 2, -0.03, 0]} scale={0.0002}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Основна планета */}
        <mesh geometry={nodes.Object_4.geometry} material={materials.None} />
        {/* Кільця Сатурна */}
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.SaturnRings}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.SaturnRings}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3d_models/planets/saturn/saturn.gltf");
