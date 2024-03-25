import { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { encode as btoa } from 'base-64';

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function LoginScreen({ navigation }) {
  const [token, setToken] = useState("");
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
  const redirectUri = process.env.EXPO_PUBLIC_REDIRECT_URI;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: ["user-top-read"],
      usePKCE: false,
      redirectUri: redirectUri
    },
    discovery
  );

  async function getFirstTokenData(code) {
    const postBody =`grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`

    return axios
      .post('https://accounts.spotify.com/api/token', postBody, {
        headers: {
          Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then(({ data }) => {
        return data;
      });
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      getFirstTokenData(code)
        .then(({ access_token }) => {
          setToken(access_token);
          navigation.navigate('Preferences', {token: access_token})
        });
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