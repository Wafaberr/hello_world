import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {RootStackParamList} from '../App';
import {mockStories} from '../data/mockStories';
import {Story} from '../types/Story';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [favorites, setFavorites] = useState<Story[]>([]);

  // Mise à jour des favoris quand l'écran est focalisé
  useFocusEffect(
    React.useCallback(() => {
      const favoriteStories = mockStories.filter(story => story.isFavorite);
      setFavorites(favoriteStories);
    }, [])
  );

  const handleStoryPress = (story: Story) => {
    navigation.navigate('StoryPlayer', {story});
  };

  const toggleFavorite = (storyId: string) => {
    // Dans une vraie application, ceci serait géré par un état global (Redux, Context, etc.)
    const updatedFavorites = favorites.filter(story => story.id !== storyId);
    setFavorites(updatedFavorites);
    
    // Mettre à jour aussi dans mockStories (simulation)
    const storyIndex = mockStories.findIndex(story => story.id === storyId);
    if (storyIndex !== -1) {
      mockStories[storyIndex].isFavorite = false;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={80} color="#ddd" />
      <Text style={styles.emptyTitle}>Aucune histoire favorite</Text>
      <Text style={styles.emptyText}>
        Appuyez sur le cœur ♥ des histoires que vous aimez pour les retrouver ici !
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('MainTabs', {screen: 'Library'})}
      >
        <LinearGradient
          colors={['#4ECDC4', '#44A08D']}
          style={styles.exploreGradient}
        >
          <Text style={styles.exploreButtonText}>Explorer les histoires</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStoryItem = ({item}: {item: Story}) => (
    <TouchableOpacity
      style={styles.storyItem}
      onPress={() => handleStoryPress(item)}
    >
      <Image source={{uri: item.coverImage}} style={styles.coverImage} />
      <View style={styles.storyDetails}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.metadata}>
          <View style={styles.metaItem}>
            <Icon name="access-time" size={14} color="#666" />
            <Text style={styles.metaText}>{formatDuration(item.duration)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="child-care" size={14} color="#666" />
            <Text style={styles.metaText}>{item.ageRange}</Text>
          </View>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Icon name="favorite" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <View style={styles.mediaIcons}>
          {item.audioUrl && (
            <Icon name="volume-up" size={18} color="#4ECDC4" style={styles.mediaIcon} />
          )}
          {item.videoUrl && (
            <Icon name="play-circle-outline" size={18} color="#FF6B6B" style={styles.mediaIcon} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        style={styles.headerGradient}
      >
        <Icon name="favorite" size={30} color="#fff" />
        <Text style={styles.headerTitle}>Mes Histoires Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} histoire{favorites.length !== 1 ? 's' : ''} dans vos favoris
        </Text>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      {favorites.length === 0 ? (
        renderEmptyList()
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderStoryItem}
          keyExtractor={(item) => item.id}
          style={styles.storiesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.storiesListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  exploreButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  exploreGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  storiesList: {
    flex: 1,
  },
  storiesListContent: {
    paddingHorizontal: 15,
  },
  storyItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coverImage: {
    width: 100,
    height: 120,
  },
  storyDetails: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  category: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
    backgroundColor: '#E8F8F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  actionButtons: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  favoriteButton: {
    padding: 5,
  },
  mediaIcons: {
    alignItems: 'center',
  },
  mediaIcon: {
    marginVertical: 2,
  },
});

export default FavoritesScreen;