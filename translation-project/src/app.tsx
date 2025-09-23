import React from 'react';
import ReactDOM from 'react-dom/client';
import './config/i18n';
import { useTranslation } from 'react-i18next';

// Componente App com suporte a i18n
function App() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('howToEdit')}</p>
    </div>
  );
}

// Renderização do app
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Elemento root não encontrado');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);