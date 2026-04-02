'use client';

import { useState } from "react";
import { Comment } from "../model/types";
import { ReviewModal } from "./ReviewModal";

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для обрезания текста
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Функция для рендера звезд рейтинга
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '½' : '☆')}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="
          bg-white 
          rounded-2xl 
          shadow-md 
          border 
          border-gray-200 
          hover:border-orange-400 
          hover:bg-orange-50/50
          p-6 
          w-80 md:w-96 
          h-72 
          shrink-0 
          transition-all 
          duration-300 
          hover:shadow-lg 
          flex 
          flex-col 
          cursor-pointer
        "      
        >
            
        {/* Заголовок с рейтингом */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {comment.title}
          </h3>
          <div className="flex flex-col items-end">
            {renderStars(comment.rating)}
            <span className="text-xs text-gray-500 mt-1">
              {comment.rating}.0
            </span>
          </div>
        </div>
        
        {/* Текст отзыва - обрезаем по символам */}
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {truncateText(comment.description, 150)}
        </p>
        
        {/* Нижняя часть */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            ID заказа: {comment.item || 'Не указан'}
          </span>
        </div>
      </div>

      {/* Модальное окно */}
      <ReviewModal 
        comment={isModalOpen ? comment : null}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};