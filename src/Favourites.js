import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text,TouchableOpacity,StyleSheet,Image, Button } from 'react-native';

export default function FavouritesScreen(props) {
  console.log(props.favouritesList)
  return (
    <View style={styles.container}>
      {props.favouritesList.length>0 ?
        props.favouritesList.map((title,i)=>{
          return(<Text key={i}>{title}</Text>)
        })
       :
        <Text key={i}>No favourites in your list, please go to the detail movie you would like to add , and click ! </Text>
       }
       
    </View>
  );
}


const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'space-evenly'
  },
})
