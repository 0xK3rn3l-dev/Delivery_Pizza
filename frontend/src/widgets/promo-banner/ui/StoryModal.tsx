'use client';

import { ActionRenderer } from '@/features/story-actions';
import { StoryModalProps } from '../model/types';
import { useStoryModal } from '../model/useStoryModal';

export const StoryModal = ({ 
  card, 
  onClose, 
  onNextCard, 
  onPrevCard, 
  hasNextCard, 
  hasPrevCard,
  onAddToCart
}: StoryModalProps) => {
  const {
    currentPage,
    currentPageIndex,
    totalPages,
    progress,
    isClosing,
    isPaused,
    handleClose,
    handleNextPage,
    handlePrevPage,
    setIsPaused,
  } = useStoryModal({
    card,
    onNextCard,
    onPrevCard,
    hasNextCard,
    hasPrevCard,
    onClose,
  });

  if (!currentPage) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md h-[600px] bg-black rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Прогресс-бары */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
          {Array(totalPages).fill(0).map((_, idx) => (
            <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100"
                style={{ 
                  width: `${idx < currentPageIndex ? 100 : idx === currentPageIndex ? progress : 0}%` 
                }}
              />
            </div>
          ))}
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition"
        >
          ✕
        </button>

        {/* Контент */}
        <div className="relative h-full flex flex-col items-start justify-end p-6 pb-12 text-white">
          {currentPage.image ? (
            <div className="absolute inset-0">
              <img 
                src={currentPage.image} 
                alt={currentPage.title || card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ) : (
            <div className={`absolute inset-0 bg-linear-to-br ${currentPage.bgColor || card.coverBgColor || 'from-orange-500 to-red-500'}`}></div>
          )}
        
          <div className="relative z-10 text-left w-full">
            {currentPage.emoji && (
              <div className="text-8xl mb-4 drop-shadow-lg">{currentPage.emoji}</div>
            )}
 
            <div className="space-y-2 max-w-[80%]">
              <h2 className="text-3xl font-bold drop-shadow-lg leading-tight">
                {currentPage.title || card.title}
              </h2>
              <p className="text-base opacity-90 drop-shadow leading-relaxed">
                {currentPage.subtitle || card.subtitle}
              </p>
              {currentPage.content && (
                <p className="text-sm opacity-80 mt-2 drop-shadow whitespace-pre-line">
                  {currentPage.content}
                </p>
              )}
              
              {/* Кнопка действия */}
              {currentPage.action && (
                <div className="mt-6">
                  <ActionRenderer 
                    action={currentPage.action} 
                    onClose={handleClose}
                    onAddToCart={onAddToCart}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Зоны навигации */}
        {(hasPrevCard || currentPageIndex > 0) && (
          <div 
            className="absolute left-0 top-0 w-1/3 h-[70%] cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); handlePrevPage(); }}
          />
        )}
        {(hasNextCard || currentPageIndex < totalPages - 1) && (
          <div 
            className="absolute right-0 top-0 w-1/3 h-[70%] cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); handleNextPage(); }}
          />
        )}
      </div>
    </div>
  );
};