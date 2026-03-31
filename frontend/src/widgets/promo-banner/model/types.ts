export interface PromoCard {
  id: number;
  title: string;
  subtitle: string;
  bgColor?: string;
  buttonText?: string;
  emoji?: string;
  image?: string;
  discount?: string;
  content?: string;
}

export interface Story {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  emoji?: string;
  bgColor?: string;
  content?: string;
}

export interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  totalStories: number;
  currentIndex: number;
}