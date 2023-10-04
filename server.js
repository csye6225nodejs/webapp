const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const port = process.env.PORT;

const { setupDatabase } = require('./services/loadDb.js');

setupDatabase()
.then(() => {

}).catch((err) => {
    console.error("error setting up database"+err);
});

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});
