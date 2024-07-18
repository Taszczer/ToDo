const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.SessionID
        if (!token) return res.status(401).json({
            status: "failed",
            message: "Access denied. No token provided."
        })
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
        if (!user) return res.status(401).json({
            status: "failed",
            message: "Invalide token"
        })

        req.user = user
        next()
    } catch (err) {
        res.status(400).json({ status: 'failed', message: 'Invalid token.' })
    }
}

module.exports = authenticateToken