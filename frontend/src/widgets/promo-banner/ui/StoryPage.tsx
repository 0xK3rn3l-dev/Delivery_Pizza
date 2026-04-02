

import { StoryCard, StoryPage } from "../model/types";
import { useStoryAction } from '@/features/story-actions';


interface StoryPageViewProps {
  page: StoryPage;
  card: StoryCard;
  onClose?: () => void; // добавим для close action
}


export const StoryPageView = ({ page, card, onClose }: StoryPageViewProps) => {
  
  const { executeAction } = useStoryAction({ 
    onClose,  // для close action
    // onAddToCart можно добавить позже
  });

  const handleAction = () => {
    if (page.action) {
      executeAction(page.action);
    }
  };

  return (
    <div className="instastories-page w-full h-full relative flex items-end p-6 text-white">
      
      {/* фон */}
      {page.image ? (
        <img 
          src={page.image} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${page.bgColor || card.coverBgColor}`} />
      )}

      <div className="absolute inset-0 bg-black/40" />

      {/* контент */}
      <div className="relative z-10 max-w-[80%]">
        {page.emoji && <div className="text-6xl mb-4">{page.emoji}</div>}
        
        <h2 className="text-2xl font-bold">
          {page.title || card.title}
        </h2>

        <p className="text-sm opacity-80">
          {page.subtitle || card.subtitle}
        </p>

        {page.content && (
          <p className="text-sm mt-2 whitespace-pre-line">
            {page.content}
          </p>
        )}

        {/* КНОПКА ДЕЙСТВИЯ */}
        {page.action && (
          <button
            onClick={handleAction}
            className={`
              mt-6 px-6 py-3 rounded-full font-semibold text-sm 
              transition-all transform hover:scale-105 active:scale-95 shadow-lg
              ${page.action.className || 'bg-white text-black hover:bg-gray-100'}
            `}
          >
            {page.action.text || 'Подробнее'}
          </button>
        )}


      </div>
    </div>
  )
}
