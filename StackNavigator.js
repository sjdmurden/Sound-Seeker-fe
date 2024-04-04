import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen.js";
import SearchScreen from "./screens/SearchScreen.js";
import FestivalPage from "./screens/FestivalPage.js";
import * as SecureStore from "expo-secure-store";
import { useEffect, useContext } from "react";
import { UserContext } from "./contexts/user.js";
import { Animated } from "react-native";

const Stack = createStackNavigator();

const zoomOut = ({ current, next, inverted }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          scaleX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0.75, 1, 1],
              extrapolate: 'clamp',
            }),
            inverted
          )
        },
        {
          scaleY: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0.25, 1, 1],
              extrapolate: 'clamp',
            }),
            inverted
          )
        }
      ],
      opacity: Animated.multiply(
        progress.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 2],
          extrapolate: 'clamp',
        }),
        inverted
      )
    },
  };
};

function Navigation() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    SecureStore.getItemAsync("logged-in-user-key")
      .then((jsonUser) => {
        if (jsonUser) {
          setLoggedInUser(JSON.parse(jsonUser));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ? (
          <>
            <Stack.Screen
              name="Home"
              component={SearchScreen}
              options={{ headerShown: false}}
            />
            <Stack.Screen
              name="FestivalPage"
              component={FestivalPage}
              options={{
                headerShown: true,
                cardStyleInterpolator: zoomOut,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
