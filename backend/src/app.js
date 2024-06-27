const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb.js');
const Post = require('./models/post');
const Note = require('./models/note');
const blogRoutes = require('./routes/blog');
const notesRoutes = require('./routes/notes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to databases
const blogDB = connectDB('blog');
const filesDB = connectDB('files');

// Instantiate models with their respective database connections
const PostModel = Post(blogDB);
const NoteModel = Note(filesDB);

// Pass models to routes
const blogRoutesInstance = blogRoutes(PostModel);
const notesRoutesInstance = notesRoutes(NoteModel);

// Mount routes
app.use('/blog', blogRoutesInstance);
app.use('/files', notesRoutesInstance);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
