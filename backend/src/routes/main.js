const express = require('express');
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })
const Post = require('../models/post');
const Note = require('../models/post')
const router = express.Router();


router.post('/posts/create', async (req, res) => {
    const { title, description, start_time, end_time } = req.body;
    try {
        const newPost = new Post({
            title,
            description,
            start_time,
            end_time
        });

        await newPost.save();
        res.status(201).send('Post created successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error creating post: ${err.message}`);
    }
});

router.get('/posts', async (req, res) => {
    try {
        const post = await Post.find({})
        res.status(200).json(post)
    } catch (err) {
        res.status(500).send(`Error getting posts: ${err.message}`)
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        const id = req.params
        const postId = await Post.findById({ id })
        res.status(200).json(postId)
    } catch (err) {
        res.status(500).send(`Your error is: ${err.message}`)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const postDelete = await Post.deleteOne({ _id: req.params.id })
        res.status(204).json(postDelete)

    } catch (err) {
        res.status(500).send(`Your error is: ${err.message}`)
    }
})

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

module.exports = router;

//mongodb+srv://Taszczer:FAg0Q27SzJf7rxPr@database.4qapfqd.mongodb.net/