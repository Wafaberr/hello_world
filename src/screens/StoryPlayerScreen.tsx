import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../App';
import {AudioState, VideoState, StoryPage} from '../types/Story';

type StoryPlayerRouteProp = RouteProp<RootStackParamList, 'StoryPlayer'>;

const {width, height} = Dimensions.get('window');

const StoryPlayerScreen = () => {
  const route = useRoute<StoryPlayerRouteProp>();
  const {story} = route.params;

  // États pour l'audio
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoading: false,
  });

  // États pour la vidéo
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoading: false,
    showControls: true,
  });

  // États pour la lecture de l'histoire
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showText, setShowText] = useState(true);

  // Références
  const soundRef = useRef<Sound | null>(null);
  const videoRef = useRef<any>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentPage = story.pages?.[currentPageIndex];
  const hasAudio = !!(story.audioUrl || currentPage?.audioUrl);
  const hasVideo = !!(story.videoUrl || currentPage?.videoUrl);

  useEffect(() => {
    return () => {
      // Nettoyage lors du démontage
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.release();
      }
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  // Gestion de l'audio
  const initializeAudio = (audioUrl: string) => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }

    setAudioState(prev => ({...prev, isLoading: true}));

    soundRef.current = new Sound(audioUrl, '', (error) => {
      if (error) {
        console.log('Erreur de chargement audio:', error);
        setAudioState(prev => ({...prev, isLoading: false}));
        Alert.alert('Erreur', 'Impossible de charger le fichier audio');
        return;
      }

      const duration = soundRef.current?.getDuration() || 0;
      setAudioState(prev => ({
        ...prev,
        duration,
        isLoading: false,
      }));
    });
  };

  const toggleAudio = () => {
    if (!hasAudio) return;

    const audioUrl = currentPage?.audioUrl || story.audioUrl;
    if (!audioUrl) return;

    if (!soundRef.current) {
      initializeAudio(audioUrl);
      return;
    }

    if (audioState.isPlaying) {
      soundRef.current.pause();
      setAudioState(prev => ({...prev, isPlaying: false}));
    } else {
      soundRef.current.play((success) => {
        if (success) {
          console.log('Audio terminé');
          setAudioState(prev => ({...prev, isPlaying: false, currentTime: 0}));
          if (isAutoPlay && currentPageIndex < (story.pages?.length || 1) - 1) {
            nextPage();
          }
        }
      });
      setAudioState(prev => ({...prev, isPlaying: true}));
    }
  };

  const seekAudio = (value: number) => {
    if (soundRef.current) {
      soundRef.current.setCurrentTime(value);
      setAudioState(prev => ({...prev, currentTime: value}));
    }
  };

  // Gestion de la vidéo
  const toggleVideo = () => {
    setVideoState(prev => ({...prev, isPlaying: !prev.isPlaying}));
  };

  const onVideoLoad = (data: any) => {
    setVideoState(prev => ({
      ...prev,
      duration: data.duration,
      isLoading: false,
    }));
  };

  const onVideoProgress = (data: any) => {
    setVideoState(prev => ({
      ...prev,
      currentTime: data.currentTime,
    }));
  };

  const onVideoEnd = () => {
    setVideoState(prev => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
    }));
    if (isAutoPlay && currentPageIndex < (story.pages?.length || 1) - 1) {
      nextPage();
    }
  };

  const seekVideo = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value);
      setVideoState(prev => ({...prev, currentTime: value}));
    }
  };

  const showVideoControls = () => {
    setVideoState(prev => ({...prev, showControls: true}));
    
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    
    hideControlsTimeoutRef.current = setTimeout(() => {
      setVideoState(prev => ({...prev, showControls: false}));
    }, 3000);
  };

  // Navigation entre les pages
  const nextPage = () => {
    if (currentPageIndex < (story.pages?.length || 1) - 1) {
      setCurrentPageIndex(prev => prev + 1);
      // Arrêter l'audio/vidéo actuelle
      if (soundRef.current) {
        soundRef.current.stop();
        setAudioState(prev => ({...prev, isPlaying: false, currentTime: 0}));
      }
    }
  };

  const previousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      // Arrêter l'audio/vidéo actuelle
      if (soundRef.current) {
        soundRef.current.stop();
        setAudioState(prev => ({...prev, isPlaying: false, currentTime: 0}));
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      {/* Zone de contenu principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image ou Vidéo */}
        <View style={styles.mediaContainer}>
          {hasVideo ? (
            <TouchableOpacity
              style={styles.videoContainer}
              onPress={showVideoControls}
              activeOpacity={1}
            >
              <Video
                ref={videoRef}
                source={{uri: currentPage?.videoUrl || story.videoUrl || ''}}
                style={styles.video}
                paused={!videoState.isPlaying}
                onLoad={onVideoLoad}
                onProgress={onVideoProgress}
                onEnd={onVideoEnd}
                resizeMode="contain"
                onLoadStart={() => setVideoState(prev => ({...prev, isLoading: true}))}
              />
              
              {/* Contrôles vidéo */}
              {videoState.showControls && (
                <View style={styles.videoControls}>
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.controlsGradient}
                  >
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={toggleVideo}
                    >
                      <Icon
                        name={videoState.isPlaying ? 'pause' : 'play-arrow'}
                        size={40}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    
                    <View style={styles.progressContainer}>
                      <Text style={styles.timeText}>
                        {formatTime(videoState.currentTime)}
                      </Text>
                      <Slider
                        style={styles.progressSlider}
                        minimumValue={0}
                        maximumValue={videoState.duration}
                        value={videoState.currentTime}
                        onValueChange={seekVideo}
                        minimumTrackTintColor="#4ECDC4"
                        maximumTrackTintColor="rgba(255,255,255,0.3)"
                        thumbStyle={styles.sliderThumb}
                      />
                      <Text style={styles.timeText}>
                        {formatTime(videoState.duration)}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              )}
              
              {videoState.isLoading && (
                <View style={styles.loadingOverlay}>
                  <Icon name="hourglass-empty" size={40} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <Image
              source={{uri: currentPage?.imageUrl || story.coverImage}}
              style={styles.storyImage}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Informations de l'histoire */}
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyAuthor}>Par {story.author}</Text>
          
          {story.pages && (
            <Text style={styles.pageIndicator}>
              Page {currentPageIndex + 1} sur {story.pages.length}
            </Text>
          )}
        </View>

        {/* Texte de l'histoire */}
        {showText && (
          <View style={styles.textContainer}>
            <Text style={styles.storyText}>
              {currentPage?.text || story.description}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Contrôles audio */}
      {hasAudio && (
        <View style={styles.audioControls}>
          <View style={styles.audioProgress}>
            <Text style={styles.timeText}>
              {formatTime(audioState.currentTime)}
            </Text>
            <Slider
              style={styles.audioSlider}
              minimumValue={0}
              maximumValue={audioState.duration}
              value={audioState.currentTime}
              onValueChange={seekAudio}
              minimumTrackTintColor="#4ECDC4"
              maximumTrackTintColor="#ddd"
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.timeText}>
              {formatTime(audioState.duration)}
            </Text>
          </View>
          
          <View style={styles.audioButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={previousPage}
              disabled={currentPageIndex === 0}
            >
              <Icon
                name="skip-previous"
                size={30}
                color={currentPageIndex === 0 ? '#ccc' : '#333'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.controlButton, styles.playButtonMain]}
              onPress={toggleAudio}
              disabled={audioState.isLoading}
            >
              {audioState.isLoading ? (
                <Icon name="hourglass-empty" size={35} color="#fff" />
              ) : (
                <Icon
                  name={audioState.isPlaying ? 'pause' : 'play-arrow'}
                  size={35}
                  color="#fff"
                />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.controlButton}
              onPress={nextPage}
              disabled={currentPageIndex === (story.pages?.length || 1) - 1}
            >
              <Icon
                name="skip-next"
                size={30}
                color={currentPageIndex === (story.pages?.length || 1) - 1 ? '#ccc' : '#333'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Options */}
      <View style={styles.optionsBar}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setIsAutoPlay(!isAutoPlay)}
        >
          <Icon
            name="autorenew"
            size={20}
            color={isAutoPlay ? '#4ECDC4' : '#666'}
          />
          <Text style={[styles.optionText, {color: isAutoPlay ? '#4ECDC4' : '#666'}]}>
            Auto
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setShowText(!showText)}
        >
          <Icon
            name="text-fields"
            size={20}
            color={showText ? '#4ECDC4' : '#666'}
          />
          <Text style={[styles.optionText, {color: showText ? '#4ECDC4' : '#666'}]}>
            Texte
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  mediaContainer: {
    height: height * 0.4,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    flex: 1,
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  controlsGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  progressSlider: {
    flex: 1,
    height: 20,
    marginHorizontal: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyInfo: {
    padding: 20,
    backgroundColor: '#fff',
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  storyAuthor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  pageIndicator: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  textContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    textAlign: 'justify',
  },
  audioControls: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  audioProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  audioSlider: {
    flex: 1,
    height: 20,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    minWidth: 40,
    textAlign: 'center',
  },
  audioButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonMain: {
    backgroundColor: '#4ECDC4',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sliderThumb: {
    backgroundColor: '#4ECDC4',
    width: 16,
    height: 16,
  },
  optionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  optionButton: {
    alignItems: 'center',
    padding: 10,
  },
  optionText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default StoryPlayerScreen;