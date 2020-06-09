import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';

export default function MovieDetailsScreen(props) {
  const [isFavorite,setFavorite]=useState(false)
  const route = useRoute();

  useEffect(()=>{
    setFavorite(props.favouritesList.includes(route.params.details.title))
  },[])
  

  const addToFavourites=(title)=>()=>{
    props.setFavouritesList([...props.favouritesList,title])
    setFavorite(prevState=>true)
  }

  const deleteFromFavourites=(title)=>()=>{
    let favouritesList = props.favouritesList;
    props.setFavouritesList(favouritesList.filter(movieTitle=>movieTitle!==title))
    setFavorite(prevState=>!prevState)
  }

  return (
    <View style={styles.container}>
      <Text>{route.params.details.title}</Text>


      <Image
        style={styles.image}  
        source={{
            uri: `http://image.tmdb.org/t/p/w500/${route.params.details.poster}`,
          }}/>

        <Text>{route.params.details.overview}</Text>

        <Text>{route.params.details.popularity}</Text>


        <View style={styles.buttonView}>
          {!isFavorite  ?
            <TouchableOpacity onPress={addToFavourites(route.params.details.title)} style={styles.button}>
              <Text style={{color:"white"}}>Add to Favorites</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={deleteFromFavourites(route.params.details.title)} style={[styles.button,{backgroundColor:'red'}]}>
              <Text style={{color:"white"}}> Delete from Favorites</Text>
            </TouchableOpacity>
          }
       
        
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'space-evenly'
  },
  image:{
    width:100,
    height:100,
    borderRadius:50
  },
  buttonView:{
  },
  button:{
    borderRadius:14,
    backgroundColor:'blue',
    width:140,
    height:50,
    justifyContent:'center',
    alignItems:'center'
  }
})
