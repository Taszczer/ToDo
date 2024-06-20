const express = require('express');
const Post = require('../models/post');
const router = express.Router();

// const requestTime = (req, res, next) => {
//     req.requestTime = Date.now();
//     const date = new Date(req.requestTime);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();

//     const hours = date.getHours();
//     const minutes = ("0" + date.getMinutes()).slice(-2);

//     req.formattedRequestTime = `${hours}:${minutes}  ${day}/${month}.${year}`;
//     next();
// }

// router.use(requestTime);

router.post('/posts/create', async (req, res) => {
    const { title, description, author } = req.body;
    try {
        const newPost = new Post({
            title,
            description,
            author
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

module.exports = router;

//mongodb+srv://Taszczer:FAg0Q27SzJf7rxPr@database.4qapfqd.mongodb.net/

//FAg0Q27SzJf7rxPr