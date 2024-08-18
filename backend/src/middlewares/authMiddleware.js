require('dotenv').config();
// const jwt = require('jsonwebtoken');
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const User = require('../models/user');

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const token = req.cookies.jwt_authorization;

        if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "This session has expired. Please login" });

            const { id } = decoded;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User not found" });
            const { password, ...data } = user._doc;
            req.user = data;
            next();
        });
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}


function authRole(role) {
    return (req, res, next) => {
        if (role !== req.user.role) {
            res.status(401).send("You are not allowed to visit this page")
        } else {
            next()
        }
    }
}

module.exports = { verifyToken, authRole };