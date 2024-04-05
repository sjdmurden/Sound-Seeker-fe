import { useState, useEffect, useContext } from "react";
import { Text, View, SafeAreaView, Pressable } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../contexts/user";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { ActivityIndicator } from "react-native-paper";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function LoginScreen() {
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const backendApiUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const { code } = response.params;
      axios
        .post(`${backendApiUrl}/api/users/`, { code })
        .then(({ data: { user } }) => {
          const jsonUser = JSON.stringify({
            top_genres: user.top_genres.slice(0, 20),
            top_artists: user.top_artists,
            display_name: user.display_name,
            id: user.id,
          });
          SecureStore.setItemAsync("logged-in-user-key", jsonUser);
          setLoggedInUser(JSON.parse(jsonUser));
          setIsLoading(false);
        });
      }
  else {
    setShadowOpacity(0);
    setLogoSize(200);
  }
  }, [response]);
  if (!fontsLoaded) {
    return <Text></Text>;
  } else {
    return (
      <LinearGradient
        colors={["rgb(4,32,84)", "rgb(4,69,108)"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView>
          <View style={{ height: 80 }} />
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
          <View style={{ height: 80 }} />
          {!isLoading ? (
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

              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 30,
                  fontFamily: "Lobster_400Regular",
                  margin: 20,
                }}
              >
                Tap to Login
              </Text>
            </Pressable>
          ) : (
            <ActivityIndicator
              animating={true}
              size={"large"}
              color={"#faf8fc"}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default LoginScreen;
