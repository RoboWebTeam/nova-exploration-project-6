import { useEffect, useRef, useState } from "react"

const certs = [
  {
    icon: "🏛️",
    title: "Допуск СРО",
    number: "№ СРО-5032263756-20260505-1259",
    issuer: "НП «Союзатомстрой»",
    desc: "Свидетельство о допуске к работам, которые оказывают влияние на безопасность объектов капитального строительства",
    year: "2023",
  },
  {
    icon: "🔬",
    title: "ISO 9001:2015",
    number: "№ RU.СМК.0241",
    issuer: "TÜV Rheinland",
    desc: "Система менеджмента качества. Подтверждает соответствие всех строительных процессов международным стандартам",
    year: "2023",
  },
  {
    icon: "🏆",
    title: "«Надёжный застройщик»",
    number: "Диплом лауреата",
    issuer: "РБК + Деловая Россия",
    desc: "Национальная премия в сфере строительства специальных объектов. Лауреат в номинации «Лучший подземный объект 2024»",
    year: "2024",
  },
]

const stats = [
  { value: "12+", label: "лет на рынке" },
  { value: "120+", label: "объектов сдано" },
  { value: "10 лет", label: "гарантия" },
  { value: "0", label: "судебных споров" },
]

export function Certificates() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="certificates" ref={ref} className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-6 md:px-12">
        <div
          className="mb-10 md:mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Документы</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Лицензии и сертификаты</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">Работаем официально. Все документы можно проверить в государственных реестрах</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-16">
          {certs.map((cert, i) => (
            <div
              key={cert.title}
              className="bg-background rounded-2xl p-6 border border-border flex flex-col gap-4 transition-all duration-500 hover:shadow-md"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{cert.icon}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full shrink-0">{cert.year}</span>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-0.5">{cert.title}</h3>
                <p className="text-xs text-muted-foreground font-mono">{cert.number}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cert.desc}</p>
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">Выдан: <span className="text-foreground font-medium">{cert.issuer}</span></p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-8 lg:p-10 transition-all duration-700 delay-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-medium">{s.value}</p>
                <p className="text-primary-foreground/60 text-xs sm:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-primary-foreground/70 text-sm max-w-lg">
              Перед подписанием договора предоставляем полный пакет документов, свидетельства СРО и реквизиты компании.
            </p>
            <a
              href="#contact"
              className="shrink-0 bg-white text-primary px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-opacity whitespace-nowrap"
            >
              Запросить документы
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates