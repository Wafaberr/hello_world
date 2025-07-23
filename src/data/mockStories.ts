import {Story} from '../types/Story';

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Le Petit Chaperon Rouge',
    author: 'Charles Perrault',
    description: 'L\'histoire classique d\'une petite fille et du grand méchant loup.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
    duration: 480, // 8 minutes
    ageRange: '3-6 ans',
    category: 'Conte Classique',
    isFavorite: false,
    pages: [
      {
        id: '1-1',
        text: 'Il était une fois une petite fille qui vivait avec sa maman dans une jolie maison à la lisière de la forêt.',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
        audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
        duration: 30
      },
      {
        id: '1-2',
        text: 'Sa grand-mère lui avait offert un magnifique chaperon rouge qu\'elle portait tout le temps.',
        imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
        audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
        duration: 25
      }
    ]
  },
  {
    id: '2',
    title: 'Les Trois Petits Cochons',
    author: 'Conte Traditionnel',
    description: 'Trois petits cochons construisent leurs maisons pour se protéger du loup.',
    coverImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
    duration: 360, // 6 minutes
    ageRange: '2-5 ans',
    category: 'Conte Traditionnel',
    isFavorite: true,
    pages: [
      {
        id: '2-1',
        text: 'Il était une fois trois petits cochons qui décidèrent de quitter la maison familiale.',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
        audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
        duration: 20
      }
    ]
  },
  {
    id: '3',
    title: 'La Belle au Bois Dormant',
    author: 'Charles Perrault',
    description: 'Une princesse endormie par un sort maléfique attend son prince charmant.',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 600, // 10 minutes
    ageRange: '4-8 ans',
    category: 'Conte de Fées',
    isFavorite: false,
    pages: [
      {
        id: '3-1',
        text: 'Dans un royaume lointain vivait une princesse d\'une beauté extraordinaire.',
        imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 45
      }
    ]
  },
  {
    id: '4',
    title: 'Boucle d\'Or et les Trois Ours',
    author: 'Robert Southey',
    description: 'Une petite fille découvre la maison des trois ours.',
    coverImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
    duration: 420, // 7 minutes
    ageRange: '3-6 ans',
    category: 'Conte Classique',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Le Vilain Petit Canard',
    author: 'Hans Christian Andersen',
    description: 'L\'histoire touchante d\'un caneton différent qui devient un magnifique cygne.',
    coverImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
    duration: 540, // 9 minutes
    ageRange: '4-8 ans',
    category: 'Conte d\'Andersen',
    isFavorite: false
  }
];