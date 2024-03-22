const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image: { type: String, required: true },
    username: { type: String, required: true },
    token: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

module.exports = User;