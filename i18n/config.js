'use client'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './en.json';
import zhTWTranslations from './zh-TW.json';
import jaTranslations from './ja.json';
import cards from "./cards.json";
import cardsEn from "./cards-en.json";
import cardsJa from "./cards-ja.json";
import category from "./category.json";
import categoryEn from "./category-en.json";
import categoryJa from "./category-ja.json";

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: enTranslations,
        cards: cardsEn,
        category: categoryEn
      },
      'zh-TW': { 
        translation: zhTWTranslations,
        cards: cards,
        category: category
      },
      ja: { 
        translation: jaTranslations,
        cards: cardsJa,
        category: categoryJa
      },
    },
    lng: 'zh-TW',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;