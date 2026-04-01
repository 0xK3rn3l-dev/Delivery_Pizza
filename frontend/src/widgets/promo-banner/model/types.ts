import { StoryAction } from '@/features/story-actions';

export interface StoryPage {
  id: string;
  type: 'image' | 'video' | 'text';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  emoji?: string;
  bgColor?: string;
  action?: StoryAction;
  duration?: number;
}

export interface StoryCard {
  id: number;
  title: string;
  subtitle: string;
  coverImage?: string;
  coverEmoji?: string;
  coverBgColor?: string;
  pages: StoryPage[];
  discount?: string;
}

export interface StoryModalProps {
  card: StoryCard;
  onClose: () => void;
  onNextCard: () => void;
  onPrevCard: () => void;
  hasNextCard: boolean;
  hasPrevCard: boolean;
  totalCards: number;
  currentCardIndex: number;
  onAddToCart?: (productId: string) => void;
}

export interface PromoCardItemProps {
  card: StoryCard;
  onClick: () => void;
}