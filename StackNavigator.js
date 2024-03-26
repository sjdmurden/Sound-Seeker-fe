import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";

import { Text } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import SearchScreen from "./Screens/SearchScreen.js";
import FestivalCard from "./Screens/FestivalCard.js";
import FestivalPage from "./Screens/FestivalPage.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./Contexts/user.js";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "green",
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? <Text>Icon One</Text> : <Text>Icon Two</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();


function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  
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
    console.log("useEffect triggered", loggedInUser)
      AsyncStorage.getItem('logged-in-user-key').then((jsonValue) => {
        setIsLoggedIn(jsonValue != undefined)
      }).catch((err) => {
        console.log(err)
      })
  },[loggedInUser])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ?  
        <>
        <Stack.Screen
          name="main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FestivalCard"
          component={FestivalCard}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FestivalPage"
          component={FestivalPage}
          options={{ headerShown: true }}
        />
        </>
        :
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
