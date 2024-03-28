import * as React from "react";
import { Text } from "react-native";
import { getArtistInfo } from "../api";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";

export const Compatibility = ({ festival }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const artistsId = festival.artists.map((artist) => {
    const spotifyUrl = artist.spotifyartisturl;
    const splitUrl = spotifyUrl.split(":");
    return  splitUrl[splitUrl.length - 1];
  });

  useEffect(() => {
    getArtistInfo(artistsId, loggedInUser).then((response) => {
      return response;
    });
  }, [festival.artists]);

  return <Text>Compatibility page</Text>;
};
