import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const cursor = {
    x: 0,
    y: 0
}
// Canvas
window.addEventListener('mousemove', (e) =>{
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = - (e.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// can be used to hide shit that is v far so not clear
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock() // create a clock

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5 // up and down
    // camera.lookAt(mesh.position) // look at the mesh

    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera) // render the scene with the camera

    // Call tick again on the next frame
    window.requestAnimationFrame(tick) // call tick again on the next frame
}

tick()
