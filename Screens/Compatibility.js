import * as React from "react";
import { Text } from "react-native";
import { getArtistInfo } from "../api";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";

export const Compatibility = ({ festival, festivalIndex, setFestivalResult }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  let artistsId;
  if (festival.artists.length === 0) {
    return <Text>Lineup TBA</Text>;
  } else {
    artistsId = festival.artists.map((artist) => {
      const spotifyUrl = artist.spotifyartisturl;
      if (spotifyUrl) {
        const splitUrl = spotifyUrl.split(":");
        return splitUrl[splitUrl.length - 1];
      }
    });
  }



  return <Text>Compatibility page</Text>;
};
