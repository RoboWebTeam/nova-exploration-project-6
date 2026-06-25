import { useEffect, useRef, useState } from "react"

const steps = [
  {
    num: "01",
    title: "Заявка и консультация",
    duration: "1 день",
    desc: "Оставляете заявку — менеджер перезванивает в течение 2 часов. Обсуждаем задачу, количество человек, требования к автономности и бюджет.",
    details: ["Бесплатная консультация по телефону", "Подбор оптимального варианта", "Предварительная оценка стоимости"],
  },
  {
    num: "02",
    title: "Выезд инженера и геология",
    duration: "2–3 дня",
    desc: "Инженер выезжает на участок, изучает грунт и геологию. Это бесплатно при заключении договора. Результат — точный расчёт фундамента и глубины.",
    details: ["Бесплатный выезд инженера", "Геологическое исследование грунта", "Оценка сложности строительства"],
  },
  {
    num: "03",
    title: "Проект и смета",
    duration: "5–7 дней",
    desc: "Разрабатываем проект под ваши требования с планировкой, расчётом нагрузок и спецификацией материалов. Фиксируем стоимость в договоре — без скрытых доплат.",
    details: ["Архитектурный план и разрезы", "Инженерные схемы (вент., электрика, вода)", "Фиксированная смета в договоре"],
  },
  {
    num: "04",
    title: "Строительство",
    duration: "30–180 дней",
    desc: "Работаем круглосуточно. Ежедневно отправляем фотоотчёт. Вы можете приехать на объект в любой момент — скрывать нечего.",
    details: ["Монолитный железобетон, армирование A500C", "УЗК-контроль сварных швов и бетона", "Ежедневный фотоотчёт заказчику"],
  },
  {
    num: "05",
    title: "Инженерные системы",
    duration: "7–21 день",
    desc: "Монтируем вентиляцию, электрику, водоснабжение, связь и системы безопасности. Всё проверяется под нагрузкой до сдачи объекта.",
    details: ["НЕРА-фильтрация и принудительная вентиляция", "Автономное электроснабжение", "Системы связи и охраны"],
  },
  {
    num: "06",
    title: "Сдача объекта",
    duration: "1 день",
    desc: "Принимаете объект с нашим инженером. Подписываем акт, передаём документацию и обучаем пользованию системами. Гарантия — 10 лет.",
    details: ["Акт приёмки и вся документация", "Обучение работе с системами", "Гарантия 10 лет на конструкции"],
  },
]

export function Process() {
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" ref={ref} className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-6 md:px-12">
        <div
          className="mb-10 md:mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Как мы работаем</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Процесс строительства</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">От звонка до ключей — прозрачно, по договору, без сюрпризов</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-[2.75rem] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(-20px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <button
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className="w-full text-left"
                >
                  <div className={`flex items-start gap-6 rounded-2xl p-6 border transition-all duration-300 ${
                    activeStep === i ? "bg-background border-border shadow-sm" : "border-transparent hover:bg-background/50"
                  }`}>
                    <div className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                      activeStep === i ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}>
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h3 className="font-medium text-lg">{step.title}</h3>
                        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full shrink-0">{step.duration}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{step.desc}</p>

                      <div className={`overflow-hidden transition-all duration-300 ${activeStep === i ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                        <ul className="space-y-1.5">
                          {step.details.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-orange-400 shrink-0 mt-0.5">✓</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className={`shrink-0 mt-1 text-muted-foreground transition-transform duration-300 ${activeStep === i ? "rotate-180" : ""}`}
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 md:mt-12 rounded-2xl bg-primary text-primary-foreground p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6 transition-all duration-700 delay-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)" }}
        >
          <div>
            <p className="font-medium text-lg">Готовы начать?</p>
            <p className="text-primary-foreground/60 text-sm mt-1">Первая консультация и выезд инженера — бесплатно</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-white text-primary px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-opacity"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  )
}

export default Process