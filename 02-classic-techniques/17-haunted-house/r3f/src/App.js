import { extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

extend({ OrbitControls: OrbitControls });

export default function App() {
  const houseRef = useRef();
  const doorRef = useRef();
  const wallRef = useRef();
  const grassRef = useRef();
  const ghost1 = useRef();
  const ghost2 = useRef();
  const ghost3 = useRef();
  const { camera, gl } = useThree();
  gl.setClearColor("#262837");

  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

  const doorColor = useLoader(TextureLoader, "textures/door/color.jpg");
  const doorAlpha = useLoader(TextureLoader, "textures/door/alpha.jpg");
  const doorAmbientOcclusion = useLoader(
    TextureLoader,
    "textures/door/ambientOcclusion.jpg"
  );
  const doorHeight = useLoader(TextureLoader, "textures/door/height.jpg");
  const doorMetalness = useLoader(TextureLoader, "textures/door/metalness.jpg");
  const doorNormal = useLoader(TextureLoader, "textures/door/normal.jpg");
  const doorRoughness = useLoader(TextureLoader, "textures/door/roughness.jpg");

  const bricksColor = useLoader(TextureLoader, "textures/bricks/color.jpg");
  const bricksAmbientOcclusion = useLoader(
    TextureLoader,
    "textures/bricks/ambientOcclusion.jpg"
  );
  const bricksNormal = useLoader(TextureLoader, "textures/bricks/normal.jpg");
  const bricksRoughness = useLoader(
    TextureLoader,
    "textures/bricks/roughness.jpg"
  );

  const grassColor = useLoader(TextureLoader, "textures/grass/color.jpg");
  const grassAmbientOcclusion = useLoader(
    TextureLoader,
    "textures/grass/ambientOcclusion.jpg"
  );
  const grassNormal = useLoader(TextureLoader, "textures/grass/normal.jpg");
  const grassRoughness = useLoader(
    TextureLoader,
    "textures/grass/roughness.jpg"
  );

  grassColor.repeat.set(8, 8);
  grassAmbientOcclusion.repeat.set(8, 8);
  grassNormal.repeat.set(8, 8);
  grassRoughness.repeat.set(8, 8);

  grassColor.wrapS = THREE.RepeatWrapping;
  grassAmbientOcclusion.wrapS = THREE.RepeatWrapping;
  grassNormal.wrapS = THREE.RepeatWrapping;
  grassRoughness.wrapS = THREE.RepeatWrapping;

  grassColor.wrapT = THREE.RepeatWrapping;
  grassAmbientOcclusion.wrapT = THREE.RepeatWrapping;
  grassNormal.wrapT = THREE.RepeatWrapping;
  grassRoughness.wrapT = THREE.RepeatWrapping;

  if (doorRef.current) {
    doorRef.current.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        doorRef.current.geometry.attributes.uv.array,
        2
      )
    );
  }
  if (wallRef.current) {
    wallRef.current.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        wallRef.current.geometry.attributes.uv.array,
        2
      )
    );
  }
  if (grassRef.current) {
    grassRef.current.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        grassRef.current.geometry.attributes.uv.array,
        2
      )
    );
  }
  const clock = new THREE.Clock();
  let elapsedTime;
  let ghost1Angle;
  let ghost2Angle;
  let ghost3Angle;
  useFrame(() => {
    elapsedTime = clock.getElapsedTime();
    // update ghosts
    ghost1Angle = elapsedTime * 0.5;
    ghost1.current.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.current.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.current.position.y = Math.sin(elapsedTime * 3);

    ghost2Angle = -elapsedTime * 0.32;
    ghost2.current.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.current.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.current.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    ghost3Angle = -elapsedTime * 0.18;
    ghost3.current.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.current.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.current.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
  });
  return (
    <>
      {/* fog */}
      <fog attach="fog" color="#262837" near={1} far={16} />

      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight
        castShadow={true}
        position={[4, 5, -2]}
        color="#b9d5ff"
        intensity={0.12}
      />
      <ambientLight color="#b9d5ff" intensity={0.12} />

      <group ref={houseRef}>
        <mesh position-y={2.5 + 0.5} rotation-y={Math.PI * 0.25}>
          <coneGeometry args={[3.5, 1, 4]} />
          <meshStandardMaterial color="#b35f45" />
        </mesh>
        <mesh castShadow ref={wallRef} position-y={1.25}>
          <boxGeometry args={[4, 2.5, 4]} />
          <meshStandardMaterial
            map={bricksColor}
            aoMap={bricksAmbientOcclusion}
            normalMap={bricksNormal}
            roughnessMap={bricksRoughness}
          />
        </mesh>
        <mesh receiveShadow={true} ref={grassRef} rotation-x={Math.PI * 1.5}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            map={grassColor}
            aoMap={grassAmbientOcclusion}
            normalMap={grassNormal}
            roughnessMap={grassRoughness}
          />
        </mesh>
        <mesh ref={doorRef} position-z={2.001} position-y={1}>
          <planeGeometry args={[2.2, 2.2, 100, 100]} />
          <meshStandardMaterial
            map={doorColor}
            alphaMap={doorAlpha}
            transparent={true}
            aoMap={doorAmbientOcclusion}
            displacementMap={doorHeight}
            displacementScale={0.1}
            normalMap={doorNormal}
            roughnessMap={doorRoughness}
            metalnessMap={doorMetalness}
          />
        </mesh>

        {/* door light */}
        <pointLight
          castShadow
          args={["#ff7d46", 1, 7]}
          position={[0, 2.2, 2.7]}
        />

        {/* Ghosts */}
        <pointLight
          castShadow
          ref={ghost1}
          args={["#ff00ff", 2, 3]}
          position={[-2, 2, -1.5]}
        />
        <pointLight
          castShadow
          ref={ghost2}
          args={["#00ffff", 2, 3]}
          position={[1, 2, -1.5]}
        />
        <pointLight
          castShadow
          ref={ghost3}
          args={["#ffff00", 2, 3]}
          position={[2, 2, -1.5]}
        />

        {/* bushes */}
        <group>
          <mesh
            castShadow
            material={bushMaterial}
            geometry={bushGeometry}
            position={[0.8, 0.2, 2.2]}
            scale={[0.5, 0.5, 0.5]}
          />
          <mesh
            castShadow
            material={bushMaterial}
            geometry={bushGeometry}
            position={[1.4, 0.1, 2.2]}
            scale={[0.25, 0.25, 0.25]}
          />
          <mesh
            castShadow
            material={bushMaterial}
            geometry={bushGeometry}
            position={[-0.8, 0.15, 2.2]}
            scale={[0.4, 0.4, 0.4]}
          />
          <mesh
            castShadow
            material={bushMaterial}
            geometry={bushGeometry}
            position={[-1.3, 0.09, 2.2]}
            scale={[0.2, 0.2, 0.2]}
          />
        </group>
      </group>
      {/* graves */}
      <group>
        {[...Array(50)].map((val, index) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 6 + 3;
          const temp = Math.random() * Math.PI * 0.125;
          const rot = temp - temp / 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <mesh
              castShadow
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
    </>
  );
}
