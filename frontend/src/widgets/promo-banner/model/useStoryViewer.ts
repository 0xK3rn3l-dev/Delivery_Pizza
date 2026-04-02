'use client';

import { StoryCard } from "./types";
import { useState, useEffect } from "react";


interface UseStoryViewerProps {
  cards: StoryCard[];
  startCardIndex?: number;
  onClose: () => void;
}


interface UseStoryViewerReturn {
  currentCard: StoryCard;
  currentPage: StoryCard['pages'][0];
  currentCardIndex: number;
  currentPageIndex: number;
  progress: number;
  duration: number;
  handleNext: (e: React.MouseEvent) => void;
  handlePrev: (e: React.MouseEvent) => void;
}


export const useStoryViewer = ({ 
  cards, 
  startCardIndex = 0, 
  onClose 
}: UseStoryViewerProps): UseStoryViewerReturn => {
  
  const [currentCardIndex, setCurrentCardIndex] = useState(startCardIndex);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const currentCard = cards[currentCardIndex];
  const currentPage = currentCard.pages[currentPageIndex];
  const duration = currentPage.duration || 5000;


  // timer
  useEffect(() => {
    let animationId: number;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = (elapsed / duration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        
        if (currentPageIndex < currentCard.pages.length - 1) {
          setCurrentPageIndex(prev => prev + 1);
        } else if (currentCardIndex < cards.length - 1) {
          setCurrentCardIndex(prev => prev + 1);
          setCurrentPageIndex(0);
        } else {
          onClose();
        }
      } else {
        setProgress(newProgress);
        animationId = requestAnimationFrame(animate);
      }
    };
    
    setProgress(0);
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [currentPageIndex, currentCardIndex, duration, currentCard.pages.length, cards.length, onClose]);



  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (currentPageIndex < currentCard.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setCurrentPageIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };
  


  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setCurrentPageIndex(0);
      setProgress(0);
    }
  };

  return {
    currentCard,
    currentPage,
    currentCardIndex,
    currentPageIndex,
    progress,
    duration,
    handleNext,
    handlePrev,
  };
};