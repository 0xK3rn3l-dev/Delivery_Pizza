import { StoryAction } from '@/features/story-actions';

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
 
