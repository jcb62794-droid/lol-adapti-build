import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/data/translations';

type Language = 'pt_BR' | 'en';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  devMode: boolean;
  setDevMode: (mode: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt_BR');
  const [devMode, setDevMode] = useState(false);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, t, devMode, setDevMode }}>
      {children}
    </AppContext.Provider>
  );
};