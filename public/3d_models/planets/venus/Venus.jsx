import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Venus() {
  const { nodes, materials } = useGLTF("/3d_models/planets/venus/venus.gltf");

  return (
    <>
      <group>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.022}
        />
      </group>
    </>
  );
}

useGLTF.preload("/3d_models/planets/venus/venus.gltf");
