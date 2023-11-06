const express = require('express');
const fs = require("fs");
const app = require('./../app.js');
const router = express.Router();
const logger = require('./../logger/logger.js');
const { healthcontroller } = require('../controllers/healthcontroller');

// Health check route definition
router.get('/', healthcontroller);

router.get('*', (req, res) => {
  logger.info("unknown api get request does not exist");
  res.status(404).send();
});

router.put('/', (req, res) => {
    logger.info("/ path put request is not allowed");
    res.status(405).send();
  });

router.post('/',(req,res) => {
  logger.info("/ path post request is not allowed");
  res.status(405).send();
});

router.post('*', (req,res) => {
  logger.info("unknown path post request does not exist");
  res.status(404).send();
});

router.put('*',(req,res) => {
  logger.info("unknown path put request does not exist");
  res.status(404).send();
});

router.delete('/', (req, res) => {
    logger.info("/ path delete request is not allowed");
    res.status(405).send();
});

router.delete('*',(req,res) => {
  logger.info("unknown path delete request does not exist");
  res.status(404).send();
});

router.patch('/', (req, res) => {
  logger.info("/ path patch request is not allowed");
  res.status(405).send();
});

router.patch('*',(req,res) => {
  logger.info("unknown patch request is not allowed");
  res.status(405).send();
});

  
module.exports = router;
