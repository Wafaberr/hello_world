import {Story, StoryPage} from '../types/Story';
import {mockStories} from '../data/mockStories';

/**
 * Utilitaire pour gérer les histoires de l'application
 */
export class StoryManager {
  
  /**
   * Ajoute une nouvelle histoire au catalogue
   */
  static addStory(newStory: Story): boolean {
    try {
      // Vérifier si l'ID existe déjà
      const existingStory = mockStories.find(story => story.id === newStory.id);
      if (existingStory) {
        console.warn(`Histoire avec l'ID "${newStory.id}" existe déjà`);
        return false;
      }

      // Valider les données requises
      if (!this.validateStory(newStory)) {
        console.error('Données de l\'histoire invalides');
        return false;
      }

      // Ajouter l'histoire
      mockStories.push(newStory);
      console.log(`Histoire "${newStory.title}" ajoutée avec succès`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'histoire:', error);
      return false;
    }
  }

  /**
   * Crée une nouvelle histoire avec des valeurs par défaut
   */
  static createStory(params: {
    title: string;
    author: string;
    description: string;
    coverImage: string;
    ageRange: string;
    category: string;
    audioUrl?: string;
    videoUrl?: string;
    duration?: number;
    pages?: StoryPage[];
  }): Story {
    const newId = this.generateId();
    
    return {
      id: newId,
      title: params.title,
      author: params.author,
      description: params.description,
      coverImage: params.coverImage,
      audioUrl: params.audioUrl,
      videoUrl: params.videoUrl,
      duration: params.duration || 300, // 5 minutes par défaut
      ageRange: params.ageRange,
      category: params.category,
      isFavorite: false,
      pages: params.pages || []
    };
  }

  /**
   * Crée une nouvelle page d'histoire
   */
  static createPage(params: {
    text: string;
    imageUrl?: string;
    audioUrl?: string;
    videoUrl?: string;
    duration?: number;
  }): StoryPage {
    return {
      id: this.generateId(),
      text: params.text,
      imageUrl: params.imageUrl,
      audioUrl: params.audioUrl,
      videoUrl: params.videoUrl,
      duration: params.duration || 30
    };
  }

  /**
   * Valide qu'une histoire a tous les champs requis
   */
  private static validateStory(story: Story): boolean {
    const requiredFields = ['id', 'title', 'author', 'description', 'coverImage', 'ageRange', 'category'];
    
    for (const field of requiredFields) {
      if (!story[field as keyof Story]) {
        console.error(`Champ requis manquant: ${field}`);
        return false;
      }
    }

    // Valider la durée
    if (typeof story.duration !== 'number' || story.duration <= 0) {
      console.error('La durée doit être un nombre positif');
      return false;
    }

    return true;
  }

  /**
   * Génère un ID unique pour une nouvelle histoire
   */
  private static generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Récupère toutes les histoires
   */
  static getAllStories(): Story[] {
    return mockStories;
  }

  /**
   * Récupère une histoire par son ID
   */
  static getStoryById(id: string): Story | undefined {
    return mockStories.find(story => story.id === id);
  }

  /**
   * Supprime une histoire par son ID
   */
  static removeStory(id: string): boolean {
    const index = mockStories.findIndex(story => story.id === id);
    if (index !== -1) {
      mockStories.splice(index, 1);
      console.log(`Histoire avec l'ID "${id}" supprimée`);
      return true;
    }
    return false;
  }

  /**
   * Met à jour une histoire existante
   */
  static updateStory(id: string, updates: Partial<Story>): boolean {
    const index = mockStories.findIndex(story => story.id === id);
    if (index !== -1) {
      mockStories[index] = { ...mockStories[index], ...updates };
      console.log(`Histoire avec l'ID "${id}" mise à jour`);
      return true;
    }
    return false;
  }

  /**
   * Exemples d'histoires prêtes à ajouter
   */
  static getExampleStories(): Story[] {
    return [
      this.createStory({
        title: 'Cendrillon',
        author: 'Charles Perrault',
        description: 'L\'histoire de la jeune fille qui devient princesse grâce à sa marraine la fée.',
        coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
        ageRange: '4-8 ans',
        category: 'Conte de Fées',
        duration: 540,
        audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
        pages: [
          this.createPage({
            text: 'Il était une fois une jeune fille très gentille qui vivait avec sa belle-mère et ses deux demi-sœurs.',
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            duration: 45
          }),
          this.createPage({
            text: 'Un jour, le prince du royaume organisa un grand bal pour trouver une épouse.',
            imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
            duration: 35
          })
        ]
      }),

      this.createStory({
        title: 'Le Chat Botté',
        author: 'Charles Perrault',
        description: 'L\'aventure d\'un chat malin qui aide son maître à devenir riche.',
        coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
        ageRange: '5-9 ans',
        category: 'Conte Classique',
        duration: 480,
        audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
        pages: [
          this.createPage({
            text: 'Un meunier laissa pour tout héritage à ses trois enfants son moulin, son âne et son chat.',
            imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
            duration: 40
          })
        ]
      })
    ];
  }
}