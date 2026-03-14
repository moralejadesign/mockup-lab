import { useEffect } from 'react'
import { useMockupStore } from './useMockupStore'

export function useKeyboardShortcuts(onExport?: () => void) {
  const store = useMockupStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      switch (e.key) {
        case '1': store.setActiveScene('floating'); break
        case '2': store.setActiveScene('folded');   break
        case '3': store.setActiveScene('flat');     break
        case '4': store.setActiveScene('framed');   break
        case 'r':
        case 'R': store.resetCamera(); break
        case ' ':
          e.preventDefault()
          store.setAutoRotate(!store.autoRotate)
          break
        case 't':
        case 'T': store.setTransparentBg(!store.transparentBg); break
        case 'e':
        case 'E': onExport?.(); break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [store, onExport])
}
