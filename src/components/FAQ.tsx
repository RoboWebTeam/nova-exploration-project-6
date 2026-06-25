import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько времени занимает строительство бункера?",
    answer:
      "Сроки зависят от размера и сложности объекта. Компактное семейное укрытие мы возводим за 2–4 месяца, многоуровневый автономный комплекс — за 6–10 месяцев. Точные сроки фиксируем в договоре после согласования проекта.",
  },
  {
    question: "От чего защищает ваш бункер?",
    answer:
      "Наши укрытия рассчитаны на защиту от ударной волны, обломков, пожаров, радиационного, химического и биологического заражения. Системы фильтрации и герметичные двери позволяют переждать угрозу в полностью изолированной среде.",
  },
  {
    question: "Как долго можно находиться в бункере автономно?",
    answer:
      "В зависимости от комплектации — от нескольких недель до нескольких месяцев. Мы рассчитываем запасы воздуха, воды, топлива и провизии под нужное количество человек и желаемый срок автономности.",
  },
  {
    question: "Что входит в строительство под ключ?",
    answer:
      "Полный цикл: геологические изыскания, проектирование, земляные работы, возведение конструкции, монтаж вентиляции, водоснабжения, электрики, защитного оборудования и внутренняя отделка. Вы получаете готовое к использованию укрытие.",
  },
  {
    question: "Нужно ли получать разрешения на строительство?",
    answer:
      "Да, для большинства объектов требуется оформление документации. Мы берём юридическое сопровождение на себя: помогаем с согласованиями и подготовкой всех необходимых разрешений.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Оставьте заявку — мы проведём бесплатную консультацию, обсудим ваши задачи, участок и бюджет. После выезда специалиста подготовим индивидуальный проект и точную смету.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}