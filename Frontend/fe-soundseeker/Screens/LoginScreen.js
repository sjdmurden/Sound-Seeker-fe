import { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import * as React from "react";
import { useAuthRequest } from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

function LoginScreen({ navigation }) {
  const [token, setToken] = useState("");
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "423cac5b8a904d3b8b234f231f424cbf",
      scopes: ["user-top-read"],
      usePKCE: false,
      redirectUri: "exp://localhost:8081/--/spotify-auth-callback",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      setToken(code);
      navigation.navigate('Preferences', {token: code})
    }
  }, [response]);
  return (
    <LinearGradient colors={["red", "green"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text>Millions of Songs Free on Spotify</Text>
        <View style={{ height: 80 }} />
        <Pressable
          onPress={() => {
            promptAsync();
          }}
          style={{ backgroundColor: "yellow", width: 200 }}
        >
          <Text>Sign in with Spotify</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
export default LoginScreen;
//    <View className="App">
//    <View className="App-header">
//      {!token ? (
//         <Text
//         href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}
//         >
//          Login to Spotify
//        </Text>
//      ) : (
//         <Button onPress={logout} title='Logout'/>
//         )}
//      <Button onPress={searchUser} title='Search'/>
//      {renderUser()}
//    </View>
//  </View>
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

// useEffect(() => {
//   const checkTokenValidity = async () => {
//     const accessToken = await AsyncStorage.getItem("token");
//     const expirationDate = await AsyncStorage.getItem("expirationDate");
//     console.log("access token", accessToken);
//     console.log("expiration date", expirationDate);
//     console.log(AuthSession)

//     if (accessToken && expirationDate) {
//       const currentTime = Date.now();
//       if (currentTime < parseInt(expirationDate)) {
//         // token still valid
//         navigation.replace("Main");
//       } else {
//         // token would be expired so need to remove it from async storage
//         AsyncStorage.removeItem("token");
//         AsyncStorage.removeItem("expirationDate");
//       }
//     }
//   };
//   checkTokenValidity();
// }, []);
// async function authenticate() {
//   const config = {
//     issuer: "https://acounts.spotify.com",
//     clientId: "423cac5b8a904d3b8b234f231f424cbf",
//     scopes: [
//       "user-read-email",
//       "user-library-read",
//       "user-read-recently-played",
//       "user-top-read",
//       "playlist-read-private",
//       "playlist-read-collaboartive",
//       "playlist-modify-public",
//     ],
//     redirectUri: "exp://localhost:8081/--/spotify-auth-callback",
//   };
//   const result = await AuthSession.loadAsync(config, config.issuer);
//   console.log(result);
//   if (result.accessToken) {
//     const expirationDate = new Date(
//       result.accessTokenExpirationDate
//     ).getTime();
//     AsyncStorage.setItem("token", result.accessToken);
//     AsyncStorage.setItem("expirationDate", expirationDate.toString());
//     navigation.navigate("Main");
//   }
// }
