const express = require('express');
const Note = require('../models/note');
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

router.post("/upload", upload.none(), async (req, res) => {
    const textFields = req.body
    try {
        const newNote = new Note(textFields)
        await newNote.save()
        res.status(201).send(newNote)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

module.exports = router