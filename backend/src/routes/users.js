require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require("express");
const User = require('../models/user');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const { verifyToken, authRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "You already have an account",
            });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });

        const savedUser = await newUser.save();
        const { ...user_data } = savedUser._doc;

        res.status(200).json({
            status: "success",
            data: [user_data],
            message: "Your account has been successfully created.",
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        const { ...user_data } = user?._doc

        if (!user) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "User doesn't exist",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Password doesn't match",
            });
        }

        const token = user.generateAccessJWT()

        res
            .cookie("jwt_authorization", token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === 'production'
            })
            .status(200)
            .json({
                status: "success",
                data: [user_data],
                token: token,
                message: "Login successful",
            });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
});

router.delete("/logout", (req, res) => {
    res.clearCookie("jwt_authorization", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    })

    res.status(200).send("Logout successful")
})

router.get('/admin', verifyToken, authRole("admin"), (req, res) => {
    res.status(200).send("Admin Page")
})

router.get('/whoami', verifyToken, (req, res) => {
    res.status(200).send(req.user)
});

module.exports = router;
