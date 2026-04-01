'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { storyCards } from './cards';

export const usePromoStories = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  // Используем ref для отслеживания синхронных обновлений
  const isTransitioningRef = useRef(false);
  
  const currentCard = selectedCardIndex !== null ? storyCards[selectedCardIndex] : null;
  const totalPages = currentCard?.pages?.length || 0;

  // Сбрасываем флаг при смене карточки
  useEffect(() => {
    isTransitioningRef.current = false;
  }, [selectedCardIndex]);

  const openStory = useCallback((index: number) => {
    console.log('openStory', index);
    setSelectedCardIndex(index);
    setCurrentPageIndex(0);
  }, []);

  const closeStory = useCallback(() => {
    console.log('closeStory');
    setSelectedCardIndex(null);
    setCurrentPageIndex(0);
  }, []);
 
  const nextPage = useCallback(() => {
    if (selectedCardIndex === null) return;
    if (isTransitioningRef.current) return;
    
    console.log('nextPage called:', { 
      selectedCardIndex, 
      currentPageIndex, 
      totalPages,
      hasNextPage: currentPageIndex < totalPages - 1,
      hasNextCard: selectedCardIndex < storyCards.length - 1
    });
    
    isTransitioningRef.current = true;
    
    if (currentPageIndex < totalPages - 1) {
      // Переход на следующую страницу внутри текущей сторис
      setCurrentPageIndex(prev => prev + 1);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 50);
    } else {
      // Переход к следующей сторис
      if (selectedCardIndex < storyCards.length - 1) {
        setSelectedCardIndex(selectedCardIndex + 1);
        setCurrentPageIndex(0);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 50);
      } else {
        closeStory();
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 50);
      }
    }
  }, [selectedCardIndex, currentPageIndex, totalPages, closeStory]);

  const prevPage = useCallback(() => {
    if (selectedCardIndex === null) return;
    if (isTransitioningRef.current) return;
    
    console.log('prevPage called:', { 
      selectedCardIndex, 
      currentPageIndex,
      hasPrevPage: currentPageIndex > 0,
      hasPrevCard: selectedCardIndex > 0
    });
    
    isTransitioningRef.current = true;
    
    if (currentPageIndex > 0) {
      // Возврат на предыдущую страницу
      setCurrentPageIndex(prev => prev - 1);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 50);
    } else {
      // Возврат к предыдущей сторис
      if (selectedCardIndex > 0) {
        const prevCard = storyCards[selectedCardIndex - 1];
        setSelectedCardIndex(selectedCardIndex - 1);
        setCurrentPageIndex(prevCard?.pages?.length ? prevCard.pages.length - 1 : 0);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 50);
      } else {
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 50);
      }
    }
  }, [selectedCardIndex, currentPageIndex]);

  return {
    selectedCardIndex,
    currentCard,
    currentPage: currentCard?.pages?.[currentPageIndex] || null,
    currentPageIndex,
    totalPages,
    openStory,
    closeStory,
    nextPage,
    prevPage,
    hasNextCard: selectedCardIndex !== null && selectedCardIndex < storyCards.length - 1,
    hasPrevCard: selectedCardIndex !== null && selectedCardIndex > 0,
  };
};