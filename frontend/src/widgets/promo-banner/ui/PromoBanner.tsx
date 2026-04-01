'use client';

import { usePromoBannerScroll } from '../model/usePromoBannerScroll';
import { storyCards } from '../model/cards';
import { PromoCardItem } from './PromoCardItem';
import { StoryViewer } from './StoryViewer';
import { useState } from 'react';
import { StoryCard } from '../model/types';


export const PromoBanner = () => {
  const { scrollContainerRef, showLeftButton, showRightButton, scroll } =
    usePromoBannerScroll();
  
  const [activeCard, setActiveCard] = useState<StoryCard | null>(null);
  
  return (
    <>
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
                className="flex gap-3 overflow-x-auto scroll-smooth pb-4 px-2 md:px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {storyCards.map((card) => (
                  <PromoCardItem
                    key={card.id}
                    card={card}
                    onClick={() => setActiveCard(card)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно сторис */}
      {activeCard && (
        <StoryViewer page={activeCard.pages[0]}card={activeCard} onClose={() => setActiveCard(null)}/>
      )}
    </>
  );
};