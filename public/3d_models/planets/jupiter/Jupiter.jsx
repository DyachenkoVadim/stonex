import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Jupiter() {
  const { nodes, materials } = useGLTF(
    "/3d_models/planets/jupiter/jupiter.gltf"
  );

  return (
    <group>
      <mesh
        geometry={nodes.Jupiter_Planeta_0.geometry}
        material={materials.Planeta}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/3d_models/planets/jupiter/jupiter.gltf");
