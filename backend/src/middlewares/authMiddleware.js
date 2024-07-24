require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refreshToken']

    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
            const accessToken = jwt.sign(decoded.user, JWT_SECRET, { expiresIn: '1h' })

            res
                .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                .header('Authorization', accessToken)
                .send(decoded.user);
        } catch (err) {
            return res.status(400).send('Invalid Token.')
        }
    }
};

module.exports = authenticateToken;
