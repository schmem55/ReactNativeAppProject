import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,Image ,TouchableOpacity,Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ProfileScreen({route,navigation}) {
  const [movies,setMovies]=useState([]);

  getMoviesList=async()=>{
    const apiKey="8b6a5997689890ea67ffcfbd4aac28f9";
    let arrayOfMovies = []
    let movie = {
      "title":"",
      "poster":"",
      "overview":"",
      "vote_count":""
    }

    try{
      let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, {
        method: 'GET',
        headers: {      
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
     })
      let responseJson = await response.json();
      console.log(responseJson.results)
      responseJson.results.map(async (k,i)=>{
        console.log(k.title)
        // movie.title = k.title
        // movie.poster = k.poster_path
        // movie.overview = k.overview 
        // movie.vote_count = k.vote_count
        
        setMovies(movies=>[...movies,k.title])

      })
      if (movies){
        console.log(movies)
      }
     
     } catch (error){
       console.error(error);
     }
  }

  return (
    <View style={styles.container}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text>Welcome John Doe</Text>
        <Image
        style={styles.image}  
        source={{
            uri: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png',
          }}/>
     
        <TouchableOpacity 
        onPress={()=>getMoviesList()}
        style={styles.button}>
          <Text style={{color:"white"}}>Movies List </Text>
        </TouchableOpacity>
      </View>
      { movies && (
        <View style={styles.moviesView}>
          {movies.map((k,i)=>{
            return (
            <TouchableOpacity key={i}>
              <Text>{k}</Text>
            </TouchableOpacity>
            )
          })}   
        </View>
      )

      }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center', 
    justifyContent:'space-evenly'
  },
  image:{
    width:100,
    height:100,
    borderRadius:50
  },
  moviesView:{
    width:width*0.8,
    borderWidth:1,
    borderColor:'brown'
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:40,
    borderRadius:12,
    backgroundColor:"blue"
  }
})
