const express = require('express');
const router = express.Router();
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

module.exports = (Note, filesDB) => {

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

    return router
}