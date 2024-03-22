const mongoose = require('mongoose');
const connect = require('../database/connection.js');
const User = require("../mongoose-models/user.js");

async function saveUser(body) {
    connect();
    const newUser = new User(body);
    await newUser.save();
    mongoose.disconnect();
    return newUser;
}

module.exports = { saveUser };