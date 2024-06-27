const express = require('express');
const router = express.Router();


module.exports = (Post, blogDB) => {
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

    return router
}

//mongodb+srv://Taszczer:FAg0Q27SzJf7rxPr@database.4qapfqd.mongodb.net/