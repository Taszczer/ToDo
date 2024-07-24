require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401)
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.status(403)
        req.user = user;
        next();
    })
};

module.exports = authenticateToken;
