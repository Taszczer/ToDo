const User = require("../models/user");
const bcrypt = require('bcrypt');

async function Register(req, res) {
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
        const { role, ...user_data } = savedUser._doc;

        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Your account has been successfully created.",
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}

async function Login(req, res) {

    const { email } = req.body;
    try {

        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });

        const isPasswordValid = bcrypt.compare(
            `${req.body.password}`,
            user.password
        );

        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });

        const { password, ...user_data } = user._doc;
        let options = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };
        const token = user.generateAccessJWT();
        res.cookie("SessionID", token, options);
        res.status(200).json({
            status: "success",
            data: [user_data],
            message: "You have successfully logged in.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}
module.exports = { Register, Login };
