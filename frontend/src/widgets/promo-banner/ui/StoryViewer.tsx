'use client';

import { StoryCard } from "../model/types";
import { StoryPageView } from "./StoryPage";
import { useStoryViewer } from "../model/useStoryViewer";

interface Props {
  cards: StoryCard[];
  startCardIndex?: number;
  onClose: () => void;
  className?: string;  
}

export const StoryViewer = ({ cards, startCardIndex = 0, onClose }: Props) => {
  
  const {
    currentCard,
    currentPage,
    currentCardIndex,
    currentPageIndex,
    progress,
    handleNext,
    handlePrev,
  } = useStoryViewer({ cards, startCardIndex, onClose });


  return (
    // background
    <div 
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
    >


    {/* Кнопка "Назад" (слева от сториса) */}
    {(currentPageIndex > 0 || currentCardIndex > 0) && (
    <button
        onClick={handlePrev}
        className="absolute left-2 md:left-90 top-1/2 -translate-y-1/2 z-30 text-white bg-black/60 hover:bg-black/80 rounded-full w-30 h-30 md:w-12 md:h-12 flex items-center justify-center text-3xl md:text-2xl font-medium transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110"
        aria-label="Предыдущая страница"
    >
        {'<'}
    </button>
    )}
  
  
    {/* section story */}
    <div 
        className="relative w-full max-w-[400px] h-full max-h-[600px] bg-black rounded-2xl overflow-hidden shadow-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
    >


    {/* Полоски прогресса для страниц ТЕКУЩЕЙ карточки */}
    <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
      {currentCard.pages.map((_, idx) => (
        <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ 
              width: idx < currentPageIndex 
                ? '100%' 
                : idx === currentPageIndex 
                  ? `${progress}%` 
                  : '0%' 
            }}
          />
        </div>
      ))}
    </div>

    <button 
      onClick={onClose}
      className="absolute top-4 right-4 z-20 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all w-8 h-8 flex items-center justify-center"
    >
      ✕
    </button>
    

    <StoryPageView page={currentPage} card={currentCard} onClose={onClose} />
  </div>

    {/* Кнопка "Вперед" (справа от сториса) */}
    {(currentPageIndex < currentCard.pages.length - 1 || currentCardIndex < cards.length - 1) && (
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-90 top-1/2 -translate-y-1/2 z-30 text-white bg-black/60 hover:bg-black/80 rounded-full w-30 h-30 md:w-12 md:h-12 flex items-center justify-center text-3xl md:text-2xl font-medium transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110"
          aria-label="Следующая страница"
        >
          {'>'}
        </button>
      )}
    </div>
  );
};