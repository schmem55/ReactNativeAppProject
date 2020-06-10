import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,Image ,TouchableOpacity,Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ProfileScreen({navigation}) {
  const [movies,setMovies]=useState([]);
  const route = useRoute();

  getMoviesList=async()=>{
    const apiKey="8b6a5997689890ea67ffcfbd4aac28f9";

    try{
      let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`, {
        method: 'GET',
        headers: {      
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
     })
      let responseJson = await response.json();
      console.log(responseJson.results)
      responseJson.results.map(async (k,i)=>{
        setMovies(movies=>[...movies,{
          "title":k.title,
          "poster":k.poster_path,
          "overview":k.overview ,
          "popularity":k.popularity
        }])
      })
     
     } catch (error){
       console.error(error);
     }
  }

  openDetails=(details)=>{
    navigation.navigate('MovieDetails',{
      itemId:1,
      details:details
    })
  }

  return (
    <View style={styles.container}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text>Welcome {route.params.userInfo.givenName}</Text>
      

        <Image
        style={styles.image}  
        source={{
            uri: route.params.userInfo.photo,
          }}/>
     
        <TouchableOpacity 
        onPress={()=>this.getMoviesList()}
        style={styles.button}>
          <Text style={{color:"white"}}>Movies List </Text>
        </TouchableOpacity>
      </View>
      { movies && (
        <View style={styles.moviesView}>
          {movies.map((k,i)=>{
            return (
            <TouchableOpacity
            onPress={
              ()=>openDetails(k)
            }
             key={i}>
              <Text>{k.title}</Text>
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
