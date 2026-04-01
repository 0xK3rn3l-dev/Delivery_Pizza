

import { StoryCard, StoryPage } from "../model/types";

export const StoryPageView = ({ page, card }: { page: StoryPage; card: StoryCard }) => {
  console.log('StoryPageView received:', { page, card });
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
      </div>
    </div>
  )
}
