const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const assignmentController = require('./../controllers/assignmentController')
const authMiddleware = require('../middleware/authMiddleware');
const logger = require('./../logger/logger');
// Health check route definition

router.get('/', authMiddleware.basicAuth , assignmentController.getAllAssignments);
router.get('/:id', authMiddleware.basicAuth, assignmentController.getAssignment);
router.post('/:id/submission', authMiddleware.basicAuth, assignmentController.addSubmission);




router.post('/',authMiddleware.basicAuth, assignmentController.addAssignment);

router.put('/',(req,res) => {
    logger.info("/ put request path is a bad request");
    res.status(400).send();
});
router.put('/:id', authMiddleware.basicAuth, assignmentController.updateAssignment);
router.delete('/',(req,res) => {
    logger.info("/ path delete request is a bad request");
    res.status(400).send();
});
router.delete('/:id', authMiddleware.basicAuth, assignmentController.deleteAssignment);
router.get('/:id/submission',(req,res) => {
    logger.info("/:id path get request method is not allowed");
    res.status(405).send();
});

router.put('/:id/submission',(req,res) => {
    logger.info("/:id path put request method is not allowed");
    res.status(405).send();
});

router.patch('/:id/submission',(req,res) => {
    logger.info("/:id path put request method is not allowed");
    res.status(405).send();
});

router.delete('/:id/submission',(req,res) => {
    logger.info("/:id path put request method is not allowed");
    res.status(405).send();
});

router.patch('/:id',(req,res) => {
    logger.info("/:id path patch request method is not allowed");
    res.status(405).send();});

router.get("*",(req,res) => {
        logger.info("unknown path get request does not exist");
        res.status(404).send();});
router.patch('*', (req,res) => {
    logger.info("Unknown path patch request does not exist");
    res.status(404).send()});
router.post('*',(req,res) => {
    logger.info("Unknown path post request does not exist");
    res.status(404).send()});
router.put('*', (req,res) => {
    logger.info("Unknown path put request does not exist");
    res.status(404).send()});
router.put('*',(req,res) => {
    logger.info("Unknown path put request does not exist");
    res.status(404).send()});
router.delete('*',(req,res) => {
    logger.info("Unknown path delete request is not allowed");
    res.status(404).send()});
router.patch('*', (req,res) => {
    logger.info("Unknown path patch request is not allowed");
    res.status(404).send()});

module.exports = router;