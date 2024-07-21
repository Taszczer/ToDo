const express = require("express");
const { Register } = require("../controllers/auth.js");
const { Login } = require("../controllers/auth.js");
const { check } = require("express-validator");
const authenticateToken = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/register",
    check("firstName").not().isEmpty().trim().escape(),
    check("lastName").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
    check("password").notEmpty().isLength({ min: 8 }),

    Register
)

router.post("/login",
    check("email").isEmail().normalizeEmail(),
    check("password").isEmpty(),

    Login
)

router.get("find/:email", async (req, res) => {
    try {
        const dataBaseEmail = await User.findOne(req.params.email)
        res.status(200).json(dataBaseEmail)
    } catch (err) {
        res.status(500).send(`Your error is: ${err}`)
    }
})

router.get("/whoami", authenticateToken, (req, res) => {
    res.status(200).json({
        status: "success",
        data: req.user,
        message: "User information retrieved successfully."
    })
})

module.exports = router