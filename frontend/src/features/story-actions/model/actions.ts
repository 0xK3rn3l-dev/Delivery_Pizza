import { StoryAction, LinkAction, ProductAction, ButtonAction, CloseAction } from './types';

export const createLinkAction = (url: string, text?: string, target?: '_blank' | '_self'): LinkAction => ({
  type: 'link',
  url,
  text: text || 'Перейти',
  target: target || '_self',
});

export const createProductAction = (productId: string, text?: string): ProductAction => ({
  type: 'product',
  productId,
  text: text || `Заказать`,
});

export const createButtonAction = (onClick: () => void, text?: string): ButtonAction => ({
  type: 'button',
  onClick,
  text: text || 'Нажать',
});

export const createCloseAction = (text?: string): CloseAction => ({
  type: 'close',
  text: text || 'Закрыть',
});

export const isLinkAction = (action: StoryAction): action is LinkAction => action.type === 'link';
export const isProductAction = (action: StoryAction): action is ProductAction => action.type === 'product';
export const isButtonAction = (action: StoryAction): action is ButtonAction => action.type === 'button';
export const isCloseAction = (action: StoryAction): action is CloseAction => action.type === 'close';