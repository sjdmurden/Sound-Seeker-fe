import { StyleSheet, Text, View } from "react-native";
import Navigation from "./StackNavigator";
import { UserProvider } from "./Contexts/user";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
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
