import * as THREE from 'three'
import { getGl, getScene, getCamera } from '@/lib/rendererRef'
import { useMockupStore } from './useMockupStore'

const RESOLUTION_MULTIPLIER = { '1x': 1, '2x': 2, '4x': 4 } as const

export function useExport() {
  const {
    exportFormat, exportResolution, exportQuality,
    transparentBg, activeScene,
  } = useMockupStore()

  const captureImage = () => {
    const gl = getGl()
    const scene = getScene()
    const camera = getCamera()
    if (!gl || !scene || !camera) {
      console.warn('MockupLab: renderer not ready for export')
      return
    }

    const multiplier = RESOLUTION_MULTIPLIER[exportResolution]
    const displayW = gl.domElement.clientWidth  || gl.domElement.width
    const displayH = gl.domElement.clientHeight || gl.domElement.height

    // Save state
    const origBg    = scene.background
    const origW     = gl.domElement.width
    const origH     = gl.domElement.height

    // Upscale render buffer (updateStyle=false keeps CSS size unchanged)
    if (multiplier > 1) {
      gl.setSize(displayW * multiplier, displayH * multiplier, false)
    }

    // Transparent background
    if (transparentBg) {
      scene.background = null
      gl.setClearColor(0x000000, 0)
    }

    gl.render(scene, camera)

    const mimeType = exportFormat === 'jpg' ? 'image/jpeg' : 'image/png'
    const quality  = exportFormat === 'jpg' ? exportQuality / 100 : undefined
    const dataUrl  = gl.domElement.toDataURL(mimeType, quality)

    // Restore state
    if (multiplier > 1) {
      gl.setSize(origW, origH, false)
    }
    if (transparentBg) {
      scene.background = origBg
      if (origBg instanceof THREE.Color) {
        gl.setClearColor(origBg, 1)
      }
    }

    // Trigger download
    const ext      = exportFormat === 'jpg' ? 'jpg' : 'png'
    const filename = `mockup-${activeScene}-${Date.now()}.${ext}`
    const a        = document.createElement('a')
    a.href         = dataUrl
    a.download     = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // GIF / MP4 — Phase 4
  const captureLoop = () => {
    console.info('MockupLab: animated export coming in Phase 4')
  }

  return { captureImage, captureLoop }
}
