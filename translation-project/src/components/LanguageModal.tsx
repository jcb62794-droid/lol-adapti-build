import React, { useEffect, useState } from 'react';
import i18n from '../config/i18n';

export default function LanguageModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (!saved) setOpen(true);
  }, []);

  function choose(lang: 'pt-BR' | 'en') {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', zIndex: 9999
    }}>
      <div style={{
        width: 360, padding: 20, borderRadius: 8,
        background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: 12 }}>{i18n.t('chooseLanguagePrompt')}</h3>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={() => choose('pt-BR')} style={{ padding: '8px 12px' }}>
            {i18n.t('portuguese')}
          </button>
          <button onClick={() => choose('en')} style={{ padding: '8px 12px' }}>
            {i18n.t('english')}
          </button>
        </div>
      </div>
    </div>
  );
}