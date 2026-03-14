export type PaperFinish = 'matte' | 'glossy' | 'kraft'
export type FrameColor = 'black' | 'white' | 'wood'

export const PAPER_FINISH_PROPS: Record<PaperFinish, { roughness: number; metalness: number }> = {
  matte:  { roughness: 0.90, metalness: 0.0 },
  glossy: { roughness: 0.08, metalness: 0.0 },
  kraft:  { roughness: 0.95, metalness: 0.0 },
}

export const FRAME_COLOR_VALUES: Record<FrameColor, string> = {
  black: '#1a1a1a',
  white: '#f5f5f5',
  wood:  '#8b6343',
}

export const PAPER_COLOR_PRESETS = ['#ffffff', '#f5f0eb', '#f5deb3', '#d4c5b0']
