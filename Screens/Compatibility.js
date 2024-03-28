import * as React from "react";
import { Text } from "react-native";
import { getArtistInfo } from "../api";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";

export const Compatibility = ({ festival, setIsLoading }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
if(festival.artists.length === 0){
  return <Text>Lineup TBA</Text>
}
else{
 const artistsId = festival.artists.map((artist) => {
      const spotifyUrl = artist.spotifyartisturl;
      const splitUrl = spotifyUrl.split(":");
      return splitUrl[splitUrl.length - 1];
    });
}
setIsLoading(true);
getArtistInfo(artistsId, loggedInUser).then((response) => {
  setIsLoading(false);
  return response;
});

return <Text>Compatibility page</Text>;
}


