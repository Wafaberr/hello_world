# 📚 Application Mobile d'Histoires pour Enfants

Une application React Native moderne pour les histoires d'enfants avec gestion audiovisuelle complète.

## ✨ Fonctionnalités

### 🎬 Gestion Audiovisuelle
- **Lecture audio** : Narration des histoires avec contrôles complets
- **Lecture vidéo** : Support vidéo avec contrôles personnalisés
- **Navigation par pages** : Histoires multi-pages avec synchronisation audio/vidéo
- **Lecture automatique** : Passage automatique entre les pages
- **Contrôles de lecture** : Play/pause, avance rapide, retour
- **Barre de progression** : Navigation temporelle précise

### 📱 Interface Utilisateur
- **Design moderne** : Interface colorée et attrayante pour enfants
- **Navigation intuitive** : Tabs en bas pour navigation facile
- **Écran d'accueil** : Histoires populaires et recommandations
- **Bibliothèque** : Recherche et filtres par catégorie
- **Favoris** : Sauvegarde des histoires préférées
- **Responsive** : Adapté à différentes tailles d'écran

### 📖 Contenu
- **Contes classiques** : Le Petit Chaperon Rouge, Les Trois Petits Cochons, etc.
- **Métadonnées riches** : Auteur, durée, tranche d'âge, catégorie
- **Images HD** : Illustrations de qualité pour chaque histoire
- **Contenu multimédia** : Support audio ET vidéo par histoire

## 🚀 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS, macOS uniquement)

### Installation des dépendances
```bash
npm install
```

### Installation des pods iOS (macOS uniquement)
```bash
cd ios && pod install && cd ..
```

### Lancement de l'application

#### Android
```bash
npm run android
```

#### iOS (macOS uniquement)
```bash
npm run ios
```

#### Démarrer le serveur Metro
```bash
npm start
```

## 📁 Structure du Projet

```
src/
├── App.tsx                 # Composant principal avec navigation
├── screens/               # Écrans de l'application
│   ├── HomeScreen.tsx     # Écran d'accueil
│   ├── LibraryScreen.tsx  # Bibliothèque avec recherche
│   ├── FavoritesScreen.tsx # Écran des favoris
│   └── StoryPlayerScreen.tsx # Lecteur d'histoires
├── types/                 # Types TypeScript
│   └── Story.ts          # Types pour les histoires
└── data/                 # Données de l'application
    └── mockStories.ts    # Histoires d'exemple
```

## 🎮 Utilisation

### Écran d'Accueil
- Parcourez les histoires populaires
- Explorez les catégories (Contes, Aventures, Animaux, Princesses)
- Découvrez les recommandations personnalisées

### Bibliothèque
- Recherchez par titre ou auteur
- Filtrez par catégorie
- Visualisez les icônes audio/vidéo pour chaque histoire

### Lecteur d'Histoires
- **Lecture audio** : Appuyez sur le bouton play pour écouter
- **Lecture vidéo** : Tapez l'écran pour afficher/masquer les contrôles
- **Navigation** : Utilisez les flèches pour passer entre les pages
- **Options** :
  - `Auto` : Lecture automatique des pages suivantes
  - `Texte` : Afficher/masquer le texte de l'histoire

### Favoris
- Marquez vos histoires préférées avec le cœur ❤️
- Accédez rapidement à vos favoris depuis l'onglet dédié

## 🛠️ Technologies Utilisées

### Core
- **React Native** : Framework mobile cross-platform
- **TypeScript** : Typage statique pour JavaScript
- **React Navigation** : Navigation entre écrans

### UI/UX
- **React Native Vector Icons** : Icônes Material Design
- **React Native Linear Gradient** : Dégradés pour l'interface
- **React Native SVG** : Support des images vectorielles

### Audiovisuel
- **React Native Sound** : Gestion de l'audio
- **React Native Video** : Lecteur vidéo complet
- **React Native Slider** : Contrôles de progression

### Stockage & État
- **React Native Async Storage** : Stockage local
- **React Native Reanimated** : Animations fluides

## 🎨 Personnalisation

### Couleurs
L'application utilise un thème coloré adapté aux enfants :
- **Primaire** : `#4ECDC4` (Turquoise)
- **Secondaire** : `#FF6B6B` (Rouge corail)
- **Fond** : `#f8f9fa` (Gris clair)

### Ajout d'Histoires
Pour ajouter de nouvelles histoires, modifiez le fichier `src/data/mockStories.ts` :

```typescript
{
  id: 'nouvelle-histoire',
  title: 'Titre de l\'histoire',
  author: 'Nom de l\'auteur',
  description: 'Description de l\'histoire...',
  coverImage: 'URL_de_l_image',
  audioUrl: 'URL_du_fichier_audio', // Optionnel
  videoUrl: 'URL_du_fichier_video', // Optionnel
  duration: 300, // en secondes
  ageRange: '3-6 ans',
  category: 'Conte Classique',
  isFavorite: false,
  pages: [
    {
      id: 'page-1',
      text: 'Texte de la première page...',
      imageUrl: 'URL_image_page',
      audioUrl: 'URL_audio_page', // Optionnel
      duration: 30
    }
    // ... autres pages
  ]
}
```

## 🚀 Déploiement

### Android
1. Générer l'APK de production :
```bash
cd android && ./gradlew assembleRelease
```

2. L'APK sera disponible dans : `android/app/build/outputs/apk/release/`

### iOS
1. Ouvrir le projet dans Xcode :
```bash
open ios/ChildrenStoriesApp.xcworkspace
```

2. Configurer les certificats et provisioning profiles
3. Archive et upload vers l'App Store

## 🐛 Dépannage

### Problèmes courants

#### Metro ne démarre pas
```bash
npx react-native start --reset-cache
```

#### Erreurs de build Android
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

#### Problèmes avec les icônes (Android)
```bash
npx react-native link react-native-vector-icons
```

#### Audio ne fonctionne pas
Vérifiez que les permissions audio sont accordées dans les paramètres de l'appareil.

## 📱 Compatibilité

- **Android** : API niveau 21+ (Android 5.0+)
- **iOS** : iOS 11.0+
- **React Native** : 0.72+

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🎯 Roadmap

### Fonctionnalités à venir
- [ ] Mode hors ligne pour les histoires téléchargées
- [ ] Système de profils pour plusieurs enfants
- [ ] Statistiques de lecture et temps d'écoute
- [ ] Mode nuit avec thème sombre
- [ ] Contrôle parental et restrictions d'âge
- [ ] Création d'histoires personnalisées
- [ ] Synchronisation cloud des favoris
- [ ] Notifications pour nouvelles histoires

### Améliorations techniques
- [ ] Tests unitaires et d'intégration
- [ ] CI/CD avec GitHub Actions
- [ ] Optimisation des performances
- [ ] Accessibilité améliorée
- [ ] Support des langues multiples

---

💖 **Fait avec amour pour les enfants** 💖