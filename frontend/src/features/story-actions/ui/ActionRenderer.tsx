'use client';

import { StoryAction } from '../model/types';
import { StoryActionButton } from './StoryActionButton';

interface ActionRendererProps {
  action?: StoryAction;
  onClose?: () => void;
  onAddToCart?: (productId: string) => void;
}

export const ActionRenderer = ({ action, onClose, onAddToCart }: ActionRendererProps) => {
  if (!action) return null;

  return (
    <StoryActionButton
      action={action}
      onClose={onClose}
      onAddToCart={onAddToCart}
      className={action.type === 'close' ? 'bg-white/20 text-white hover:bg-white/30' : ''}
    />
  );
};