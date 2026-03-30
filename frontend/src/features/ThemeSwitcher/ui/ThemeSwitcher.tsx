'use client';

import { Button } from '@/shared/ui/button';
import { useTheme } from '../model/useTheme';
import { SunIcon, MoonIcon } from '@/shared/ui/icons';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 ${className}`}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
    </Button>
  );
};