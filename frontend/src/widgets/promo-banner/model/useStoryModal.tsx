'use client';

import { useState, useEffect, useRef } from 'react';
import { StoryCard } from './types';

interface UseStoryModalProps {
  card: StoryCard;
  onNextCard: () => void;
  onPrevCard: () => void;
  hasNextCard: boolean;
  hasPrevCard: boolean;
  onClose: () => void;
}

export const useStoryModal = ({
  card,
  onNextCard,
  onPrevCard,
  hasNextCard,
  hasPrevCard,
  onClose,
}: UseStoryModalProps) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  const prevCardIdRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const lastValidPageIndexRef = useRef(0);
  
  const totalPages = card?.pages?.length || 0;
  const currentPage = card?.pages?.[currentPageIndex];
  const duration = currentPage?.duration || 5000;

  // Сбрасываем индекс при смене карточки
  useEffect(() => {
    if (prevCardIdRef.current !== card?.id) {
      setCurrentPageIndex(0);
      setProgress(0);
      lastValidPageIndexRef.current = 0;
      prevCardIdRef.current = card?.id ?? null;
      isTransitioningRef.current = false;
    }
  }, [card?.id]);

  // Защита от выхода индекса за пределы
  useEffect(() => {
    if (totalPages > 0 && currentPageIndex >= totalPages) {
      setCurrentPageIndex(lastValidPageIndexRef.current);
      setProgress(0);
    }
  }, [currentPageIndex, totalPages]);

  // Если нет страниц, закрываем
  useEffect(() => {
    if (totalPages === 0) {
      onClose();
    }
  }, [totalPages, onClose]);

  // Сохраняем последний валидный индекс
  useEffect(() => {
    if (currentPageIndex >= 0 && currentPageIndex < totalPages) {
      lastValidPageIndexRef.current = currentPageIndex;
    }
  }, [currentPageIndex, totalPages]);

  // Прогресс просмотра
  useEffect(() => {
    if (!currentPage) return;
    if (isPaused) return;
    if (isTransitioningRef.current) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        
        if (newProgress >= 100) {
          if (currentPageIndex < totalPages - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
            return 0;
          } else {
            if (!isTransitioningRef.current && hasNextCard) {
              isTransitioningRef.current = true;
              setTimeout(() => {
                onNextCard();
                setTimeout(() => {
                  isTransitioningRef.current = false;
                }, 100);
              }, 0);
            }
            return 0;
          }
        }
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPaused, currentPageIndex, totalPages, onNextCard, duration, currentPage, card?.id, hasNextCard]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleNextPage = () => {
    if (isTransitioningRef.current) return;
    
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setProgress(0);
    } else {
      if (hasNextCard) {
        isTransitioningRef.current = true;
        setTimeout(() => {
          onNextCard();
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 100);
        }, 0);
      }
    }
  };

  const handlePrevPage = () => {
    if (isTransitioningRef.current) return;
    
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setProgress(0);
    } else {
      if (hasPrevCard) {
        isTransitioningRef.current = true;
        setTimeout(() => {
          onPrevCard();
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 100);
        }, 0);
      }
    }
  };

  return {
    // Состояния
    currentPage,
    currentPageIndex,
    totalPages,
    progress,
    isClosing,
    isPaused,
    // Обработчики
    handleClose,
    handleNextPage,
    handlePrevPage,
    setIsPaused,
    // Вспомогательные
    duration,
  };
};