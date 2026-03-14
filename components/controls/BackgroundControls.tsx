'use client'

import { useMockupStore } from '@/hooks/useMockupStore'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { Toggle } from '@/components/ui/Toggle'
import { BG_PRESETS } from '@/lib/presets'

export function BackgroundControls() {
  const {
    backgroundColor,  setBackgroundColor,
    transparentBg,    setTransparentBg,
  } = useMockupStore()

  return (
    <div className="flex flex-col gap-3">
      <Toggle
        label="Transparent (T)"
        value={transparentBg}
        onChange={setTransparentBg}
      />
      {!transparentBg && (
        <ColorPicker
          label="Background color"
          value={backgroundColor}
          presets={BG_PRESETS.map((p) => p.value)}
          onChange={setBackgroundColor}
        />
      )}
    </div>
  )
}
