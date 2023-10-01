const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const port = 8080;


app.listen(port, () => {
    console.log("Server is running on port 8080");
});
