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
router.put('/',(req,res) => {
    res.status(400).send();
});
router.put('/:id', authMiddleware.basicAuth, assignmentController.updateAssignment);
router.delete('/',(req,res) => {
    res.status(400).send();
});
router.delete('/:id', authMiddleware.basicAuth, assignmentController.deleteAssignment);
router.patch(':/id',(req,res) => {
    res.status(405).send();});

router.get("*",(req,res) => {
        res.status(404).send();});

router.patch('*', (req,res) => {
    res.status(404).send()});
router.post('*',(req,res) => {
    res.status(404).send()});
router.put('*', (req,res) => {
    res.status(404).send()});
router.put('*',(req,res) => {
    res.status(404).send()});
router.delete('*',(req,res) => {
    res.status(404).send()});
router.patch('*', (req,res) => {
    res.status(404).send()});

module.exports = router;