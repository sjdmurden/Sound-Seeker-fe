const mongoose = require("mongoose");
const User = require("../mongoose-models/user.js");
const users = require("./data/test-data/users.js")
const uri = require("../utils/uri.js");

mongoose
    .connect(uri)
    .catch((err) => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in test environment");

        User.collection.drop();
        console.log('DROPPED USERS');
    });

users.map(async (userData, index) => {
    const newUser = new User(userData);
    await newUser.save();
    if (index === users.length - 1) {
        console.log("DONE!");
        mongoose.disconnect();
    }
});