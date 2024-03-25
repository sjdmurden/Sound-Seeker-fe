const mongoose = require('mongoose');
const connect = require('../database/connection.js');
const User = require("../mongoose-models/user.js");
const axios = require('axios')
const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
const redirectUri = process.env.EXPO_PUBLIC_REDIRECT_URI;

async function getFirstTokenData(code) {
    const postBody =`grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
    return axios
      .post('https://accounts.spotify.com/api/token', postBody, {
        headers: {
          Authorization: 'Basic ' +  (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then(({ data }) => {
        return data;
      });
    }

async function getRefreshTokenData(refresh_token) {
    const postBody =`grant_type=refresh_token&refresh_token=${refresh_token}`
    return axios
        .post('https://accounts.spotify.com/api/token', postBody, {
        headers: {
            Authorization: 'Basic ' +  (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        })
        .then(({ data }) => {
        return data;
        });
    }

async function saveUser(body) {
    connect();
    const tokenData = await getFirstTokenData(body.code)
    const newBody = {username: body.username, image: body.image, access_token: tokenData.access_token, refresh_token: tokenData.refresh_token, expiry_date: Date.now() + (tokenData.expires_in * 1000)}
    const newUser = new User(newBody);
    await newUser.save();
    mongoose.disconnect();
    return newUser;
}

async function fetchUser(username){
    connect()
    const user = await User.findOne({ 'username': username });
    if((Date.now()+1000000000) >= user.expiry_date){
        const tokenData = await getRefreshTokenData(user.refresh_token)
        await User.findOneAndUpdate({username}, {access_token: tokenData.access_token, expiry_date: Date.now() + (tokenData.expires_in * 1000)})
    }
    mongoose.disconnect()
    return user
}

module.exports = { saveUser, fetchUser };