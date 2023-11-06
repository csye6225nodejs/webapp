// Import necessary modules and services
const { startDb } = require('../services/dbService');
const { LoadFromCSV } = require('./../services/csvLoader');
const app = require('./../app');
const logger = require('./../logger/logger');
const url = require('url');
//Import Load User from CSV

// Define a controller for the health check route
async function healthcontroller(req, res) {
    res.setHeader('Cache-Control','no-cache'); 
    if (req.body && Object.keys(req.body).length >0){
        logger.info("/healthz Get request has body, its an error ");
        res.status(400).send();
    }
    const queryParams = req.query;
    if (Object.keys(queryParams).length > 0) {
        logger.info("/healthz Get request has query parameters, its an error ");
        res.status(400).send();
    }
    const result = await startDb();
    if (result === false) {
        logger.info("error in connecting to the database");
        res.status(503).send();
    } else if (result === true) {
        console.log(app);
        logger.info("Succesfully connected to the database");
        LoadFromCSV();
        res.status(200).send();
    }
}

module.exports = { healthcontroller };
