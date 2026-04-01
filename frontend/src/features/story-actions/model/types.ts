export type StoryActionType = 'link' | 'product' | 'button' | 'close';

export interface BaseStoryAction {
  type: StoryActionType;
  text?: string;
  className?: string;
}

export interface LinkAction extends BaseStoryAction {
  type: 'link';
  url: string;
  target?: '_blank' | '_self';
}

export interface ProductAction extends BaseStoryAction {
  type: 'product';
  productId: string;
  onAddToCart?: (productId: string) => void;
}

export interface ButtonAction extends BaseStoryAction {
  type: 'button';
  onClick: () => void;
}

export interface CloseAction extends BaseStoryAction {
  type: 'close';
}

export type StoryAction = LinkAction | ProductAction | ButtonAction | CloseAction;