import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-sound', () => {
  const Sound = jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    release: jest.fn(),
    getDuration: jest.fn(() => 120),
    getCurrentTime: jest.fn(() => 0),
    setCurrentTime: jest.fn(),
  }));
  
  Sound.setCategory = jest.fn();
  Sound.setMode = jest.fn();
  Sound.setActive = jest.fn();
  
  return Sound;
});

jest.mock('react-native-video', () => {
  return {
    __esModule: true,
    default: 'Video',
  };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('react-native-linear-gradient', () => {
  return {
    __esModule: true,
    default: 'LinearGradient',
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-community/slider', () => 'Slider');