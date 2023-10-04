const express = require('express');
const router = express.Router();
const { healthcontroller } = require('../controllers/healthcontroller');

// Health check route definition
router.get('/', healthcontroller);
/*router.post('/', (req, res) => {
    res.status(400).send();
});
router.put('/', (req, res) => {
    res.status(400).send('Not Found');
  });
  router.delete('/', (req, res) => {
    res.status(400).send('Not Found');
  });
  router.patch('/', (req, res) => {
    res.status(400).send('Not Found');
  });*/

  
module.exports = router;
