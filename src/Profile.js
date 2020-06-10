import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,Image ,TouchableOpacity,Dimensions,ScrollView, ViewBase} from 'react-native';
import { useRoute } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ProfileScreen({navigation}) {
  const [movies,setMovies]=useState([]);
  const route = useRoute();

 const getMoviesList=async()=>{
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
      <View style={styles.header}>
        <Text style={{fontSize:26,color:"white"}}>Welcome {route.params.userInfo.givenName}</Text>
        <Image
        style={styles.image}  
        source={{
            uri: route.params.userInfo.photo,
          }}/>
     
        <TouchableOpacity 
        onPress={getMoviesList}
        style={styles.button}>
          <Text style={{color:"white",fontSize:22}}>Movies List </Text>
        </TouchableOpacity>
      </View>
      
      <View style={{marginTop:40}}>
      
      { movies.length>0 && (
        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true} contentContainerStyle={styles.moviesView}>
          {movies.map((k,i)=>{
            return (
            <TouchableOpacity
            onPress={
              ()=>openDetails(k)
            }
             key={i}>
               <View style={styles.movie}>
                <Text style={{fontSize:16,fontWeight:'bold',color:"white",}}>{k.title}</Text>
               </View>
             
            </TouchableOpacity>
            )
          })}   
        </ScrollView>
      )

      }
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000000',
    flex: 1,
    alignItems: 'center'
  },
  header:{
    marginTop:20,
    alignItems:'center',
    justifyContent:'space-between',
    height:height*0.4,
  },
  image:{
    width:100,
    height:100,
    borderRadius:50
  },
  moviesView:{
    width:width*0.8,
    borderWidth:8,
    borderRadius:12,
    borderColor:'white',
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    width:150,
    height:70,
    borderRadius:12,
    backgroundColor:"#285e5e"
  },
  movie:{
    borderRadius:12,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#222424',
    margin:7,
  }
})
