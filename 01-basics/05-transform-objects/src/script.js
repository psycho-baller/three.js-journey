import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// 4 ways to transform objects:
// 1. Position
// position is a vector3 object
mesh.position.x = 0.7
mesh.position.set(0, -0.6, 1)
console.log(mesh.position.length());
mesh.position.normalize(); // normalize the vector: length = 1
console.log(mesh.position.length());

// axis helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// 2. Scale
mesh.scale.set(2, 0.5, 0.5);

// 3. Rotation
mesh.rotation.reorder('YXZ'); // default is 'XYZ'
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// 4. Rotation quaternion



scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
console.log(mesh.position.distanceTo(camera.position));
// look at
camera.lookAt(mesh.position);
console.log(mesh.position.distanceTo(camera.position));


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)