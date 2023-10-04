const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const assignmentController = require('./../controllers/assignmentController')
const authMiddleware = require('../middleware/authMiddleware');
// Health check route definition

router.get('/', authMiddleware.basicAuth , assignmentController.getAllAssignments);
router.get('/:id', authMiddleware.basicAuth, assignmentController.getAssignment);
router.get("*",(req,res) => {
    res.status(404).send();
});

router.post('/',authMiddleware.basicAuth, assignmentController.addAssignment);
router.put('/:id', authMiddleware.basicAuth, assignmentController.updateAssignment);
router.delete('/:id', authMiddleware.basicAuth, assignmentController.deleteAssignment);
router.patch(':/id',res.status(405).send());


router.patch('*', res.status(404).send());
router.post('*',res.status(404).send());
router.put('*',res.status(404).send());
router.delete('*',res.send(404).send());
router.patch('*', res.status(404).send());

module.exports = router;