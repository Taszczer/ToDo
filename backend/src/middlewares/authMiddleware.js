require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
    console.log('Headers:', req.headers)
    const accessToken = req.headers['authorization'];
    console.log('Authorization Header:', accessToken);
    const refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken)

    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const newAccessToken = jwt.sign({ user: decoded.user }, JWT_SECRET, { expiresIn: '1h' });

            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' });
            res.setHeader('Authorization', newAccessToken);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(400).send('Invalid Token.');
        }
    }
};

module.exports = authenticateToken;