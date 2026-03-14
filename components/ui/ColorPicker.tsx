'use client'

interface ColorPickerProps {
  label: string
  value: string
  presets?: string[]
  onChange: (v: string) => void
}

export function ColorPicker({ label, value, presets, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-[#999]">{label}</span>
      <div className="flex items-center gap-2">
        <div className="relative w-7 h-7 rounded overflow-hidden border border-[#444] cursor-pointer flex-shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-[150%] h-[150%] -translate-x-2 -translate-y-2 cursor-pointer opacity-0"
          />
          <div className="w-full h-full" style={{ backgroundColor: value }} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v)
          }}
          className="flex-1 bg-[#2a2a2a] border border-[#444] rounded px-2 py-1 text-xs text-[#ccc] font-mono focus:outline-none focus:border-[#6366f1]"
          maxLength={7}
        />
      </div>
      {presets && (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              title={p}
              className={`w-5 h-5 rounded border transition-all ${
                value === p ? 'border-[#6366f1] scale-110' : 'border-[#444] hover:border-[#666]'
              }`}
              style={{ backgroundColor: p }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
