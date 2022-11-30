import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
    flat
    gl={{ antialias: true }}
    camera={{
        position: [3,2,6]
    }}>
        <App/>
    </Canvas>
)