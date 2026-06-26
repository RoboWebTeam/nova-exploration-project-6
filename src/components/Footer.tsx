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

        {/* Реквизиты */}
        <div className="pt-8 border-t border-border mb-6">
          <h4 className="text-sm font-medium mb-3">Реквизиты</h4>
          <ul className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-1.5 text-xs text-muted-foreground">
            <li><span className="text-foreground/60">Компания:</span> ООО «Юнит-1»</li>
            <li><span className="text-foreground/60">ИНН:</span> 5032263756</li>
            <li><span className="text-foreground/60">КПП:</span> 503201001</li>
            <li><span className="text-foreground/60">ОГРН:</span> 1135032002181</li>
            <li className="sm:w-full"><span className="text-foreground/60">Адрес:</span> 143005, Московская область, Одинцовский район, г. Одинцово, Можайское шоссе, д. 112А, пом/ком 29/1</li>
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
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