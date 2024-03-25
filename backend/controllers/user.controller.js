const { saveUser, fetchUser } = require("../models/user.model.js");

function postUser(req, res) {
    saveUser(req.body)
        .then((user) => {
            res.status(201).send({ user })
        })
        .catch((err) => {
            console.log(err)
        })
}

function getUser(req, res) {
    const {username} = req.params
    fetchUser(username).then((user) => {
        res.status(200).send({user})
    })
}

module.exports = { postUser, getUser };