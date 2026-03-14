'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { useMockupStore } from '@/hooks/useMockupStore'
import { useUploadedTexture } from '@/hooks/useUploadedTexture'
import { PAPER_FINISH_PROPS } from '@/lib/materials'

function createLiftedGeometry(width: number, height: number): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(width, height, 24, 24)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const hw  = width  / 2
  const hh  = height / 2

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i) / hw   // -1 → 1 (left → right)
    const ny = pos.getY(i) / hh   // -1 → 1 (bottom → top)
    // Lift the bottom-right corner (nx → 1, ny → -1)
    const cx   = Math.max(0, nx - 0.35) / 0.65
    const cy   = Math.max(0, -ny - 0.35) / 0.65
    const lift = Math.pow(cx * cy, 0.8) * 0.14
    pos.setZ(i, lift)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

export function FlatPaper() {
  const { uploadedImage, imageAspectRatio, paperFinish, paperColor } = useMockupStore()
  const texture = useUploadedTexture(uploadedImage)
  const finish  = PAPER_FINISH_PROPS[paperFinish]

  const paperW = 2.5
  const paperH = paperW / Math.max(imageAspectRatio || 1, 0.1)

  const geometry = useMemo(
    () => createLiftedGeometry(paperW, paperH),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paperW, paperH]
  )

  return (
    <group rotation={[-0.05, 0.1, 0]} position={[0, 0, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={texture ?? undefined}
          color={texture ? '#ffffff' : paperColor}
          roughness={finish.roughness}
          metalness={finish.metalness}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Back face — plain paper color */}
      <mesh geometry={geometry} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color={paperColor}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>
    </group>
  )
}
