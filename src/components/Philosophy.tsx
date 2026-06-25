import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Надежность конструкции",
    description:
      "Используем железобетон и сертифицированные материалы, способные выдержать ударные нагрузки, обрушения и стихийные бедствия.",
  },
  {
    title: "Полная автономность",
    description:
      "Системы фильтрации воздуха, регенерации воды, резервного питания и запасов провизии — бункер работает независимо от внешней среды.",
  },
  {
    title: "Инженерная защита",
    description:
      "Герметичные гермодвери, защита от радиации, химического и биологического заражения. Каждый узел рассчитан на реальную угрозу.",
  },
  {
    title: "Комфорт под землей",
    description: "Продуманная вентиляция, освещение, спальные и бытовые зоны. Безопасное укрытие, в котором действительно можно жить.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 md:mb-6">Наш подход</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl xl:text-8xl">
              Безопасность
              <br />
              <HighlightedText>превыше всего</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Архитектурный эскиз рабочего пространства"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-32 xl:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Бункер — это не просто бетонная коробка. Это инженерная система жизнеобеспечения, которой вы доверяете самое ценное. Мы строим убежища, на которые можно положиться в любой ситуации.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}