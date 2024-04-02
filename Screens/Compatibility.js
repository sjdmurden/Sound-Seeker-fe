import * as React from "react";
import { Text } from "react-native";
import { getArtistsInfo } from "../api";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/user";
export const Compatibility = ({ festival, festivalGenres }) => {
  if (festival.artists.length === 0) {
    return <Text>Lineup TBA</Text>;
  } 
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const artistsId = festival.artists.map((artist) => {
    const spotifyUrl = artist.spotifyartisturl;
    if (spotifyUrl) {
      const splitUrl = spotifyUrl.split(":");
      return splitUrl[splitUrl.length - 1];
    }
  });
  getArtistsInfo(artistsId, loggedInUser).then((genres) => {
    const topGenresObj = {};
    genres.flat().forEach((genre) => {
      if (!topGenresObj[genre]) {
        topGenresObj[genre] = 1;
      } else {
        topGenresObj[genre]++;
      }
    });
    const topFestivalGenres = Object.keys(topGenresObj);
    topFestivalGenres.sort((previous, current) => {
      return topGenresObj[current] - topGenresObj[previous];
    });
    console.log(loggedInUser.top_artists)
    const commonArtists = loggedInUser.top_artists.filter((artist) =>{
       festival.artists.includes(artist)}
    );
    const commonGenres = loggedInUser.top_genres.filter((genre) =>
      topFestivalGenres.includes(genre)
    );
  
    let artistsScore = 0;
    let genresScore = 0;
    commonArtists.forEach((artist) => {
      artistsScore += 50 - loggedInUser.top_artists.indexOf(artist);
    });
    commonGenres.forEach((genre) => {
      genresScore += 50 - loggedInUser.top_genres.indexOf(genre);
    });
  
    let maxScore = 0;
  
    festival.artists.forEach((artist, index) => {
      maxScore += 50 - index;
    });
    maxScore *= 2;
    topFestivalGenres.forEach((genre, index) =>{
      maxScore += 50 - index
    })
    console.log(artistsScore + genresScore)
    console.log(maxScore)
    artistsScore *= 2; // artists have higher priority over genres so score is doubled
    // now normalise scores to get value between 0 and 1
    // then x100 to get percentage

    console.log(((artistsScore + genresScore) / maxScore) * 100)
  });

  return <Text>Compatibility rating goes here</Text>;
}

