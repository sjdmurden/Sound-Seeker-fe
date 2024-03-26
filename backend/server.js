const express = require('express');
const { postUser, getUser } = require('./controllers/user.controller.js');

const app = express();
app.use(express.json());

app.post('/api/users', postUser);

app.get('/api/users/:id', getUser);



app.listen(9090, () => {
    console.log('Server started on port 9090');
})
