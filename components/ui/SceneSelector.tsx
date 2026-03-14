'use client'

import { useMockupStore, type Scene } from '@/hooks/useMockupStore'

const SCENES: { id: Scene; label: string; key: string }[] = [
  { id: 'flat',     label: 'Flat',     key: '3' },
  { id: 'floating', label: 'Floating', key: '1' },
  { id: 'folded',   label: 'Folded',   key: '2' },
  { id: 'framed',   label: 'Framed',   key: '4' },
]

export function SceneSelector() {
  const { activeScene, setActiveScene } = useMockupStore()

  return (
    <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-lg p-1">
      {SCENES.map(({ id, label, key }) => (
        <button
          key={id}
          onClick={() => setActiveScene(id)}
          title={`${label} (${key})`}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
            activeScene === id
              ? 'bg-[#6366f1] text-white shadow'
              : 'text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
