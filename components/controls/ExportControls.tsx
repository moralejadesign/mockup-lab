'use client'

import { useMockupStore, type ExportFormat, type ExportResolution } from '@/hooks/useMockupStore'
import { Slider } from '@/components/ui/Slider'
import { useExport } from '@/hooks/useExport'

const FORMATS: ExportFormat[]     = ['png', 'jpg', 'gif', 'mp4']
const RESOLUTIONS: ExportResolution[] = ['1x', '2x', '4x']

export function ExportControls({ onExport }: { onExport?: () => void }) {
  const {
    exportFormat,     setExportFormat,
    exportResolution, setExportResolution,
    exportQuality,    setExportQuality,
  } = useMockupStore()

  const { captureImage, captureLoop } = useExport()

  const handleExport = () => {
    if (exportFormat === 'png' || exportFormat === 'jpg') {
      captureImage()
    } else {
      captureLoop()
    }
    onExport?.()
  }

  const isStatic  = exportFormat === 'png' || exportFormat === 'jpg'

  return (
    <div className="flex flex-col gap-3">
      {/* Format */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-[#999]">Format</span>
        <div className="flex gap-1">
          {FORMATS.map((f) => (
            <button
              key={f}
              onClick={() => setExportFormat(f)}
              className={`flex-1 py-1 text-[10px] uppercase rounded transition-all ${
                exportFormat === f
                  ? 'bg-[#6366f1] text-white'
                  : 'bg-[#2a2a2a] text-[#888] hover:text-[#ccc]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution — static only */}
      {isStatic && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#999]">Resolution</span>
          <div className="flex gap-1">
            {RESOLUTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setExportResolution(r)}
                className={`flex-1 py-1 text-[10px] rounded transition-all ${
                  exportResolution === r
                    ? 'bg-[#6366f1] text-white'
                    : 'bg-[#2a2a2a] text-[#888] hover:text-[#ccc]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* JPG quality */}
      {exportFormat === 'jpg' && (
        <Slider
          label="JPG quality"
          value={exportQuality}
          min={50}
          max={100}
          step={1}
          displayValue={`${exportQuality}%`}
          onChange={setExportQuality}
        />
      )}

      {/* Animated note */}
      {!isStatic && (
        <p className="text-[10px] text-[#555] text-center">
          Animated export coming in v1.1
        </p>
      )}

      {/* Export button */}
      <button
        onClick={handleExport}
        disabled={!isStatic}
        className="w-full py-2 bg-[#6366f1] hover:bg-[#5254cc] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
      >
        Export (E)
      </button>
    </div>
  )
}
