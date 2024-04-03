
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen.js";
import SearchScreen from "./Screens/SearchScreen.js";
import FestivalPage from "./Screens/FestivalPage.js";
import * as SecureStore from "expo-secure-store";
import { useEffect, useContext } from "react";
import { UserContext } from "./contexts/user.js";

const Stack = createNativeStackNavigator();

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
              options={{ headerShown: true}}
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
