'use client';

import { useState } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'en' : 'ru');
    // Здесь будет логика смены языка (i18n и т.д.)
  };

  const setLanguageValue = (lang: 'ru' | 'en') => {
    setLanguage(lang);
    // Логика установки языка
  };

  return {
    language,
    toggleLanguage,
    setLanguageValue,
  };
};