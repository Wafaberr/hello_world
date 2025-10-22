import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../App';
import {mockStories} from '../data/mockStories';
import {Story} from '../types/Story';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Conte Classique', 'Conte Traditionnel', 'Conte de Fées', 'Conte d\'Andersen'];

  const filteredStories = mockStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStoryPress = (story: Story) => {
    navigation.navigate('StoryPlayer', {story});
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

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
      <View style={styles.mediaIcons}>
        {item.audioUrl && (
          <Icon name="volume-up" size={20} color="#4ECDC4" style={styles.mediaIcon} />
        )}
        {item.videoUrl && (
          <Icon name="play-circle-outline" size={20} color="#FF6B6B" style={styles.mediaIcon} />
        )}
        {item.isFavorite && (
          <Icon name="favorite" size={20} color="#FF6B6B" style={styles.mediaIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategoryTab = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        selectedCategory === category && styles.activeCategoryTab
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryTabText,
          selectedCategory === category && styles.activeCategoryTabText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une histoire..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Icon name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtres par catégorie */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({item}) => renderCategoryTab(item)}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Résultats */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredStories.length} histoire{filteredStories.length !== 1 ? 's' : ''} trouvée{filteredStories.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Liste des histoires */}
      <FlatList
        data={filteredStories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id}
        style={styles.storiesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.storiesListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryTab: {
    backgroundColor: '#4ECDC4',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
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
  mediaIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mediaIcon: {
    marginVertical: 2,
  },
});

export default LibraryScreen;