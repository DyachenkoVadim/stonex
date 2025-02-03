import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Earth() {
  const { nodes, materials } = useGLTF("/3d_models/planets/earth/earth.gltf");

  return (
    <>
      <group>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials["Scene_-_Root"]}
          scale={0.03}
        />
      </group>
    </>
  );
}

useGLTF.preload("/3d_models/planets/earth/earth.gltf");
