'use client'

import { useCallback, useRef, useState } from 'react'
import { useMockupStore } from '@/hooks/useMockupStore'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 10 * 1024 * 1024

export function UploadZone() {
  const { uploadedImage, setUploadedImage } = useMockupStore()
  const [isDragging, setIsDragging]         = useState(false)
  const [error, setError]                   = useState<string | null>(null)
  const inputRef                            = useRef<HTMLInputElement>(null)

  const processFile = useCallback((file: File) => {
    setError(null)
    if (!ACCEPTED.includes(file.type)) {
      setError('JPG, PNG or WebP only')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('File must be under 10 MB')
      return
    }
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => setUploadedImage(url, img.naturalWidth / img.naturalHeight)
    img.onerror = () => setError('Could not read image')
    img.src = url
  }, [setUploadedImage])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }, [processFile])

  if (uploadedImage) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative rounded-lg overflow-hidden border border-[#333] aspect-video bg-[#1a1a1a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={uploadedImage} alt="Uploaded design" className="w-full h-full object-contain" />
        </div>
        <button
          onClick={() => { setUploadedImage(null, 1); setError(null) }}
          className="text-xs text-[#888] hover:text-red-400 transition-colors text-center"
        >
          Remove image
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
          isDragging
            ? 'border-[#6366f1] bg-[#6366f1]/10'
            : 'border-[#333] hover:border-[#555] hover:bg-[#252525]'
        }`}
      >
        <svg className="w-8 h-8 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="text-center">
          <p className="text-xs font-medium text-[#888]">Drop image here</p>
          <p className="text-[10px] text-[#555] mt-0.5">JPG, PNG, WebP · max 10 MB</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="text-[10px] text-red-400 text-center">{error}</p>}
    </div>
  )
}
