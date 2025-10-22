import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import StoryPlayerScreen from './screens/StoryPlayerScreen';
import {Story} from './types/Story';

export type RootStackParamList = {
  MainTabs: undefined;
  StoryPlayer: {story: Story};
};

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Library') {
            iconName = 'library-books';
          } else if (route.name === 'Favorites') {
            iconName = 'favorite';
          } else {
            iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4ECDC4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{title: 'Accueil'}}
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen} 
        options={{title: 'Bibliothèque'}}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{title: 'Favoris'}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="StoryPlayer" 
            component={StoryPlayerScreen}
            options={{
              headerShown: true,
              title: 'Histoire',
              headerStyle: {backgroundColor: '#4ECDC4'},
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;