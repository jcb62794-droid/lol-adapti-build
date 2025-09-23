import React from 'react';
import ReactDOM from 'react-dom/client';
import './config/i18n';
import LanguageModal from './components/LanguageModal';
import { useTranslation } from 'react-i18next';

function AppContent() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <h1>{t('welcome')}</h1>
      <h2>{t('projectInfo')}</h2>
      <p>{t('howToEdit')}</p>
      <p>{t('technologies')}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <LanguageModal />
      <AppContent />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);