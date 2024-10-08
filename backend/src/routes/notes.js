const express = require('express');
const Note = require('../models/note');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post("/notes/upload", verifyToken, async (req, res) => {
    const { title } = req.body
    try {
        const newNote = new Note({ title, userId: req.user._id })
        await newNote.save()
        res.status(201).send(newNote)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.get("/notes", verifyToken, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id })
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.get("/notes/:id", async (req, res) => {
    try {
        const noteId = await Note.findById(req.params.id)
        res.status(200).json(noteId)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.put("/notes/edit/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findById(req.params.id)

        updatedNote.title = req.body.title
        updatedNote.descriptionText = req.body.descriptionText
        await updatedNote.save()

        res.status(200).send(updatedNote)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

router.delete("/notes/delete/:id", async (req, res) => {
    try {
        const deleteNote = await Note.deleteOne({ _id: req.params.id })
        res.status(204).json(deleteNote)
    } catch (err) {
        res.status(500).send(`Your error is ${err}`)
    }
})

module.exports = router