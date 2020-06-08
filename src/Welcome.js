import * as React from 'react';
import { View, Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function WelcomeScreen() {
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
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
            <TouchableOpacity style={[styles.button,{backgroundColor:'red'}]}>
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

