import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
extend({ OrbitControls: OrbitControls });

export default function App() {
  const houseRef = useRef();
  const floor = useRef();
  const { camera, gl } = useThree();

  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, .2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[3, 2, 6]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={houseRef}>
        <mesh position-y={2.5 + 0.5} rotation-y={Math.PI * 0.25}>
          <coneGeometry args={[3.5, 1, 4]} />
          <meshStandardMaterial color="#b35f45" />
        </mesh>
        <mesh position-y={1.25}>
          <boxGeometry args={[4, 2.5, 4]} />
          <meshStandardMaterial color="#ac8e82" />
        </mesh>
        <mesh rotation-x={Math.PI * 1.5} scale={5}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#a9c388" />
        </mesh>
        <mesh position-z={2.001} position-y={1}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial color="brown" />
        </mesh>

        {/* bushes */}
        <group>
          <mesh
            material={bushMaterial}
            geometry={bushGeometry}
            position={[0.8, 0.2, 2.2]}
            scale={[0.5, 0.5, 0.5]}
          />
          <mesh
            material={bushMaterial}
            geometry={bushGeometry}
            position={[1.4, 0.1, 2.2]}
            scale={[0.25, 0.25, 0.25]}
          />
          <mesh
            material={bushMaterial}
            geometry={bushGeometry}
            position={[-0.8, 0.15, 2.2]}
            scale={[0.4, 0.4, 0.4]}
          />
          <mesh
            material={bushMaterial}
            geometry={bushGeometry}
            position={[-1.3, 0.09, 2.2]}
            scale={[0.2, 0.2, 0.2]}
          />
        </group>

        {/* graves */}
        <group>
          {[...Array(50)].map((val, index) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 6 + 3;
            const temp = Math.random() * Math.PI * .125
            const rot = temp - (temp/2)
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;

            return (
              <mesh
                key={index}
                position={[x, 0.3, z]}
                material={graveMaterial}
                geometry={graveGeometry}
                rotation-y={rot}
                rotation-z={rot}
              />
            );
          })}
        </group>
      </group>
    </>
  );
}
