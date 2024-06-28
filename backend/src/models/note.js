const mongoose = require("mongoose")
const { db2 } = require("../connection/index")

const NoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Note = db2.model('Note', NoteSchema)

module.exports = Note
