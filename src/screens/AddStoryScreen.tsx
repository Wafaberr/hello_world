import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {StoryManager} from '../utils/storyManager';
import {Story, StoryPage} from '../types/Story';

const AddStoryScreen = () => {
  const navigation = useNavigation();
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    audioUrl: '',
    videoUrl: '',
    duration: '',
    ageRange: '',
    category: '',
  });

  const [pages, setPages] = useState<Partial<StoryPage>[]>([]);
  const [currentPage, setCurrentPage] = useState({
    text: '',
    imageUrl: '',
    audioUrl: '',
    videoUrl: '',
    duration: '',
  });

  const [showPageForm, setShowPageForm] = useState(false);

  const categories = [
    'Conte Classique',
    'Conte Traditionnel',
    'Conte de Fées',
    'Conte d\'Andersen',
    'Aventures',
    'Animaux',
    'Princesses',
    'Science-Fiction',
    'Fantastique',
  ];

  const ageRanges = [
    '0-2 ans',
    '2-4 ans',
    '3-6 ans',
    '4-8 ans',
    '5-9 ans',
    '6-10 ans',
    '8-12 ans',
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateCurrentPage = (field: string, value: string) => {
    setCurrentPage(prev => ({ ...prev, [field]: value }));
  };

  const addPage = () => {
    if (!currentPage.text.trim()) {
      Alert.alert('Erreur', 'Le texte de la page est requis');
      return;
    }

    const newPage = StoryManager.createPage({
      text: currentPage.text,
      imageUrl: currentPage.imageUrl || undefined,
      audioUrl: currentPage.audioUrl || undefined,
      videoUrl: currentPage.videoUrl || undefined,
      duration: currentPage.duration ? parseInt(currentPage.duration) : undefined,
    });

    setPages(prev => [...prev, newPage]);
    setCurrentPage({
      text: '',
      imageUrl: '',
      audioUrl: '',
      videoUrl: '',
      duration: '',
    });
    setShowPageForm(false);
  };

  const removePage = (index: number) => {
    setPages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const requiredFields = ['title', 'author', 'description', 'coverImage', 'ageRange', 'category'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].trim()) {
        Alert.alert('Erreur', `Le champ "${field}" est requis`);
        return false;
      }
    }

    const duration = parseInt(formData.duration);
    if (!formData.duration || isNaN(duration) || duration <= 0) {
      Alert.alert('Erreur', 'La durée doit être un nombre positif (en secondes)');
      return false;
    }

    return true;
  };

  const saveStory = () => {
    if (!validateForm()) return;

    const newStory = StoryManager.createStory({
      title: formData.title,
      author: formData.author,
      description: formData.description,
      coverImage: formData.coverImage,
      audioUrl: formData.audioUrl || undefined,
      videoUrl: formData.videoUrl || undefined,
      duration: parseInt(formData.duration),
      ageRange: formData.ageRange,
      category: formData.category,
      pages: pages as StoryPage[],
    });

    const success = StoryManager.addStory(newStory);
    
    if (success) {
      Alert.alert(
        'Succès',
        'Histoire ajoutée avec succès !',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      Alert.alert('Erreur', 'Impossible d\'ajouter l\'histoire');
    }
  };

  const addExampleStories = () => {
    Alert.alert(
      'Ajouter des exemples',
      'Voulez-vous ajouter des histoires d\'exemple ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Ajouter',
          onPress: () => {
            const examples = StoryManager.getExampleStories();
            examples.forEach(story => StoryManager.addStory(story));
            Alert.alert('Succès', `${examples.length} histoires d'exemple ajoutées !`);
          },
        },
      ]
    );
  };

  const renderCategoryPicker = () => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Catégorie *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.pickerItem,
              formData.category === category && styles.pickerItemSelected,
            ]}
            onPress={() => updateFormData('category', category)}
          >
            <Text
              style={[
                styles.pickerItemText,
                formData.category === category && styles.pickerItemTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAgeRangePicker = () => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Tranche d'âge *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ageRanges.map(age => (
          <TouchableOpacity
            key={age}
            style={[
              styles.pickerItem,
              formData.ageRange === age && styles.pickerItemSelected,
            ]}
            onPress={() => updateFormData('ageRange', age)}
          >
            <Text
              style={[
                styles.pickerItemText,
                formData.ageRange === age && styles.pickerItemTextSelected,
              ]}
            >
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter une Histoire</Text>
        <TouchableOpacity
          style={styles.exampleButton}
          onPress={addExampleStories}
        >
          <Icon name="auto-awesome" size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Informations de base */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de base</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => updateFormData('title', text)}
              placeholder="Ex: Le Petit Chaperon Rouge"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Auteur *</Text>
            <TextInput
              style={styles.input}
              value={formData.author}
              onChangeText={(text) => updateFormData('author', text)}
              placeholder="Ex: Charles Perrault"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => updateFormData('description', text)}
              placeholder="Décrivez l'histoire en quelques mots..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Durée (secondes) *</Text>
            <TextInput
              style={styles.input}
              value={formData.duration}
              onChangeText={(text) => updateFormData('duration', text)}
              placeholder="Ex: 300 (5 minutes)"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {renderCategoryPicker()}
          {renderAgeRangePicker()}
        </View>

        {/* Médias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Médias</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image de couverture (URL) *</Text>
            <TextInput
              style={styles.input}
              value={formData.coverImage}
              onChangeText={(text) => updateFormData('coverImage', text)}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Audio principal (URL)</Text>
            <TextInput
              style={styles.input}
              value={formData.audioUrl}
              onChangeText={(text) => updateFormData('audioUrl', text)}
              placeholder="https://example.com/audio.mp3"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vidéo principale (URL)</Text>
            <TextInput
              style={styles.input}
              value={formData.videoUrl}
              onChangeText={(text) => updateFormData('videoUrl', text)}
              placeholder="https://example.com/video.mp4"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Pages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pages ({pages.length})</Text>
            <TouchableOpacity
              style={styles.addPageButton}
              onPress={() => setShowPageForm(!showPageForm)}
            >
              <Icon name={showPageForm ? "remove" : "add"} size={20} color="#4ECDC4" />
              <Text style={styles.addPageText}>
                {showPageForm ? "Annuler" : "Ajouter une page"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Liste des pages existantes */}
          {pages.map((page, index) => (
            <View key={index} style={styles.pageItem}>
              <View style={styles.pageContent}>
                <Text style={styles.pageTitle}>Page {index + 1}</Text>
                <Text style={styles.pageText} numberOfLines={2}>
                  {page.text}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removePageButton}
                onPress={() => removePage(index)}
              >
                <Icon name="delete" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Formulaire nouvelle page */}
          {showPageForm && (
            <View style={styles.pageForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Texte de la page *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={currentPage.text}
                  onChangeText={(text) => updateCurrentPage('text', text)}
                  placeholder="Il était une fois..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Image (URL)</Text>
                <TextInput
                  style={styles.input}
                  value={currentPage.imageUrl}
                  onChangeText={(text) => updateCurrentPage('imageUrl', text)}
                  placeholder="https://example.com/page-image.jpg"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Audio (URL)</Text>
                <TextInput
                  style={styles.input}
                  value={currentPage.audioUrl}
                  onChangeText={(text) => updateCurrentPage('audioUrl', text)}
                  placeholder="https://example.com/page-audio.mp3"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Durée (secondes)</Text>
                <TextInput
                  style={styles.input}
                  value={currentPage.duration}
                  onChangeText={(text) => updateCurrentPage('duration', text)}
                  placeholder="30"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity style={styles.savePageButton} onPress={addPage}>
                <LinearGradient
                  colors={['#4ECDC4', '#44A08D']}
                  style={styles.savePageGradient}
                >
                  <Icon name="add" size={20} color="#fff" />
                  <Text style={styles.savePageText}>Ajouter cette page</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bouton de sauvegarde */}
        <TouchableOpacity style={styles.saveButton} onPress={saveStory}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.saveGradient}
          >
            <Icon name="save" size={24} color="#fff" />
            <Text style={styles.saveText}>Enregistrer l'Histoire</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 45,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginRight: 30,
  },
  exampleButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerItemSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  pickerItemText: {
    fontSize: 14,
    color: '#666',
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  addPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPageText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginLeft: 5,
    fontWeight: '600',
  },
  pageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  pageContent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  pageText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  removePageButton: {
    padding: 5,
  },
  pageForm: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  savePageButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  savePageGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  savePageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  saveButton: {
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  saveText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 50,
  },
});

export default AddStoryScreen;