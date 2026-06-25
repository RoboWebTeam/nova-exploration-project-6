import { useState } from "react"
import { X } from "lucide-react"

export function PromoBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm text-center">
        <span className="font-semibold">🔒 Акция июля:</span>
        <span>Бесплатный выезд геолога при заказе бункера до 31 июля — экономия до 120 000 ₽</span>
        <a
          href="#contact"
          className="shrink-0 underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
        >
          Узнать подробнее
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default PromoBanner
