import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';

export default function MovieDetailsScreen() {
  const [details,setDetails]=useState()
  const route = useRoute();


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{route.params.details.title}</Text>
      <Image
        style={styles.image}  
        source={{
            uri: route.params.details.poster,
          }}/>
        <Text>{route.params.details.overview}</Text>
        <Text>{route.params.details.popularity}</Text>

    </View>
  );
}


const styles = StyleSheet.create({
  image:{
    width:100,
    height:100,
    borderRadius:50
  },
})
