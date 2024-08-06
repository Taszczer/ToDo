require('dotenv').config();
// const jwt = require('jsonwebtoken');
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const User = require('../models/user');

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const authheader = req.headers['cookie']

        if (!authheader) return res.sendStatus(401)
        const cookie = authheader.split('=')[1]

        jwt.verify(cookie, JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "This session has expired. Please login" })

            const { id } = decoded
            const user = await User.findById(id)
            const { password, ...data } = user._doc
            req.user = data
            next()
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
};

module.exports = verifyToken;