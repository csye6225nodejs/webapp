const express = require('express');
const router = express.Router();
const { healthcontroller } = require('../controllers/healthcontroller');

// Health check route definition
router.get('/', healthcontroller);

module.exports = router;
