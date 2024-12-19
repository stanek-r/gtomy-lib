import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslation } from '@/locales/en/en';
import { csTranslation } from '@/locales/cs/cs';

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
    returnNull: false,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

/**
 * Change language of the app to the given language
 * @param language - language to change to (e.g. 'en', 'cs')
 */
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

/**
 * Add translation resource to the given namespace and language
 * @param namespace - namespace of the resource (e.g. 'common', 'form')
 * @param language - language of the resource (e.g. 'en', 'cs')
 * @param resource - resource to add (e.g. { 'key': 'value' })
 */
export function addTranslationResource(namespace: string, language: string, resource: Record<string, any>) {
  i18n.addResourceBundle(language, namespace, resource, true, true);
}

/**
 * Add translation resources to the given namespace
 * @param namespace - namespace of the resources (e.g. 'common', 'form')
 * @param resources - resources to add (e.g. { 'en': { 'key': 'value' }, 'cs': { 'key': 'value' } })
 */
export function addTranslationResources(namespace: string, resources: Record<string, any>) {
  Object.keys(resources).forEach((language) => {
    addTranslationResource(namespace, language, resources[language]);
  });
}
