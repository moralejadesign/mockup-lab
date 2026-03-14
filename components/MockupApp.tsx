'use client'

import dynamic from 'next/dynamic'
import { useCallback } from 'react'

import { SceneSelector }  from '@/components/ui/SceneSelector'
import { ControlPanel }   from '@/components/controls/ControlPanel'
import { useExport }      from '@/hooks/useExport'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

const Canvas3D = dynamic(() => import('./Canvas3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
      <span className="text-xs text-[#555]">Loading 3D engine…</span>
    </div>
  ),
})

export default function MockupApp() {
  const { captureImage } = useExport()
  const handleExport = useCallback(() => captureImage(), [captureImage])

  useKeyboardShortcuts(handleExport)

  return (
    <div className="h-screen flex flex-col bg-[#171717] text-[#e5e5e5] overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 h-12 bg-[#1e1e1e] border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-white">MockupLab</span>
          <span className="text-[10px] text-[#6366f1] bg-[#6366f1]/15 px-1.5 py-0.5 rounded font-medium">v1</span>
        </div>
        <SceneSelector />
        <div className="text-[10px] text-[#555] hidden md:block">
          1-4 scenes · R reset · Space rotate · E export · T transparent
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex overflow-hidden">
        <ControlPanel onExport={handleExport} />
        <div className="flex-1 relative overflow-hidden">
          <Canvas3D />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 flex items-center justify-between px-5 h-8 bg-[#1e1e1e] border-t border-[#2a2a2a] text-[10px] text-[#555]">
        <span>Free forever · client-side only · no uploads</span>
        <a
          href="https://moraleja.co"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#888] transition-colors"
        >
          moraleja.co
        </a>
      </footer>
    </div>
  )
}
