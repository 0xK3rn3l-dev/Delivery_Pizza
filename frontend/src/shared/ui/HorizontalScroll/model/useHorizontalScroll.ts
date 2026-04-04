// shared/ui/HorizontalScroll/model/useHorizontalScroll.ts
import { useRef, useState, useEffect, useCallback } from 'react';

interface UseHorizontalScrollProps {
  scrollAmount?: number;
}

export const useHorizontalScroll = ({ scrollAmount = 500 }: UseHorizontalScrollProps = {}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftButton(scrollLeft > 20);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth - 20);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [scrollAmount]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [checkScrollButtons]);

  return {
    scrollContainerRef,
    showLeftButton,
    showRightButton,
    scroll,
    checkScrollButtons,
  };
};