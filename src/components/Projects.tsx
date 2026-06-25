import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Семейный бункер «Гранит»",
    category: "Защитное укрытие · 6 чел.",
    location: "Московская область",
    year: "2020",
    image: "/images/hously-1.png",
    description: "Семейный подземный бункер с жилыми комнатами, автономным водоснабжением и системой вентиляции. Укреплённые стены из монолитного железобетона.",
    area: "85 м²",
    duration: "38 дней",
    budget: "от 3,2 млн ₽",
  },
  {
    id: 2,
    title: "Подземный комплекс «Редут»",
    category: "Автономный бункер · 12 чел.",
    location: "Ленинградская область",
    year: "2021",
    image: "/images/hously-2.png",
    description: "Многофункциональный комплекс с двумя выходами, дизельной электростанцией и запасом провизии на 6 месяцев. Полная автономность.",
    area: "160 м²",
    duration: "62 дня",
    budget: "от 7,8 млн ₽",
  },
  {
    id: 3,
    title: "Убежище «Бастион»",
    category: "Частное укрытие · 4 чел.",
    location: "Краснодарский край",
    year: "2021",
    image: "/images/hously-3.png",
    description: "Компактный частный бункер с одной жилой зоной, санузлом и системой фильтрации воздуха. Быстрое возведение на участке заказчика.",
    area: "48 м²",
    duration: "25 дней",
    budget: "от 1,9 млн ₽",
  },
  {
    id: 4,
    title: "Бункер «Цитадель»",
    category: "Многоуровневый объект · 20 чел.",
    location: "Республика Татарстан",
    year: "2022",
    image: "/images/hously-4.png",
    description: "Двухуровневый бункер с командным пунктом, жилыми отсеками и медицинским блоком. Рассчитан на длительное автономное проживание.",
    area: "240 м²",
    duration: "90 дней",
    budget: "от 14 млн ₽",
  },
  {
    id: 5,
    title: "Бункер «Форпост»",
    category: "Защитное укрытие · 8 чел.",
    location: "Свердловская область",
    year: "2022",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/c46e7d26-4cce-4118-8255-48cce18149fc.jpg",
    description: "Заглублённое укрытие с усиленной гидроизоляцией, пригодное для сурового уральского климата. Автономная система отопления.",
    area: "110 м²",
    duration: "45 дней",
    budget: "от 5,1 млн ₽",
  },
  {
    id: 6,
    title: "Резиденция «Убежище»",
    category: "Премиум-укрытие · 6 чел.",
    location: "Новосибирская область",
    year: "2022",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/e20078b2-2aac-4163-84ac-024dfe38e311.jpg",
    description: "Премиальный бункер с дизайнерской отделкой, системой умного дома и винным погребом. Комфорт городской квартиры под землёй.",
    area: "130 м²",
    duration: "55 дней",
    budget: "от 9,5 млн ₽",
  },
  {
    id: 7,
    title: "Комплекс «Рубеж»",
    category: "Промышленный объект · 30 чел.",
    location: "Челябинская область",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/2c38a575-5d24-49b9-a6f9-d3b49589ce21.jpg",
    description: "Корпоративный укрывной комплекс с переговорными залами, серверной и системами жизнеобеспечения промышленного класса.",
    area: "380 м²",
    duration: "120 дней",
    budget: "от 28 млн ₽",
  },
  {
    id: 8,
    title: "Бункер «Оплот»",
    category: "VIP-укрытие · 4 чел.",
    location: "Тюменская область",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/6adb1335-ea22-4a63-98ca-25a7c0e6969c.jpg",
    description: "Элитный персональный бункер с отделкой натуральным камнем, спа-зоной и системой климат-контроля. Под ключ за 40 дней.",
    area: "95 м²",
    duration: "40 дней",
    budget: "от 8,7 млн ₽",
  },
  {
    id: 9,
    title: "Бункер «Страж»",
    category: "Автономный объект · 10 чел.",
    location: "Воронежская область",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/52d467e3-d56c-43c1-af55-7ef3efa16b7e.jpg",
    description: "Автономный объект с солнечными панелями, системой сбора дождевой воды и органическим огородом. Независимость на 12 месяцев.",
    area: "175 м²",
    duration: "70 дней",
    budget: "от 11 млн ₽",
  },
  {
    id: 10,
    title: "Командный пункт «Штаб»",
    category: "Командный центр · 15 чел.",
    location: "Самарская область",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/557fc894-c913-410d-abb9-2fd00017c0ff.jpg",
    description: "Подземный командный пункт с защищёнными каналами связи, резервным дата-центром и круглосуточной системой видеонаблюдения.",
    area: "210 м²",
    duration: "85 дней",
    budget: "от 18 млн ₽",
  },
  {
    id: 11,
    title: "Бункер «Восток»",
    category: "Семейный объект · 6 чел.",
    location: "Нижегородская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/019b26e6-ecc4-4b50-ad86-67d28e7828e4.jpg",
    description: "Котлованный тип строительства с глубиной заложения 6 метров. Монолитные стены 600 мм, армированный пол и перекрытие.",
    area: "100 м²",
    duration: "42 дня",
    budget: "от 4,8 млн ₽",
  },
  {
    id: 12,
    title: "Комплекс «Заслон»",
    category: "Автономный объект · 8 чел.",
    location: "Ростовская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/6cd2fe2d-fe9e-4bd8-a11b-dd974feb49cf.jpg",
    description: "Подземный комплекс с экскаваторной разработкой грунта, бетонной опалубкой и двойной гидроизоляционной мембраной.",
    area: "145 м²",
    duration: "58 дней",
    budget: "от 8,2 млн ₽",
  },
  {
    id: 13,
    title: "Бункер «Монолит»",
    category: "Промышленный объект · 25 чел.",
    location: "Пермский край",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/7e939e59-0027-4578-aa3e-8d1613bd449c.jpg",
    description: "Масштабный промышленный объект с поэтапной заливкой монолитных конструкций. Кран-балка на объекте, круглосуточное бетонирование.",
    area: "320 м²",
    duration: "105 дней",
    budget: "от 22 млн ₽",
  },
  {
    id: 14,
    title: "Комплекс «Арсенал»",
    category: "Многоуровневый объект · 30 чел.",
    location: "Саратовская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/1da99ea2-bf00-453e-b61f-6e8f0e2ce41b.jpg",
    description: "Трёхуровневый объект с воздушной подушкой между перекрытиями. Антисейсмическое армирование и защита от грунтовых вод.",
    area: "450 м²",
    duration: "130 дней",
    budget: "от 35 млн ₽",
  },
  {
    id: 15,
    title: "Бункер «Крепость»",
    category: "Защитное укрытие · 12 чел.",
    location: "Ярославская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/8eb089e5-02de-4be8-a0ce-30ef48b1eece.jpg",
    description: "Строительство в сложных грунтовых условиях с водопонижением. Укладка плит перекрытия методом горизонтального скольжения.",
    area: "185 м²",
    duration: "75 дней",
    budget: "от 12 млн ₽",
  },
  {
    id: 16,
    title: "Объект «Рассвет»",
    category: "Семейный объект · 5 чел.",
    location: "Калужская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/a48494d1-3319-4e7f-a51c-0d719268e293.jpg",
    description: "Завершающий этап: герметизация входного люка, установка бронированной двери и подключение инженерных коммуникаций.",
    area: "72 м²",
    duration: "32 дня",
    budget: "от 2,9 млн ₽",
  },
  {
    id: 17,
    title: "Резиденция «Люкс»",
    category: "Премиум · 6 чел.",
    location: "Московская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/1ef2ffe3-405e-4f7d-8491-fe184a748010.jpg",
    description: "Гостиная с дизайнерской мебелью, деревянными панелями и системой многозонального освещения. Атмосфера загородного дома под землёй.",
    area: "140 м²",
    duration: "65 дней",
    budget: "от 13 млн ₽",
  },
  {
    id: 18,
    title: "Апартаменты «Альфа»",
    category: "VIP-укрытие · 4 чел.",
    location: "Ленинградская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/7837f473-9f23-4d72-b743-01e115377f2b.jpg",
    description: "Спальный блок с встроенной подсветкой, двуспальными кроватями и системой шумоизоляции. Полноценный отдых в любых условиях.",
    area: "88 м²",
    duration: "38 дней",
    budget: "от 7,4 млн ₽",
  },
  {
    id: 19,
    title: "Комплекс «Эдем»",
    category: "Премиум · 8 чел.",
    location: "Краснодарский край",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/d1ed4122-faee-4dfc-8836-3429d9984b25.jpg",
    description: "Кухонный блок с профессиональной техникой, гранитными столешницами и вентиляцией с угольными фильтрами. Приготовление пищи без ограничений.",
    area: "165 м²",
    duration: "72 дня",
    budget: "от 16 млн ₽",
  },
  {
    id: 20,
    title: "Бункер «Олимп»",
    category: "VIP-укрытие · 10 чел.",
    location: "Тюменская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/5b3b349f-477b-4180-8a89-5e8974b75d0a.jpg",
    description: "Спортивный зал с резиновым покрытием, тренажёрами и зоной растяжки. Поддержание физической формы при длительном укрытии.",
    area: "200 м²",
    duration: "80 дней",
    budget: "от 19 млн ₽",
  },
  {
    id: 21,
    title: "Штаб «Аврора»",
    category: "Корпоративный · 20 чел.",
    location: "Новосибирская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/11e7f796-50a3-4dea-8c1a-18a98b48a750.jpg",
    description: "Корпоративный переговорный зал с экранами, защищёнными каналами связи и системой контроля доступа. Управление бизнесом из укрытия.",
    area: "280 м²",
    duration: "95 дней",
    budget: "от 24 млн ₽",
  },
  {
    id: 22,
    title: "Резиденция «Сапфир»",
    category: "Премиум · 6 чел.",
    location: "Свердловская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/0d96b048-b754-414b-b7db-fe01ef79dc45.jpg",
    description: "Парадный холл с полированным бетонным полом, бронированной дверью класса EI-120 и системой биометрического доступа.",
    area: "155 м²",
    duration: "68 дней",
    budget: "от 14 млн ₽",
  },
  {
    id: 23,
    title: "Резиденция «Нептун»",
    category: "Премиум · 8 чел.",
    location: "Сочи",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/b866eb10-4059-4db1-988c-fb1b9572cdec.jpg",
    description: "Подземный бассейн с подводной подсветкой, системой озонирования воды и зоной отдыха. Уникальный SPA-комплекс в укрытии.",
    area: "220 м²",
    duration: "88 дней",
    budget: "от 21 млн ₽",
  },
  {
    id: 24,
    title: "Комплекс «Синема»",
    category: "VIP-укрытие · 6 чел.",
    location: "Московская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/2e63b32d-4ae4-4c44-9b0c-b39fbbf25106.jpg",
    description: "Домашний кинозал с проектором 4K, акустической системой Dolby Atmos и мягкими реклайнерами. Досуг без компромиссов.",
    area: "125 м²",
    duration: "52 дня",
    budget: "от 11 млн ₽",
  },
  {
    id: 25,
    title: "Объект «Эскулап»",
    category: "Премиум с медблоком · 10 чел.",
    location: "Санкт-Петербург",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/d3a1aa72-1c4f-46dc-a9e5-8f17d6d83ce1.jpg",
    description: "Медицинский блок с оборудованием реанимационного класса, операционным столом и запасом медикаментов на 6 месяцев.",
    area: "190 м²",
    duration: "78 дней",
    budget: "от 17 млн ₽",
  },
  {
    id: 26,
    title: "Клуб «Диоген»",
    category: "Элитный · 12 чел.",
    location: "Казань",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/913ecda5-cb48-4074-907c-ad254164e659.jpg",
    description: "Винный погреб с коллекционными стеллажами на 2 000 бутылок, кожаными креслами и системой поддержания температуры.",
    area: "170 м²",
    duration: "70 дней",
    budget: "от 15 млн ₽",
  },
  {
    id: 27,
    title: "Штаб «Меркурий»",
    category: "Корпоративный · 15 чел.",
    location: "Екатеринбург",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/7623e080-adc5-45cd-bcc3-cd5ebd0c8786.jpg",
    description: "Оперативный центр управления с 24 мониторами, защищёнными серверами и резервированными каналами спутниковой связи.",
    area: "250 м²",
    duration: "100 дней",
    budget: "от 26 млн ₽",
  },
  {
    id: 28,
    title: "Семейный «Радуга»",
    category: "Семейный премиум · 5 чел.",
    location: "Воронеж",
    year: "2026",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/b5e62028-fcd8-4647-8c7f-8aebd3537ace.jpg",
    description: "Детская игровая зона с мягкими покрытиями, развивающими элементами и безопасным освещением. Комфорт для всей семьи.",
    area: "115 м²",
    duration: "48 дней",
    budget: "от 6,3 млн ₽",
  },
  {
    id: 29,
    title: "Комплекс «Аргус»",
    category: "Технологичный · 20 чел.",
    location: "Новосибирск",
    year: "2026",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/d799701f-e431-4914-8cac-5a18fe51f743.jpg",
    description: "Серверная комната с ИБП, климатической системой и защитой от электромагнитного излучения. Данные сохранятся при любом сценарии.",
    area: "235 м²",
    duration: "92 дня",
    budget: "от 23 млн ₽",
  },
  {
    id: 30,
    title: "Резиденция «Аквамарин»",
    category: "VIP · 4 чел.",
    location: "Краснодар",
    year: "2026",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/02ddd4f4-539e-4d79-9d93-e87e10e9b664.jpg",
    description: "Ванная комната с мраморной отделкой, ванной на ножках и тропическим душем. Роскошь в условиях полной изоляции.",
    area: "105 м²",
    duration: "44 дня",
    budget: "от 9,8 млн ₽",
  },
  {
    id: 31,
    title: "Библиотека «Афина»",
    category: "Премиум · 6 чел.",
    location: "Ростов-на-Дону",
    year: "2026",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/4ead20d5-301a-4661-a370-eeee4e8c3c75.jpg",
    description: "Личная библиотека с полками от пола до потолка, кожаными креслами и рабочим кабинетом. Пространство для мысли и уединения.",
    area: "135 м²",
    duration: "56 дней",
    budget: "от 10 млн ₽",
  },
  {
    id: 32,
    title: "Усадьба «Горизонт»",
    category: "Элитный загородный · 8 чел.",
    location: "Подмосковье",
    year: "2026",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/30b3eb95-432d-4e13-9abb-0076f1414fbd.jpg",
    description: "Замаскированный въезд под ландшафтным садом, скрытый бронированный люк и внешняя охранная система периметра.",
    area: "300 м²",
    duration: "110 дней",
    budget: "от 31 млн ₽",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Реализованные объекты</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши бункеры</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все объекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-medium mb-1 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm shrink-0">{project.year}</span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span className="text-sm"><span className="text-muted-foreground">Площадь:</span> <span className="font-medium">{project.area}</span></span>
                <span className="text-sm"><span className="text-muted-foreground">Срок:</span> <span className="font-medium">{project.duration}</span></span>
                <span className="text-sm"><span className="text-muted-foreground">Бюджет:</span> <span className="font-medium">{project.budget}</span></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
