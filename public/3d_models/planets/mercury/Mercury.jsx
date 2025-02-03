import { useGLTF } from "@react-three/drei";

export default function Mercury({ orbitRadius = 1, viewMode }) {
  const { nodes, materials } = useGLTF(
    "/3d_models/planets/mercury/mercury.gltf"
  );

  return (
    <>
      <group>
        <mesh
          geometry={nodes["Sphere001_Material_#50_0"].geometry}
          material={materials.Material_50}
          rotation={[-Math.PI / 0.3, 0, 0]}
          scale={0.003}
        />
      </group>
    </>
  );
}

useGLTF.preload("/3d_models/planets/mercury/mercury.gltf");
