const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const assignmentController = require('./../controllers/assignmentController')
const authMiddleware = require('../middleware/authMiddleware');
// Health check route definition

router.get('/', authMiddleware.basicAuth , assignmentController.getAllAssignments);
router.post('/',authMiddleware.basicAuth, assignmentController.addAssignment);
router.put('/:id', authMiddleware.basicAuth, assignmentController.updateAssignment);
router.delete('/:id', authMiddleware.basicAuth, assignmentController.deleteAssignment);


module.exports = router;