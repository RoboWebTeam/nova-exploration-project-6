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