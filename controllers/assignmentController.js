// Import necessary modules and services
const { startDb } = require('../services/dbService');
const { LoadFromCSV } = require('../services/csvLoader');
const assignment  = require('./../models/Assignment');
const account = require('./../models/Account');
const sequelize = require('./../config/dbconfig');
const logger = require('./../logger/logger');
const statsdClient = require('./../config/statsd-config');
const authMiddleware = require('./../middleware/authMiddleware');

async function getAllAccounts(req,res) {

    statsdClient.increment('/v1/assignments_called');
    try{
        await sequelize.sync();
        const result = await account.findAll();
        logger.info("Get all accounts");
        res.status(200).json(result);   

   } catch(error)  {
       logger.error('Failed to get all accounts : ', error);
   }; 
}

async function getAssignment(req,res) {

        const assignmentId = req.params.uuid;
        statsdClient.increment('v1/assignments/{id}_get_called');
        await sequelize.sync();
        try {
            const result = await assignment.findOne({
              where: {
                uuid: assignmentId, // Replace 'id' with the actual name of the primary key column
              },
            });
          
            if (!result) {
              // The record with the specified assignmentId was found
              logger.info("No assignment exists with the uuid mentioned");
              res.status(404).send();
            } else {
              logger.info("here is the assignment you wanted");
              statsdClient.increment('requests.processed');
              res.status(200).send(result);
            }
          } catch (error) {
            logger.error("Error in getting the assignment");
            res.status(404).send();
        }
}

async function getAllAssignments(req,res) {

    statsdClient.increment('v1/assignments_get_called');
    try{

        if (req.body && Object.keys(req.body).length >0){
            logger.info("Body present in get request for assignments");
            res.status(400).send();
        }
        const queryParams = req.query;
        if (Object.keys(queryParams).length > 0) {
            logger.info("Request params present, this method is not allowed");
            res.status(400).send();
        }
        await sequelize.sync();
        const result = await assignment.findAll();
        logger.info("All Assignments getting printed");
        statsdClient.increment('requests.processed');
        res.status(200).json(result);   
   } catch(error)  {
       logger.error("Failed to get all assignments");
       console.error('Failed to get all assignments: ', error);
   }; 
}

async function addAssignment(req, res) {
    statsdClient.increment('v1/assignments_post_called');
    try {
        const { name, points, num_of_attempts, deadline} = req.body;
        const userId = req.userId;
        if (!name || !points || !num_of_attempts || !deadline ) {
            logger.info("One of the required query values are missing, bad request");
            return res.status(400).send(); 
        };

        if (!name && !(name.match(/^[A-Za-z0-9\s]+$/) )) {
            logger.info("You have an invalid name in your assigment");
            return res.status(400).send("Invalid name, bad request");
        }

        if (isNaN(points) || typeof points !== 'number') {
            logger.info("The points value is not a number");
            return res.status(400).send("Invalid points, bad request");
        }

        if (isNaN(num_of_attempts) || typeof num_of_attempts !== 'number') {
            logger.info("The attempts value is not a number, bad request");
            return res.status(400).send("Invalid num_of_attempts");
        }

        if (!deadline) {
            logger.info("The deadline is missing, bad request");
            return res.status(400).send("Missing deadline");
        }

        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate) || deadlineDate <= new Date()) {
            logger.info("The deadline is invalid or past deadline, bad request");
            return res.status(400).send("Invalid or past deadline");
        }

        await sequelize.sync();

        //console.log(req.userId+"USer");
        const newAssignment = await assignment.create({
            name,
            points,
            num_of_attempts,
            deadline,
            userId,
        });

        logger.info("Assignment added to your list");
        console.log('New Assignment:', newAssignment);
        statsdClient.increment('requests.processed');
        res.status(201).send(newAssignment);
    } catch (error) {
        console.log('Failed to add an assignment: ' + error);
        logger.error("Error in adding assignment");
        res.status(400).send();
    }
}

async function updateAssignment(req, res) {
    statsdClient.increment('v1/assignments_put_called');
    try {
        const assignmentId = req.params.id; // Assuming you pass the assignment ID as a route parameter
        const userId = req.userId;

        if (!assignmentId || !userId) {
            logger.info("Missing assignment or user ID");
            return res.status(400).json({ error: 'Missing assignment ID or user ID' });
        }

        const { name, points, num_of_attempts, deadline } = req.body;

        if (!name || !points || !num_of_attempts || !deadline ) {
            logger.info("Missing values in update assignments API");
            return res.status(400).send("missing values"); 
        };
        if (!name && !(name.match(/^[A-Za-z0-9\s]+$/) )) {
            logger.info("Invalid name in update assignment");
            return res.status(400).send("Invalid name");
        }

        if (isNaN(points) || typeof points !== 'number') {
            logger.info("The points is not a number");
            return res.status(400).send("Invalid points");
        }

        if (isNaN(num_of_attempts) || typeof num_of_attempts !== 'number') {
            logger.info("The number of attempts is not a number");
            return res.status(400).send("Invalid num_of_attempts");
        }

        if (!deadline) {
            logger.info("The deadline is missing");
            return res.status(400).send("Missing deadline");
        }

        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate) || deadlineDate <= new Date()) {
            logger.info("The deadline is invalid or a wrong date");
            return res.status(400).send("Invalid or past deadline");
        }


        await sequelize.sync();

        const Assignment = await assignment.findOne({where: {uuid: assignmentId}});
        if(!assignment){
            logger.info("The assignment ID is missing");
            return res.status(404).send();
        }

        // Check if the assignment with the provided ID exists and belongs to the authenticated user
        const existingAssignment = await assignment.findOne({ where: { uuid: assignmentId, userId } });

        if (!existingAssignment) {
            logger.info("There is no assignment with the given ID");
            return res.status(403).send();
        }

        // Check if userId or assignmentId are provided in the request body
        if (req.body.id || req.body.userId || req.body.assignmentId) {
            logger.info("Changing user ID or assignment ID is not allowed");
            return res.status(400).json({ error: 'Changing userId or assignmentId is not allowed' });
        }

        // Update only the fields that are provided in the request body
        if (req.body.name) {
            existingAssignment.name = req.body.name;
        }
        if (req.body.points) {
            existingAssignment.points = req.body.points;
        }
        if (req.body.num_of_attempts) {
            existingAssignment.num_of_attempts = req.body.num_of_attempts;
        }
        if (req.body.deadline) {
            existingAssignment.deadline = req.body.deadline;
        }

        await existingAssignment.save(); // Save the changes to the database
        logger.info("Changing assignment and updating it");
        statsdClient.increment('requests.processed');
        res.status(204).send(existingAssignment);
    } catch (error) {
        console.error('Failed to update an assignment: ' + error);
        res.status(400).send("HI");
    }
}

async function deleteAssignment(req, res) {
    statsdClient.increment('v1/assignments_delete_called');
    try {
        const assignmentId = req.params.id; // Capture the assignment ID from the URL
        const userId = req.userId; // Assuming you have a way to get the authenticated user's ID

        if (req.body && Object.keys(req.body).length >0){
            logger.info("Body present in delete request for assignments");
            res.status(400).send();
        }

        // Use the assignmentId to look up the assignment
        const assign = await assignment.findByPk(assignmentId);

        if (!assign) {
            logger.info("Cant find assignment with given ID");
            return res.status(404).send();
        }

        // Check if the assignment belongs to the authenticated user
        if (assign.userId !== userId) {
            logger.info("Assignment you are trying to delete is not allowed because you did not create it");
            return res.status(403).send();
        }

        // Perform the delete operation
        await assign.destroy();
        logger.info("Deleting the assignment")
        statsdClient.increment('requests.processed');
        res.status(204).send(); // Respond with a success status and no content
    } catch (error) {
        logger.error("Error in deleting assignment");
        console.error('Failed to delete the assignment:', error);
        res.status(400).send();
    }
}




module.exports = { getAllAccounts, getAllAssignments, addAssignment, updateAssignment, deleteAssignment, getAssignment };
