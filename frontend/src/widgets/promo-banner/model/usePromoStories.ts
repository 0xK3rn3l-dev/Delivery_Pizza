'use client';

import { useState } from 'react';
import { promoCards } from './cards';
import { PromoCard } from './types';

export const usePromoStories = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const closeStory = () => {
    setSelectedStoryIndex(null);
  };

  const nextStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < promoCards.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  return {
    selectedStoryIndex,
    openStory,
    closeStory,
    nextStory,
    prevStory,
    currentStory: selectedStoryIndex !== null ? promoCards[selectedStoryIndex] : null,
  };
};