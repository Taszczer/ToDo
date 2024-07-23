const bcrypt = require('bcrypt');
const express = require("express");
const User = require('../models/user');
// const { Register, Login } = require("../controllers/auth.js");
// const { check } = require("express-validator");
// const authenticateToken = require("../middlewares/authMiddleware.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
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
        const { password: pwd, ...user_data } = savedUser._doc;

        res.status(200).json({
            status: "success",
            data: [user_data],
            message: "Your account has been successfully created.",
        });

    } catch (err) {
        console.error("Error during registration:", err);
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
        const { ...user_data } = user._doc

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

        const accessToken = jwt.sign(user, JWT_SECRET)
        res.json({ accessToken })

        res.status(200).json({
            status: "success",
            data: [user_data],
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


// router.get("/whoami", authenticateToken, (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: req.user,
//         message: "User information retrieved successfully."
//     });
// });

module.exports = router;
