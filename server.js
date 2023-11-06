const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const logger = require('./logger/logger');
const port = 8080;


app.listen(port, () => {
    logger.info(`Server is now running on port ${port}`);
});
