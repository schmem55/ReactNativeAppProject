import React, { useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/Welcome';
import ProfileScreen from './src/Profile';
import MovieDetailsScreen from './src/MovieDetails';
import FavouritesScreen from './src/Favourites';
import StarIcon from 'react-native-vector-icons/Feather'

const Stack = createStackNavigator();


function App() {
  const [favouritesList,setFavouritesList] = useState([])
  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome"   
          options={{headerShown : false }}
          component={WelcomeScreen} />

        <Stack.Screen name="MovieDetails"   options={({navigation})=>({headerRight:()=>(
            <View>
              <Text style={styles.bullet}>{favouritesList.length}</Text>
              <TouchableOpacity style={{marginRight:10}} onPress={()=>{navigation.navigate('Favourites')}}>
                <StarIcon name="star" size={40} color="black"/>
              </TouchableOpacity>
            </View>
           )})} >
          {props => <MovieDetailsScreen {...props} setFavouritesList={setFavouritesList} favouritesList={favouritesList}  />}

        </Stack.Screen>
        
        <Stack.Screen name="Favourites" >
          {props => <FavouritesScreen {...props} favouritesList={favouritesList}  />}

        </Stack.Screen >
        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  bullet:{
    borderRadius:9,
    width:18,
    height:18,
    fontSize:12,
    textAlign:'center',
    backgroundColor:'orange',
    color:"white",
    position:"absolute",
    zIndex:1

  }
})
export default App;