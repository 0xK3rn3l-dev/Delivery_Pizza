'use client';

import { useEffect, useState } from 'react';
import { StoryModalProps } from '../model/types';

export const StoryModal = ({ 
  story, 
  onClose, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev,
  totalStories,
  currentIndex
}: StoryModalProps) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Прогресс просмотра (5 секунд на сторис)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPaused, onNext]);

  // Сброс прогресса при смене сторис
  useEffect(() => {
    setProgress(0);
  }, [story.id]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

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
        
        {/* Прогресс-бары - динамические на основе totalStories */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
          {Array(totalStories).fill(0).map((_, idx) => (
            <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100"
                style={{ 
                  width: `${idx < currentIndex ? 100 : idx === currentIndex ? progress : 0}%` 
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

        {/* Контент сторис */}
        <div className="relative h-full flex flex-col items-start justify-end p-6 pb-12 text-white">
          {story.image ? (
            <div className="absolute inset-0">
              <img 
                src={story.image} 
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ) : (
            <div className={`absolute inset-0 bg-linear-to-br ${story.bgColor || 'from-orange-500 to-red-500'}`}></div>
          )}
        
          <div className="relative z-10 text-left animate-in fade-in zoom-in duration-300 w-full">
            {story.emoji && (
              <div className="text-8xl mb-4 drop-shadow-lg">{story.emoji}</div>
            )}

            <div className="space-y-2 max-w-[80%]">
              <h2 className="text-3xl font-bold drop-shadow-lg leading-tight">
                {story.title}
              </h2>
              <p className="text-base opacity-90 drop-shadow leading-relaxed">
                {story.subtitle}
              </p>
              {story.content && (
                <p className="text-sm opacity-80 mt-2 drop-shadow">
                  {story.content}
                </p>
              )}
            </div>
    </div>
        </div>

        {/* Зоны для навигации */}
        {hasPrev && (
          <div 
            className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          />
        )}
        {hasNext && (
          <div 
            className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          />
        )}

        {/* Пауза при нажатии */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 z-10"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
      </div>
    </div>
  );
};