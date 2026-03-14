'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMockupStore } from '@/hooks/useMockupStore'
import { useUploadedTexture } from '@/hooks/useUploadedTexture'
import { PAPER_FINISH_PROPS } from '@/lib/materials'

function createCurvedGeometry(width: number, height: number): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(width, height, 32, 1)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const hw  = width / 2

  for (let i = 0; i < pos.count; i++) {
    const nx  = pos.getX(i) / hw       // -1 → 1
    const bow = Math.cos(nx * Math.PI * 0.55) * 0.22 - 0.18
    pos.setZ(i, bow)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

export function FloatingPaper() {
  const { uploadedImage, imageAspectRatio, paperFinish, paperColor } = useMockupStore()
  const texture  = useUploadedTexture(uploadedImage)
  const finish   = PAPER_FINISH_PROPS[paperFinish]
  const groupRef = useRef<THREE.Group>(null)
  const t        = useRef(0)

  const paperW = 2.5
  const paperH = paperW / Math.max(imageAspectRatio || 1, 0.1)

  const geometry = useMemo(
    () => createCurvedGeometry(paperW, paperH),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paperW, paperH]
  )

  useFrame((_, delta) => {
    if (!groupRef.current) return
    t.current += delta
    groupRef.current.position.y = 0.5 + Math.sin(t.current * 0.9) * 0.06
    groupRef.current.rotation.z = Math.sin(t.current * 0.6) * 0.025
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          map={texture ?? undefined}
          color={texture ? '#ffffff' : paperColor}
          roughness={finish.roughness}
          metalness={finish.metalness}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
