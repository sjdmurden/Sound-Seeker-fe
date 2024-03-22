import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./Screens/HomeScreen";
import PreferencesScreen from "./Screens/PreferencesScreen.js"
import { Text } from "react-native";
import LoginScreen from "./Screens/LoginScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle:{
         backgroundColor: 'green',
         bottom:0,
         left:0,
         right:0,
         position: 'absolute'
      }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Text>Icon One</Text>
            ) : (
              <Text>Icon Two</Text>
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator()

function Navigation(){
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='main' component={BottomTabs} options={{headerShown:false}}/>
            <Stack.Screen name='Preferences' component={PreferencesScreen} options={{headerShown:false}}/>
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Navigation