import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

export function CallToAction() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("https://functions.poehali.dev/8bf096d8-6d11-417b-963e-f0a10434100a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setPhone("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-5 md:mb-8">Начать проект</p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-5 md:mb-8 text-balance">
            Готовы построить
            <br />
            свою <HighlightedText>защиту</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
            Оставьте заявку — рассчитаем стоимость бункера под ваши задачи и проведём бесплатную консультацию. Безопасность начинается с первого шага.
          </p>

          {status === "success" ? (
            <div className="border border-primary-foreground/20 px-8 py-10 max-w-xl mx-auto">
              <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
              <p className="text-primary-foreground/70">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4 text-left">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
              />
              <textarea
                placeholder="Опишите задачу (необязательно)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors resize-none"
              />
              {status === "error" && (
                <p className="text-red-400 text-sm">Ошибка отправки. Попробуйте ещё раз или напишите нам напрямую.</p>
              )}
              <div className="flex flex-col gap-3 mt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group disabled:opacity-60"
                >
                  {status === "loading" ? "Отправляем..." : "Оставить заявку"}
                  {status !== "loading" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:+79331770086"
                    className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-4 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300 whitespace-nowrap"
                  >
                    8 (933) 177-00-86
                  </a>
                  <a
                    href="tel:+74955960800"
                    className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-4 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300 whitespace-nowrap"
                  >
                    8 (495) 596-08-00
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}