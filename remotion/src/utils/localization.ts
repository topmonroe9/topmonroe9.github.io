export type Language = "ru" | "en";

export type LocalizedText = {
  ru: string;
  en: string;
};

export const texts = {
  // Scene 1: Chaos
  scene1Title: {
    ru: "Сотни тысяч отсканированных документов",
    en: "Hundreds of thousands of scanned documents",
  },

  // Scene 2: No structure
  scene2Title: {
    ru: "Без имён. Без номеров. Без поиска.",
    en: "No names. No numbers. No search.",
  },

  // Scene 3: Registry problem
  scene3Title: {
    ru: "Необходимо привязать к реестрам СЭД",
    en: "Need to link to EDMS registries",
  },

  // Scene 4: Separation
  scene4Title: {
    ru: "Шаг 1: Разделение документов",
    en: "Step 1: Document Separation",
  },

  // Scene 5: AI Analysis
  scene5Title: {
    ru: "Шаг 2: AI-извлечение данных",
    en: "Step 2: AI Data Extraction",
  },
  scene5Subtitle: {
    ru: "Не просто OCR — контекстный анализ",
    en: "Not just OCR — contextual analysis",
  },
  scene5Fields: {
    documentName: {
      ru: "Название документа",
      en: "Document name",
    },
    documentType: {
      ru: "Тип / Формат",
      en: "Type / Format",
    },
    amountWithoutVAT: {
      ru: "Сумма без НДС",
      en: "Amount without VAT",
    },
    taxAmount: {
      ru: "Сумма налога",
      en: "Tax amount",
    },
    keyData: {
      ru: "Ключевые данные",
      en: "Key data",
    },
  },

  // Scene 6: Column mapping
  scene6Title: {
    ru: "Шаг 3: Настройка сопоставления",
    en: "Step 3: Mapping Configuration",
  },

  // Scene 7: Matching
  scene7Title: {
    ru: "Автоматический подбор документов",
    en: "Automatic document matching",
  },

  // Scene 8: Export
  scene8Title: {
    ru: "Готовый реестр + архив файлов",
    en: "Ready registry + file archive",
  },

  // Scene 9: Tech stack
  scene9Title: {
    ru: "Smart Document Matcher",
    en: "Smart Document Matcher",
  },

  // Registry columns
  registryColumns: {
    number: {
      ru: "№",
      en: "#",
    },
    documentName: {
      ru: "Наименование",
      en: "Name",
    },
    amount: {
      ru: "Сумма",
      en: "Amount",
    },
    date: {
      ru: "Дата",
      en: "Date",
    },
    file: {
      ru: "Файл",
      en: "File",
    },
  },
} as const;

export const getText = (
  textObj: LocalizedText,
  language: Language
): string => {
  return textObj[language];
};
