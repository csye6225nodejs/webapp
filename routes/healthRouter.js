const express = require('express');
const fs = require("fs");
const {app, logger} = require('./../app');
const router = express.Router();
const { healthcontroller } = require('../controllers/healthcontroller');

// Health check route definition
router.get('/', healthcontroller);

router.get('*', (req, res) => {
  logger.info("unknown api get request gives 404 error");
  res.status(404).send();
});

router.put('/', (req, res) => {
    logger.info("/ path put request gives 405 error");
    res.status(405).send();
  });

router.post('/',(req,res) => {
  logger.info("/ path post request gives 405 error");
  res.status(405).send();
});
router.post('*', (req,res) => {
  logger.info("unknown post request gives 404 error");
  res.status(404).send();
});
router.put('*',(req,res) => {
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
