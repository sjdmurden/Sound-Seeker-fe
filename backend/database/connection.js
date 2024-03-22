const mongoose = require('mongoose');
const uri = require('../utils/uri.js');

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connect;