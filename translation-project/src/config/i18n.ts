import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/translation.json';
import ptBR from '../locales/pt-BR/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'pt-BR': { translation: ptBR }
    },
    lng: localStorage?.getItem?.('lang') || 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false }
  });

export default i18n;