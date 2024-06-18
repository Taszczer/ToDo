const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    date: {
        type: Date,
        default: Date.now,
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post