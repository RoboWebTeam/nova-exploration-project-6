export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-stone-900">
        <img
          src="https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files/1448f2d0-64c3-460c-a78c-797c0c518fb6.jpg"
          alt="Премиум бункер"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center">
          <p className="text-xl md:text-2xl tracking-[0.3em] uppercase text-center text-secondary mb-10 mt-36">{"Строительство бункеров под ключ"}</p>

          <h1 className="text-6xl font-medium text-balance text-center text-white mb-0 tracking-tight leading-[0.9] lg:text-8xl">
            {"Защита"}
            <br />
            <span className="text-orange-200">{"для вашей семьи"}</span>
          </h1>

          <p className="text-2xl md:text-3xl font-light text-center text-white/80 mt-6 mb-10">
            {"Сохраните жизнь себе и своим близким!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-10 py-4 text-sm tracking-widest uppercase transition-colors duration-300"
            >
              Рассчитать стоимость
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300"
            >
              Наши объекты
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}