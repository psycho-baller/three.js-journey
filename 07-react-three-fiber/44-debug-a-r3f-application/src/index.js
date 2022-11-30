import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import * as THREE from "three";

const created = ({ scene }) => {
  scene.background = new THREE.Color("#ffff00");
};

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
    shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        onCreated={ created }
    >
        <Experience />
    </Canvas>
)
