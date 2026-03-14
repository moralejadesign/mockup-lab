'use client'

import * as THREE from 'three'
import { useMockupStore } from '@/hooks/useMockupStore'
import { useUploadedTexture } from '@/hooks/useUploadedTexture'
import { FRAME_COLOR_VALUES } from '@/lib/materials'

export function FramedPoster() {
  const {
    uploadedImage, imageAspectRatio,
    frameColor, frameThickness, paperColor,
  } = useMockupStore()

  const texture     = useUploadedTexture(uploadedImage)
  const frameHex    = FRAME_COLOR_VALUES[frameColor]
  const artW        = 1.8
  const artH        = artW / Math.max(imageAspectRatio || 1, 0.1)
  const frameDepth  = 0.05
  const ft          = frameThickness   // e.g. 0.08
  const frameW      = artW + ft * 2
  const frameH      = artH + ft * 2

  return (
    <group position={[0, 0, 0]}>
      {/* Wall plane */}
      <mesh position={[0, 0, -(frameDepth + 0.02)]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#d6cfc9" roughness={0.95} metalness={0} />
      </mesh>

      {/* Frame backing — slightly larger than artwork, gives border */}
      <mesh position={[0, 0, -frameDepth / 2]} castShadow receiveShadow>
        <boxGeometry args={[frameW, frameH, frameDepth]} />
        <meshStandardMaterial
          color={frameHex}
          roughness={frameColor === 'wood' ? 0.85 : 0.4}
          metalness={frameColor === 'wood' ? 0   : 0.05}
        />
      </mesh>

      {/* Matting (white passepartout) — only if frame is thick enough */}
      {ft > 0.05 && (
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[artW + ft * 0.6, artH + ft * 0.6]} />
          <meshStandardMaterial color="#f8f6f3" roughness={0.95} />
        </mesh>
      )}

      {/* Artwork */}
      <mesh position={[0, 0, 0.002]} castShadow>
        <planeGeometry args={[artW, artH]} />
        <meshStandardMaterial
          map={texture ?? undefined}
          color={texture ? '#ffffff' : paperColor}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  )
}
