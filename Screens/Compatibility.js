import * as React from "react";
import { Text } from "react-native";
import { getArtistInfo } from "../api";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";
// import User from "../../Sound-Seeker-be/mongoose-models/user";

export const Compatibility = ({
  festival,
  festivalIndex,
  setFestivalResult,
}) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  let artistsId;
  const spotifyIdsArray = [];
  if (festival.artists.length === 0) {
    return <Text>Lineup TBA</Text>;
  } else {
    artistsId = festival.artists.map((artist) => {
      const spotifyUrl = artist.spotifyartisturl;
      if (spotifyUrl) {
        const splitUrl = spotifyUrl.split(":");
        const spotifyArtistId = splitUrl[splitUrl.length - 1];
        spotifyIdsArray.push(spotifyArtistId);
        return spotifyArtistId;
      }
    });
    console.log(spotifyIdsArray);
    // console.log(User.top_artists);
  }

  return <Text>Compatibility rating goes here</Text>;
};

// 4 arrays needed:
// usersArtists, usersGenres, festivalArtists, festivalGenres

function compatRating(
  usersArtists,
  usersGenres,
  festivalArtists,
  festivalGenres
) {
  const commonArtists = usersArtists.filter((artist) => festivalArtists.includes(artist));
  const commonGenres = usersGenres.filter((genre) => festivalGenres.includes(genre));

  let artistsScore = 0
  let genresScore = 0

  commonArtists.forEach((artist) => {
    artistsScore += 50 - usersArtists.indexOf(artist)
  })
  commonGenres.forEach((genre) => {
    genresScore += 50 - usersGenres.indexOf(genre)
  })

  artistsScore *= 2 // artists have higher priority over genres so score is doubled
  // now normalise scores to get value between 0 and 1
  // then x100 to get percentage
  return ((artistsScore + genresScore) / 2550) * 100 
}
