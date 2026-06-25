export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="/" className="inline-block mb-4 md:mb-6">
              <img src="/images/hously-logo.svg" alt="Пространство" width={120} height={32} className="w-auto h-6" />
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Строим бункеры под ключ. Надёжные автономные укрытия для защиты вашей семьи в любой ситуации.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4">Компания</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Объекты
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4">Связь</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:emmas@yandex.ru" className="hover:text-foreground transition-colors">
                  emmas@yandex.ru
                </a>
              </li>
              <li>
                <a href="tel:+79331770086" className="hover:text-foreground transition-colors">
                  8 (933) 177-00-86
                </a>
              </li>
              <li>
                <a href="https://t.me/CCC_086" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Телеграм
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2020-2026 Бункер Про. Все права защищены.</p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}