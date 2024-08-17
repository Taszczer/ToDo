const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/', require('./routes/main'));
app.use('/', require('./routes/notes'));
app.use('/', require('./routes/users'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
