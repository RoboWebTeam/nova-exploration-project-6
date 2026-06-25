import { useState, useEffect } from "react"
import { X } from "lucide-react"

const BACKEND_URL = "https://functions.poehali.dev/8bf096d8-6d11-417b-963e-f0a10434100a"

export function PromoPopup() {
  const [visible, setVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup_dismissed")
    if (dismissed) return
    const timer = setTimeout(() => setVisible(true), 8000)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    setVisible(false)
    sessionStorage.setItem("popup_dismissed", "1")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Заявка с поп-апа", phone, message: "Хочу получить скидку 10% с поп-апа на сайте" }),
      })
    } catch (_) {
      // ignore network errors
    }
    setStatus("success")
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={close}>
      <div
        className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:opacity-70 transition-opacity z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-primary text-primary-foreground px-8 py-10">
          <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Специальное предложение</p>
          <h2 className="text-3xl font-medium leading-tight mb-2">Скидка 10%<br/>на первый заказ</h2>
          <p className="opacity-70 text-sm">Оставьте номер телефона — и мы зафиксируем вашу скидку прямо сейчас.</p>
        </div>

        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-medium">Скидка зафиксирована!</p>
              <p className="text-muted-foreground text-sm mt-1">Мы свяжемся с вами в ближайшее время.</p>
              <button onClick={close} className="mt-4 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Отправка..." : "Получить скидку 10%"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromoPopup