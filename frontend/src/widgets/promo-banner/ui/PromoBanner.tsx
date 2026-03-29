'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui';

const cards = [
  {
    id: 1,
    title: 'Пицца с доставкой',
    subtitle: 'Свежая, горячая за 30 минут',
    bgColor: 'from-orange-500 to-red-500',
    buttonText: 'Заказать',
    emoji: '🍕',
    discount: '-20%',
  },
  {
    id: 2,
    title: 'Скидка 20%',
    subtitle: 'На первый заказ',
    bgColor: 'from-purple-500 to-pink-500',
    buttonText: 'Получить',
    emoji: '🎁',
    discount: '-20%',
  },
  {
    id: 3,
    title: 'Комбо-обед',
    subtitle: 'Пицца + напиток + закуска',
    bgColor: 'from-green-500 to-teal-500',
    buttonText: 'Выбрать',
    emoji: '🍽️',
    discount: '-30%',
  },
  {
    id: 4,
    title: 'Бесплатная доставка',
    subtitle: 'При заказе от 1000₽',
    bgColor: 'from-blue-500 to-cyan-500',
    buttonText: 'Подробнее',
    emoji: '🛵',
    discount: '🚚',
  },
  {
    id: 5,
    title: 'Подарок в юбилей',
    subtitle: 'При заказе от 1000₽',
    bgColor: 'from-pink-500 to-rose-500',
    buttonText: 'Узнать',
    emoji: '🎂',
    discount: '🎁',
  },
];

export const PromoBanner = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-linear-to-b from-white to-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-16">
        {/* Заголовок с декоративной линией */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-0.5 bg-linear-to-r from-transparent to-orange-500"></div>
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Спецпредложения
            </span>
            <div className="w-10 h-0.5 bg-linear-to-l from-transparent to-orange-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Акции и новости
          </h2>
          <p className="text-gray-500">
            Специальные предложения и акции для вас
          </p>
        </div>


        {/* Контейнер с фиксированными зонами для кнопок */}
        <div className="relative group">
          
          {/* ЛЕВАЯ ЗОНА */}
          {showLeftButton && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20">
              <button
                onClick={() => scroll('left')}
                className="bg-white hover:bg-orange-500 rounded-full p-3 shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-500 group/btn"
                aria-label="Влево"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover/btn:text-white transition">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            </div>
          )}

          {/* ПРАВАЯ ЗОНА */}
          {showRightButton && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20">
              <button
                onClick={() => scroll('right')}
                className="bg-white hover:bg-orange-500 rounded-full p-3 shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-500 group/btn"
                aria-label="Вправо"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover/btn:text-white transition">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}

          {/* Карточки */}
          <div className="px-2 md:px-8">
            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto scroll-smooth pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >

              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="group/card shrink-0 w-52 md:w-48 flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Верхняя часть с градиентом и эмодзи */}
                  <div className={`relative h-44 bg-linear-to-br ${card.bgColor} flex items-center justify-center overflow-hidden`}>
                    {/* Бейдж со скидкой */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-orange-600 shadow-md">
                      {card.discount}
                    </div>
                    
                    {/* Анимированная эмодзи */}
                    <span className="text-8xl transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
                      {card.emoji}
                    </span>
                    
                    {/* Декоративные круги */}
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  </div>
                  
                  {/* Нижняя часть с текстом */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-xl mb-1 text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                      {card.subtitle}
                    </p>
                    
                    {/* Кнопка с анимацией */}
                    <Link href="/menu" className="mt-auto">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {card.buttonText} →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};