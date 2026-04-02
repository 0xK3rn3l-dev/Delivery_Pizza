'use client';

import { Comment } from "../model/types";
import { useEffect } from "react";

interface ReviewModalProps {
  comment: Comment | null;
  onClose: () => void;
}

export const ReviewModal = ({ comment, onClose }: ReviewModalProps) => {

  if (!comment) return null;

  // Функция для рендера звезд рейтинга
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-2xl text-yellow-400">
            {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '½' : '☆')}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white/80 rounded-full p-1.5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {/* Заголовок и рейтинг */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 pr-8">
              {comment.title}
            </h3>
            <div className="flex flex-col items-end">
              {renderStars(comment.rating)}
              <span className="text-sm text-gray-500 mt-1">
                {comment.rating}.0
              </span>
            </div>
          </div>
          
          {/* Полный текст отзыва */}
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
            {comment.description}
          </p>
          
          {/* Нижняя часть */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-400">
              ID заказа: {comment.item || 'Не указан'}
            </span>
            <span className="text-sm text-orange-500 font-medium">
              Отзыв подтвержден
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};