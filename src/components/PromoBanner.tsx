import { useState } from "react"
import { X } from "lucide-react"

export function PromoBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 pr-10 relative">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-1 sm:gap-3 text-xs sm:text-sm text-center leading-snug">
        <span className="font-semibold whitespace-nowrap">🔒 Акция июля:</span>
        <span className="text-center">Бесплатный выезд геолога до 31 июля — экономия <span className="whitespace-nowrap">120 000 ₽</span></span>
        <a
          href="#contact"
          className="shrink-0 underline underline-offset-2 font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Узнать подробнее
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default PromoBanner