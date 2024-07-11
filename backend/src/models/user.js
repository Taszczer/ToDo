const mongoose = require("mongoose")
const { db3 } = require('../connection/index')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Your firstname is required",
        max: 25
    },
    lastName: {
        type: String,
        required: "Your lastName is required",
        max: 25
    },
    email: {
        type: String,
        required: "Your email is required",
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: "Your password is required",
        select: false,
        max: 25,
    },
    role: {
        type: String,
        required: true,
        default: "0x01",
    }
})

const User = db3.model('User', userSchema)

module.exports = User