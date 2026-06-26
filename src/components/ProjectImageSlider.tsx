import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectImageSliderProps {
  images: string[]
  title: string
  onOpenLightbox: (index: number) => void
}

export function ProjectImageSlider({ images, title, onOpenLightbox }: ProjectImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      e.stopPropagation()
      if (dx < 0) setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
      else setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <div
      className="relative overflow-hidden aspect-[4/3] mb-6 group/slider cursor-zoom-in"
      onClick={() => onOpenLightbox(current)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src || "/placeholder.svg"}
          alt={`${title} — фото ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`h-1.5 rounded-full transition-all bg-white ${
                  i === current ? "w-4 opacity-100" : "w-1.5 opacity-50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectImageSlider
