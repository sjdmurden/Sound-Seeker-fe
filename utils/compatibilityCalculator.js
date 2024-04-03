import { getArtistsInfo } from "../api";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/user";
export const compatibilityCalculator = ( festival ) => {
  const festivalArtistsArr = festival.artists.map((artist) => {
    return artist.name;
  });
  if (festival.artists.length === 0) {
    return "Lineup TBA";
  }
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const artistsId = [];
  festival.artists.forEach((artist) => {
    const spotifyUrl = artist.spotifyartisturl;
    if (spotifyUrl) {
      const splitUrl = spotifyUrl.split(":");
      artistsId.push(splitUrl[splitUrl.length - 1]);
    }
  });
  if (artistsId.length === 0) {
    return "Unable to calculate compatibility";
  }
   return getArtistsInfo(artistsId, loggedInUser).then((genres) => {
    const topGenresObj = {};
    genres.flat().forEach((genre) => {
      if (!topGenresObj[genre]) {
        topGenresObj[genre] = 1;
      } else {
        topGenresObj[genre]++;
      }
    });
    let topFestivalGenres = Object.keys(topGenresObj);
    topFestivalGenres.sort((previous, current) => {
      return topGenresObj[current] - topGenresObj[previous];
    });
    const commonArtists = loggedInUser.top_artists.filter((artist) => {
      return festivalArtistsArr.includes(artist);
    });
    const commonGenres = loggedInUser.top_genres.filter((genre) =>
      topFestivalGenres.includes(genre)
    );
    let artistsScore = 0;
    let genresScore = 0;
    let maxScore = 0;
    const artistFactors = { 0: 100, 1: 90, 2: 80, 3: 70, 4: 60 };
    const genreFactors = { 0: 100, 1: 80, 2: 0 };
    topFestivalGenres = topFestivalGenres.slice(0, 20);
    commonArtists.forEach((artist) => {
      const index = loggedInUser.top_artists.indexOf(artist);
      artistsScore += artistFactors[Math.floor(index / 10)];
    });
    commonGenres.forEach((genre) => {
      const index = loggedInUser.top_genres.indexOf(genre);
      genresScore += genreFactors[Math.floor(index / 10)];
    });
    festival.artists.forEach((artist, index) => {
      maxScore += artistFactors[Math.floor(index / 10)];
    });
    topFestivalGenres.forEach((genre, index) => {
      maxScore += genreFactors[Math.floor(index / 10)];
    });
    let compatibilityRating = ((artistsScore + genresScore) / maxScore) * 100;
    if (festival.artists.length > 20) {
      compatibilityRating *= 3;
    } else if (festival.artists.length > 10) {
      compatibilityRating *= 2;
    }
    return `${Math.ceil(compatibilityRating)}% compatible`
  });
};