const express = require("express");
const { Register } = require("../controllers/auth.js");
const { Login } = require("../controllers/auth.js");
const { check } = require("express-validator");
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

module.exports = router