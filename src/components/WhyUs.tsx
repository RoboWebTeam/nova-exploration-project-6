import Icon from "@/components/ui/icon"

const reasons = [
  {
    icon: "ShieldCheck",
    title: "Гарантия 10 лет",
    description: "Даём письменную гарантию на конструкцию и все инженерные системы. Устраняем любые проблемы за свой счёт.",
  },
  {
    icon: "Clock",
    title: "Сдаём в срок",
    description: "100% объектов сданы в оговорённые сроки. Штраф за каждый день просрочки прописан в договоре.",
  },
  {
    icon: "FileText",
    title: "Работаем по договору",
    description: "Фиксированная цена без скрытых доплат. Все работы, материалы и сроки закреплены юридически.",
  },
  {
    icon: "Users",
    title: "Собственная бригада",
    description: "Никаких субподрядчиков — только наши сотрудники с опытом от 5 лет. Контроль качества на каждом этапе.",
  },
  {
    icon: "MapPin",
    title: "Работаем по всей России",
    description: "Строим в любом регионе. Собственный транспорт, оборудование и бригады — выезжаем в течение 3 дней.",
  },
  {
    icon: "Headphones",
    title: "Поддержка 24/7",
    description: "Личный менеджер на весь период строительства. Онлайн-трансляция с объекта в любое время.",
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-16">
          <div>
            <p className="text-primary-foreground/50 text-sm tracking-[0.3em] uppercase mb-3 md:mb-4">Наши преимущества</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Почему выбирают нас</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm bg-primary-foreground text-primary font-medium px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:opacity-90 transition-opacity self-start sm:self-auto"
          >
            Обсудить проект
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Icon name={r.icon as "ShieldCheck"} size={22} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-medium">{r.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs