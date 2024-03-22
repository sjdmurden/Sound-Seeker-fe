import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SpotifyLogin from "./Screens/LoginScreen";
import Navigation from "./StackNavigator";

export default function App() {
  return (
    <>
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
