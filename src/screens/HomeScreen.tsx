import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../App';
import {mockStories} from '../data/mockStories';
import {Story} from '../types/Story';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const popularStories = mockStories.slice(0, 3);
  const recommendedStories = mockStories.slice(2, 5);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const handleStoryPress = (story: Story) => {
    navigation.navigate('StoryPlayer', {story});
  };

  const renderStoryCard = (story: Story, isLarge = false) => (
    <TouchableOpacity
      key={story.id}
      style={[styles.storyCard, isLarge && styles.largeCard]}
      onPress={() => handleStoryPress(story)}
    >
      <Image source={{uri: story.coverImage}} style={styles.coverImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle} numberOfLines={2}>
            {story.title}
          </Text>
          <Text style={styles.storyAuthor}>{story.author}</Text>
          <View style={styles.storyMeta}>
            <View style={styles.metaItem}>
              <Icon name="access-time" size={14} color="#fff" />
              <Text style={styles.metaText}>{formatDuration(story.duration)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="child-care" size={14} color="#fff" />
              <Text style={styles.metaText}>{story.ageRange}</Text>
            </View>
            {story.audioUrl && (
              <Icon name="volume-up" size={16} color="#4ECDC4" />
            )}
            {story.videoUrl && (
              <Icon name="play-circle-outline" size={16} color="#FF6B6B" />
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        style={styles.header}
      >
        <Text style={styles.welcomeText}>Bonjour !</Text>
        <Text style={styles.headerTitle}>Quelle histoire veux-tu écouter aujourd'hui ?</Text>
      </LinearGradient>

      {/* Histoires Populaires */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histoires Populaires</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {popularStories.map(story => renderStoryCard(story, true))}
        </ScrollView>
      </View>

      {/* Catégories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <View style={styles.categoriesGrid}>
          {['Contes Classiques', 'Aventures', 'Animaux', 'Princesses'].map((category, index) => (
            <TouchableOpacity key={category} style={styles.categoryCard}>
              <LinearGradient
                colors={index % 2 === 0 ? ['#FF6B6B', '#FF8E8E'] : ['#4ECDC4', '#44A08D']}
                style={styles.categoryGradient}
              >
                <Icon 
                  name={index === 0 ? 'auto-stories' : index === 1 ? 'explore' : index === 2 ? 'pets' : 'favorite'} 
                  size={24} 
                  color="#fff" 
                />
                <Text style={styles.categoryText}>{category}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recommandées pour toi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommandées pour toi</Text>
        {recommendedStories.map(story => (
          <TouchableOpacity
            key={story.id}
            style={styles.horizontalCard}
            onPress={() => handleStoryPress(story)}
          >
            <Image source={{uri: story.coverImage}} style={styles.horizontalImage} />
            <View style={styles.horizontalInfo}>
              <Text style={styles.horizontalTitle}>{story.title}</Text>
              <Text style={styles.horizontalAuthor}>{story.author}</Text>
              <Text style={styles.horizontalDescription} numberOfLines={2}>
                {story.description}
              </Text>
              <View style={styles.horizontalMeta}>
                <View style={styles.metaItem}>
                  <Icon name="access-time" size={12} color="#666" />
                  <Text style={styles.horizontalMetaText}>{formatDuration(story.duration)}</Text>
                </View>
                <Text style={styles.horizontalCategory}>{story.category}</Text>
              </View>
            </View>
            {story.isFavorite && (
              <Icon name="favorite" size={20} color="#FF6B6B" style={styles.favoriteIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  storyCard: {
    width: width * 0.7,
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  largeCard: {
    width: width * 0.8,
    height: 220,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  storyInfo: {
    padding: 15,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  storyAuthor: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  horizontalImage: {
    width: 80,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  horizontalInfo: {
    flex: 1,
    padding: 15,
  },
  horizontalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  horizontalAuthor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  horizontalDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  horizontalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalMetaText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  horizontalCategory: {
    fontSize: 11,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;