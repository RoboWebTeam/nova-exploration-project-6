import { useState, useEffect } from "react"

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return time
}

function Countdown({ target }: { target: string }) {
  const { days, hours, minutes, seconds } = useCountdown(target)
  const pad = (n: number) => String(n).padStart(2, "0")
  return (
    <div className="flex items-center gap-1.5 text-xs font-mono">
      {days > 0 && <><span className="bg-black/15 dark:bg-white/15 rounded px-1.5 py-0.5">{pad(days)}д</span><span className="opacity-40">:</span></>}
      <span className="bg-black/15 dark:bg-white/15 rounded px-1.5 py-0.5">{pad(hours)}ч</span>
      <span className="opacity-40">:</span>
      <span className="bg-black/15 dark:bg-white/15 rounded px-1.5 py-0.5">{pad(minutes)}м</span>
      <span className="opacity-40">:</span>
      <span className="bg-black/15 dark:bg-white/15 rounded px-1.5 py-0.5">{pad(seconds)}с</span>
    </div>
  )
}

const promos = [
  {
    id: 1,
    tag: "Горячее предложение",
    title: "Бесплатный выезд геолога",
    description: "При заказе строительства бункера до 31 июля — геологическое исследование участка в подарок. Экономия до 120 000 ₽.",
    badge: "Экономия 120 000 ₽",
    deadline: "до 31 июля",
    deadlineDate: "2026-07-31T23:59:59",
    cta: "Оставить заявку",
    color: "bg-primary text-primary-foreground",
  },
  {
    id: 2,
    tag: "Скидка",
    title: "−15% на семейные бункеры до 100 м²",
    description: "Специальная цена на компактные семейные укрытия площадью до 100 м². Надёжная защита по доступной стоимости.",
    badge: "Скидка 15%",
    deadline: "до 15 августа",
    deadlineDate: "2026-08-15T23:59:59",
    cta: "Рассчитать стоимость",
    color: "bg-secondary",
  },
  {
    id: 3,
    tag: "Бонус",
    title: "Система вентиляции в подарок",
    description: "При заказе бункера от 200 м² — система принудительной вентиляции с НЕРА-фильтрацией в комплекте. Стоимость системы от 350 000 ₽.",
    badge: "Подарок на 350 000 ₽",
    deadline: "до 1 сентября",
    deadlineDate: "2026-09-01T23:59:59",
    cta: "Узнать условия",
    color: "bg-secondary",
  },
  {
    id: 4,
    tag: "Рассрочка",
    title: "Рассрочка 0% на 12 месяцев",
    description: "Начните строительство сегодня — оплачивайте равными частями в течение года. Без переплат, без банков, от застройщика.",
    badge: "0% переплат",
    deadline: "Постоянное предложение",
    deadlineDate: null,
    cta: "Оформить рассрочку",
    color: "bg-secondary",
  },
]

export function Promos() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section id="promos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-8 md:mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3 md:mb-4">Специальные предложения</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Акции и скидки</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col gap-3 md:gap-4 border border-border transition-all duration-300 ${promo.color} ${activeId === promo.id ? "scale-[1.01]" : ""}`}
              onMouseEnter={() => setActiveId(promo.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-widest opacity-60 font-medium">{promo.tag}</span>
                <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-black/10 dark:bg-white/10">
                  {promo.badge}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-medium leading-snug">{promo.title}</h3>
              <p className="text-sm leading-relaxed opacity-70">{promo.description}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/10 dark:border-white/10 gap-3 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="text-xs opacity-50">⏱ {promo.deadline}</span>
                  {promo.deadlineDate && <Countdown target={promo.deadlineDate} />}
                </div>
                <a
                  href="#contact"
                  className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity shrink-0"
                >
                  {promo.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Promos