const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
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
},
    { timestamps: true }
)

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next()
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

const User = db3.model('User', userSchema)

module.exports = User