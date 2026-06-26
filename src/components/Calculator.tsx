import { useState } from "react"
import { ymGoal, getUtm } from "@/lib/analytics"

const BACKEND_URL = "https://functions.poehali.dev/8bf096d8-6d11-417b-963e-f0a10434100a"

const sizes = [
  { id: "xs", label: "До 50 м²", desc: "2–4 человека", base: 5_000_000 },
  { id: "s", label: "50–100 м²", desc: "4–8 человек", base: 9_000_000 },
  { id: "m", label: "100–200 м²", desc: "8–15 человек", base: 18_000_000 },
  { id: "l", label: "200–400 м²", desc: "15–30 человек", base: 38_000_000 },
  { id: "xl", label: "400+ м²", desc: "30+ человек", base: 80_000_000 },
]

const levels = [
  { id: "base", label: "Базовый", desc: "Железобетон, вентиляция, свет", mul: 1.0 },
  { id: "comfort", label: "Комфорт", desc: "Отделка, мебель, системы жизнеобеспечения", mul: 1.4 },
  { id: "premium", label: "Премиум", desc: "Дизайн-интерьер, умный дом, всё включено", mul: 1.9 },
]

const options = [
  { id: "ventilation", label: "HEPA-вентиляция", price: 350_000 },
  { id: "generator", label: "Генератор 50+ кВт", price: 450_000 },
  { id: "water", label: "Система водоочистки", price: 280_000 },
  { id: "security", label: "Периметровая охрана", price: 320_000 },
  { id: "smarthome", label: "Умный дом", price: 500_000 },
  { id: "cinema", label: "Домашний кинозал", price: 600_000 },
]

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} млн ₽`
  return `${(n / 1000).toFixed(0)} тыс. ₽`
}

export function Calculator() {
  const [size, setSize] = useState("s")
  const [level, setLevel] = useState("comfort")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [form, setForm] = useState({ name: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const sizeObj = sizes.find((s) => s.id === size)!
  const levelObj = levels.find((l) => l.id === level)!
  const optTotal = options.filter((o) => selected.has(o.id)).reduce((sum, o) => sum + o.price, 0)
  const total = Math.round(sizeObj.base * levelObj.mul + optTotal)
  const totalFrom = Math.round(total * 0.9)
  const totalTo = Math.round(total * 1.15)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const opts = options.filter((o) => selected.has(o.id)).map((o) => o.label).join(", ")
    const msg = `Заявка из калькулятора: площадь — ${sizeObj.label}, уровень — ${levelObj.label}, опции — ${opts || "нет"}, бюджет — от ${fmt(totalFrom)} до ${fmt(totalTo)}`
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: msg, source: "calculator", ...getUtm() }),
      })
    } catch (_e) {
      setStatus("success")
      ymGoal("calculator_submit")
      return
    }
    ymGoal("calculator_submit")
    setStatus("success")
  }

  return (
    <section id="calculator" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-8 md:mb-12">
          <p className="text-primary-foreground/50 text-sm tracking-[0.3em] uppercase mb-3 md:mb-4">Онлайн-расчёт</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Калькулятор стоимости</h2>
          <p className="text-primary-foreground/60 mt-3 max-w-xl text-sm md:text-base">Получите предварительную оценку стоимости вашего бункера за 1 минуту</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary-foreground/50 mb-3 md:mb-4">Площадь объекта</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`rounded-xl p-4 text-left border transition-all duration-200 ${
                      size === s.id
                        ? "border-white bg-white/15"
                        : "border-white/20 hover:border-white/40 bg-white/5"
                    }`}
                  >
                    <p className="font-medium text-sm">{s.label}</p>
                    <p className="text-primary-foreground/50 text-xs mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-primary-foreground/50 mb-3 md:mb-4">Уровень комплектации</p>
              <div className="grid gap-3">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`rounded-xl p-4 text-left border transition-all duration-200 flex items-center justify-between ${
                      level === l.id
                        ? "border-white bg-white/15"
                        : "border-white/20 hover:border-white/40 bg-white/5"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm">{l.label}</p>
                      <p className="text-primary-foreground/50 text-xs mt-0.5">{l.desc}</p>
                    </div>
                    {level === l.id && (
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-primary-foreground/50 mb-3 md:mb-4">Дополнительные опции</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 md:gap-3">
                {options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => toggle(o.id)}
                    className={`rounded-xl p-3 text-left border transition-all duration-200 ${
                      selected.has(o.id)
                        ? "border-white bg-white/15"
                        : "border-white/20 hover:border-white/40 bg-white/5"
                    }`}
                  >
                    <p className="text-sm font-medium leading-snug">{o.label}</p>
                    <p className="text-primary-foreground/50 text-xs mt-1">+{fmt(o.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <div className="rounded-2xl bg-white/10 border border-white/20 p-5 sm:p-6 md:p-8">
              <p className="text-primary-foreground/50 text-sm uppercase tracking-widest mb-2">Предварительная стоимость</p>
              <div className="mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                  от {fmt(totalFrom)}
                </p>
                <p className="text-primary-foreground/50 text-sm mt-1">до {fmt(totalTo)}</p>
              </div>

              <div className="space-y-2 mb-6 text-sm border-t border-white/10 pt-6">
                <div className="flex justify-between">
                  <span className="text-primary-foreground/60">Площадь</span>
                  <span>{sizeObj.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-foreground/60">Комплектация</span>
                  <span>{levelObj.label}</span>
                </div>
                {selected.size > 0 && (
                  <div className="flex justify-between">
                    <span className="text-primary-foreground/60">Доп. опции</span>
                    <span>+{fmt(optTotal)}</span>
                  </div>
                )}
              </div>

              {status === "success" ? (
                <div className="text-center py-4">
                  <p className="text-2xl mb-2">✅</p>
                  <p className="font-medium">Заявка отправлена!</p>
                  <p className="text-primary-foreground/60 text-sm mt-1">Менеджер свяжется с вами и уточнит детали.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-white text-primary rounded-lg py-3 text-sm font-semibold hover:bg-white/90 transition-opacity disabled:opacity-50"
                  >
                    {status === "loading" ? "Отправка..." : "Получить точный расчёт"}
                  </button>
                  <p className="text-xs text-primary-foreground/40 text-center">Бесплатный выезд инженера и финальный расчёт</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator