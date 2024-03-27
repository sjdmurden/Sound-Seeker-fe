import * as React from "react";
import { StyleSheet, TextInput, Text, ScrollView } from "react-native";
import { getArtistInfo } from "./spotify-test-api";

export const Compatibility = ({festival}) => {
   const spotifyUrl = festival.artists[0].spotifyartisturl
   const splitUrl = spotifyUrl.split(':')
   const spotifyArtistId = splitUrl[splitUrl.length - 1]
   console.log(spotifyArtistId);

   getArtistInfo(spotifyArtistId)
   .then((response) => {
      console.log(response);
      return response

   })

   return (
      <Text>Compatibility page</Text>
   )
}

// {festival.artists.spotifyartisturl}
