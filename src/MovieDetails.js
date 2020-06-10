import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text,TouchableOpacity,StyleSheet,Image,Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
      <Text style={[styles.text,{fontSize:30}]}>{route.params.details.title}</Text>

      <Image
        style={styles.image}  
        source={{
            uri: `http://image.tmdb.org/t/p/w500/${route.params.details.poster}`,
          }}/>
          <View style={styles.body}>
            <Text style={styles.text}>{route.params.details.overview}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.text,{fontSize:18,fontWeight:'bold'}]}>Rate:</Text>
              <Text style={[styles.text,{fontSize:18,marginLeft:5}]}>{route.params.details.popularity}</Text>
            </View>
           
          </View>
       


        <View style={styles.buttonView}>
          {!isFavorite  ?
            <TouchableOpacity onPress={addToFavourites(route.params.details.title)} style={styles.button}>
              <Text style={styles.text}>Add to Favorites</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={deleteFromFavourites(route.params.details.title)} style={[styles.button,{backgroundColor:'red'}]}>
              <Text style={styles.text}> Delete from Favorites</Text>
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
    justifyContent: 'space-evenly',
    backgroundColor:"#222424"
  },
  image:{
    width:150,
    height:150,
    borderRadius:50
  },
  text:{
    color:"#b2d9d9",
    fontSize:16,
    fontWeight:'900',
    textAlign:'center'
  },
  body:{
    alignItems:'center',
    width:width*0.7,
    justifyContent:'space-between',
    height:height*0.4
  },
  buttonView:{
  },
  button:{
    borderRadius:14,
    backgroundColor:"#285e5e",
    width:140,
    height:50,
    justifyContent:'center',
    alignItems:'center'
  }
})
