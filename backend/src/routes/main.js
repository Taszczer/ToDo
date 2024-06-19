const express = require('express');
const Post = require('../models/post');
const router = express.Router();

const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    const date = new Date(req.requestTime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    req.formattedRequestTime = `${hours}:${minutes}  ${day}/${month}.${year}`;
    next();
}

router.use(requestTime);

// function insertPostData() {
//     Post.insertMany({
//         title: 'This is first post',
//         description: 'I really have fun doing that stuff:)',
//         author: 'Taszczer'  
//     })
// }
// insertPostData()

router.post('/posts', async (req, res) => {
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
        res.status(500).send('Error creating post: ' + err.message);
    }
});

router.get('/test', (req, res) => {
    let responseText = 'Button was clicked ';
    responseText += `at: ${req.formattedRequestTime}`;
    res.send(responseText);
});

module.exports = router;

//mongodb+srv://Taszczer:FAg0Q27SzJf7rxPr@database.4qapfqd.mongodb.net/

//FAg0Q27SzJf7rxPr