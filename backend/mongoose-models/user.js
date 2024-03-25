const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: { type: String, required: true },
  username: { type: String, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expiry_date: { type: Number, required: true },
  top_artists: { type: Array, required: true },
  top_genres: { type: Array, required: true },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
