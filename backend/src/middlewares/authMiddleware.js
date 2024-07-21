const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
    try {
        console.log('Cookies:', req.cookies); // Log cookies to debug

        const token = req.cookies.SessionID;
        if (!token) {
            console.error("No token provided");
            return res.status(401).json({
                status: "failed",
                message: "Access denied. No token provided."
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token decoded:", decoded);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            console.error("Invalid token - user not found");
            return res.status(401).json({
                status: "failed",
                message: "Invalid token"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Invalid token error:", err);
        res.status(400).json({ status: 'failed', message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
