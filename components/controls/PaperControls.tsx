'use client'

import { useMockupStore, type PaperFinish } from '@/hooks/useMockupStore'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { Slider } from '@/components/ui/Slider'
import { PAPER_COLOR_PRESETS } from '@/lib/materials'

const FINISHES: PaperFinish[] = ['matte', 'glossy', 'kraft']

export function PaperControls() {
  const {
    activeScene,
    paperFinish, setPaperFinish,
    paperColor,  setPaperColor,
    frameColor,  setFrameColor,
    frameThickness, setFrameThickness,
    foldCount, setFoldCount,
  } = useMockupStore()

  return (
    <div className="flex flex-col gap-3">
      {/* Paper finish */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-[#999]">Paper finish</span>
        <div className="flex gap-1">
          {FINISHES.map((f) => (
            <button
              key={f}
              onClick={() => setPaperFinish(f)}
              className={`flex-1 py-1 text-[10px] rounded capitalize transition-all ${
                paperFinish === f
                  ? 'bg-[#6366f1] text-white'
                  : 'bg-[#2a2a2a] text-[#888] hover:text-[#ccc]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Paper color */}
      <ColorPicker
        label="Paper color"
        value={paperColor}
        presets={PAPER_COLOR_PRESETS}
        onChange={setPaperColor}
      />

      {/* Fold count — only for folded scene */}
      {activeScene === 'folded' && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#999]">Panels</span>
          <div className="flex gap-1">
            {([2, 3] as const).map((n) => (
              <button
                key={n}
                onClick={() => setFoldCount(n)}
                className={`flex-1 py-1 text-[10px] rounded transition-all ${
                  foldCount === n
                    ? 'bg-[#6366f1] text-white'
                    : 'bg-[#2a2a2a] text-[#888] hover:text-[#ccc]'
                }`}
              >
                {n}-panel
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Frame controls — only for framed scene */}
      {activeScene === 'framed' && (
        <>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#999]">Frame material</span>
            <div className="flex gap-1">
              {(['black', 'white', 'wood'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFrameColor(c)}
                  className={`flex-1 py-1 text-[10px] rounded capitalize transition-all ${
                    frameColor === c
                      ? 'bg-[#6366f1] text-white'
                      : 'bg-[#2a2a2a] text-[#888] hover:text-[#ccc]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <Slider
            label="Frame thickness"
            value={frameThickness}
            min={0.02}
            max={0.25}
            step={0.01}
            displayValue={frameThickness.toFixed(2)}
            onChange={setFrameThickness}
          />
        </>
      )}
    </div>
  )
}
