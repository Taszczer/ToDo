const mongoose = require('mongoose');
const dbConfig = require('../config/mongodb');

const db1 = mongoose.createConnection(dbConfig.db1);

const db2 = mongoose.createConnection(dbConfig.db2);

db1.on('connected', () => {
    console.log('Connected to blog');
});

db1.on('error', (err) => {
    console.error(`Error connecting to blog: ${err.message}`);
});

db2.on('connected', () => {
    console.log('Connected to notebook');
});

db2.on('error', (err) => {
    console.error(`Error connecting to notebook: ${err.message}`);
});

module.exports = { db1, db2 }