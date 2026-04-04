// shared/ui/HorizontalScroll/HorizontalScroll.tsx
'use client';

import { ReactNode } from 'react';
import { useHorizontalScroll } from './model/useHorizontalScroll';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  showButtons?: boolean;
  buttonPosition?: 'center' | 'top' | 'bottom';
  buttonSize?: 'sm' | 'md' | 'lg';
  scrollAmount?: number;
}

export const HorizontalScroll = ({
  children,
  className = '',
  itemClassName = '',
  showButtons = true,
  buttonPosition = 'center',
  buttonSize = 'md',
  scrollAmount = 500,
}: HorizontalScrollProps) => {
  const { scrollContainerRef, showLeftButton, showRightButton, scroll } = 
    useHorizontalScroll({ scrollAmount });

  const buttonSizeClasses = {
    sm: 'p-2 w-8 h-8',
    md: 'p-3 w-10 h-10',
    lg: 'p-3 w-12 h-12',
  }; 

  const getButtonPositionClasses = () => {
    if (buttonPosition === 'top') return 'top-0 -translate-y-1/2';
    if (buttonPosition === 'bottom') return 'bottom-0 translate-y-1/2';
    return 'top-1/2 -translate-y-1/2'; // center
  };

  return (
    <div className={`relative ${className}`}>
      {/* Контейнер с карточками */}
      <div className="px-2 md:px-8">
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-x-auto scroll-smooth pb-4 ${itemClassName}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>

      {/* Кнопки прокрутки */}
      {showButtons && (
        <>
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className={`
                absolute left-0 ${getButtonPositionClasses()} 
                -translate-x-1/2 z-20
                bg-white hover:bg-orange-500 
                rounded-full ${buttonSizeClasses[buttonSize]} 
                shadow-xl transition-all duration-300 
                border border-gray-200 hover:border-orange-500 
                flex items-center justify-center
                group/btn
              `}
              aria-label="Влево"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover/btn:text-white transition">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
   
          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className={`
                absolute right-0 ${getButtonPositionClasses()} 
                translate-x-1/2 z-20
                bg-white hover:bg-orange-500 
                rounded-full ${buttonSizeClasses[buttonSize]} 
                shadow-xl transition-all duration-300 
                border border-gray-200 hover:border-orange-500 
                flex items-center justify-center
                group/btn
              `}
              aria-label="Вправо"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover/btn:text-white transition">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )} 
        </>
      )}
    </div>
  );
};