import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,Image ,TouchableOpacity} from 'react-native';

export default function ProfileScreen({route,navigation}) {
  const [userInfo,setUserInfo]=useState({
    "email":"",
    "familyName":"",
    "givenName":"",
    "id":"",
    "photo":""
  });

  getMoviesList=async()=>{
    const apiKey="8b6a5997689890ea67ffcfbd4aac28f9"
    try{
      let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`, {
        method: 'GET',
        headers: {      
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
     })
      let responseJson = await response.json();
      console.log(responseJson)
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
      </View>
     
      <View style={styles.buttonView}>
        <TouchableOpacity 
        onPress={()=>getMoviesList()}
        style={styles.button}>
          <Text style={{color:"white"}}>Movies List </Text>
        </TouchableOpacity>
      </View>
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
  button:{
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:40,
    borderRadius:12,
    backgroundColor:"blue"
  }
})
