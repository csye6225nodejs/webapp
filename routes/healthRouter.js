const express = require('express');
const fs = require("fs");
const app = require('./../app.js');
const router = express.Router();
const logger = require('./../logger/logger.js');
const { healthcontroller } = require('../controllers/healthcontroller');

// Health check route definition
router.get('/', healthcontroller);

router.get('*', (req, res) => {
  logger.info("unknown api get request gives 404 error");
  res.status(404).send();
});

router.put('/', (req, res) => {
    console.log("Hi");
    logger.info("/ path put request gives 405 error");
    res.status(405).send();
  });

router.post('/',(req,res) => {
  console.log("Hi");
  logger.info("hi");
  res.status(405).send();
});
router.post('*', (req,res) => {
  console.log("Hi");
  logger.info("unknown post request gives 404 error");
  res.status(404).send();
});
router.put('*',(req,res) => {
  console.log("Hi");
  logger.info("unknown put request gives 404 error");
  res.status(404).send();
});
router.delete('/', (req, res) => {
    logger.info("/ delete request gives 405 error");
    res.status(405).send();
});
router.delete('*',(req,res) => {
  logger.info("unknown delete request gives 405 error");
  res.status(404).send();
});
router.patch('/', (req, res) => {
  logger.info("/ patch request gives 405 error");
  res.status(405).send();
});
router.patch('*',(req,res) => {
  logger.info("unknown patch request gives 405 error");
  res.status(405).send();
});

  
module.exports = router;
