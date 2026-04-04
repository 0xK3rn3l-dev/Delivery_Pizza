'use client';

import { useState } from 'react';
import { HorizontalScroll } from '@/shared/ui/HorizontalScroll/HorizontalScroll';
import { storyCards } from '../model/cards';
import { PromoCardItem } from './PromoCardItem';
import { StoryViewer } from './StoryViewer';
import { StoryCard } from '../model/types';

export const PromoBanner = () => {
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

          {/* Используем HorizontalScroll */}
          <HorizontalScroll 
            scrollAmount={300}
            buttonSize="lg"
            buttonPosition="center"
            className="relative group"
            itemClassName="gap-3 px-2 md:px-8"
          >
            {storyCards.map((card) => (
              <PromoCardItem
                key={card.id}
                card={card}
                onClick={() => setActiveCard(card)}
              />
            ))}
          </HorizontalScroll>
        </div>
      </div>

      {/* Модальное окно сторис */}
      {activeCard && (
        <StoryViewer 
          cards={storyCards}
          startCardIndex={storyCards.findIndex(c => c.id === activeCard.id)}
          onClose={() => setActiveCard(null)}
        />
      )}
    </>
  );
};