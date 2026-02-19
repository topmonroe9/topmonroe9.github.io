const localization = {
  ru: {
    // Основная информация
    page_title: "Семенченко Егор - Резюме",

    // Секция портфолио
    portfolio_title: "Портфолио",
    portfolio_view_project: "Подробнее",
    portfolio_tech_stack: "Технологии",
    portfolio_close: "Закрыть",
    portfolio_prev: "Предыдущее",
    portfolio_next: "Следующее",
    portfolio_open_external: "Открыть в новой вкладке",

    // Проект APREE Platform
    'portfolio_apree-platform_title': "Enterprise IT Platform",
    'portfolio_apree-platform_short': "Внутренняя IT-инфраструктура компании: 15+ микросервисов на AWS",
    'portfolio_apree-platform_desc': `Построил с нуля IT-инфраструктуру для компании со штатом 120+ человек: 2 EC2 инстанса, Aurora PostgreSQL, 13 CloudFront CDN, 31 S3 bucket.

**Ключевые системы:**
• Analytics Platform — дашборды KPI с агрегацией из множества источников, план/факт
• Monroe DAM — микросервисная система управления контентом с Lambda-генерацией thumbnail
• HR System — управление персоналом с интеграцией Google Workspace
• SSO Auth — единая аутентификация для всех сервисов

**Архитектура:**
• 15+ микросервисов с изолированными PostgreSQL-схемами
• CI/CD через GitHub Actions → ECR → Traefik blue-green deployment
• AWS CDK для Infrastructure as Code
• Prometheus + Grafana мониторинг

**Результат:** Инфраструктура за $350/месяц, обслуживающая 120+ пользователей`,

    // Проект ALFA
    portfolio_alfa_title: "Smart Document Matcher",
    portfolio_alfa_short: "AI-система автоматической обработки бухгалтерских документов",
    portfolio_alfa_desc: `Система автоматического сопоставления сканированных PDF документов (счета-фактуры, акты, УПД) со строками бухгалтерских реестров СЭД.

**Проблема:** Тысячи старых сканированных закрывающих документов нужно сопоставить с электронными реестрами операций.

**Решение:**
• AI-извлечение данных через Claude API (единый промпт 500+ строк)
• OCR pipeline: GCP Vision batch (16 изображений/запрос) + Pytesseract
• Fuzzy matching с реестрами через RapidFuzz
• Распознавание рукописных бухгалтерских номеров (Extended Thinking)

**Ключевые оптимизации:**
• Anthropic Batch API — 50% экономии на Claude
• Индексный lookup O(1) для точных совпадений
• Параллельная обработка с семафорами`,

    // Проект Crypnal
    portfolio_crypnal_title: "Crypto Whale Tracker",
    portfolio_crypnal_short: "Real-time платформа мониторинга крупных криптовалютных сделок",
    portfolio_crypnal_desc: `Профессиональная платформа для отслеживания whale trades и ликвидаций в реальном времени на 8+ криптобиржах.

**Задача:** Создать систему мгновенного оповещения о крупных сделках для криптотрейдеров.

**Архитектура:**
• WebSocket-сервер для real-time трансляции сделок
• Multi-exchange коннекторы (Binance, Bybit, OKX, Coinbase, Hyperliquid)
• Server-side фильтрация для снижения трафика
• Redis для агрегации и кэширования в реальном времени

**Ключевые фичи:**
• 84+ React компонентов с Vite сборкой
• Dual-threshold система фильтрации (whale/liquidation)
• Telegram/Twitter боты для автопостинга алертов
• Prometheus + Grafana мониторинг
• TTL-индексы MongoDB для автоочистки данных`,
    name: "Семенченко Егор",
    age: "27 лет",
    location_label: "Проживание",
    location: "Москва",
    download_pdf: "Скачать PDF",
    print: "Печать",

    // Заголовки секций
    job_title: "Senior Backend Developer Node.js / TypeScript",
    job_specs:
      "Специализация: Back End / Full Stack разработка\nФормат работы: полная занятость, удалённая работа, гибрид",

    summary_title: "Профессиональный профиль",
    motivation_title: "Что меня мотивирует",
    skills_title: "Навыки",
    achievements_title: "Ключевые достижения",
    case_studies_title: "Кейсы из карьеры",
    experience_title: "Опыт работы — 7 лет",
    education_title: "Образование и профессиональное развитие",
    about_title: "Обо мне",

    // Категории навыков
    prog_languages: "Языки программирования",
    backend: "Backend",
    frontend: "Frontend",
    databases: "Базы данных",
    devops: "DevOps и инфраструктура",
    integrations: "Интеграции",
    analytics: "Аналитика",
    engineering_practices: "Инженерные практики",
    soft_skills: "Софт-скилы",
    payment_systems: "Платежные системы",

    // Языки
    russian: "Русский",
    english: "Английский",
    native: "Родной",
    advanced: "B2 — Средне-продвинутый",

    // Софт-скилы
    client_communication: "Коммуникация с клиентами",
    client_communication_desc:
      "Сильные навыки ведения переговоров с заказчиками, понимания их потребностей и эффективного объяснения технических концепций нетехническим специалистам.",
    team_leadership: "Руководство командой",
    team_leadership_desc:
      "Опыт менторинга младших разработчиков, создания коллаборативной среды и руководства кросс-функциональными командами для достижения проектных целей.",
    conflict_resolution: "Решение конфликтов",
    conflict_resolution_desc:
      "Навыки конструктивного решения конфликтных ситуаций, поиска компромиссов и поддержания позитивных рабочих отношений даже в стрессовых ситуациях.",
    crisis_management: "Антикризисное управление",
    crisis_management_desc:
      "Подтвержденная способность принимать критические решения во время экстренных ситуаций, эффективно расставлять приоритеты и внедрять решения, минимизирующие негативные последствия.",

    // Основные секции
    summary_content:
      "Senior Backend Developer с 7 годами опыта в Node.js/TypeScript. Строю fullstack-продукты с нуля и довожу до прода: парсеры, веб-приложения, real-time платформы, ETL-пайплайны, интеграции с внешними API.\n\nЖивой продукт: tradermap.io — real-time платформа с WebSocket-интеграцией 8 бирж, AI Trading Agent, Grafana/Prometheus мониторинг. 2.5 года международного фриланса (Upwork 81% Job Success): fintech, healthcare, crypto.\n\nОсновной стек: NestJS, PostgreSQL, MongoDB, Redis, AWS. Дополнительно: опыт тимлидерства (команды до 5 человек), построение BI-систем на Metabase.",

    motivation_content:
      "Я увлечен созданием сложных технических решений, которые для конечных пользователей выглядят простыми и интуитивно понятными. Нет ничего более удовлетворяющего, чем создание комплексных систем, с которыми люди взаимодействуют без усилий, даже не догадываясь о сложной архитектуре, скрытой под поверхностью.\n\nЯ нахожу огромное удовлетворение в менторинге младших разработчиков и наблюдении за их профессиональным ростом. Делиться знаниями и видеть, как человек эволюционирует от борьбы с базовыми концепциями до самостоятельного решения сложных задач — невероятно вдохновляющий опыт. Эта приверженность развитию команды помогла мне создавать высокоэффективные коллективы, которые стабильно показывают исключительные результаты.",

    // Достижения
    achievement1_title: "Увеличение производительности API на 40%",
    achievement1_desc:
      "Оптимизировал архитектуру и внедрил стратегическое кэширование, сократив время ответа с 1.2с до 0.7с для платежной платформы, обрабатывающей 15,000+ транзакций в день.",
    achievement2_title: "Автоматизация процессов разработки",
    achievement2_desc:
      "Разработал и внедрил CI/CD-пайплайны, сократившие время доставки обновлений на 60% и минимизировавшие количество ошибок при деплое.",
    achievement3_title: "Руководство командой разработчиков",
    achievement3_desc:
      "Успешно руководил командой из 5 разработчиков, реализовавшей 3 крупных проекта с нуля (Augmento, UseKyleApp, CareGave), уложившись в сроки и бюджет.",
    achievement4_title: "Управление производством",
    achievement4_desc:
      "Снизил операционные расходы на 25% и увеличил выпуск продукции на 15% за счет внедрения стратегических оптимизаций процессов и ИТ-решений в производственной среде.",

    // Кейсы
    case1_title: "Самый успешный проект",
    case1_p1:
      "Возглавил разработку музыкальной платформы UseKyleApp, создающей прямую связь между диджеями и аудиторией. Приложение позволяет посетителям мероприятий заказывать и оплачивать композиции, а исполнители получают вознаграждение за каждый принятый запрос. Благодаря интеграции со Spotify и Apple Music диджеи моментально получают доступ к огромной музыкальной библиотеке. Проект требовал решения сложных задач по надежной обработке платежей и обеспечению стабильной работы в режиме реального времени.",
    case1_p2:
      "Результаты: Созданная платформа обеспечивает бесперебойную обработку музыкальных запросов и транзакций даже при нестабильном интернет-соединении в концертных залах и клубах. Благодаря интуитивному интерфейсу и надежной работе приложение получило высокую оценку как среди диджеев, отметивших рост доходов, так и среди посетителей, оценивших новый уровень интерактивности на мероприятиях.",

    case2_title: "Извлечение уроков из сложностей",
    case2_p1:
      "В начале карьеры я недооценил сложность обработки больших объемов данных для аналитической платформы. Изначальная архитектура не справилась с потоком, когда объем обрабатываемых данных превысил прогнозы, что привело к проблемам с производительностью.",
    case2_p2:
      "Ключевые уроки: Этот опыт фундаментально изменил мой подход к системной архитектуре. Теперь я всегда продумываю архитектуру на много шагов вперед и считаю это самым важным аспектом разработки. Внедрил правильные протоколы нагрузочного тестирования, применил стратегии кэширования и оптимизации запросов, разработал более надежную систему мониторинга. Долгосрочное планирование архитектуры стало основой всех моих проектов с самого начала разработки.",
    case3_title: "Сложный стейкхолдер",
    case3_p1:
      "Работал с клиентом, который часто менял требования в середине разработки, не понимая технических последствий. Вместо того чтобы испытывать фрустрацию, я разработал инструмент визуализации, демонстрирующий, как изменения влияют на сроки проекта и технический долг.",
    case3_p2:
      "Результат: Клиент получил ценное понимание процесса разработки, наши отношения значительно улучшились, и мы установили более структурированную процедуру управления изменениями, которая принесла пользу обеим сторонам.",

    // Опыт работы
    job1_title: "Fullstack-разработчик / AI Engineer",
    job1_date: "Январь 2026 — Февраль 2026 (2 месяца)",
    job1_company: "АльфаИнфоТех (подрядная разработка)",
    job1_description: "Разработка AI-решения для автоматизации налогового документооборота крупной энергетической компании федерального уровня.",
    job1_stack: "Node.js, TypeScript, Python, REST API, AI, LLM",
    job1_bullet1: "Автоматическое сопоставление десятков тысяч сканированных закрывающих документов (УПД, счета-фактуры, акты) с электронными реестрами операций СЭД",
    job1_bullet2: "AI-пайплайн: Anthropic Claude API для извлечения структурированных данных из сканов + fuzzy matching для сопоставления с реестрами",
    job1_bullet3: "Обработка нестандартных форматов документов, работа с зашумлёнными сканами",
    job1_bullet4: "Работа с конфиденциальными финансовыми данными федерального уровня",

    job2_title: "Lead Backend Developer / Head of IT",
    job2_date: "Март 2025 — Декабрь 2025 (10 месяцев)",
    job2_company: "Digital-агентство (управление контентом и монетизация креаторов)",
    job2_location: "Москва",
    job2_description: "Спроектировал и реализовал backend-архитектуру платформы на Node.js/NestJS с нуля.",
    job2_stack: "Backend: Node.js, NestJS, Python (ETL) | Databases: PostgreSQL, MongoDB, Redis, NocoDB | Cloud: AWS (EC2, RDS, S3, Lambda, CloudWatch, ECR, SNS) | DevOps: Docker, GitHub CI/CD, Traefik | Analytics: Metabase",
    job2_bullet1: "CRM-система (PostgreSQL, Redis для кеширования)",
    job2_bullet2: "ETL-пайплайны на Python для обработки данных из внешних источников и формирования витрин данных",
    job2_bullet3: "Система парсинга данных с внешних платформ",
    job2_bullet4: "BI-платформа на Metabase для 120+ пользователей с кастомными агрегационными функциями",
    job2_bullet5: "Контент-система с хранилищем на S3",
    job2_bullet6: "AWS: EC2 (несколько инстансов по типу нагрузки), RDS, S3, Lambda, CloudWatch, ECR, SNS",
    job2_bullet7: "Blue-green deployment через Traefik с zero downtime",
    job2_bullet8: "CI/CD через GitHub Actions: автоматическая сборка, тесты, деплой в ECR",
    job2_bullet9: "Мониторинг: CloudWatch дашборды + SNS алерты в Discord/Telegram/Email",
    job2_bullet10: "Безопасность: AWS tunneling, Google Workspace policies, VPN (Outline)",
    job2_bullet11: "Спроектировал архитектуру БД (PostgreSQL) для всей компании",
    job2_bullet12: "Миграция 140 человек с 60+ Google Sheets на централизованную нормализованную БД",
    job2_bullet13: "Сократил расчёт зарплат 60 операторов с ~2 суток до 1 часа",
    job2_bullet14: "Снизил время формирования отчётов с нескольких часов до минут",
    job2_bullet15: "Создал масштабируемую инфраструктуру для роста компании с 80 до 120+ сотрудников",

    job3_title: "CTO / Lead Developer",
    job3_date: "Январь 2024 — Март 2025 (1 год 3 месяца)",
    job3_company: "Производственная компания (одежда/текстиль)",
    job3_description: "Спроектировал архитектуру и разработал веб-приложения для автоматизации производственного предприятия на 100+ человек. До прихода — весь учёт на бумаге и калькуляторах.",
    job3_bullet1: "Создал единую базу данных (PostgreSQL) для сведения всех производственных процессов",
    job3_bullet2: "Разработал систему real-time учёта сдельной зарплаты для 100+ сотрудников",
    job3_bullet3: "Автоматизировал формирование отчётов и планирование производства",
    job3_bullet4: "Обеспечил руководству real-time видимость незавершённого производства на каждом этапе",
    job3_bullet5: "Интегрировал систему мониторинга цепочки поставок",

    job4_title: "Fullstack-разработчик",
    job4_date: "Июнь 2022 — Декабрь 2024 (2 года 7 месяцев)",
    job4_company: "Фриланс / Upwork (81% Job Success)",
    job4_description: "Backend-разработка и технический консалтинг для международных клиентов из fintech, healthcare, crypto. Полный цикл: оценка проекта, архитектура, разработка, деплой, поддержка.",
    job4_stack: "Node.js, NestJS, TypeScript, Python, PostgreSQL, MongoDB, Redis, AWS, GCP, Firebase, Docker, React, WebSocket, REST API, GraphQL, Grafana, Prometheus, Stripe, Agora",
    job4_bullet1: "TRADERMAP.IO — real-time платформа мониторинга крупных криптовалютных сделок. Единственный разработчик, fullstack",
    job4_bullet2: "Backend на Node.js: WebSocket-интеграция с 8 криптобиржами, обработка и агрегация данных в реальном времени",
    job4_bullet3: "Модули: RSI Heatmap, Whale Trades и Liquidations, Unusual Activity, Altcoin Indexes, ETF данные",
    job4_bullet4: "AI Trading Agent: алгоритм Ichimoku для принятия решений, RAG + Score для памяти, интеграция новостных потоков, self-reflection pipeline",
    job4_bullet5: "Кеширование и управление состоянием через Redis",
    job4_bullet6: "Мониторинг: Grafana + Prometheus (метрики: время ответа REST/WebSocket, нагрузка Redis, здоровье соединений с биржами)",
    job4_bullet7: "MEDPAL — HIPAA-compliant платформа для врачей и пациентов (американский рынок). Серверлесс архитектура на Firebase",
    job4_bullet8: "Шифрование данных в базе для соответствия HIPAA, tokenized search по зашифрованным данным",
    job4_bullet9: "AMBASSADOR.AI — оптимизация бэкенда SaaS для ресторанного бизнеса. Кеширование на Redis, балансировка WebSocket-трафика",
    job4_bullet10: "Также: кастомные CRM-системы (NDA), технические аудиты AWS-инфраструктуры, интеграции Stripe, OAuth",

    job5_title: "Backend Engineer -> Team Lead",
    job5_date: "Январь 2021 — Май 2022 (1 год 5 месяцев)",
    job5_company: "Anoda",
    job5_description: "Архитектура и разработка бэкенда для трёх проектов с нуля, все запущены в срок. За 6 месяцев вырос до Team Lead, руководил командой из 5 человек.",
    job5_stack: "Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, AWS, REST API, GraphQL, Stripe, WebSocket, Code Review",
    job5_bullet1: "Спроектировал RESTful и GraphQL API для сервисов с real-time нагрузкой",
    job5_bullet2: "Интегрировал Stripe с подписками и рекуррентными платежами",
    job5_bullet3: "Менторинг джуниор-разработчиков",
    job5_projects: "Проекты (все с нуля):\n• Augmento — маркетплейс для европейского арт-рынка с AR. REST API, подписочная модель, интеграция с 3D/AR-стеком\n• UseKyleApp — музыкальная платформа с real-time биддинг-системой. Интеграция Spotify/Apple Music API, Stripe payments, WebSocket\n• CareGave — платформа для здравоохранения США",

    job6_title: "BackEnd Engineer",
    job6_date: "Февраль 2020 — Январь 2021 (1 год)",
    job6_company: "InterLogistics",
    job6_description: "Разработка систем автоматизации для логистической компании (импорт автомобилей с аукционов).",
    job6_stack: "Node.js, Puppeteer, MongoDB, REST API",
    job6_bullet1: "Разработал систему автоматизированных ботов для онлайн-аукционов Copart (США и ОАЭ) — передача данных в реальном времени для принятия решений о покупке",
    job6_bullet2: "Создал парсеры на Puppeteer, извлекающие данные с 200+ сайтов логистических компаний с точностью 98%",
    job6_bullet3: "Спроектировал систему отслеживания полной цепочки логистики автомобилей",

    job7_title: "FullStack Engineer",
    job7_date: "Март 2019 — Январь 2020 (11 месяцев)",
    job7_company: "MK 3",
    job7_location: "Москва, mk3.ru",
    job7_industry: "Строительство, недвижимость, эксплуатация, проектирование\n• Строительство коммерческих объектов (торговые площади, офисные здания)\n• Архитектура, проектирование",
    job7_description: "Автоматизация процессов в проектном бюро (строительство, архитектура, проектирование).",
    job7_stack: "JavaScript, Node.js, HTML, CSS",
    job7_bullet1: "Разработал корпоративный сайт компании",
    job7_bullet2: "Создал внутреннюю CRM-систему для управления лицензиями",
    job7_bullet3: "Разработал адаптивные фронтенд-интерфейсы для внутренних инструментов",

    // Образование
    education_level: "Высшее",
    university_name:
      'Московский финансово-промышленный университет "Синергия", Москва',
    education_spec:
      "Информационная безопасность, Разработка и поддержка систем безопасности",
    professional_reading: "Профессиональная литература",
    book1_title: "Domain-Driven Design Distilled",
    book2_title: "Объектно-ориентированное мышление",
    book3_title: "Грокаем алгоритмы",
    book1_author: "Vaughn Vernon",
    book2_author: "Matt Weisfeld",
    book3_author: "Aditya Bhargava",
    book1_application:
      "Применил эти принципы для создания четко структурированной модульной архитектуры в нескольких корпоративных проектах, обеспечив более ясное разделение бизнес-логики и технических компонентов.",
    book2_application:
      "Использовал эту методологию для разработки поддерживаемых и масштабируемых структур кода.",
    book3_application:
      "Повысил эффективность обработки данных, применяя оптимизированные алгоритмические подходы.",
    certifications: "Сертификаты",
    certification1_year: "2023",
    certification1_name: "Advanced Node.js Development",
    certification1_provider: "Udemy",
    certification2_year: "2022",
    certification2_name: "AWS Certified Developer - Associate",
    certification2_provider: "Amazon Web Services",

    // О себе
    about_me:
      "Строю fullstack-продукты с нуля и довожу до прода. Кайфую от того чтобы взять идею, спроектировать архитектуру, собрать и запустить — а потом видеть как этим пользуются люди.\n\n6+ лет на Node.js/TypeScript: парсеры, веб приложения, real-time платформы, ETL-пайплайны, интеграции с внешними API.\n\nЖивой продукт: tradermap.io — real-time платформа с WebSocket-интеграцией 8 бирж, AI Trading Agent, Grafana/Prometheus мониторинг.\n\n2.5 года международного фриланса (Upwork 81% Job Success): fintech, healthcare, crypto — каждый проект от архитектуры до деплоя в одиночку.\n\nОсновной стек: NestJS, PostgreSQL, MongoDB, Redis, AWS.\nДополнительно: опыт тимлидерства (команды до 5 человек), построение BI-систем на Metabase.",
  },

  en: {
    page_title: "Egor Semenchenko - Resume",
    // Основная информация
    name: "Egor Semenchenko",

    // Portfolio section
    portfolio_title: "Portfolio",
    portfolio_view_project: "View Details",
    portfolio_tech_stack: "Technologies",
    portfolio_close: "Close",
    portfolio_prev: "Previous",
    portfolio_next: "Next",
    portfolio_open_external: "Open in new tab",

    // APREE Platform Project
    'portfolio_apree-platform_title': "Enterprise IT Platform",
    'portfolio_apree-platform_short': "Internal IT infrastructure: 15+ microservices on AWS",
    'portfolio_apree-platform_desc': `Built company IT infrastructure from scratch for 120+ employees: 2 EC2 instances, Aurora PostgreSQL, 13 CloudFront CDN, 31 S3 buckets.

**Key Systems:**
• Analytics Platform — KPI dashboards with multi-source aggregation, plan vs actual
• Monroe DAM — microservice content management with Lambda thumbnail generation
• HR System — personnel management with Google Workspace integration
• SSO Auth — unified authentication across all services

**Architecture:**
• 15+ microservices with isolated PostgreSQL schemas
• CI/CD via GitHub Actions → ECR → Traefik blue-green deployment
• AWS CDK for Infrastructure as Code
• Prometheus + Grafana monitoring

**Result:** Infrastructure at $350/month serving 120+ users`,

    // ALFA Project
    portfolio_alfa_title: "Smart Document Matcher",
    portfolio_alfa_short: "AI-powered system for automated accounting document processing",
    portfolio_alfa_desc: `Automated matching system for scanned PDF documents (invoices, acts, UTD) with accounting registry entries from document management systems.

**Problem:** Thousands of legacy scanned closing documents needed to be matched with electronic operation registries.

**Solution:**
• AI data extraction via Claude API (single 500+ line prompt)
• OCR pipeline: GCP Vision batch (16 images/request) + Pytesseract
• Fuzzy matching with registries via RapidFuzz
• Handwritten accounting number recognition (Extended Thinking)

**Key optimizations:**
• Anthropic Batch API — 50% cost savings on Claude
• Index lookup O(1) for exact matches
• Parallel processing with semaphores`,

    // Crypnal Project
    portfolio_crypnal_title: "Crypto Whale Tracker",
    portfolio_crypnal_short: "Real-time monitoring platform for large cryptocurrency trades",
    portfolio_crypnal_desc: `Professional platform for tracking whale trades and liquidations in real-time across 8+ crypto exchanges.

**Challenge:** Build an instant notification system for large trades for crypto traders.

**Architecture:**
• WebSocket server for real-time trade broadcasting
• Multi-exchange connectors (Binance, Bybit, OKX, Coinbase, Hyperliquid)
• Server-side filtering to reduce traffic
• Redis for real-time aggregation and caching

**Key features:**
• 84+ React components with Vite build
• Dual-threshold filtering system (whale/liquidation)
• Telegram/Twitter bots for auto-posting alerts
• Prometheus + Grafana monitoring
• MongoDB TTL indexes for automatic data cleanup`,
    age: "27 years old",
    location_label: "Location",
    location: "Moscow",
    download_pdf: "Download PDF",
    print: "Print",

    // Заголовки секций
    job_title: "Senior Backend Developer Node.js / TypeScript",
    job_specs:
      "Specialization: Back End / Full Stack Development\nWork format: Full-time, Remote, Hybrid",

    summary_title: "Professional Profile",
    motivation_title: "What Drives Me",
    skills_title: "Skills",
    achievements_title: "Key Achievements",
    case_studies_title: "Career Case Studies",
    experience_title: "Work Experience — 7 years",
    education_title: "Education & Professional Development",
    about_title: "About Me",

    // Категории навыков
    prog_languages: "Programming Languages",
    backend: "Backend",
    frontend: "Frontend",
    databases: "Databases",
    devops: "DevOps & Infrastructure",
    integrations: "Integrations",
    analytics: "Analytics",
    engineering_practices: "Engineering Practices",
    soft_skills: "Soft Skills",
    payment_systems: "Payment Systems",

    // Языки
    russian: "Russian",
    english: "English",
    native: "Native",
    advanced: "B2 — Upper Intermediate",

    // Софт-скилы
    client_communication: "Client Communication",
    client_communication_desc:
      "Strong ability to negotiate with clients, understand their needs, and effectively communicate technical concepts to non-technical stakeholders.",
    team_leadership: "Team Leadership",
    team_leadership_desc:
      "Experience mentoring junior developers, fostering a collaborative environment, and leading cross-functional teams to achieve project goals.",
    conflict_resolution: "Conflict Resolution",
    conflict_resolution_desc:
      "Skilled at addressing conflicts constructively, finding common ground, and maintaining positive working relationships even in high-pressure situations.",
    crisis_management: "Crisis Management",
    crisis_management_desc:
      "Proven ability to make critical decisions during emergencies, prioritize effectively, and implement solutions that minimize negative impacts.",

    // Основные секции
    summary_content:
      "Senior Backend Developer with 7 years of experience in Node.js/TypeScript. Building fullstack products from scratch to production: parsers, web applications, real-time platforms, ETL pipelines, external API integrations.\n\nLive product: tradermap.io — real-time platform with WebSocket integration for 8 exchanges, AI Trading Agent, Grafana/Prometheus monitoring. 2.5 years of international freelancing (Upwork 81% Job Success): fintech, healthcare, crypto.\n\nCore stack: NestJS, PostgreSQL, MongoDB, Redis, AWS. Additionally: team leadership experience (teams up to 5 people), building BI systems on Metabase.",

    motivation_content:
      "I'm passionate about creating sophisticated technical solutions that appear seamless to end-users. There's nothing more satisfying than building complex systems that people interact with effortlessly, completely unaware of the intricate architecture beneath the surface.\n\nI find tremendous fulfillment in mentoring junior developers and watching their growth. Sharing knowledge and seeing someone evolve from struggling with basic concepts to independently solving complex problems is incredibly rewarding. This commitment to team development has helped me build high-performing teams that consistently deliver exceptional results.",

    // Достижения
    achievement1_title: "40% API Performance Improvement",
    achievement1_desc:
      "Optimized architecture and implemented strategic caching, reducing response time from 1.2s to 0.7s for a payment platform processing 15,000+ daily transactions.",
    achievement2_title: "Development Process Automation",
    achievement2_desc:
      "Designed and implemented CI/CD pipelines that reduced deployment time by 60% and minimized errors during the deploy process.",
    achievement3_title: "Team Leadership",
    achievement3_desc:
      "Successfully led a team of 5 developers that built 3 major projects from scratch (Augmento, UseKyleApp, CareGave), delivering on time and within budget.",
    achievement4_title: "Production Management",
    achievement4_desc:
      "Reduced operational costs by 25% and increased output by 15% by implementing strategic process optimizations and IT solutions in manufacturing environment.",

    // Кейсы
    case1_title: "Most Successful Project",
    case1_p1:
      "Led the development of UseKyleApp, a music platform creating direct connection between DJs and their audience. The application enables event attendees to request and pay for tracks, while performers receive compensation for each accepted request. Through Spotify and Apple Music integration, DJs gain instant access to an extensive music library. The project required solving complex challenges in reliable payment processing and ensuring stable real-time performance.",
    case1_p2:
      "Results: The platform provides seamless processing of music requests and transactions even with unstable internet connectivity in concert venues and clubs. Thanks to its intuitive interface and reliable performance, the application has received high praise from both DJs who reported increased earnings and attendees who appreciated the new level of interactivity at events.",
    case2_title: "Learning from Challenges",
    case2_p1:
      "Early in my career, I underestimated the complexity of processing large volumes of data for an analytics platform. The initial architecture couldn't handle the data flow when processing volumes exceeded projections, resulting in performance issues.",
    case2_p2:
      "Key lessons: This experience fundamentally changed my approach to system architecture. Now I always design architecture many steps ahead and consider it the most important aspect of development. I implemented proper load testing protocols, adopted caching and query optimization strategies, and developed a more robust monitoring system. Long-term architectural planning has become the foundation of all my projects from day one of development.",
    case3_title: "Difficult Stakeholder Management",
    case3_p1:
      "Worked with a client who frequently changed requirements mid-development without understanding the technical implications. Rather than becoming frustrated, I developed a visualization tool that demonstrated how changes impacted the project timeline and technical debt.",
    case3_p2:
      "Outcome: The client gained valuable insight into the development process, our relationship improved significantly, and we established a more structured change management procedure that benefited both parties.",

    // Опыт работы
    job1_title: "Fullstack Developer / AI Engineer",
    job1_date: "January 2026 — February 2026 (2 months)",
    job1_company: "AlfaInfoTech (contract development)",
    job1_description: "Development of AI solution for automating tax document workflow for a major federal-level energy company.",
    job1_stack: "Node.js, TypeScript, Python, REST API, AI, LLM",
    job1_bullet1: "Automated matching of tens of thousands of scanned closing documents (invoices, acts) with electronic operation registries",
    job1_bullet2: "AI pipeline: Anthropic Claude API for structured data extraction from scans + fuzzy matching for registry reconciliation",
    job1_bullet3: "Processing non-standard document formats, working with noisy scans",
    job1_bullet4: "Working with confidential federal-level financial data",

    job2_title: "Lead Backend Developer / Head of IT",
    job2_date: "March 2025 — December 2025 (10 months)",
    job2_company: "Digital Agency (content management and creator monetization)",
    job2_location: "Moscow",
    job2_description: "Designed and implemented backend architecture of the platform on Node.js/NestJS from scratch.",
    job2_stack: "Backend: Node.js, NestJS, Python (ETL) | Databases: PostgreSQL, MongoDB, Redis, NocoDB | Cloud: AWS (EC2, RDS, S3, Lambda, CloudWatch, ECR, SNS) | DevOps: Docker, GitHub CI/CD, Traefik | Analytics: Metabase",
    job2_bullet1: "CRM system (PostgreSQL, Redis caching)",
    job2_bullet2: "ETL pipelines in Python for external data processing and data mart generation",
    job2_bullet3: "Data parsing system from external platforms",
    job2_bullet4: "BI platform on Metabase for 120+ users with custom aggregation functions",
    job2_bullet5: "Content system with S3 storage",
    job2_bullet6: "AWS: EC2 (multiple instances by load type), RDS, S3, Lambda, CloudWatch, ECR, SNS",
    job2_bullet7: "Blue-green deployment via Traefik with zero downtime",
    job2_bullet8: "CI/CD via GitHub Actions: automated build, tests, deploy to ECR",
    job2_bullet9: "Monitoring: CloudWatch dashboards + SNS alerts to Discord/Telegram/Email",
    job2_bullet10: "Security: AWS tunneling, Google Workspace policies, VPN (Outline)",
    job2_bullet11: "Designed database architecture (PostgreSQL) for the entire company",
    job2_bullet12: "Migrated 140 people from 60+ Google Sheets to centralized normalized database",
    job2_bullet13: "Reduced payroll calculation for 60 operators from ~2 days to 1 hour",
    job2_bullet14: "Reduced report generation time from several hours to minutes",
    job2_bullet15: "Built scalable infrastructure for company growth from 80 to 120+ employees",

    job3_title: "CTO / Lead Developer",
    job3_date: "January 2024 — March 2025 (1 year 3 months)",
    job3_company: "Manufacturing Company (clothing/textiles)",
    job3_description: "Designed architecture and developed web applications for automating a manufacturing enterprise with 100+ employees. Before arrival — all accounting on paper and calculators.",
    job3_bullet1: "Created unified database (PostgreSQL) for consolidating all production processes",
    job3_bullet2: "Developed real-time piece-rate payroll tracking system for 100+ employees",
    job3_bullet3: "Automated report generation and production planning",
    job3_bullet4: "Provided management with real-time visibility into work-in-progress at every stage",
    job3_bullet5: "Integrated supply chain monitoring system",

    job4_title: "Fullstack Developer",
    job4_date: "June 2022 — December 2024 (2 years 7 months)",
    job4_company: "Freelance / Upwork (81% Job Success)",
    job4_description: "Backend development and technical consulting for international clients in fintech, healthcare, crypto. Full cycle: project estimation, architecture, development, deployment, support.",
    job4_stack: "Node.js, NestJS, TypeScript, Python, PostgreSQL, MongoDB, Redis, AWS, GCP, Firebase, Docker, React, WebSocket, REST API, GraphQL, Grafana, Prometheus, Stripe, Agora",
    job4_bullet1: "TRADERMAP.IO — real-time monitoring platform for large cryptocurrency trades. Sole developer, fullstack",
    job4_bullet2: "Node.js backend: WebSocket integration with 8 crypto exchanges, real-time data processing and aggregation",
    job4_bullet3: "Modules: RSI Heatmap, Whale Trades & Liquidations, Unusual Activity, Altcoin Indexes, ETF data",
    job4_bullet4: "AI Trading Agent: Ichimoku algorithm for decisions, RAG + Score for memory, news feed integration, self-reflection pipeline",
    job4_bullet5: "Caching and state management via Redis",
    job4_bullet6: "Monitoring: Grafana + Prometheus (metrics: REST/WebSocket response time, Redis load, exchange connection health)",
    job4_bullet7: "MEDPAL — HIPAA-compliant platform for doctors and patients (US market). Serverless architecture on Firebase",
    job4_bullet8: "Data encryption for HIPAA compliance, tokenized search on encrypted data",
    job4_bullet9: "AMBASSADOR.AI — backend optimization for restaurant SaaS. Redis caching, WebSocket traffic balancing",
    job4_bullet10: "Also: custom CRM systems (NDA), AWS infrastructure audits, Stripe & OAuth integrations",

    job5_title: "Backend Engineer -> Team Lead",
    job5_date: "January 2021 — May 2022 (1 year 5 months)",
    job5_company: "Anoda",
    job5_description: "Architecture and backend development for three projects from scratch, all launched on time. Grew to Team Lead in 6 months, managed a team of 5.",
    job5_stack: "Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, AWS, REST API, GraphQL, Stripe, WebSocket, Code Review",
    job5_bullet1: "Designed RESTful and GraphQL APIs for services with real-time load",
    job5_bullet2: "Integrated Stripe with subscriptions and recurring payments",
    job5_bullet3: "Mentored junior developers",
    job5_projects: "Projects (all from scratch):\n• Augmento — marketplace for European art market with AR. REST API, subscription model, 3D/AR stack integration\n• UseKyleApp — music platform with real-time bidding system. Spotify/Apple Music API integration, Stripe payments, WebSocket\n• CareGave — US healthcare platform",

    job6_title: "BackEnd Engineer",
    job6_date: "February 2020 — January 2021 (1 year)",
    job6_company: "InterLogistics",
    job6_description: "Development of automation systems for a logistics company (vehicle import from auctions).",
    job6_stack: "Node.js, Puppeteer, MongoDB, REST API",
    job6_bullet1: "Developed automated bot system for Copart online auctions (USA and UAE) — real-time data transmission for purchase decisions",
    job6_bullet2: "Built Puppeteer parsers extracting data from 200+ logistics company websites with 98% accuracy",
    job6_bullet3: "Designed system for tracking complete vehicle logistics chain",

    job7_title: "FullStack Engineer",
    job7_date: "March 2019 — January 2020 (11 months)",
    job7_company: "MK 3",
    job7_location: "Moscow, mk3.ru",
    job7_industry: "Construction, real estate, operations, design\n• Commercial property construction (retail spaces, office buildings)\n• Architecture, design",
    job7_description: "Process automation in a design bureau (construction, architecture, design).",
    job7_stack: "JavaScript, Node.js, HTML, CSS",
    job7_bullet1: "Developed the company's corporate website",
    job7_bullet2: "Created internal CRM system for license management",
    job7_bullet3: "Built responsive frontend interfaces for internal tools",

    // Образование
    education_level: "Higher Education",
    university_name:
      'Moscow University of Finance and Industry "Synergy", Moscow',
    education_spec:
      "Information Security, Development and Support of Security Systems",
    professional_reading: "Professional Reading",
    book1_title: "Domain-Driven Design Distilled",
    book2_title: "Object-Oriented Thinking",
    book3_title: "Grokking Algorithms",
    book1_author: "Vaughn Vernon",
    book2_author: "Matt Weisfeld",
    book3_author: "Aditya Bhargava",
    book1_application:
      "Applied these principles to structure microservices architecture for several enterprise projects.",
    book2_application:
      "Applied these principles to create well-structured modular architecture in several enterprise projects, ensuring clearer separation between business logic and technical components.",
    book3_application:
      "Improved data processing efficiency by applying optimized algorithmic approaches.",
    certifications: "Certifications",
    certification1_year: "2023",
    certification1_name: "Advanced Node.js Development",
    certification1_provider: "Udemy",
    certification2_year: "2022",
    certification2_name: "AWS Certified Developer - Associate",
    certification2_provider: "Amazon Web Services",

    // О себе
    about_me:
      "Building fullstack products from scratch and shipping to production. I love taking an idea, designing the architecture, building it, and launching — then seeing people use it.\n\n6+ years on Node.js/TypeScript: parsers, web applications, real-time platforms, ETL pipelines, external API integrations.\n\nLive product: tradermap.io — real-time platform with WebSocket integration for 8 exchanges, AI Trading Agent, Grafana/Prometheus monitoring.\n\n2.5 years of international freelancing (Upwork 81% Job Success): fintech, healthcare, crypto — every project from architecture to deployment solo.\n\nCore stack: NestJS, PostgreSQL, MongoDB, Redis, AWS.\nAdditionally: team leadership experience (teams up to 5 people), building BI systems on Metabase.",
  },
};
export default localization;
