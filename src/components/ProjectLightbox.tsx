import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Project, BACKEND_URL } from "./projects-data"

// ─── RequestPopup ────────────────────────────────────────────────────────────

interface RequestPopupProps {
  project: Project
  onClose: () => void
}

export function RequestPopup({ project, onClose }: RequestPopupProps) {
  const [form, setForm] = useState({ name: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handler)
    }
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `Заявка по объекту: ${project.title} (${project.location}, ${project.year})` }),
      })
    } catch (_) {
      // ignore network errors
    }
    setStatus("success")
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-primary text-primary-foreground px-8 pt-8 pb-6">
          <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Заявка по объекту</p>
          <h3 className="text-2xl font-medium leading-snug">{project.title}</h3>
          <p className="text-primary-foreground/60 text-sm mt-1">{project.location} · {project.year} · {project.budget}</p>
        </div>

        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-medium">Заявка отправлена!</p>
              <p className="text-muted-foreground text-sm mt-1">Мы свяжемся с вами в ближайшее время.</p>
              <button onClick={onClose} className="mt-4 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">Закрыть</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше имя"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Отправка..." : "Оставить заявку"}
              </button>
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── LightboxModal ───────────────────────────────────────────────────────────

interface LightboxModalProps {
  project: Project
  initialIndex: number
  onClose: () => void
}

export function LightboxModal({ project, initialIndex, onClose }: LightboxModalProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const lbTouchStartX = useRef<number | null>(null)
  const lbTouchStartY = useRef<number | null>(null)

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? project.images.length - 1 : c - 1)), [project.images.length])
  const next = useCallback(() => setCurrent((c) => (c === project.images.length - 1 ? 0 : c + 1)), [project.images.length])

  const handleLbTouchStart = (e: React.TouchEvent) => {
    lbTouchStartX.current = e.touches[0].clientX
    lbTouchStartY.current = e.touches[0].clientY
  }
  const handleLbTouchEnd = (e: React.TouchEvent) => {
    if (lbTouchStartX.current === null || lbTouchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - lbTouchStartX.current
    const dy = e.changedTouches[0].clientY - lbTouchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev()
    }
    lbTouchStartX.current = null
    lbTouchStartY.current = null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `Заявка по объекту: ${project.title} (${project.location}, ${project.year})` }),
      })
      setStatus("success")
    } catch {
      setStatus("success")
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (showForm) setShowForm(false); else onClose() }
      if (!showForm && e.key === "ArrowLeft") prev()
      if (!showForm && e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next, showForm])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-white font-medium text-lg">{project.title}</h3>
          <p className="text-white/50 text-sm">{project.category} · {project.location} · {project.year}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="flex-1 relative flex items-center justify-center px-12 md:px-16 min-h-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleLbTouchStart}
        onTouchEnd={handleLbTouchEnd}
      >
        <img
          key={current}
          src={project.images[current]}
          alt={`${project.title} — фото ${current + 1}`}
          className="max-h-full max-w-full object-contain animate-in fade-in duration-300"
        />
        {project.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {project.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-20 h-14 overflow-hidden rounded transition-all ${
                i === current ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 mt-3 flex-wrap">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-sm"><span className="text-white/50">Площадь:</span> <span className="text-white font-medium">{project.area}</span></span>
            <span className="text-sm"><span className="text-white/50">Срок:</span> <span className="text-white font-medium">{project.duration}</span></span>
            <span className="text-sm"><span className="text-white/50">Бюджет:</span> <span className="text-white font-medium">{project.budget}</span></span>
          </div>
          {!showForm && status !== "success" && (
            <button
              onClick={() => setShowForm(true)}
              className="shrink-0 px-5 py-2 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors"
            >
              Оставить заявку
            </button>
          )}
        </div>

        <p className="text-white/60 text-sm leading-relaxed mt-2">{project.description}</p>

        {showForm && status !== "success" && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ваше имя"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50"
            />
            <input
              type="tel"
              placeholder="Телефон"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 px-6 py-2 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Отправка..." : "Отправить"}
            </button>
          </form>
        )}

        {status === "success" && (
          <p className="mt-4 text-sm text-green-400">Заявка отправлена! Мы свяжемся с вами в ближайшее время.</p>
        )}
      </div>
    </div>
  )
}

export default LightboxModal
