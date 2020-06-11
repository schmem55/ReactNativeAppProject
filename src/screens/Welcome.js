import React, { useEffect, useState } from 'react';

import { View, Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { AccessToken,  GraphRequest,GraphRequestManager, LoginManager} from 'react-native-fbsdk';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';
import FacebookIcon from 'react-native-vector-icons/EvilIcons'
import GoogleIcon from 'react-native-vector-icons/AntDesign'

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function WelcomeScreen({navigation}) {
  const [isFbLoggedIn,setIsFbLoggedin] = useState(false)
  const [isGoogleLoggedIn,setIsGoogleLoggedIn] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "711862344854-3bl5u2rseqt2d15jlehl4jrqepbgmfft.apps.googleusercontent.com", // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
         });
  }, [])

const loginWithFacebook=()=>{

  LoginManager.logInWithPermissions(["public_profile"]).then(
    (result) => {
       if (result.isCancelled) {
        console.log('login is cancelled.');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          console.log(data)
          const accessToken = data.accessToken.toString();
          getInfoFromToken(accessToken);
        })
      }
    }
  )
}
  

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name, picture.type(large)'
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {

          var userData ={
            "givenName":"",
            "photo":""
          }
          userData.givenName=result.name
          userData.photo=result.picture.data.url
         
          navigation.navigate('Profile',{
            userInfo:userData
          })
          setIsFbLoggedin(true)

        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const _logOutWithFacebook=()=>{
    LoginManager.logOut()
    setIsFbLoggedin(false)
  }
  const _signInWithGoogle = async () => {
    var userData =      {
      "givenName":"",
      "photo":""
    }
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();

      userData.givenName=info.user.givenName
      userData.photo=info.user.photo
      
      navigation.navigate('Profile',{
        userInfo:userData
      })
      setIsGoogleLoggedIn(true)


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

  const _signOutWithGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsGoogleLoggedIn(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.text}>Welcome Stranger!</Text>
            <ProfileIcon name="user-circle" color="#d9dbdb" size={150}/>
            <Text style={styles.text}>Please log in to continue to the awesomness</Text>
       
        </View>
        <View style={styles.buttonsView}>
          {!isFbLoggedIn?
           <TouchableOpacity style={styles.button} onPress={() => loginWithFacebook()}>
              <FacebookIcon color="white"  name ="sc-facebook" size={26}/>
              <Text style={{color:"white",fontSize:14}}> Login With Facebook </Text>          
            </TouchableOpacity>:
            <TouchableOpacity style={styles.button}  onPress={() => _logOutWithFacebook()}>
              <FacebookIcon color="white"  name ="sc-facebook" size={26}/>
              <Text style={{color:"white",fontSize:14}}> Log Out </Text>          
            </TouchableOpacity>
        }
         
         {!isGoogleLoggedIn?
           <TouchableOpacity style={[styles.button,{backgroundColor:"#de5246"}]} onPress={() => _signInWithGoogle()}>
              <GoogleIcon color="white"  name ="google" size={20}/>
              <Text style={{color:"white",fontSize:14}}> Or With Google </Text>          
            </TouchableOpacity>:
            <TouchableOpacity style={[styles.button,{backgroundColor:"#de5246"}]}  onPress={() => _signOutWithGoogle()}>
              <GoogleIcon color="white"  name ="google" size={20}/>
              <Text style={{color:"white",fontSize:14}}> Log Out </Text>          
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
        justifyContent: 'space-around' 
    },
    body:{
        justifyContent:'space-between',
        alignItems:'center',
        height:height*0.4,        
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:'center'
    },
    buttonsView:{
        flexDirection:'row',
        alignItems:'center'
    },
    button:{
        flexDirection:'row',
        backgroundColor:'#4267B2',
        height:40,
        margin:8,
        borderRadius:10,
        justifyContent:'space-around',
        alignItems:"center",
        padding:10

    }
})

