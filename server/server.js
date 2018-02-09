require('./config/config.js');
const path = require('path');
const express = require('express');

var app = express();
const port = process.env.PORT;
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath)); // middle ware


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
