const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    start_time: Date,
    end_time: Date
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post 