export type Language = "ru" | "en";

export type LocalizedText = {
  ru: string;
  en: string;
};

export const apreeTexts = {
  // Phase labels
  problem: {
    ru: "Проблема",
    en: "Problem",
  },
  solution: {
    ru: "Решение",
    en: "Solution",
  },
  result: {
    ru: "Результат",
    en: "Result",
  },

  // Scene 1: Spreadsheet Chaos
  scene1Title: {
    ru: "Вся компания работала в Google Таблицах",
    en: "The entire company ran on Google Sheets",
  },
  scene1Counter: {
    ru: "таблиц",
    en: "spreadsheets",
  },

  // Scene 2: Spaghetti Scripts
  scene2Title: {
    ru: "Сотни скриптов связывали данные",
    en: "Hundreds of scripts interconnected data",
  },
  scene2Subtitle: {
    ru: "Хрупкие связи между системами",
    en: "Fragile connections between systems",
  },

  // Scene 3: Data Leaks
  scene3Title: {
    ru: "Данные терялись. Доступы утекали.",
    en: "Data was lost. Access leaked.",
  },
  scene3Item1: {
    ru: "Файлы исчезают",
    en: "Files disappear",
  },
  scene3Item2: {
    ru: "Утечка доступа",
    en: "Access leaks",
  },
  scene3Item3: {
    ru: "Множество аккаунтов",
    en: "Multiple accounts",
  },

  // Scene 4: Sales Panel
  scene4Title: {
    ru: "Веб-панель для отдела продаж",
    en: "Web panel for sales team",
  },
  scene4Subtitle: {
    ru: "Все данные → в единую базу",
    en: "All data → single database",
  },

  // Scene 5: Google Workspace
  scene5Title: {
    ru: "Google Workspace для 120+ сотрудников",
    en: "Google Workspace for 120+ employees",
  },
  scene5Subtitle: {
    ru: "Единый домен @company.com",
    en: "Single @company.com domain",
  },

  // Scene 6: SSO
  scene6Title: {
    ru: "Single Sign-On через Google",
    en: "Single Sign-On via Google",
  },
  scene6Subtitle: {
    ru: "Один аккаунт = доступ ко всему",
    en: "One account = access to everything",
  },

  // Scene 7: Analytics
  scene7Title: {
    ru: "Бизнес-аналитика на MetaBase",
    en: "Business analytics on MetaBase",
  },
  scene7Subtitle: {
    ru: "ETL-процессы, KPI, дашборды",
    en: "ETL processes, KPIs, dashboards",
  },

  // Scene 8: Content System (DAM)
  scene8Title: {
    ru: "Своя контент-система на AWS",
    en: "Custom content system on AWS",
  },
  scene8Subtitle: {
    ru: "Микросервисная архитектура",
    en: "Microservices architecture",
  },

  // Scene 9: Integration
  scene9Title: {
    ru: "Всё связано в единую платформу",
    en: "Everything connected into one platform",
  },

  // Scene 10: Results
  scene10Title: {
    ru: "Полная технологическая трансформация",
    en: "Complete technology transformation",
  },
  scene10Metric1: {
    ru: "90% таблиц отключено",
    en: "90% spreadsheets disabled",
  },
  scene10Metric2: {
    ru: "120+ пользователей",
    en: "120+ users",
  },
  scene10Metric3: {
    ru: "0 утечек данных",
    en: "0 data leaks",
  },

  // Scene 11: Tech Stack
  scene11Title: {
    ru: "Enterprise IT Platform",
    en: "Enterprise IT Platform",
  },
  scene11Subtitle: {
    ru: "15+ микросервисов | $350/месяц",
    en: "15+ microservices | $350/month",
  },

  // Service names
  serviceSales: {
    ru: "Продажи",
    en: "Sales",
  },
  serviceHR: {
    ru: "HR",
    en: "HR",
  },
  serviceDAM: {
    ru: "Контент",
    en: "Content",
  },
  serviceAnalytics: {
    ru: "Аналитика",
    en: "Analytics",
  },
} as const;

export const getApreeText = (
  textObj: LocalizedText,
  language: Language
): string => {
  return textObj[language];
};
