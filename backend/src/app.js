const cors = require('cors');
const express = require('express');
const connectDB = require('./config/mongodb.js')
const app = express();
const port = 5000;

app.use(cors());
app.use('/', require('./routes/main.js'))
connectDB()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});