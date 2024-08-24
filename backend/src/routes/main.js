const express = require('express');
const Post = require('../models/post');
const { verifyToken, canView } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/posts/create', verifyToken, async (req, res) => {
    const { title, description, start_time, end_time } = req.body;
    try {
        const newPost = new Post({
            title,
            description,
            start_time,
            end_time,
            userId: req.user._id
        });

        await newPost.save();
        res.status(201).send('Post created successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error creating post: ${err.message}`);
    }
});

router.get('/posts', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send(`Error getting posts: ${err.message}`);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postId = await Post.findById(req.params.id);
        res.status(200).json(postId);
    } catch (err) {
        res.status(500).send(`Your error is: ${err.message}`);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const postDelete = await Post.deleteOne({ _id: req.params.id });
        res.status(204).json(postDelete);
    } catch (err) {
        res.status(500).send(`Your error is: ${err.message}`);
    }
});


module.exports = router;