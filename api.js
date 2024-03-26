import axios from "axios";

export const searchAllFestivals = (festival_name) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&keyword=${festival_name}&description=1`
    )
    .then((response) => {
      return response;
    });
};

export const getArtistId = (artist) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/artists?api_key=638e2af9d6545b37c5bf2afbed3261cc&name=${artist}`
    )
    .then((response) => {
      return response;
    });
};

export const getFestivalByArtist = (artistId) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&a=${artistId}&description=1`
    )
    .then((response) => {
      return response;
    });
};

// function getArtists() {
//     axios
//       .get("https://api.spotify.com/v1/me/top/artists", {
//         params: { limit: 50, offset: 0 },
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then(({ data: { items } }) => {
//         return items;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
