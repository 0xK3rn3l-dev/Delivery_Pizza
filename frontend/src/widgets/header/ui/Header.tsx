'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';

export const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition"
          >
            Delivery Pizza 🍕
          </Link>
          
          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/menu" 
              className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
            >
              Наше Меню
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
            >
              Корзина
            </Link>
          </nav>
          
          {/* Кнопка входа */}
          <Button variant="primary" size="md">
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
};