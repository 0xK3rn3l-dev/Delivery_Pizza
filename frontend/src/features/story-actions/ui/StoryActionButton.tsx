'use client';

import { StoryAction } from '../model/types';
import { useStoryAction } from '../model/useStoryAction';

interface StoryActionButtonProps {
  action: StoryAction;
  onClose?: () => void;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const StoryActionButton = ({ 
  action, 
  onClose, 
  onAddToCart, 
  className = '' 
}: StoryActionButtonProps) => {
  const { executeAction } = useStoryAction({ onClose, onAddToCart });

  const handleClick = () => {
    executeAction(action);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 bg-white text-orange-500 rounded-full font-semibold 
hover:bg-orange-500 hover:text-white transition ${className}`}
    >
      {action.text || 'Подробнее'}
    </button>
  );
};