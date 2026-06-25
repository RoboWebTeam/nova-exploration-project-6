import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 120, suffix: "+", label: "Реализованных объектов" },
  { value: 12, suffix: " лет", label: "Опыта в строительстве" },
  { value: 100, suffix: "%", label: "Сдача под ключ" },
  { value: 30, suffix: " дней", label: "Средний срок малого бункера" },
]

function useCountUp(target: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}

function StatItem({ value, suffix, label, isVisible }: { value: number; suffix: string; label: string; isVisible: boolean }) {
  const count = useCountUp(value, 1200, isVisible)
  return (
    <div className="text-center border-b border-border pb-8 md:border-b-0 md:pb-0 md:border-r md:last:border-r-0 last:border-b-0 px-4 md:px-6">
      <p className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-2">
        {count}<span className="text-orange-400">{suffix}</span>
      </p>
      <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">{label}</p>
    </div>
  )
}

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 border-y border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}