import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Neptune() {
  const { nodes, materials } = useGLTF(
    "/3d_models/planets/neptune/neptune.gltf"
  );

  return (
    <>
      <group scale={0.07}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </>
  );
}

useGLTF.preload("/3d_models/planets/neptune/neptune.gltf");
