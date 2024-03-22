const express = require('express');
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://user:1jKgtcUase8PlogN@soundseeker.j2dnhok.mongodb.net/sound_seeker_db?retryWrites=true&w=majority&appName=SoundSeeker";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

connect()

app.listen(9090, () => {
    console.log('Server started on port 9090');
})

const userSchema = new mongoose.Schema({
    username: String,
    preferences: Object
    // Access Token
    // 
});

const festivalSchema = new mongoose.Schema({
    name: String
})

const User = mongoose.model('User', userSchema);

async function postToMongo() {
    const newUser = new User({ username: 'tien', preferences: { genre: 'rock'} })
    newUser.save();
}

async function getFromMongo() {
    const users = await User.find();
    console.log(users);
}

async function deleteFromMongo() {
    User.collection.drop();
}

// postToMongo();
// getFromMongo();
deleteFromMongo();