const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

app.use(cors());
app.use('/', require('./routes/main.js'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});