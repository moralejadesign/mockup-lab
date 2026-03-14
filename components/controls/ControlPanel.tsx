'use client'

import { useState } from 'react'
import { UploadZone }        from '@/components/upload/UploadZone'
import { CameraControls }    from './CameraControls'
import { LightControls }     from './LightControls'
import { BackgroundControls } from './BackgroundControls'
import { PaperControls }     from './PaperControls'
import { ExportControls }    from './ExportControls'

interface SectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function Section({ title, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[#2a2a2a]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2.5 px-4 text-xs font-semibold text-[#aaa] uppercase tracking-wider hover:text-[#ddd] transition-colors"
      >
        {title}
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  )
}

export function ControlPanel({ onExport }: { onExport?: () => void }) {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#1e1e1e] border-r border-[#2a2a2a] flex flex-col overflow-y-auto">
      {/* Upload */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-3">Design</p>
        <UploadZone />
      </div>

      <Section title="Camera"     defaultOpen={true}><CameraControls /></Section>
      <Section title="Lighting"   defaultOpen={true}><LightControls /></Section>
      <Section title="Background" defaultOpen={true}><BackgroundControls /></Section>
      <Section title="Material"   defaultOpen={false}><PaperControls /></Section>

      {/* Export — sticky at bottom */}
      <div className="mt-auto p-4 border-t border-[#2a2a2a] bg-[#1e1e1e]">
        <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-3">Export</p>
        <ExportControls onExport={onExport} />
      </div>
    </aside>
  )
}
