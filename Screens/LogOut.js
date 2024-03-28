import { useContext } from "react";
import { UserContext } from "../Contexts/user";
import { View, StyleSheet, Button, Alert } from "react-native";
import React from "react";
import { LogOutUser } from "../api";

export const LogOut = () => {
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

  return <Button title="Sign out" onPress={handlePress}></Button>;
};
