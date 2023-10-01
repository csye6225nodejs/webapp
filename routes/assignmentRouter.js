const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const assignmentController = require('./../controllers/assignmentController')
// Health check route definition

router.get('/', assignmentController.getAllAssignments);



module.exports = router;