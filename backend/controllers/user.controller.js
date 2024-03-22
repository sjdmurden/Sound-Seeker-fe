const { saveUser } = require("../models/user.model.js");

function postUser(req, res) {
    console.log(Object.keys(req));
    saveUser(req.body)
        .then((user) => {
            res.status(201).send({ user })
        })
}

module.exports = { postUser };