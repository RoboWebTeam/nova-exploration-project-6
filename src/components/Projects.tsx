import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"

const CDN = "https://cdn.poehali.dev/projects/7ca73786-ca35-4059-9a4f-ff58da38b306/files"

const projects = [
  {
    id: 1,
    title: "Семейный бункер «Гранит»",
    category: "Защитное укрытие · 6 чел.",
    location: "Московская область",
    year: "2020",
    images: [
      "/images/hously-1.png",
      `${CDN}/daabda8b-3e0b-411c-8944-722b22d5623f.jpg`,
      `${CDN}/aab42850-a1ff-49d0-8afa-4c17bcf5f6d4.jpg`,
    ],
    description: "Семейный подземный бункер с жилыми комнатами, автономным водоснабжением и системой вентиляции. Укреплённые стены из монолитного железобетона толщиной 500 мм обеспечивают защиту от внешних угроз. В состав объекта входят: спальня на 6 мест, кухня-столовая, санузел и технический отсек с оборудованием жизнеобеспечения.",
    area: "85 м²",
    duration: "38 дней",
    budget: "от 9,2 млн ₽",
  },
  {
    id: 2,
    title: "Подземный комплекс «Редут»",
    category: "Автономный бункер · 12 чел.",
    location: "Ленинградская область",
    year: "2021",
    images: [
      "/images/hously-2.png",
      `${CDN}/15fbd66c-c76b-4fc3-866f-3e599eae08c4.jpg`,
      `${CDN}/7d1979d7-18d3-49c6-96b3-d93f38d1cd3e.jpg`,
    ],
    description: "Многофункциональный комплекс с двумя независимыми выходами, дизельной электростанцией мощностью 30 кВт и запасом провизии на 6 месяцев. Полная автономность от городских сетей. Система рекуперации воздуха обеспечивает постоянную циркуляцию без внешних источников. Предусмотрен резервный дизельный генератор и запас топлива на 90 суток.",
    area: "160 м²",
    duration: "62 дня",
    budget: "от 22,2 млн ₽",
  },
  {
    id: 3,
    title: "Убежище «Бастион»",
    category: "Частное укрытие · 4 чел.",
    location: "Краснодарский край",
    year: "2021",
    images: [
      "/images/hously-3.png",
      `${CDN}/ef115c47-3b38-41e6-a374-8f130808cb42.jpg`,
      `${CDN}/c70e9d8b-34ac-48dd-8991-9fcaf7cb0bec.jpg`,
    ],
    description: "Компактный частный бункер с жилой зоной, совмещённым санузлом и системой фильтрации воздуха класса НЕРА-14. Быстрое возведение на участке заказчика без привлечения тяжёлой техники. Заглубление 4 метра, монолитные стены 400 мм. Идеальное решение для семьи, которой важна надёжность при минимальном бюджете.",
    area: "48 м²",
    duration: "25 дней",
    budget: "от 5,5 млн ₽",
  },
  {
    id: 4,
    title: "Бункер «Цитадель»",
    category: "Многоуровневый объект · 20 чел.",
    location: "Республика Татарстан",
    year: "2022",
    images: [
      "/images/hously-4.png",
      `${CDN}/5c1cc5ba-3e84-43e1-8c1a-9268e878ea7f.jpg`,
      `${CDN}/ed45713a-9545-4a51-ab8f-899f03dfd963.jpg`,
    ],
    description: "Двухуровневый бункер с командным пунктом, жилыми отсеками и медицинским блоком. Рассчитан на длительное автономное проживание группы до 20 человек. Первый уровень — оперативная зона: переговорная, узел связи, охрана. Второй уровень — жилая зона: спальни, кухня, рекреация. Автономность — до 12 месяцев.",
    area: "240 м²",
    duration: "90 дней",
    budget: "от 40 млн ₽",
  },
  {
    id: 5,
    title: "Бункер «Форпост»",
    category: "Защитное укрытие · 8 чел.",
    location: "Свердловская область",
    year: "2022",
    images: [
      `${CDN}/c46e7d26-4cce-4118-8255-48cce18149fc.jpg`,
      `${CDN}/2cdaab11-8c68-4b64-a4bf-c15eabdb5946.jpg`,
      `${CDN}/daa08049-24de-4bff-9812-76616a446e1c.jpg`,
    ],
    description: "Заглублённое укрытие с усиленной гидроизоляцией, пригодное для сурового уральского климата с перепадами температур до −40°C. Автономная система отопления на основе теплового насоса и резервного электрокотла. Двойная мембранная гидроизоляция защищает от грунтовых вод на глубине 7 метров.",
    area: "110 м²",
    duration: "45 дней",
    budget: "от 14,5 млн ₽",
  },
  {
    id: 6,
    title: "Резиденция «Убежище»",
    category: "Премиум-укрытие · 6 чел.",
    location: "Новосибирская область",
    year: "2022",
    images: [
      `${CDN}/e20078b2-2aac-4163-84ac-024dfe38e311.jpg`,
      `${CDN}/c15c7ded-fe4f-4717-863d-64f0afaa3d93.jpg`,
      `${CDN}/7cb88a1f-029b-4105-b6b2-e3a6016c9007.jpg`,
    ],
    description: "Премиальный бункер с дизайнерской отделкой, системой умного дома и винным погребом на 500 бутылок. Комфорт городской квартиры бизнес-класса под землёй. Отделка выполнена из натурального камня и массива дерева. Централизованная система климат-контроля поддерживает заданную температуру и влажность в каждом помещении.",
    area: "130 м²",
    duration: "55 дней",
    budget: "от 60,1 млн ₽",
  },
  {
    id: 7,
    title: "Комплекс «Рубеж»",
    category: "Промышленный объект · 30 чел.",
    location: "Челябинская область",
    year: "2023",
    images: [
      `${CDN}/2c38a575-5d24-49b9-a6f9-d3b49589ce21.jpg`,
      `${CDN}/5cd0417b-b223-4601-87bb-0e99e0fb83a5.jpg`,
      `${CDN}/74eaeb4f-e3c8-4de7-8964-ee2a43d0631a.jpg`,
    ],
    description: "Корпоративный укрывной комплекс с переговорными залами, серверной и системами жизнеобеспечения промышленного класса. Построен для крупного промышленного предприятия. Объект рассчитан на размещение ключевого персонала и сохранение непрерывности бизнес-процессов. Отдельные входные группы, система разграничения доступа по уровням.",
    area: "380 м²",
    duration: "120 дней",
    budget: "от 80,1 млн ₽",
  },
  {
    id: 8,
    title: "Бункер «Оплот»",
    category: "VIP-укрытие · 4 чел.",
    location: "Тюменская область",
    year: "2023",
    images: [
      `${CDN}/6adb1335-ea22-4a63-98ca-25a7c0e6969c.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
      `${CDN}/3638fba2-b8ed-4a42-a8de-d76160e21bbb.jpg`,
    ],
    description: "Элитный персональный бункер с отделкой натуральным камнем, спа-зоной и индивидуальной системой климат-контроля. Под ключ за 40 дней. Интерьер разработан совместно с дизайнером. Каждый материал отбирался с учётом долговечности в условиях повышенной влажности и отсутствия естественного освещения.",
    area: "95 м²",
    duration: "40 дней",
    budget: "от 24,9 млн ₽",
  },
  {
    id: 9,
    title: "Бункер «Страж»",
    category: "Автономный объект · 10 чел.",
    location: "Воронежская область",
    year: "2023",
    images: [
      `${CDN}/52d467e3-d56c-43c1-af55-7ef3efa16b7e.jpg`,
      `${CDN}/5ec47750-7476-4345-87fa-2ed6e5fd921c.jpg`,
      `${CDN}/2b52a630-e1ec-48c3-8ca9-38e4624e013d.jpg`,
    ],
    description: "Автономный объект с солнечными панелями общей мощностью 15 кВт, системой сбора и очистки дождевой воды и органическим огородом под фитолампами. Независимость от внешних ресурсов до 12 месяцев. Аккумуляторный банк на 40 кВт·ч обеспечивает электроснабжение в любую погоду.",
    area: "175 м²",
    duration: "70 дней",
    budget: "от 31,5 млн ₽",
  },
  {
    id: 10,
    title: "Командный пункт «Штаб»",
    category: "Командный центр · 15 чел.",
    location: "Самарская область",
    year: "2023",
    images: [
      `${CDN}/557fc894-c913-410d-abb9-2fd00017c0ff.jpg`,
      `${CDN}/a43bda2e-e586-4d9b-8d56-5f63075e2ea5.jpg`,
      `${CDN}/d11e6c5c-abd5-49ac-ae42-3df9b73b8c37.jpg`,
    ],
    description: "Подземный командный пункт с защищёнными каналами связи, резервным дата-центром и системой видеонаблюдения по периметру. Оснащён спутниковым терминалом, зашифрованными линиями связи и независимым ИБП. Предназначен для управления предприятием или регионом в условиях чрезвычайной ситуации.",
    area: "210 м²",
    duration: "85 дней",
    budget: "от 51,5 млн ₽",
  },
  {
    id: 11,
    title: "Бункер «Восток»",
    category: "Семейный объект · 6 чел.",
    location: "Нижегородская область",
    year: "2024",
    images: [
      `${CDN}/019b26e6-ecc4-4b50-ad86-67d28e7828e4.jpg`,
      `${CDN}/bc1a2cee-92d0-4d85-8f8d-6587773559c4.jpg`,
      `${CDN}/f8c92ebf-58d7-474b-bd16-64439cd18071.jpg`,
    ],
    description: "Котлованный тип строительства с глубиной заложения 6 метров. Монолитные стены 600 мм, армированный пол и перекрытие. Обратная засыпка с послойным уплотнением. Объект полностью скрыт под поверхностью участка — снаружи незаметен. Газон и ландшафтный дизайн восстановлены в полном объёме после завершения работ.",
    area: "100 м²",
    duration: "42 дня",
    budget: "от 13,6 млн ₽",
  },
  {
    id: 16,
    title: "Бункер «Меридиан»",
    category: "Премиум-укрытие · 6 чел.",
    location: "Калининградская область",
    year: "2025",
    images: [
      `${CDN}/7cb88a1f-029b-4105-b6b2-e3a6016c9007.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
      `${CDN}/3638fba2-b8ed-4a42-a8de-d76160e21bbb.jpg`,
    ],
    description: "Камерный премиум-бункер на берегу Балтики с панорамной картиной-иллюзией морского горизонта во всю стену гостиной. Влагостойкий монолит с гидрофобной инъекцией, двойная мембрана от морских грунтовых вод. Дизайн-проект в стиле скандинавского минимализма: светлый дуб, серый камень, тёплый свет. Готов к круглогодичному проживанию.",
    area: "115 м²",
    duration: "48 дней",
    budget: "от 38 млн ₽",
  },
  {
    id: 13,
    title: "Резиденция «Аврора»",
    category: "Премиум-укрытие · 8 чел.",
    location: "Подмосковье, Рублёво-Успенское шоссе",
    year: "2025",
    images: [
      `${CDN}/e20078b2-2aac-4163-84ac-024dfe38e311.jpg`,
      `${CDN}/c15c7ded-fe4f-4717-863d-64f0afaa3d93.jpg`,
      `${CDN}/6adb1335-ea22-4a63-98ca-25a7c0e6969c.jpg`,
    ],
    description: "Флагманский проект 2025 года — подземная резиденция на Рублёвке с двумя этажами, бассейном-джакузи, домашним кинотеатром и кабинетом с защищёнными каналами связи. Отделка: итальянский мрамор, массив ореха, бронзовая фурнитура. Система умного дома управляет освещением, климатом и безопасностью через зашифрованное приложение.",
    area: "320 м²",
    duration: "110 дней",
    budget: "от 180 млн ₽",
  },
  {
    id: 14,
    title: "Крепость «Нордик»",
    category: "Арктическое укрытие · 12 чел.",
    location: "Мурманская область",
    year: "2025",
    images: [
      `${CDN}/2c38a575-5d24-49b9-a6f9-d3b49589ce21.jpg`,
      `${CDN}/5cd0417b-b223-4601-87bb-0e99e0fb83a5.jpg`,
      `${CDN}/52d467e3-d56c-43c1-af55-7ef3efa16b7e.jpg`,
    ],
    description: "Единственный в России бункер, сертифицированный для эксплуатации в условиях вечной мерзлоты. Тройная теплоизоляция, тепловые насосы с геотермальным контуром, резервный котёл на биотопливе. Корпус из жаропрочной стали выдерживает давление грунта при сезонном морозном пучении. Температура внутри +22°C при −50°C снаружи.",
    area: "200 м²",
    duration: "95 дней",
    budget: "от 72 млн ₽",
  },
  {
    id: 15,
    title: "Комплекс «Империал»",
    category: "Корпоративный объект · 40 чел.",
    location: "Санкт-Петербург и ЛО",
    year: "2025",
    images: [
      `${CDN}/557fc894-c913-410d-abb9-2fd00017c0ff.jpg`,
      `${CDN}/74eaeb4f-e3c8-4de7-8964-ee2a43d0631a.jpg`,
      `${CDN}/a43bda2e-e586-4d9b-8d56-5f63075e2ea5.jpg`,
    ],
    description: "Крупнейший корпоративный бункер в нашем портфолио. Три уровня: оперативный штаб с картографическим залом, жилой блок на 40 персон и технический уровень с дата-центром и электростанцией 150 кВт. Автономность — 18 месяцев. Объект оснащён системой спутниковой связи StarLink и резервным ВЧ-радиоузлом. Построен под ключ для крупного промышленного холдинга.",
    area: "600 м²",
    duration: "180 дней",
    budget: "от 250 млн ₽",
  },
  {
    id: 12,
    title: "Комплекс «Заслон»",
    category: "Автономный объект · 8 чел.",
    location: "Ростовская область",
    year: "2024",
    images: [
      `${CDN}/6cd2fe2d-fe9e-4bd8-a11b-dd974feb49cf.jpg`,
      `${CDN}/2cdaab11-8c68-4b64-a4bf-c15eabdb5946.jpg`,
      `${CDN}/fe7c69ca-7959-4ef5-aaef-9a84a350a04a.jpg`,
    ],
    description: "Подземный комплекс с экскаваторной разработкой грунта, бетонной опалубкой и двойной гидроизоляционной мембраной DELTA. Запас продовольствия на 6 месяцев хранится в кладовых с контролем температуры и влажности. Система водоочистки обеспечивает питьевую воду из технического источника.",
    area: "145 м²",
    duration: "58 дней",
    budget: "от 23,5 млн ₽",
  },
  {
    id: 13,
    title: "Бункер «Монолит»",
    category: "Промышленный объект · 25 чел.",
    location: "Пермский край",
    year: "2024",
    images: [
      `${CDN}/7e939e59-0027-4578-aa3e-8d1613bd449c.jpg`,
      `${CDN}/74eaeb4f-e3c8-4de7-8964-ee2a43d0631a.jpg`,
      `${CDN}/7c59d1cc-0329-46af-b7b1-4cefc2655cb0.jpg`,
    ],
    description: "Масштабный промышленный объект с поэтапной заливкой монолитных конструкций. Кран-балка на объекте, круглосуточное бетонирование с прогревом в зимних условиях. Армирование выполнено сталью A500C. Стены и перекрытия прошли ультразвуковой контроль качества. Объект сдан с опережением графика на 10 дней.",
    area: "320 м²",
    duration: "105 дней",
    budget: "от 62,9 млн ₽",
  },
  {
    id: 14,
    title: "Комплекс «Арсенал»",
    category: "Многоуровневый объект · 30 чел.",
    location: "Саратовская область",
    year: "2024",
    images: [
      `${CDN}/1da99ea2-bf00-453e-b61f-6e8f0e2ce41b.jpg`,
      `${CDN}/5c1cc5ba-3e84-43e1-8c1a-9268e878ea7f.jpg`,
      `${CDN}/ed45713a-9545-4a51-ab8f-899f03dfd963.jpg`,
    ],
    description: "Трёхуровневый объект с воздушной подушкой между перекрытиями для виброзащиты. Антисейсмическое армирование и надёжная защита от грунтовых вод. Каждый уровень функционирует автономно. Лифт грузоподъёмностью 500 кг обеспечивает перемещение между уровнями. Один из крупнейших реализованных нами объектов.",
    area: "450 м²",
    duration: "130 дней",
    budget: "от 100,1 млн ₽",
  },
  {
    id: 15,
    title: "Бункер «Крепость»",
    category: "Защитное укрытие · 12 чел.",
    location: "Ярославская область",
    year: "2024",
    images: [
      `${CDN}/8eb089e5-02de-4be8-a0ce-30ef48b1eece.jpg`,
      `${CDN}/daabda8b-3e0b-411c-8944-722b22d5623f.jpg`,
      `${CDN}/bc1a2cee-92d0-4d85-8f8d-6587773559c4.jpg`,
    ],
    description: "Строительство в сложных грунтовых условиях с высоким уровнем грунтовых вод. Применялось водопонижение иглофильтровым методом. Укладка плит перекрытия выполнена методом горизонтального скольжения. Несмотря на сложность геологии, объект возведён в срок и полностью соответствует проектным нагрузкам.",
    area: "185 м²",
    duration: "75 дней",
    budget: "от 34,3 млн ₽",
  },
  {
    id: 15,
    title: "Объект «Рассвет»",
    category: "Семейный объект · 5 чел.",
    location: "Калужская область",
    year: "2024",
    images: [
      `${CDN}/a48494d1-3319-4e7f-a51c-0d719268e293.jpg`,
      `${CDN}/ef115c47-3b38-41e6-a374-8f130808cb42.jpg`,
      `${CDN}/aab42850-a1ff-49d0-8afa-4c17bcf5f6d4.jpg`,
    ],
    description: "Завершающий этап включал герметизацию входного люка, установку бронированной двери класса EI-90 и подключение инженерных коммуникаций. Внешний периметр оснащён датчиками движения. Объект расположен на территории загородного поместья и абсолютно незаметен с поверхности.",
    area: "72 м²",
    duration: "32 дня",
    budget: "от 8,4 млн ₽",
  },
  {
    id: 17,
    title: "Резиденция «Люкс»",
    category: "Премиум · 6 чел.",
    location: "Московская область",
    year: "2024",
    images: [
      `${CDN}/1ef2ffe3-405e-4f7d-8491-fe184a748010.jpg`,
      `${CDN}/c15c7ded-fe4f-4717-863d-64f0afaa3d93.jpg`,
      `${CDN}/7cb88a1f-029b-4105-b6b2-e3a6016c9007.jpg`,
    ],
    description: "Гостиная с дизайнерской мебелью, деревянными панелями из термоясеня и системой многозонального освещения Lutron. Атмосфера загородного дома под землёй. Интерьер создан в скандинавском стиле: светлые тона, натуральные материалы. Система «умный дом» управляет всеми инженерными системами с планшета.",
    area: "140 м²",
    duration: "65 дней",
    budget: "от 37,2 млн ₽",
  },
  {
    id: 18,
    title: "Апартаменты «Альфа»",
    category: "VIP-укрытие · 4 чел.",
    location: "Ленинградская область",
    year: "2024",
    images: [
      `${CDN}/7837f473-9f23-4d72-b743-01e115377f2b.jpg`,
      `${CDN}/3638fba2-b8ed-4a42-a8de-d76160e21bbb.jpg`,
      `${CDN}/c70e9d8b-34ac-48dd-8991-9fcaf7cb0bec.jpg`,
    ],
    description: "Спальный блок с встроенной подсветкой, двуспальными кроватями на латексных матрасах и системой шумоизоляции. Полноценный отдых в любых условиях. Каждая спальня оснащена «виртуальным окном» — экраном с программируемыми пейзажами и имитацией естественного освещения.",
    area: "88 м²",
    duration: "38 дней",
    budget: "от 21,1 млн ₽",
  },
  {
    id: 19,
    title: "Комплекс «Эдем»",
    category: "Премиум · 8 чел.",
    location: "Краснодарский край",
    year: "2025",
    images: [
      `${CDN}/d1ed4122-faee-4dfc-8836-3429d9984b25.jpg`,
      `${CDN}/fe7c69ca-7959-4ef5-aaef-9a84a350a04a.jpg`,
      `${CDN}/2b52a630-e1ec-48c3-8ca9-38e4624e013d.jpg`,
    ],
    description: "Кухонный блок с профессиональной техникой Miele, гранитными столешницами и вентиляцией с угольными фильтрами. Приготовление пищи без ограничений — как в ресторанной кухне. Предусмотрены холодильная камера, морозилка промышленного объёма и встроенная кофемашина.",
    area: "165 м²",
    duration: "72 дня",
    budget: "от 45,8 млн ₽",
  },
  {
    id: 20,
    title: "Бункер «Олимп»",
    category: "VIP-укрытие · 10 чел.",
    location: "Тюменская область",
    year: "2025",
    images: [
      `${CDN}/5b3b349f-477b-4180-8a89-5e8974b75d0a.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
      `${CDN}/5ec47750-7476-4345-87fa-2ed6e5fd921c.jpg`,
    ],
    description: "Спортивный зал с покрытием EPDM, профессиональными тренажёрами и зоной растяжки. Поддержание физической формы при длительном укрытии — обязательная часть концепции. Принудительная вентиляция с повышенным воздухообменом исключает образование конденсата.",
    area: "200 м²",
    duration: "80 дней",
    budget: "от 54,3 млн ₽",
  },
  {
    id: 21,
    title: "Штаб «Аврора»",
    category: "Корпоративный · 20 чел.",
    location: "Новосибирская область",
    year: "2025",
    images: [
      `${CDN}/11e7f796-50a3-4dea-8c1a-18a98b48a750.jpg`,
      `${CDN}/5cd0417b-b223-4601-87bb-0e99e0fb83a5.jpg`,
      `${CDN}/a43bda2e-e586-4d9b-8d56-5f63075e2ea5.jpg`,
    ],
    description: "Корпоративный переговорный зал с 4 экранами 85\", защищёнными каналами связи и биометрической системой контроля доступа. Дополнительно: рабочие места для 15 сотрудников, серверная и апартаменты для руководства. Управление бизнесом без остановок в любой ситуации.",
    area: "280 м²",
    duration: "95 дней",
    budget: "от 68,6 млн ₽",
  },
  {
    id: 22,
    title: "Резиденция «Сапфир»",
    category: "Премиум · 6 чел.",
    location: "Свердловская область",
    year: "2025",
    images: [
      `${CDN}/0d96b048-b754-414b-b7db-fe01ef79dc45.jpg`,
      `${CDN}/f8c92ebf-58d7-474b-bd16-64439cd18071.jpg`,
      `${CDN}/c15c7ded-fe4f-4717-863d-64f0afaa3d93.jpg`,
    ],
    description: "Парадный холл с полированным бетонным полом, бронированной дверью класса EI-120 и системой биометрического доступа. Входная зона разделена на шлюз и основной холл — двойной рубеж безопасности исключает несанкционированный доступ. Первое впечатление — уровень пятизвёздочного отеля.",
    area: "155 м²",
    duration: "68 дней",
    budget: "от 40 млн ₽",
  },
  {
    id: 23,
    title: "Резиденция «Нептун»",
    category: "Премиум · 8 чел.",
    location: "Сочи",
    year: "2025",
    images: [
      `${CDN}/b866eb10-4059-4db1-988c-fb1b9572cdec.jpg`,
      `${CDN}/7cb88a1f-029b-4105-b6b2-e3a6016c9007.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
    ],
    description: "Подземный бассейн с подводной RGB-подсветкой, системой озонирования воды и зоной отдыха с шезлонгами. Температура воды и воздуха регулируется независимо. Вытяжная система предотвращает распространение влаги по остальным помещениям. Уникальный SPA-комплекс в укрытии.",
    area: "220 м²",
    duration: "88 дней",
    budget: "от 60,1 млн ₽",
  },
  {
    id: 24,
    title: "Комплекс «Синема»",
    category: "VIP-укрытие · 6 чел.",
    location: "Московская область",
    year: "2025",
    images: [
      `${CDN}/2e63b32d-4ae4-4c44-9b0c-b39fbbf25106.jpg`,
      `${CDN}/3638fba2-b8ed-4a42-a8de-d76160e21bbb.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
    ],
    description: "Домашний кинозал с проектором 4K Sony, акустической системой Dolby Atmos 7.2 и мягкими реклайнерами с подогревом. Акустическая изоляция обеспечивает кинотеатральное качество звука без утечки шума в смежные помещения. Досуг без компромиссов при любом сценарии.",
    area: "125 м²",
    duration: "52 дня",
    budget: "от 31,5 млн ₽",
  },
  {
    id: 25,
    title: "Объект «Эскулап»",
    category: "Премиум с медблоком · 10 чел.",
    location: "Санкт-Петербург",
    year: "2025",
    images: [
      `${CDN}/d3a1aa72-1c4f-46dc-a9e5-8f17d6d83ce1.jpg`,
      `${CDN}/7c59d1cc-0329-46af-b7b1-4cefc2655cb0.jpg`,
      `${CDN}/2b52a630-e1ec-48c3-8ca9-38e4624e013d.jpg`,
    ],
    description: "Медицинский блок с оборудованием реанимационного класса, операционным столом и запасом медикаментов на 6 месяцев. Разработан совместно с медицинскими консультантами. Стерильная зона соответствует нормам СанПиН для амбулаторных кабинетов. Предусмотрено место для двух медицинских сотрудников.",
    area: "190 м²",
    duration: "78 дней",
    budget: "от 48,6 млн ₽",
  },
  {
    id: 26,
    title: "Клуб «Диоген»",
    category: "Элитный · 12 чел.",
    location: "Казань",
    year: "2025",
    images: [
      `${CDN}/913ecda5-cb48-4074-907c-ad254164e659.jpg`,
      `${CDN}/c15c7ded-fe4f-4717-863d-64f0afaa3d93.jpg`,
      `${CDN}/7cb88a1f-029b-4105-b6b2-e3a6016c9007.jpg`,
    ],
    description: "Винный погреб с коллекционными стеллажами на 2 000 бутылок, кожаными креслами честерфилд и поддержанием температуры +12°C. Дегустационный стол на 8 персон изготовлен из массива дуба. Освещение — тёплое свечение подсветки стеллажей, создающее камерную атмосферу.",
    area: "170 м²",
    duration: "70 дней",
    budget: "от 42,9 млн ₽",
  },
  {
    id: 27,
    title: "Штаб «Меркурий»",
    category: "Корпоративный · 15 чел.",
    location: "Екатеринбург",
    year: "2025",
    images: [
      `${CDN}/7623e080-adc5-45cd-bcc3-cd5ebd0c8786.jpg`,
      `${CDN}/a43bda2e-e586-4d9b-8d56-5f63075e2ea5.jpg`,
      `${CDN}/d11e6c5c-abd5-49ac-ae42-3df9b73b8c37.jpg`,
    ],
    description: "Оперативный центр управления с 24 мониторами, защищёнными серверами и резервированными каналами Starlink + VSAT. Три независимых источника электропитания обеспечивают работу оборудования при полном отключении внешних сетей. Бесперебойная работа в любых условиях.",
    area: "250 м²",
    duration: "100 дней",
    budget: "от 74,4 млн ₽",
  },
  {
    id: 28,
    title: "Семейный «Радуга»",
    category: "Семейный премиум · 5 чел.",
    location: "Воронеж",
    year: "2026",
    images: [
      `${CDN}/b5e62028-fcd8-4647-8c7f-8aebd3537ace.jpg`,
      `${CDN}/3638fba2-b8ed-4a42-a8de-d76160e21bbb.jpg`,
      `${CDN}/c70e9d8b-34ac-48dd-8991-9fcaf7cb0bec.jpg`,
    ],
    description: "Детская игровая зона с мягкими покрытиями Forbo, развивающими элементами и безопасным освещением без острых углов. Система «виртуального окна» позволяет детям наблюдать смену дня и ночи, сезонов и погоды. Комфорт для всей семьи в любых условиях.",
    area: "115 м²",
    duration: "48 дней",
    budget: "от 18 млн ₽",
  },
  {
    id: 29,
    title: "Комплекс «Аргус»",
    category: "Технологичный · 20 чел.",
    location: "Новосибирск",
    year: "2026",
    images: [
      `${CDN}/d799701f-e431-4914-8cac-5a18fe51f743.jpg`,
      `${CDN}/d11e6c5c-abd5-49ac-ae42-3df9b73b8c37.jpg`,
      `${CDN}/a43bda2e-e586-4d9b-8d56-5f63075e2ea5.jpg`,
    ],
    description: "Серверная комната с ИБП мощностью 20 кВА, прецизионным кондиционированием и защитой от электромагнитного излучения по стандарту TEMPEST. Резервное копирование в зашифрованное облако каждые 15 минут. Данные сохранятся при любом сценарии.",
    area: "235 м²",
    duration: "92 дня",
    budget: "от 65,8 млн ₽",
  },
  {
    id: 30,
    title: "Резиденция «Аквамарин»",
    category: "VIP · 4 чел.",
    location: "Краснодар",
    year: "2026",
    images: [
      `${CDN}/02ddd4f4-539e-4d79-9d93-e87e10e9b664.jpg`,
      `${CDN}/c70e9d8b-34ac-48dd-8991-9fcaf7cb0bec.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
    ],
    description: "Ванная комната с мраморной отделкой Bianco Carrara, отдельной ванной на ножках и тропическим душем с хромотерапией. Система рекуперации воды позволяет многократно использовать техническую воду — критично при ограниченных запасах. Роскошь в условиях полной изоляции.",
    area: "105 м²",
    duration: "44 дня",
    budget: "от 27,9 млн ₽",
  },
  {
    id: 31,
    title: "Библиотека «Афина»",
    category: "Премиум · 6 чел.",
    location: "Ростов-на-Дону",
    year: "2026",
    images: [
      `${CDN}/4ead20d5-301a-4661-a370-eeee4e8c3c75.jpg`,
      `${CDN}/236da33f-fd82-45f6-ae47-ba1aba7bacd6.jpg`,
      `${CDN}/c15c7ded-fe4f-4717-863d-64f0afaa3d93.jpg`,
    ],
    description: "Личная библиотека с полками из массива ореха от пола до потолка, кожаными креслами и рабочим кабинетом с сейфом. Акустика зала настроена на поглощение внешних шумов — полная тишина при закрытой двери. Библиотечный фонд включает более 3 000 томов по запросу заказчика.",
    area: "135 м²",
    duration: "56 дней",
    budget: "от 28,6 млн ₽",
  },
  {
    id: 32,
    title: "Усадьба «Горизонт»",
    category: "Элитный загородный · 8 чел.",
    location: "Подмосковье",
    year: "2026",
    images: [
      `${CDN}/30b3eb95-432d-4e13-9abb-0076f1414fbd.jpg`,
      `${CDN}/bc1a2cee-92d0-4d85-8f8d-6587773559c4.jpg`,
      `${CDN}/5ec47750-7476-4345-87fa-2ed6e5fd921c.jpg`,
    ],
    description: "Замаскированный въезд под ландшафтным садом, скрытый бронированный люк с гидроприводом и охранная система периметра с тепловизорами. Объект абсолютно невидим с воздуха и с земли. Над бункером разбит английский сад с автополивом, который функционирует независимо от состояния объекта.",
    area: "300 м²",
    duration: "110 дней",
    budget: "от 88,7 млн ₽",
  },
]

type Project = typeof projects[number]

const BACKEND_URL = "https://functions.poehali.dev/8bf096d8-6d11-417b-963e-f0a10434100a"

function RequestPopup({ project, onClose }: { project: Project; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handler)
    }
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `Заявка по объекту: ${project.title} (${project.location}, ${project.year})` }),
      })
    } catch (_) {
      // ignore network errors
    }
    setStatus("success")
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-primary text-primary-foreground px-8 pt-8 pb-6">
          <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Заявка по объекту</p>
          <h3 className="text-2xl font-medium leading-snug">{project.title}</h3>
          <p className="text-primary-foreground/60 text-sm mt-1">{project.location} · {project.year} · {project.budget}</p>
        </div>

        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-medium">Заявка отправлена!</p>
              <p className="text-muted-foreground text-sm mt-1">Мы свяжемся с вами в ближайшее время.</p>
              <button onClick={onClose} className="mt-4 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">Закрыть</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше имя"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Отправка..." : "Оставить заявку"}
              </button>
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function LightboxModal({ project, initialIndex, onClose }: { project: Project; initialIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initialIndex)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const lbTouchStartX = useRef<number | null>(null)
  const lbTouchStartY = useRef<number | null>(null)

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? project.images.length - 1 : c - 1)), [project.images.length])
  const next = useCallback(() => setCurrent((c) => (c === project.images.length - 1 ? 0 : c + 1)), [project.images.length])

  const handleLbTouchStart = (e: React.TouchEvent) => {
    lbTouchStartX.current = e.touches[0].clientX
    lbTouchStartY.current = e.touches[0].clientY
  }
  const handleLbTouchEnd = (e: React.TouchEvent) => {
    if (lbTouchStartX.current === null || lbTouchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - lbTouchStartX.current
    const dy = e.changedTouches[0].clientY - lbTouchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev()
    }
    lbTouchStartX.current = null
    lbTouchStartY.current = null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `Заявка по объекту: ${project.title} (${project.location}, ${project.year})` }),
      })
      setStatus("success")
    } catch {
      setStatus("success")
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (showForm) setShowForm(false); else onClose() }
      if (!showForm && e.key === "ArrowLeft") prev()
      if (!showForm && e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next, showForm])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-white font-medium text-lg">{project.title}</h3>
          <p className="text-white/50 text-sm">{project.category} · {project.location} · {project.year}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center px-12 md:px-16 min-h-0" onClick={(e) => e.stopPropagation()} onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>
        <img
          key={current}
          src={project.images[current]}
          alt={`${project.title} — фото ${current + 1}`}
          className="max-h-full max-w-full object-contain animate-in fade-in duration-300"
        />
        {project.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {project.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-20 h-14 overflow-hidden rounded transition-all ${
                i === current ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 mt-3 flex-wrap">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-sm"><span className="text-white/50">Площадь:</span> <span className="text-white font-medium">{project.area}</span></span>
            <span className="text-sm"><span className="text-white/50">Срок:</span> <span className="text-white font-medium">{project.duration}</span></span>
            <span className="text-sm"><span className="text-white/50">Бюджет:</span> <span className="text-white font-medium">{project.budget}</span></span>
          </div>
          {!showForm && status !== "success" && (
            <button
              onClick={() => setShowForm(true)}
              className="shrink-0 px-5 py-2 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors"
            >
              Оставить заявку
            </button>
          )}
        </div>

        <p className="text-white/60 text-sm leading-relaxed mt-2">{project.description}</p>

        {showForm && status !== "success" && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ваше имя"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50"
            />
            <input
              type="tel"
              placeholder="Телефон"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 px-6 py-2 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Отправка..." : "Отправить"}
            </button>
          </form>
        )}

        {status === "success" && (
          <p className="mt-4 text-sm text-green-400">Заявка отправлена! Мы свяжемся с вами в ближайшее время.</p>
        )}
      </div>
    </div>
  )
}

function ImageSlider({ images, title, onOpenLightbox }: { images: string[]; title: string; onOpenLightbox: (index: number) => void }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      e.stopPropagation()
      if (dx < 0) setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
      else setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <div
      className="relative overflow-hidden aspect-[4/3] mb-6 group/slider cursor-zoom-in"
      onClick={() => onOpenLightbox(current)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src || "/placeholder.svg"}
          alt={`${title} — фото ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`h-1.5 rounded-full transition-all bg-white ${
                  i === current ? "w-4 opacity-100" : "w-1.5 opacity-50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

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
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3 md:mb-6">Реализованные объекты</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Примеры бункеров</h2>
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
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative">
                <div
                  className="absolute inset-0 bg-primary origin-top z-20 pointer-events-none"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
                <ImageSlider
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