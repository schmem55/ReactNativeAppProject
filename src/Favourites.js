import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text,TouchableOpacity,StyleSheet,Image, Button,ScrollView,Dimensions } from 'react-native';
import StarIcon from 'react-native-vector-icons/FontAwesome'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function FavouritesScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color:"#b2d9d9",fontSize:30,fontWeight:"bold"}}>Favourites list</Text>
        <StarIcon name="star" size={70} color="orange"/>

      </View>
      <View style={{marginTop:20}}>
        {props.favouritesList.length>0 ?
        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true} contentContainerStyle={styles.favourites}>
            {props.favouritesList.map((title,i)=>{
              return(
                <View  key={i} style={styles.favouriteMovie}>
                  <Text style={styles.text}>{title}</Text>
                </View>
              )}
            )}
                      
        </ScrollView>
        :
        <View style={{width:width*0.8}}> 
          <Text style={styles.text}>No favourites in your list, please go to the detail movie you would like to add , and click ! </Text> 
        </View>
          
        }
      </View>
     
       
    </View>
  );
}


const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: 'center', 
    backgroundColor:'#000000'
  },
  header:{
    alignItems:'center',
    marginTop:20,
    height:height*0.2,
    borderBottomWidth:2,
    borderColor:"white",
    width:width*0.8
  },
  favourites:{
    width:width*0.7,
    height:height*0.5,
    borderColor:"white",
    borderWidth:6,
    borderRadius:12
  },
  favouriteMovie:{
    margin:5,
  },
  text:{
    color:"#b2d9d9",
    fontSize:18,
    fontWeight:"bold"
  }
})
