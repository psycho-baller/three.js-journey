import './style.css'
import * as THREE from 'three'

// the essence of three.js is a scene, a camera, and a renderer

// the scene is the container for all objects, lights, and cameras
const scene = new THREE.Scene()

// Objects are called "mesh" are made up of geometries and materials
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// the camera defines what we see
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000) // fov, aspect ratio, near, far
camera.position.z = 3 // move camera back 3 units
camera.position.x = 1 // move camera right 1 unit
scene.add(camera)

// the renderer is what draws the scene
const canvas = document.querySelector('canvas#webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
console.log(scene, camera, renderer)
