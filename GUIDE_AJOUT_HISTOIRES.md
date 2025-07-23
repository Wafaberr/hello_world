# 📚 Guide : Comment Ajouter des Histoires

Ce guide vous explique toutes les méthodes pour ajouter de nouvelles histoires à l'application.

## 🎯 Méthodes Disponibles

### 1. ✏️ Méthode Simple : Modification du Fichier de Données

La méthode la plus directe consiste à modifier le fichier `src/data/mockStories.ts`.

#### Structure d'une Histoire

```typescript
{
  id: 'identifiant-unique',           // ID unique (obligatoire)
  title: 'Titre de l\'histoire',     // Titre (obligatoire)
  author: 'Nom de l\'auteur',        // Auteur (obligatoire)
  description: 'Description...',      // Description (obligatoire)
  coverImage: 'URL_image',            // Image de couverture (obligatoire)
  audioUrl: 'URL_audio',              // Audio principal (optionnel)
  videoUrl: 'URL_video',              // Vidéo principale (optionnel)
  duration: 300,                      // Durée en secondes (obligatoire)
  ageRange: '3-6 ans',               // Tranche d'âge (obligatoire)
  category: 'Conte Classique',        // Catégorie (obligatoire)
  isFavorite: false,                  // Favori par défaut (obligatoire)
  pages: [...]                       // Pages optionnelles
}
```

#### Exemple Complet

```typescript
// Ajoutez ceci à la fin du tableau mockStories dans src/data/mockStories.ts
{
  id: 'cendrillon-2024',
  title: 'Cendrillon',
  author: 'Charles Perrault',
  description: 'L\'histoire de la jeune fille qui devient princesse grâce à sa marraine la fée.',
  coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
  audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
  duration: 540, // 9 minutes
  ageRange: '4-8 ans',
  category: 'Conte de Fées',
  isFavorite: false,
  pages: [
    {
      id: 'cendrillon-page-1',
      text: 'Il était une fois une jeune fille très gentille qui vivait avec sa belle-mère et ses deux demi-sœurs.',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
      duration: 45
    },
    {
      id: 'cendrillon-page-2',
      text: 'Un jour, le prince du royaume organisa un grand bal pour trouver une épouse.',
      imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
      duration: 35
    }
  ]
}
```

### 2. 🛠️ Méthode Programmée : Utilisation du StoryManager

J'ai créé un utilitaire `StoryManager` pour gérer les histoires de manière programmée.

#### Ajout Simple

```typescript
import { StoryManager } from '../utils/storyManager';

// Créer une nouvelle histoire
const nouvelleHistoire = StoryManager.createStory({
  title: 'Le Chat Botté',
  author: 'Charles Perrault',
  description: 'L\'aventure d\'un chat malin qui aide son maître.',
  coverImage: 'https://example.com/chat-botte.jpg',
  ageRange: '5-9 ans',
  category: 'Conte Classique',
  duration: 480,
  audioUrl: 'https://example.com/audio.mp3'
});

// Ajouter l'histoire
StoryManager.addStory(nouvelleHistoire);
```

#### Ajout avec Pages

```typescript
// Créer les pages
const page1 = StoryManager.createPage({
  text: 'Un meunier laissa pour tout héritage à ses trois enfants...',
  imageUrl: 'https://example.com/page1.jpg',
  audioUrl: 'https://example.com/page1.mp3',
  duration: 40
});

const page2 = StoryManager.createPage({
  text: 'Le chat dit à son nouveau maître...',
  imageUrl: 'https://example.com/page2.jpg',
  duration: 35
});

// Créer l'histoire avec les pages
const histoireAvecPages = StoryManager.createStory({
  title: 'Le Chat Botté',
  author: 'Charles Perrault',
  description: 'L\'aventure d\'un chat malin.',
  coverImage: 'https://example.com/cover.jpg',
  ageRange: '5-9 ans',
  category: 'Conte Classique',
  duration: 480,
  pages: [page1, page2]
});

StoryManager.addStory(histoireAvecPages);
```

### 3. 📱 Méthode Interface : Écran d'Administration

L'application inclut un écran `AddStoryScreen` pour ajouter des histoires via l'interface utilisateur.

#### Utilisation

1. **Naviguer vers l'écran** :
```typescript
navigation.navigate('AddStory');
```

2. **Remplir le formulaire** :
   - Informations de base (titre, auteur, description)
   - Durée et métadonnées (âge, catégorie)
   - URLs des médias (images, audio, vidéo)
   - Pages de l'histoire

3. **Ajouter des pages** :
   - Cliquer sur "Ajouter une page"
   - Saisir le texte et les médias
   - Valider chaque page

4. **Enregistrer l'histoire** :
   - Cliquer sur "Enregistrer l'Histoire"

### 4. 🎬 Gestion du Contenu Audiovisuel

#### Types de Médias Supportés

**Images** :
- Format : JPG, PNG, WebP
- Recommandé : 400x300px pour les pages, 300x400px pour les couvertures
- Source : URLs Unsplash, serveur personnel, CDN

**Audio** :
- Format : MP3, WAV, M4A
- Qualité : 128kbps minimum
- Durée : Indiquer la durée en secondes

**Vidéo** :
- Format : MP4, MOV
- Résolution : 720p minimum
- Codec : H.264

#### Exemples d'URLs de Test

```typescript
// Images gratuites (Unsplash)
coverImage: 'https://images.unsplash.com/photo-ID?w=300&h=400&fit=crop'
imageUrl: 'https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop'

// Audio de test
audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav'

// Vidéo de test
videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
```

### 5. 📊 Catégories et Métadonnées

#### Catégories Disponibles
- `Conte Classique`
- `Conte Traditionnel`
- `Conte de Fées`
- `Conte d'Andersen`
- `Aventures`
- `Animaux`
- `Princesses`
- `Science-Fiction`
- `Fantastique`

#### Tranches d'Âge
- `0-2 ans`
- `2-4 ans`
- `3-6 ans`
- `4-8 ans`
- `5-9 ans`
- `6-10 ans`
- `8-12 ans`

## 🚀 Exemples Pratiques

### Exemple 1 : Histoire Simple (Audio seulement)

```typescript
const histoireSimple = {
  id: 'goldilocks-2024',
  title: 'Boucle d\'Or et les Trois Ours',
  author: 'Robert Southey',
  description: 'Une petite fille curieuse découvre la maison des trois ours.',
  coverImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=400&fit=crop',
  audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
  duration: 420, // 7 minutes
  ageRange: '3-6 ans',
  category: 'Conte Classique',
  isFavorite: false
};
```

### Exemple 2 : Histoire avec Vidéo

```typescript
const histoireVideo = {
  id: 'sleeping-beauty-video',
  title: 'La Belle au Bois Dormant',
  author: 'Charles Perrault',
  description: 'Une princesse endormie par un sort maléfique.',
  coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  duration: 600, // 10 minutes
  ageRange: '4-8 ans',
  category: 'Conte de Fées',
  isFavorite: false
};
```

### Exemple 3 : Histoire Multi-Pages

```typescript
const histoireMultiPages = {
  id: 'puss-in-boots-complete',
  title: 'Le Chat Botté',
  author: 'Charles Perrault',
  description: 'L\'histoire complète du chat malin en plusieurs pages.',
  coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
  duration: 600,
  ageRange: '5-9 ans',
  category: 'Conte Classique',
  isFavorite: false,
  pages: [
    {
      id: 'puss-page-1',
      text: 'Un meunier laissa pour tout héritage à ses trois enfants son moulin, son âne et son chat.',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
      duration: 40
    },
    {
      id: 'puss-page-2',
      text: 'Le chat dit à son nouveau maître : "Donnez-moi un sac et faites-moi faire une paire de bottes."',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
      duration: 35
    },
    {
      id: 'puss-page-3',
      text: 'Le chat chaussa les bottes et s\'en alla attraper des lapins dans la garenne.',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
      duration: 38
    }
  ]
};
```

## ⚡ Ajout Rapide d'Exemples

Pour ajouter rapidement des histoires d'exemple :

```typescript
import { StoryManager } from '../utils/storyManager';

// Dans votre composant ou fonction
const ajouterExemples = () => {
  const exemples = StoryManager.getExampleStories();
  exemples.forEach(histoire => {
    StoryManager.addStory(histoire);
  });
  console.log(`${exemples.length} histoires d'exemple ajoutées !`);
};
```

## 🔧 Gestion Avancée

### Mise à Jour d'une Histoire

```typescript
StoryManager.updateStory('histoire-id', {
  title: 'Nouveau Titre',
  description: 'Nouvelle description',
  isFavorite: true
});
```

### Suppression d'une Histoire

```typescript
StoryManager.removeStory('histoire-id');
```

### Récupération d'Histoires

```typescript
// Toutes les histoires
const toutesLesHistoires = StoryManager.getAllStories();

// Une histoire spécifique
const histoire = StoryManager.getStoryById('histoire-id');
```

## 📝 Bonnes Pratiques

### IDs Uniques
- Utilisez des IDs descriptifs : `petit-chaperon-rouge-2024`
- Évitez les caractères spéciaux
- Incluez l'année pour éviter les doublons

### Durées
- Indiquez la durée réelle en secondes
- Pour les histoires sans audio : estimez le temps de lecture
- Durée recommandée par âge :
  - 0-3 ans : 60-180 secondes
  - 4-6 ans : 180-360 secondes
  - 7+ ans : 360-600 secondes

### Images
- Utilisez des images de haute qualité
- Respectez les droits d'auteur
- Unsplash offre des images gratuites
- Format recommandé : JPG optimisé

### Audio/Vidéo
- Testez les URLs avant de les ajouter
- Vérifiez la compatibilité mobile
- Utilisez des serveurs rapides (CDN)

## 🎯 Résumé Rapide

1. **Méthode Simple** : Modifiez `src/data/mockStories.ts`
2. **Méthode Programmée** : Utilisez `StoryManager.createStory()`
3. **Interface Utilisateur** : Utilisez `AddStoryScreen`
4. **Test Rapide** : Utilisez `StoryManager.getExampleStories()`

L'application se met à jour automatiquement quand vous ajoutez des histoires !

---

💡 **Astuce** : Commencez par ajouter une histoire simple avec juste les champs obligatoires, puis enrichissez-la progressivement avec des pages et du contenu multimédia.