import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/Welcome';
import ProfileScreen from './src/Profile';
import MovieListScreen from './src/MovieList';
import MovieDetailsScreen from './src/MovieDetails';
import FavouritesScreen from './src/Favourites';


const Stack = createStackNavigator();


function App() {
  const [favouritesList,setFavouritesList] = useState([])

  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen 
          name="Welcome"   
          options={{headerShown : false }}
          component={WelcomeScreen} />

        <Stack.Screen name="MovieDetails"   options={({navigation})=>({headerRight:()=>(
          <TouchableOpacity onPress={()=>{navigation.navigate('Favourites')}}>
            <Text>Star</Text>
          </TouchableOpacity>
           )})} >
          {props => <MovieDetailsScreen {...props} setFavouritesList={setFavouritesList} favouritesList={favouritesList}  />}

        </Stack.Screen>
        
        <Stack.Screen name="Favourites" >
        {props => <FavouritesScreen {...props} favouritesList={favouritesList}  />}

        </Stack.Screen >

        <Stack.Screen name="Profile" component={ProfileScreen} />




        <Stack.Screen name="MovieList" component={MovieListScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;