import { useEffect, useState } from 'react'
import * as THREE from 'three'

export function useUploadedTexture(imageUrl: string | null): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    if (!imageUrl) {
      setTexture(null)
      return
    }

    let disposed = false
    const loader = new THREE.TextureLoader()

    loader.load(imageUrl, (tex) => {
      if (disposed) {
        tex.dispose()
        return
      }
      tex.colorSpace = THREE.SRGBColorSpace
      setTexture(tex)
    })

    return () => {
      disposed = true
    }
  }, [imageUrl])

  // Dispose on unmount or URL change
  useEffect(() => {
    return () => {
      texture?.dispose()
    }
  }, [texture])

  return texture
}
