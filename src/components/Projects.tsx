import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { projects, Project } from "./projects-data"
import { ProjectImageSlider } from "./ProjectImageSlider"
import { LightboxModal, RequestPopup } from "./ProjectLightbox"

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null)
  const [requestProject, setRequestProject] = useState<Project | null>(null)
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
    <>
      {lightbox && (
        <LightboxModal
          project={lightbox.project}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
      {requestProject && (
        <RequestPopup project={requestProject} onClose={() => setRequestProject(null)} />
      )}
      <section id="projects" className="py-16 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Примеры бункеров</h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Смотреть все примеры бункеров
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
                <div ref={(el) => (imageRefs.current[index] = el)} className="relative">
                  <div
                    className="absolute inset-0 bg-primary origin-top z-20 pointer-events-none"
                    style={{
                      transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                      transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                  />
                  <ProjectImageSlider
                    images={project.images}
                    title={project.title}
                    onOpenLightbox={(index) => setLightbox({ project, index })}
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

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span className="text-sm"><span className="text-muted-foreground">Площадь:</span> <span className="font-medium">{project.area}</span></span>
                    <span className="text-sm"><span className="text-muted-foreground">Срок:</span> <span className="font-medium">{project.duration}</span></span>
                    <span className="text-sm"><span className="text-muted-foreground">Бюджет:</span> <span className="font-medium">{project.budget}</span></span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setRequestProject(project) }}
                    className="shrink-0 text-sm font-medium px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Оставить заявку
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects