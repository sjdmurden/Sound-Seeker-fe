import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-node");
import * as SecureStore from "expo-secure-store";

const backendApiUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
});
const skiddleApiKey = process.env.EXPO_PUBLIC_SKIDDLE_API_KEY

export const searchAllFestivals = (festival_name) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events?api_key=${skiddleApiKey}&eventcode=FEST&keyword=${festival_name}&description=1`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArtistId = (artist) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/artists?api_key=${skiddleApiKey}&name=${artist}`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFestivalByArtist = (artistId) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events?api_key=${skiddleApiKey}&eventcode=FEST&a=${artistId}&description=1&limit=50`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFestivalByLocation = (location, radius) => {
  const { longitude, latitude } = location.coords;
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events?api_key=${skiddleApiKey}&eventcode=FEST&longitude=${longitude}&latitude=${latitude}&radius=${radius}&description=1&limit=100`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const getArtistsInfo = (artistsId, loggedInUser) => {
  return axios
    .get(`${backendApiUrl}/api/users/${loggedInUser.id}/token`)
    .then(({ data: { token } }) => {
      spotifyApi.setAccessToken(token);
      return spotifyApi.getArtists(artistsId);
    })
    .then((data) => {
      return data.body.artists.map((artist) => {
        return artist.genres;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const LogOutUser = (loggedInUser, setLoggedInUser) => {
  setLoggedInUser(null);
  SecureStore.deleteItemAsync("logged-in-user-key");
  axios.delete(
    `${backendApiUrl}/api/users/${loggedInUser.id}`
  );
};
