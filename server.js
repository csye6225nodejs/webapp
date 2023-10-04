const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const port = process.env.PORT;


app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});
