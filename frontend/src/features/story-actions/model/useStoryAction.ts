'use client';

import { useRouter } from 'next/navigation';
import { StoryAction, LinkAction, ProductAction, ButtonAction, CloseAction } from './types';

interface UseStoryActionProps {
  onClose?: () => void;
  onAddToCart?: (productId: string) => void;
}

export const useStoryAction = ({ onClose, onAddToCart }: UseStoryActionProps = {}) => {
  const router = useRouter();

  const executeAction = (action: StoryAction) => {
    switch (action.type) {
      case 'link':
        const linkAction = action as LinkAction;
        if (linkAction.target === '_blank') {
          window.open(linkAction.url, '_blank');
        } else {
          router.push(linkAction.url);
        }
        break;

      case 'product':
        const productAction = action as ProductAction;
        if (onAddToCart) {
          onAddToCart(productAction.productId);
        } else {
          router.push(`/product/${productAction.productId}`);
        }
        break;

      case 'button':
        const buttonAction = action as ButtonAction;
        buttonAction.onClick();
        break;

      case 'close':
        if (onClose) onClose();
        break;

      default:
        console.warn('Unknown action type:', action);
    }
  };

  return { executeAction };
};