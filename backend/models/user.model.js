const mongoose = require("mongoose");
const connect = require("../database/connection.js");
const User = require("../mongoose-models/user.js");
const axios = require("axios");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

async function getFirstTokenData(code) {
  const postBody = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;
  return axios
    .post("https://accounts.spotify.com/api/token", postBody, {
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(({ data }) => {
      return data;
    });
}

async function getRefreshTokenData(refresh_token) {
  const postBody = `grant_type=refresh_token&refresh_token=${refresh_token}`;
  return axios
    .post("https://accounts.spotify.com/api/token", postBody, {
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(({ data }) => {
      return data;
    });
}

async function getUserDetails(access_token) {
  return axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then(({ data: { id, display_name, images } }) => {
      return { id, display_name, image: images[0].url };
    });
}

async function getTopArtists(access_token) {
  return axios
    .get("https://api.spotify.com/v1/me/top/artists", {
      params: { limit: 50, offset: 0 },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then(({ data: { items } }) => {
      return items;
    });
}

async function saveUser({ code }) {
  connect();
  const { access_token, refresh_token, expires_in } = await getFirstTokenData(
    code
  );
  const { id, display_name, image } = await getUserDetails(access_token);
  const topArtists = await getTopArtists(access_token);

  const topGenresObj = {};
  topArtists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (!topGenresObj[genre]) {
        topGenresObj[genre] = 1;
      } else {
        topGenresObj[genre]++;
      }
    });
  });
  const topGenresArr = Object.keys(topGenresObj);
  topGenresArr.sort((previous, current) => {
    return topGenresObj[current] - topGenresObj[previous];
  });

  const newBody = {
    id: id,
    display_name: display_name,
    image: image,
    access_token: access_token,
    refresh_token: refresh_token,
    expiry_date: Date.now() + expires_in * 1000,
    top_artists: topArtists.map((artist) => artist.name),
    top_genres: topGenresArr,
  };
  const newUser = new User(newBody);
  await newUser.save();
  mongoose.disconnect();
  return newUser;
}

async function fetchUser(id) {
  console.log(clientId)
  await connect();
  try {
    const user = await User.findOne({ id });
    if (Date.now() >= user.expiry_date) {
      const tokenData = await getRefreshTokenData(user.refresh_token);
      await User.findOneAndUpdate(
        { id },
        {
          access_token: tokenData.access_token,
          expiry_date: Date.now() + tokenData.expires_in * 1000,
        }
      );
    }
    mongoose.disconnect();
    return user;
  } catch (err) {
    console.log(err);
  }
  mongoose.disconnect();
}

module.exports = { saveUser, fetchUser };
