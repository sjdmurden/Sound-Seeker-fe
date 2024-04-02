import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../Contexts/user";
import { shadow } from "react-native-paper";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

//helllloooooo

function LoginScreen({ navigation }) {
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [loginStyle, setLoginStyle] = useState({});
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const [logoSize, setLogoSize] = useState(200);
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: ["user-top-read"],
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      axios
        .post("https://sound-seeker.onrender.com/api/users/", { code })
        .then(({ data: { user } }) => {
          const jsonUser = JSON.stringify({
            top_genres: user.$__.pathsToScopes.top_genres.top_genres.slice(
              0,
              20
            ),
            top_artists: user.$__.pathsToScopes.top_genres.top_artists,
            display_name: user.$__.pathsToScopes.top_genres.display_name,
            id: user.$__.pathsToScopes.top_genres.id
          });
          SecureStore.setItemAsync("logged-in-user-key", jsonUser);
          setLoggedInUser(JSON.parse(jsonUser));
        });
    }
  }, [response]);

  return (
    <LinearGradient
      colors={["rgb(4,32,84)", "rgb(4,69,108)"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View style={{ height: 80 }} />

        {fontsLoaded && (
          <Text
            style={{
              color: "white",
              fontSize: 45,
              textAlign: "center",
              fontFamily: "Lobster_400Regular",
            }}
          >
            Sound Seeker
          </Text>
        )}
        <View style={{ height: 80 }} />
        <Pressable
          onPress={() => {
            promptAsync();
            setShadowOpacity(1);
            setLogoSize(190);
          }}
        >
          <Entypo
            style={{
              textAlign: "center",
              shadowOpacity,
              shadowRadius: 10,
              shadowColor: "white",
              shadowOffset: { width: 0, height: 0 },
            }}
            name="spotify"
            size={logoSize}
            color="white"
          />
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default LoginScreen;
