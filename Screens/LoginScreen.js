import { useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from "../Contexts/user";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function LoginScreen({ navigation }) {
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: ["user-top-read"],
      usePKCE: false,
      redirectUri: redirectUri
    },
    discovery
  );
  
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('logged-in-user-key', jsonValue);
      return value
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      axios.post('https://sound-seeker.onrender.com/api/users/', {code})
        .then(({data: {user: {id, display_name, image}}}) => {
          return storeData({id, display_name, image})
        }).then((user) => {
          setLoggedInUser(user)
        })
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