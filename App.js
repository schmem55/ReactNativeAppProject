import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/Welcome';
import ProfileScreen from './src/Profile';
import MovieListScreen from './src/MovieList';
import MovieDetailsScreen from './src/MovieDetails';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Profile" options={{headerShown : false }} component={ProfileScreen} />

        <Stack.Screen 
        name="Welcome"   
        options={{headerShown : false }}
        component={WelcomeScreen} />
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;