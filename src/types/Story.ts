export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  audioUrl?: string;
  videoUrl?: string;
  duration: number; // en secondes
  ageRange: string;
  category: string;
  isFavorite: boolean;
  pages?: StoryPage[];
}

export interface StoryPage {
  id: string;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: number;
}

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
}

export interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  showControls: boolean;
}