'use client';

import { useReviewsScroll } from "../model/useReviewsScroll";
import { comments } from "../model/comments";
import { CommentCard } from "./CommentCard";

export const Reviews = () => {
  const { scrollContainerRef, showLeftButton, showRightButton, scroll } = useReviewsScroll();

  return (
    <div className="w-full bg-linear-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-16">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-gray-800">
              Отзывы
            </span>
          </div>

        </div>

        {/* Контейнер с кнопками прокрутки */}
        <div className="relative group">
          {/* Левая кнопка */}
          {showLeftButton && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20">
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

          {/* Правая кнопка */}
          {showRightButton && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20">
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

          {/* Карточки отзывов */}
          <div className="px-2 md:px-8">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>

        {/* Индикатор количества отзывов */}
        <div className="text-center mt-8">
          <span className="text-sm text-gray-400">
            {comments.length} отзывов
          </span>
        </div>
      </div>
    </div>
  );
};