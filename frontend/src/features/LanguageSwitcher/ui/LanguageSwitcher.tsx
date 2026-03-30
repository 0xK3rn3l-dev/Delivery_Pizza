'use client';

import { Button } from '@/shared/ui/button';
import { useLanguage } from '../model/useLanguage';
import { PlanetIcon } from '@/shared/ui/icons'; 

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 ${className}`}
    >
      <PlanetIcon />
      <span>{language === 'ru' ? 'RU' : 'EN'}</span>
    </Button>
  );
};