'use client';

import { StoryCard, StoryPage } from "../model/types";
import { StoryPageView } from "./StoryPage";

interface Props {
  page: StoryPage;
  card: StoryCard;
  onClose: () => void;
  className?: string;  
}

export const StoryViewer = ({ page, card, onClose }: Props) => {
  // Пока просто показываем первую страницу
  const firstPage = card.pages[0];
  

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // не закрываем сторис
    console.log('Next page');
    // TODO: переключение на следующую страницу
  };
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // не закрываем сторис
    console.log('Prev page');
    // TODO: переключение на предыдущую страницу
  };


  return (
    // background
    <div 
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
    >


    {/* Кнопка "Назад" (слева от сториса) */}
    <button
        onClick={handlePrev}
        className="absolute left-2 md:left-90 top-1/2 -translate-y-1/2 z-30 text-white bg-black/60 hover:bg-black/80 rounded-full w-30 h-30 md:w-12 md:h-12 flex items-center justify-center text-3xl md:text-2xl font-medium transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110"
        aria-label="Предыдущая страница"
    >
        {'<'}
    </button>
  
  
    {/* section story */}
    <div 
        className="relative w-full max-w-[400px] h-full max-h-[600px] bg-black rounded-2xl overflow-hidden shadow-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
    >

    <button 
      onClick={onClose}
      className="absolute top-4 right-4 z-20 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all w-8 h-8 flex items-center justify-center"
    >
      ✕
    </button>
    
    <StoryPageView page={firstPage} card={card} />
  </div>

    {/* Кнопка "Вперед" (справа от сториса) */}
    <button
        onClick={handleNext}
        className="absolute right-2 md:right-90 top-1/2 -translate-y-1/2 z-30 text-white bg-black/60 hover:bg-black/80 rounded-full w-30 h-30 md:w-12 md:h-12 flex items-center justify-center text-3xl md:text-2xl font-medium transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110"
        aria-label="Следующая страница"
    >
        {'>'}
    </button>

</div>    
  );
};