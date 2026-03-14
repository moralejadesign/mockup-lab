'use client'

import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

import { useMockupStore } from '@/hooks/useMockupStore'
import { setGl, setScene, setCamera } from '@/lib/rendererRef'

import { FlatPaper }     from './scenes/FlatPaper'
import { FloatingPaper } from './scenes/FloatingPaper'
import { FoldedPaper }   from './scenes/FoldedPaper'
import { FramedPoster }  from './scenes/FramedPoster'

// ----- inner components (have access to R3F context) -----

function RendererSetup() {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    setGl(gl)
    setScene(scene)
    setCamera(camera)
  }, [gl, scene, camera])
  return null
}

function SceneBackground() {
  const { backgroundColor, transparentBg } = useMockupStore()
  const { scene } = useThree()

  useEffect(() => {
    if (transparentBg) {
      scene.background = null
    } else {
      scene.background = new THREE.Color(backgroundColor)
    }
  }, [backgroundColor, transparentBg, scene])

  return null
}

function Lighting() {
  const { lightAngle, lightIntensity, ambientIntensity } = useMockupStore()
  const rad = (lightAngle * Math.PI) / 180
  const x   = Math.cos(rad) * 5
  const z   = Math.sin(rad) * 5

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[x, 6, z]}
        intensity={lightIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
        shadow-camera-right={5}
      />
      {/* Subtle fill light from opposite side */}
      <directionalLight position={[-x * 0.4, 2, -z * 0.4]} intensity={lightIntensity * 0.15} />
    </>
  )
}

function ActiveScene() {
  const { activeScene } = useMockupStore()
  switch (activeScene) {
    case 'floating': return <FloatingPaper />
    case 'folded':   return <FoldedPaper />
    case 'flat':     return <FlatPaper />
    case 'framed':   return <FramedPoster />
  }
}

function SceneCamera() {
  const { autoRotate, autoRotateSpeed } = useMockupStore()
  return (
    <OrbitControls
      enablePan={false}
      minDistance={1.5}
      maxDistance={12}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      enableDamping
      dampingFactor={0.06}
    />
  )
}

// ----- exported component -----

export default function Canvas3D() {
  const { shadowSoftness, transparentBg } = useMockupStore()

  return (
    <div className="w-full h-full" style={{ background: transparentBg ? 'transparent' : undefined }}>
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 40 }}
        shadows
        gl={{
          preserveDrawingBuffer: true,
          alpha: true,
          antialias: true,
        }}
      >
        <RendererSetup />
        <SceneBackground />
        <Suspense fallback={null}>
          <Lighting />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.55}
            scale={10}
            blur={shadowSoftness / 4}
            far={3}
          />
          <ActiveScene />
        </Suspense>
        <SceneCamera />
      </Canvas>
    </div>
  )
}
