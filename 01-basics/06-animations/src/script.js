import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "gold" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.position.set(-3, 0, 0);


const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: "blue" });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 0, 0);

const geometry3 = new THREE.BoxGeometry(1, 1, 1);
const material3 = new THREE.MeshBasicMaterial({ color: "red" });
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(-3, 0, -5);


scene.add(mesh2);
scene.add(mesh3);

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//clock
const clock = new THREE.Clock()



// Animation
const tick = () => {

    //clock
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.position.y = -Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


 gsap.to(mesh2.position, { duration: 1, delay: 1, x: 2 })