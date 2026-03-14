'use client'

import { useMockupStore } from '@/hooks/useMockupStore'
import { Slider } from '@/components/ui/Slider'
import { Toggle } from '@/components/ui/Toggle'

export function CameraControls() {
  const {
    autoRotate, setAutoRotate,
    autoRotateSpeed, setAutoRotateSpeed,
    resetCamera,
  } = useMockupStore()

  return (
    <div className="flex flex-col gap-3">
      <Toggle label="Auto-rotate" value={autoRotate} onChange={setAutoRotate} />
      {autoRotate && (
        <Slider
          label="Rotation speed"
          value={autoRotateSpeed}
          min={0.2}
          max={5}
          step={0.1}
          displayValue={autoRotateSpeed.toFixed(1)}
          onChange={setAutoRotateSpeed}
        />
      )}
      <button
        onClick={resetCamera}
        className="w-full text-xs text-[#888] hover:text-[#ccc] border border-[#333] hover:border-[#555] rounded py-1.5 transition-all"
      >
        Reset camera (R)
      </button>
    </div>
  )
}
