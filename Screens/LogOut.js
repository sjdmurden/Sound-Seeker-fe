import { useContext } from "react";
import { UserContext } from "../Contexts/user";
import { View, StyleSheet, Button, Alert, Pressable, Text } from "react-native";
import React from "react";
import { LogOutUser } from "../api";

export default LogOut = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const handlePress = () =>
    Alert.alert("Signed Out", "", [
      {
        text: "Ok",
        onPress: () => {
          LogOutUser(loggedInUser, setLoggedInUser);
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text style={styles.logoutButton}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    position: "absolute",
    top: 115,

    right: 20,
    fontSize: 16,
    borderRadius: 10,
   
    backgroundColor: "#cf2c1f",
    padding: 12,
  },
});
