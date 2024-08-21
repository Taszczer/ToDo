const mongoose = require("mongoose")
const { db2 } = require("../connection/index")

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    descriptionText: {
        type: String,
    },
    userId: {
        type: String
    }
})

const Note = db2.model('Note', NoteSchema)

module.exports = Note