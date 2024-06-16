const express = require('express');
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

router.get('/test', (req, res) => {
    let responseText = 'Button was clicked ';
    responseText += `at: ${req.formattedRequestTime}`;
    res.send(responseText);
});

module.exports = router;