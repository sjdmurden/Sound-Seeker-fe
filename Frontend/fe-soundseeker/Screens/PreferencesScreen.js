import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import SearchScreen from "./SearchScreen";

const PreferencesScreen = ({
  route: {
    params: { token },
  },
}) => {
  const [artists, setArtists] = useState([]);

  function getArtists() {
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        params: { limit: 50, offset: 0 },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { items } }) => {
        setArtists(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{token}</Text>
        <Button onPress={getArtists} title="getArtists" />
        {artists.map((artist) => {
          return (
            <SafeAreaView key={artist.id}>
              <Text>{artist.name}</Text>
              <Text>{artist.genres.slice(0, 3) + " "}</Text>
            </SafeAreaView>
          );
        })}
        <SearchScreen/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({});
