'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { CartIcon } from '@/shared/ui/icons/CartIcon';

export const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/menu" 
              className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
            >
              Наше Меню
            </Link>

            <Link 
              href="/delivery" 
              className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
            >
              Доставка
            </Link>
          
          </nav>
          

          {/* Кнопки */}
          <div className="flex items-center gap-3">
            {/* Круглая кнопка корзины */}
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
            >
              <CartIcon className="h-5 w-5" />
              <span className="sr-only">Корзина</span>
            </Button>

            {/* Кнопка входа */}
            <Button variant="primary" size="md">
              Войти
            </Button>
          </div>
        
        
        </div>
      </div>
    </header>
  );
};