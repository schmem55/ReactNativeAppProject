import React, { useEffect, useState } from 'react';

import { View, Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function WelcomeScreen({navigation}) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "711862344854-3bl5u2rseqt2d15jlehl4jrqepbgmfft.apps.googleusercontent.com", // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
         });
  }, [])

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      console.warn({userInfo: info});
      //setUserInfo(info);
      navigation.navigate('Profile')

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       console.log("1")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("2")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("3")
      } else {
        console.log(error)
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      //setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.text}>Welcome Stranger!</Text>
            <Text>Logo</Text>
            <Text style={styles.text}>Please log in to continue to the awesomness</Text>
        </View>
        <View style={styles.buttonsView}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                ).then(
                  navigation.navigate('Profile')
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
            <TouchableOpacity onPress={()=>signIn()} style={[styles.button,{backgroundColor:'red'}]}>
                <Text>Logo</Text>
                <Text style={styles.text}>Log in with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around' 
    },
    body:{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:16
    },
    buttonsView:{
        flexDirection:'row'
    },
    button:{
        flexDirection:'row',
        
    }
})

