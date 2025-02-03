import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Mars({ orbitRadius = 4, viewMode }) {
  const { nodes, materials } = useGLTF("/3d_models/planets/mars/mars.gltf");

  return (
    <>
      <group>
        <mesh
          geometry={nodes.pSphere1_lambert3_0.geometry}
          material={materials.lambert3}
          scale={0.017}
        />
      </group>
    </>
  );
}

useGLTF.preload("/3d_models/planets/mars/mars.gltf");
