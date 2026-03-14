import { create } from 'zustand'

export type Scene           = 'floating' | 'folded' | 'flat' | 'framed'
export type PaperFinish     = 'matte' | 'glossy' | 'kraft'
export type FrameColor      = 'black' | 'white' | 'wood'
export type ExportFormat    = 'png' | 'jpg' | 'gif' | 'mp4'
export type ExportResolution = '1x' | '2x' | '4x'

interface MockupState {
  // Upload
  uploadedImage: string | null
  imageAspectRatio: number
  // Scene
  activeScene: Scene
  // Camera
  autoRotate: boolean
  autoRotateSpeed: number
  // Lighting
  lightAngle: number
  lightIntensity: number
  shadowSoftness: number
  ambientIntensity: number
  // Background
  backgroundColor: string
  transparentBg: boolean
  // Paper
  paperFinish: PaperFinish
  paperColor: string
  // Frame (Scene D)
  frameColor: FrameColor
  frameThickness: number
  // Folded paper
  foldCount: 2 | 3
  // Export
  exportFormat: ExportFormat
  exportResolution: ExportResolution
  exportQuality: number
  loopDuration: number
  loopFps: 24 | 30
  // Actions
  setUploadedImage: (image: string | null, ratio: number) => void
  setActiveScene: (scene: Scene) => void
  setAutoRotate: (v: boolean) => void
  setAutoRotateSpeed: (v: number) => void
  setLightAngle: (v: number) => void
  setLightIntensity: (v: number) => void
  setShadowSoftness: (v: number) => void
  setAmbientIntensity: (v: number) => void
  setBackgroundColor: (v: string) => void
  setTransparentBg: (v: boolean) => void
  setPaperFinish: (v: PaperFinish) => void
  setPaperColor: (v: string) => void
  setFrameColor: (v: FrameColor) => void
  setFrameThickness: (v: number) => void
  setFoldCount: (v: 2 | 3) => void
  setExportFormat: (v: ExportFormat) => void
  setExportResolution: (v: ExportResolution) => void
  setExportQuality: (v: number) => void
  setLoopDuration: (v: number) => void
  setLoopFps: (v: 24 | 30) => void
  resetCamera: () => void
}

const DEFAULTS = {
  uploadedImage:    null,
  imageAspectRatio: 1,
  activeScene:      'flat' as Scene,
  autoRotate:       false,
  autoRotateSpeed:  1,
  lightAngle:       45,
  lightIntensity:   1.2,
  shadowSoftness:   8,
  ambientIntensity: 0.6,
  backgroundColor:  '#e8e4e0',
  transparentBg:    false,
  paperFinish:      'matte' as PaperFinish,
  paperColor:       '#ffffff',
  frameColor:       'black' as FrameColor,
  frameThickness:   0.08,
  foldCount:        2 as 2 | 3,
  exportFormat:     'png' as ExportFormat,
  exportResolution: '2x' as ExportResolution,
  exportQuality:    90,
  loopDuration:     4,
  loopFps:          30 as 24 | 30,
}

export const useMockupStore = create<MockupState>((set, get) => ({
  ...DEFAULTS,
  setUploadedImage: (uploadedImage, imageAspectRatio) => set({ uploadedImage, imageAspectRatio }),
  setActiveScene:      (activeScene)      => set({ activeScene }),
  setAutoRotate:       (autoRotate)       => set({ autoRotate }),
  setAutoRotateSpeed:  (autoRotateSpeed)  => set({ autoRotateSpeed }),
  setLightAngle:       (lightAngle)       => set({ lightAngle }),
  setLightIntensity:   (lightIntensity)   => set({ lightIntensity }),
  setShadowSoftness:   (shadowSoftness)   => set({ shadowSoftness }),
  setAmbientIntensity: (ambientIntensity) => set({ ambientIntensity }),
  setBackgroundColor:  (backgroundColor)  => set({ backgroundColor }),
  setTransparentBg:    (transparentBg)    => set({ transparentBg }),
  setPaperFinish:      (paperFinish)      => set({ paperFinish }),
  setPaperColor:       (paperColor)       => set({ paperColor }),
  setFrameColor:       (frameColor)       => set({ frameColor }),
  setFrameThickness:   (frameThickness)   => set({ frameThickness }),
  setFoldCount:        (foldCount)        => set({ foldCount }),
  setExportFormat:     (exportFormat)     => set({ exportFormat }),
  setExportResolution: (exportResolution) => set({ exportResolution }),
  setExportQuality:    (exportQuality)    => set({ exportQuality }),
  setLoopDuration:     (loopDuration)     => set({ loopDuration }),
  setLoopFps:          (loopFps)          => set({ loopFps }),
  resetCamera: () => set({ autoRotate: false }),
}))
