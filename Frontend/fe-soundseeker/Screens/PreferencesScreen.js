import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const PreferencesScreen = ({route: {params: {token}}}) => {
  const [artists, setArtists] = useState([]);

  function getArtists() {
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        params: { limit: 50, offset: 0 },
        headers: {
          Authorization: "Bearer " + token
        },
      })
      .then(({data: {items}}) => {
        setArtists(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView>
      <Text>{token}</Text>
      <Button onPress={getArtists} title="getArtists" />
      {artists.map((artist) => {
        return <Text key={artist.id}>{artist.name}</Text>
      })}
    </SafeAreaView>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({});
