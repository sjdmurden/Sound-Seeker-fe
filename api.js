import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-node");
import * as SecureStore from "expo-secure-store";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
});

export const searchAllFestivals = (festival_name) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&keyword=${festival_name}&description=1`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const getArtistId = (artist) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/artists?api_key=638e2af9d6545b37c5bf2afbed3261cc&name=${artist}`
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
      `https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&a=${artistId}&description=1`
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
      `https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&longitude=${longitude}&latitude=${latitude}&radius=${radius}&description=1`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const getArtistInfo = (artistsId, loggedInUser) => {
  return axios
    .get(`https://sound-seeker.onrender.com/api/users/${loggedInUser.id}`)
    .then(({ data }) => {
      //add user back in
      console.log(data);
      spotifyApi.setAccessToken(user.access_token);
      return spotifyApi.getArtists(artistsId);
    })
    .then((data) => {
      console.log("Artists information", data.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const LogOutUser = (loggedInUser, setLoggedInUser) => {
  axios
    .delete(`https://sound-seeker.onrender.com/api/users/${loggedInUser.id}`)
    .then(() => {
      setLoggedInUser(null);
      SecureStore.deleteItemAsync("logged-in-user-key");
    });
};
