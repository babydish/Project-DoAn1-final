const express = require('express');
const app = express();
const port = 3000;
const dt = require('./src/views/myfirstmodule.js');

app.get('/', (req, res) => {
    const currentDate = dt.myDate();
    res.send(`Hello World! The current date and time is: ${currentDate}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
