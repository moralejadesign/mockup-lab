'use client'

import { useMockupStore } from '@/hooks/useMockupStore'
import { Slider } from '@/components/ui/Slider'

export function LightControls() {
  const {
    lightAngle,       setLightAngle,
    lightIntensity,   setLightIntensity,
    shadowSoftness,   setShadowSoftness,
    ambientIntensity, setAmbientIntensity,
  } = useMockupStore()

  return (
    <div className="flex flex-col gap-3">
      <Slider
        label="Light angle"
        value={lightAngle}
        min={0}
        max={360}
        step={1}
        displayValue={`${Math.round(lightAngle)}°`}
        onChange={setLightAngle}
      />
      <Slider
        label="Key intensity"
        value={lightIntensity}
        min={0.2}
        max={3}
        step={0.05}
        displayValue={lightIntensity.toFixed(2)}
        onChange={setLightIntensity}
      />
      <Slider
        label="Ambient fill"
        value={ambientIntensity}
        min={0}
        max={2}
        step={0.05}
        displayValue={ambientIntensity.toFixed(2)}
        onChange={setAmbientIntensity}
      />
      <Slider
        label="Shadow softness"
        value={shadowSoftness}
        min={1}
        max={20}
        step={0.5}
        displayValue={shadowSoftness.toFixed(1)}
        onChange={setShadowSoftness}
      />
    </div>
  )
}
