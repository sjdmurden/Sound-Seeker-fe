import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import axios from "axios";

const PreferencesScreen = ({
  route: {
    params: { token },
  },
}) => {
  function getArtists() {
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        params: { limit: 50, offset: 0 },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView>
      <Text>{token}</Text>
      <Button onPress={getArtists} title="getArtists" />
    </SafeAreaView>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({});
