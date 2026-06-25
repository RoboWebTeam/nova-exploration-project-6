import { useEffect, useRef, useState } from "react"

const packages = [
  {
    id: "base",
    name: "Базовый",
    price: "от 5 млн ₽",
    priceNote: "под ключ",
    desc: "Надёжная защита без излишеств. Всё необходимое для безопасного укрытия семьи.",
    highlight: false,
    features: [
      { text: "Монолитный железобетон 400 мм", included: true },
      { text: "Принудительная вентиляция", included: true },
      { text: "Электроснабжение от сети", included: true },
      { text: "Санузел и водоснабжение", included: true },
      { text: "Бронированный вход EI-60", included: true },
      { text: "Базовая отделка", included: true },
      { text: "Генератор резервного питания", included: false },
      { text: "Система очистки воды", included: false },
      { text: "Дизайн-интерьер", included: false },
      { text: "Умный дом", included: false },
    ],
  },
  {
    id: "comfort",
    name: "Комфорт",
    price: "от 15 млн ₽",
    priceNote: "под ключ",
    desc: "Оптимальный баланс защиты и комфорта. Самый популярный выбор.",
    highlight: true,
    features: [
      { text: "Монолитный железобетон 500 мм", included: true },
      { text: "НЕРА-вентиляция с фильтрацией", included: true },
      { text: "Генератор резервного питания", included: true },
      { text: "Санузел и система очистки воды", included: true },
      { text: "Бронированный вход EI-90", included: true },
      { text: "Чистовая отделка под ключ", included: true },
      { text: "Мебель и бытовая техника", included: true },
      { text: "Запас продовольствия 3 мес.", included: true },
      { text: "Дизайн-интерьер", included: false },
      { text: "Умный дом", included: false },
    ],
  },
  {
    id: "premium",
    name: "Премиум",
    price: "от 35 млн ₽",
    priceNote: "под ключ",
    desc: "Максимальная автономность и премиальный интерьер. Жизнь без компромиссов.",
    highlight: false,
    features: [
      { text: "Монолитный железобетон 600 мм", included: true },
      { text: "НЕРА-вентиляция + хим. защита", included: true },
      { text: "Генератор 50+ кВт + солнечные панели", included: true },
      { text: "Автономное водоснабжение", included: true },
      { text: "Бронированный вход EI-120", included: true },
      { text: "Дизайн-интерьер под ключ", included: true },
      { text: "Умный дом Lutron / KNX", included: true },
      { text: "Запас продовольствия 12 мес.", included: true },
      { text: "Спутниковая связь Starlink", included: true },
      { text: "Медицинский блок", included: true },
    ],
  },
]

export function Packages() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="packages" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Комплектации</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Пакеты услуг</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">Выберите подходящий уровень — точную стоимость рассчитаем после выезда инженера</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col transition-all duration-500 ${
                pkg.highlight
                  ? "bg-primary text-primary-foreground shadow-2xl scale-[1.02]"
                  : "bg-secondary/50 border border-border"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? pkg.highlight ? "scale(1.02)" : "none"
                  : "translateY(32px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    Популярный выбор
                  </span>
                </div>
              )}

              <div className="p-8 pb-6">
                <p className={`text-xs uppercase tracking-widest font-medium mb-3 ${pkg.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {pkg.name}
                </p>
                <div className="mb-2">
                  <span className="text-3xl font-medium">{pkg.price}</span>
                  <span className={`text-sm ml-2 ${pkg.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{pkg.priceNote}</span>
                </div>
                <p className={`text-sm leading-relaxed ${pkg.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {pkg.desc}
                </p>
              </div>

              <div className={`mx-8 border-t ${pkg.highlight ? "border-white/20" : "border-border"}`} />

              <div className="p-8 pt-6 flex-1">
                <ul className="space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-sm">
                      <span className={`shrink-0 mt-0.5 font-bold ${f.included ? "text-orange-400" : pkg.highlight ? "text-primary-foreground/25" : "text-muted-foreground/30"}`}>
                        {f.included ? "✓" : "–"}
                      </span>
                      <span className={!f.included ? (pkg.highlight ? "text-primary-foreground/40" : "text-muted-foreground/50") : ""}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
                    pkg.highlight
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  Обсудить проект
                </a>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-muted-foreground text-sm mt-8 transition-all duration-700 delay-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          Все пакеты включают: геологию, проект, строительство, сдачу под ключ и гарантию 10 лет
        </p>
      </div>
    </section>
  )
}

export default Packages
