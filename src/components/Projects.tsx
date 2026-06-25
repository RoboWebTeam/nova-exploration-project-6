import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Семейный бункер «Гранит»",
    category: "Защитное укрытие · 6 чел.",
    location: "Московская область",
    year: "2024",
    image: "/images/hously-1.png",
  },
  {
    id: 2,
    title: "Подземный комплекс «Редут»",
    category: "Автономный бункер · 12 чел.",
    location: "Ленинградская область",
    year: "2023",
    image: "/images/hously-2.png",
  },
  {
    id: 3,
    title: "Убежище «Бастион»",
    category: "Частное укрытие · 4 чел.",
    location: "Краснодарский край",
    year: "2023",
    image: "/images/hously-3.png",
  },
  {
    id: 4,
    title: "Бункер «Цитадель»",
    category: "Многоуровневый объект · 20 чел.",
    location: "Республика Татарстан",
    year: "2024",
    image: "/images/hously-4.png",
  },
  {
    id: 5,
    title: "Бункер «Форпост»",
    category: "Защитное укрытие · 8 чел.",
    location: "Свердловская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/c46e7d26-4cce-4118-8255-48cce18149fc.jpg",
  },
  {
    id: 6,
    title: "Резиденция «Убежище»",
    category: "Премиум-укрытие · 6 чел.",
    location: "Новосибирская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/e20078b2-2aac-4163-84ac-024dfe38e311.jpg",
  },
  {
    id: 7,
    title: "Комплекс «Рубеж»",
    category: "Промышленный объект · 30 чел.",
    location: "Челябинская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/2c38a575-5d24-49b9-a6f9-d3b49589ce21.jpg",
  },
  {
    id: 8,
    title: "Бункер «Оплот»",
    category: "VIP-укрытие · 4 чел.",
    location: "Тюменская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/6adb1335-ea22-4a63-98ca-25a7c0e6969c.jpg",
  },
  {
    id: 9,
    title: "Бункер «Страж»",
    category: "Автономный объект · 10 чел.",
    location: "Воронежская область",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/52d467e3-d56c-43c1-af55-7ef3efa16b7e.jpg",
  },
  {
    id: 10,
    title: "Командный пункт «Штаб»",
    category: "Командный центр · 15 чел.",
    location: "Самарская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/557fc894-c913-410d-abb9-2fd00017c0ff.jpg",
  },
  {
    id: 11,
    title: "Бункер «Восток»",
    category: "Семейный объект · 6 чел.",
    location: "Нижегородская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/019b26e6-ecc4-4b50-ad86-67d28e7828e4.jpg",
  },
  {
    id: 12,
    title: "Комплекс «Заслон»",
    category: "Автономный объект · 8 чел.",
    location: "Ростовская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/6cd2fe2d-fe9e-4bd8-a11b-dd974feb49cf.jpg",
  },
  {
    id: 13,
    title: "Бункер «Монолит»",
    category: "Промышленный объект · 25 чел.",
    location: "Пермский край",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/7e939e59-0027-4578-aa3e-8d1613bd449c.jpg",
  },
  {
    id: 14,
    title: "Комплекс «Арсенал»",
    category: "Многоуровневый объект · 30 чел.",
    location: "Саратовская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/1da99ea2-bf00-453e-b61f-6e8f0e2ce41b.jpg",
  },
  {
    id: 15,
    title: "Бункер «Крепость»",
    category: "Защитное укрытие · 12 чел.",
    location: "Ярославская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/8eb089e5-02de-4be8-a0ce-30ef48b1eece.jpg",
  },
  {
    id: 16,
    title: "Объект «Рассвет»",
    category: "Семейный объект · 5 чел.",
    location: "Калужская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/a48494d1-3319-4e7f-a51c-0d719268e293.jpg",
  },
  {
    id: 17,
    title: "Резиденция «Люкс»",
    category: "Премиум · 6 чел.",
    location: "Московская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/1ef2ffe3-405e-4f7d-8491-fe184a748010.jpg",
  },
  {
    id: 18,
    title: "Апартаменты «Альфа»",
    category: "VIP-укрытие · 4 чел.",
    location: "Ленинградская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/7837f473-9f23-4d72-b743-01e115377f2b.jpg",
  },
  {
    id: 19,
    title: "Комплекс «Эдем»",
    category: "Премиум · 8 чел.",
    location: "Краснодарский край",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/d1ed4122-faee-4dfc-8836-3429d9984b25.jpg",
  },
  {
    id: 20,
    title: "Бункер «Олимп»",
    category: "VIP-укрытие · 10 чел.",
    location: "Тюменская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/5b3b349f-477b-4180-8a89-5e8974b75d0a.jpg",
  },
  {
    id: 21,
    title: "Штаб «Аврора»",
    category: "Корпоративный · 20 чел.",
    location: "Новосибирская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/11e7f796-50a3-4dea-8c1a-18a98b48a750.jpg",
  },
  {
    id: 22,
    title: "Резиденция «Сапфир»",
    category: "Премиум · 6 чел.",
    location: "Свердловская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/0d96b048-b754-414b-b7db-fe01ef79dc45.jpg",
  },
  {
    id: 23,
    title: "Резиденция «Нептун»",
    category: "Премиум · 8 чел.",
    location: "Сочи",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/b866eb10-4059-4db1-988c-fb1b9572cdec.jpg",
  },
  {
    id: 24,
    title: "Комплекс «Синема»",
    category: "VIP-укрытие · 6 чел.",
    location: "Московская область",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/2e63b32d-4ae4-4c44-9b0c-b39fbbf25106.jpg",
  },
  {
    id: 25,
    title: "Объект «Эскулап»",
    category: "Премиум с медблоком · 10 чел.",
    location: "Санкт-Петербург",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/d3a1aa72-1c4f-46dc-a9e5-8f17d6d83ce1.jpg",
  },
  {
    id: 26,
    title: "Клуб «Диоген»",
    category: "Элитный · 12 чел.",
    location: "Казань",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/913ecda5-cb48-4074-907c-ad254164e659.jpg",
  },
  {
    id: 27,
    title: "Штаб «Меркурий»",
    category: "Корпоративный · 15 чел.",
    location: "Екатеринбург",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/7623e080-adc5-45cd-bcc3-cd5ebd0c8786.jpg",
  },
  {
    id: 28,
    title: "Семейный «Радуга»",
    category: "Семейный премиум · 5 чел.",
    location: "Воронеж",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/b5e62028-fcd8-4647-8c7f-8aebd3537ace.jpg",
  },
  {
    id: 29,
    title: "Комплекс «Аргус»",
    category: "Технологичный · 20 чел.",
    location: "Новосибирск",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/d799701f-e431-4914-8cac-5a18fe51f743.jpg",
  },
  {
    id: 30,
    title: "Резиденция «Аквамарин»",
    category: "VIP · 4 чел.",
    location: "Краснодар",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/02ddd4f4-539e-4d79-9d93-e87e10e9b664.jpg",
  },
  {
    id: 31,
    title: "Библиотека «Афина»",
    category: "Премиум · 6 чел.",
    location: "Ростов-на-Дону",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/4ead20d5-301a-4661-a370-eeee4e8c3c75.jpg",
  },
  {
    id: 32,
    title: "Усадьба «Горизонт»",
    category: "Элитный загородный · 8 чел.",
    location: "Подмосковье",
    year: "2025",
    image: "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/30b3eb95-432d-4e13-9abb-0076f1414fbd.jpg",
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

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}