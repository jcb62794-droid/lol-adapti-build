import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar arquivos JSON
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en/translation.json'), 'utf8'));
const ptBR = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/pt-BR/translation.json'), 'utf8'));

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'pt-BR': { translation: ptBR }
    },
    lng: typeof window !== 'undefined' && localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false }
  });

export default i18n;