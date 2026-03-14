export const BG_PRESETS = [
  { label: 'White',      value: '#ffffff' },
  { label: 'Off-white',  value: '#f5f0eb' },
  { label: 'Light gray', value: '#e5e5e5' },
  { label: 'Mid gray',   value: '#888888' },
  { label: 'Dark gray',  value: '#333333' },
  { label: 'Black',      value: '#0a0a0a' },
]

export const SCENE_LABELS: Record<string, string> = {
  flat:     'Flat Paper',
  floating: 'Floating',
  folded:   'Folded',
  framed:   'Framed',
}

export const LOOP_DURATION_OPTIONS = [2, 4, 6] as const
export const FPS_OPTIONS = [24, 30] as const
