'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { useMockupStore } from '@/hooks/useMockupStore'
import { useUploadedTexture } from '@/hooks/useUploadedTexture'
import { PAPER_FINISH_PROPS } from '@/lib/materials'

function createPanelGeometry(
  panelW: number,
  panelH: number,
  uvOffsetX: number,
  uvScaleX: number
): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(panelW, panelH, 1, 1)
  const uv  = geo.attributes.uv as THREE.BufferAttribute
  for (let i = 0; i < uv.count; i++) {
    uv.setX(i, uvOffsetX + uv.getX(i) * uvScaleX)
  }
  uv.needsUpdate = true
  return geo
}

const FOLD_ANGLE = Math.PI / 10   // ~18°

export function FoldedPaper() {
  const { uploadedImage, imageAspectRatio, paperFinish, paperColor, foldCount } = useMockupStore()
  const texture = useUploadedTexture(uploadedImage)
  const finish  = PAPER_FINISH_PROPS[paperFinish]

  const totalW = 2.5
  const panelW = totalW / foldCount
  const paperH = totalW / Math.max(imageAspectRatio || 1, 0.1)

  const panels = useMemo(() => {
    return Array.from({ length: foldCount }, (_, i) => ({
      geometry: createPanelGeometry(panelW, paperH, i / foldCount, 1 / foldCount),
      index: i,
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foldCount, panelW, paperH])

  return (
    // Tilt slightly toward viewer for better depth reading
    <group rotation={[0.15, 0, 0]} position={[0, 0, 0]}>
      {panels.map(({ geometry, index }) => {
        // Even panels are flat; odd panels are slightly angled at fold
        const foldDir  = index % 2 === 0 ? 1 : -1
        const xCenter  = (index - (foldCount - 1) / 2) * panelW
        const rotY     = foldDir * FOLD_ANGLE * (index === 0 || index === foldCount - 1 ? 0 : 0.5)
        return (
          // Rotate each panel around its left or right edge by using a pivot group
          <group
            key={index}
            position={[xCenter, 0, 0]}
            rotation={[0, rotY, 0]}
          >
            <mesh geometry={geometry} castShadow receiveShadow>
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
      })}
    </group>
  )
}
