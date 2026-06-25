import { useState, useEffect, useRef } from "react"

const reviews = [
  {
    id: 1,
    name: "Андрей Викторович",
    city: "Москва",
    year: "2024",
    project: "Семейный бункер 85 м²",
    rating: 5,
    text: "Строили бункер под домом за городом. Команда приехала точно в срок, всё объяснили, показали. Никакого хаоса на участке — работали аккуратно. Сдали на 4 дня раньше срока. Качество бетона проверили лично с инженером. Рекомендую без оговорок.",
  },
  {
    id: 2,
    name: "Сергей и Марина К.",
    city: "Санкт-Петербург",
    year: "2024",
    project: "Семейный бункер 110 м²",
    rating: 5,
    text: "Долго выбирали подрядчика, смотрели 6 компаний. Эти выделились тем, что показали реальные объекты, а не только картинки. Процесс строительства контролировали онлайн — присылали фото каждый день. Результат превзошёл ожидания.",
  },
  {
    id: 3,
    name: "Михаил Геннадьевич",
    city: "Екатеринбург",
    year: "2023",
    project: "Корпоративный бункер 280 м²",
    rating: 5,
    text: "Строили объект для компании. Очень понравился профессиональный подход: договор, проект, смета — всё прозрачно. Ни одного рубля переплаты. Бункер сдан в срок, все инженерные системы работают без нареканий уже больше года.",
  },
  {
    id: 4,
    name: "Дмитрий Олегович",
    city: "Краснодар",
    year: "2025",
    project: "Бункер «Премиум» 165 м²",
    rating: 5,
    text: "Заказал бункер с полным премиум-оснащением. Интерьер, умный дом, кинозал — всё в одном объекте. Реализация заняла 72 дня, как и обещали. Инженеры были на связи круглосуточно. Объект буквально лучший в своём классе.",
  },
  {
    id: 5,
    name: "Наталья Павловна",
    city: "Новосибирск",
    year: "2025",
    project: "Семейный бункер 72 м²",
    rating: 5,
    text: "Обратилась после рекомендации знакомых. Не пожалела ни разу. Сложный грунт на участке — решили без лишних слов. Стоимость не изменилась от начала до конца, хотя технически объект оказался сложнее. Честная компания.",
  },
  {
    id: 6,
    name: "Владимир Иванович",
    city: "Ростов-на-Дону",
    year: "2025",
    project: "Комплекс 145 м²",
    rating: 5,
    text: "Строили с нуля — от геологии до ключа. Особенно оценил, что они сами занялись разрешительными документами. Я просто приехал принять готовый объект. Всё работает: свет, вода, вентиляция, связь. Очень доволен.",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

export function Reviews() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1))

  const visible3 = [
    reviews[(current) % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ]

  return (
    <section id="reviews" ref={ref} className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-16">
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3 md:mb-4">Клиенты о нас</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Отзывы</h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right mr-2 md:mr-4">
              <p className="text-3xl md:text-4xl font-medium">5.0</p>
              <Stars count={5} />
              <p className="text-muted-foreground text-xs mt-1">120+ проектов</p>
            </div>
            <button onClick={prev} className="w-11 h-11 rounded-full border border-border hover:bg-secondary transition-colors flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15,18 9,12 15,6" /></svg>
            </button>
            <button onClick={next} className="w-11 h-11 rounded-full border border-border hover:bg-secondary transition-colors flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9,18 15,12 9,6" /></svg>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {visible3.map((review, i) => (
            <div
              key={`${review.id}-${current}`}
              className={`rounded-2xl border border-border p-5 md:p-8 flex flex-col gap-4 md:gap-5 bg-background transition-all duration-500 ${i >= 1 ? "hidden sm:flex" : ""} ${i >= 2 ? "sm:hidden md:flex" : ""}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(32px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <Stars count={review.rating} />
              <p className="text-foreground/80 text-sm leading-relaxed flex-1">«{review.text}»</p>
              <div className="border-t border-border pt-5">
                <p className="font-medium text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{review.city} · {review.project} · {review.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-foreground" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews