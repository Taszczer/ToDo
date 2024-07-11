const cors = require('cors');
const express = require('express');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/main'));
app.use('/', require('./routes/notes'));
app.use('/', require('./routes/users'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
