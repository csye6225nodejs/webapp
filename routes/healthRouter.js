const express = require('express');
const router = express.Router();
const { healthcontroller } = require('../controllers/healthcontroller');

// Health check route definition
router.get('/', healthcontroller);

router.get('*', (req, res) => {
  res.status(404).send();
});

router.put('/', (req, res) => {
    res.status(405).send();
  });

router.post('/',(req,res) => {
  res.status(405).send();
});
router.post('*', (req,res) => {
  res.status(404).send();
});
router.put('*',(req,res) => {
  res.status(404).send();
});
router.delete('/', (req, res) => {
    res.status(405).send();
});
router.delete('*',(req,res) => {
  res.status(404).send();
});
router.patch('/', (req, res) => {
  res.status(405).send();
});
router.patch('*',(req,res) => {
  res.status(405).send();
});

  
module.exports = router;
