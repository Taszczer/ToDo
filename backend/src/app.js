const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // specify the allowed origin
    credentials: true, // allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use('/', require('./routes/main'));
app.use('/', require('./routes/notes'));
app.use('/', require('./routes/users'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
