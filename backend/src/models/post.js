const mongoose = require('mongoose');
const { db1 } = require('../connection/index')

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    start_time: Date,
    end_time: Date,
    userId: String
});

const Post = db1.model('Post', postSchema);
module.exports = Post;