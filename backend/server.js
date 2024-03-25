const express = require('express');
const { postUser, getUser } = require('./controllers/user.controller.js');
const { postAccessToken } = require('./controllers/access-token.controller.js')

const app = express();
app.use(express.json());

app.post('/api/users', postUser);

app.get('/api/users/:username', getUser);

app.post('/api/access', postAccessToken);

app.listen(9090, () => {
    console.log('Server started on port 9090');
})

// const userSchema = new mongoose.Schema({
//     username: String,
//     preferences: Object
//     // Access Token
//     // 
// });

// const festivalSchema = new mongoose.Schema({
//     name: String
// })

// const User = mongoose.model('User', userSchema);

// async function postToMongo() {
//     const newUser = new User({ username: 'tien', preferences: { genre: 'rock'} })
//     newUser.save();
// }

// async function getFromMongo() {
//     const users = await User.find();
//     console.log(users);
// }

// async function deleteFromMongo() {
//     User.collection.drop();
// }

// // postToMongo();
// // getFromMongo();
// deleteFromMongo();