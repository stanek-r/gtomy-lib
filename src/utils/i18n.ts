import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { csTranslation, enTranslation } from '../locales';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: enTranslation,
  cs: csTranslation,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    fallbackNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
