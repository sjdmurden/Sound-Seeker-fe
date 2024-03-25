const mongoose = require('mongoose');
const uri = require('../utils/uri.js');
const ENV = process.env.NODE_ENV || 'development';
const uri = process.env.DATABASE_URI

require('dotenv').config(
    {
        path: `${__dirname}/../../.env.${ENV}`,
    }
);

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connect;