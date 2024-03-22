import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from "axios";
import * as AppAuth from 'expo-app-auth'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";


function SpotifyLogin() {
   const navigation = useNavigation()
   useEffect(() => {
      const checkTokenValidity = async () => {
         const accessToken = await AsyncStorage.getItem('token')
         const expirationDate = await AsyncStorage.getItem('expirationDate')
         console.log('access token', accessToken);
         console.log('expiration date', expirationDate);

         if(accessToken && expirationDate){
            const currentTime = Date.now()
            if(currentTime < parseInt(expirationDate)){
               // token still valid
               navigation.replace('Main')
            } else {
               // token would be expired so need to remove it from async storage
               AsyncStorage.removeItem('token')
               AsyncStorage.removeItem('expirationDate')
            }
         }
      }
      checkTokenValidity()
   },[])
    async function authenticate () {
      const config = {
         issuer: 'https://acounts.spotify.com',
         clientId:'423cac5b8a904d3b8b234f231f424cbf',
         scopes : [
            'user-read-email',
            'user-library-read',
            'user-read-recently-played',
            'user-top-read',
            'playlist-read-private',
            'playlist-read-collaboartive',
            'playlist-modify-public'
         ],
         redirect_Url: 'exp://localhost:8081/--/spotify-auth-callback'
      }
      const result = await AppAuth.authAsync(config)
      console.log(results);
      if(result.accessToken){
          const expirationDate = new Date(result.accessTokenExpirationDate).getTime()
          AsyncStorage.setItem('token', result.accessToken)
          AsyncStorage.setItem('expirationDate', expirationDate.toString())
          navigation.navigate('Main')
      }
    }

   return (
      <View className="App">
      <View className="App-header">
        {!token ? (
           <Text
           href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}
           >
            Login to Spotify
          </Text>
        ) : (
           <Button onPress={logout} title='Logout'/>
           )}
        <Button onPress={searchUser} title='Search'/>
        {renderUser()}
      </View>
    </View>
  );
}
export default SpotifyLogin;
//   const CLIENT_ID = "02dc0530a3d4412f95aebccc831606c5";
//   const REDIRECT_URI = "exp://localhost:8081/--/spotify-auth-callback";
//   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
//   const RESPONSE_TYPE = "token";
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState([]);
//   useEffect(() => {
//     const hash = window.location.hash;
//     let token = window.localStorage.getItem("token");
//     if (!token && hash) {
//       token = hash
//         .substring(1)
//         .split("&")
//         .find((elem) => elem.startsWith("access_token"))
//         .split("=")[1];
//       window.location.hash = "";
//       window.localStorage.setItem("token", token);
//     }
//     setToken(token);
//   }, []);
//   const logout = () => {
//     setToken("");
//     window.localStorage.removeItem("token");
//   };
//   const searchUser = async (e) => {
//     e.preventDefault();
//     const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setUser(data);
//   };
//   const renderUser = () => {
//     console.log(user);
//   };