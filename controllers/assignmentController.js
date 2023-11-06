// Import necessary modules and services
const { startDb } = require('../services/dbService');
const { LoadFromCSV } = require('../services/csvLoader');
const assignment  = require('./../models/Assignment');
const account = require('./../models/Account');
const sequelize = require('./../config/dbconfig');
const logger = require('./../logger/logger');
const authMiddleware = require('./../middleware/authMiddleware');

async function getAllAccounts(req,res) {
    try{

        await sequelize.sync();
        const result = await account.findAll();
        logger.info("Get all users ")
        res.status(200).json(result);   

   } catch(error)  {
       logger.error('Failed to get all accounts : ', error);
   }; 
}

async function getAssignment(req,res) {
        const assignmentId = req.params.uuid;

        await sequelize.sync();
        try {
            const result = await assignment.findOne({
              where: {
                uuid: assignmentId, // Replace 'id' with the actual name of the primary key column
              },
            });
          
            if (!result) {
              // The record with the specified assignmentId was found
              res.status(404).send();
            } else {
              // No record with the specified assignmentId was found
              res.status(200).send(result);
            }
          } catch (error) {
            res.status(404).send();
        }
}

async function getAllAssignments(req,res) {
    try{

        if (req.body && Object.keys(req.body).length >0){
            res.status(400).send();
        }
        const queryParams = req.query;
        if (Object.keys(queryParams).length > 0) {
            res.status(400).send();
        }
        await sequelize.sync();
        const result = await assignment.findAll();
        res.status(200).json(result);   
   } catch(error)  {
       console.error('Failed to get all accounts : ', error);
   }; 
}

async function addAssignment(req, res) {
    try {
        const { name, points, num_of_attempts, deadline} = req.body;
        const userId = req.userId;
        if (!name || !points || !num_of_attempts || !deadline ) {
            return res.status(400).send(); 
        };

        if (!name && !(name.match(/^[A-Za-z0-9\s]+$/) )) {
            return res.status(400).send("Invalid name");
        }

        if (isNaN(points) || typeof points !== 'number') {
            return res.status(400).send("Invalid points");
        }

        if (isNaN(num_of_attempts) || typeof num_of_attempts !== 'number') {
            return res.status(400).send("Invalid num_of_attempts");
        }

        if (!deadline) {
            return res.status(400).send("Missing deadline");
        }

        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate) || deadlineDate <= new Date()) {
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

        console.log('New Assignment:', newAssignment);

        res.status(201).send(newAssignment);
    } catch (error) {
        console.log('Failed to add an assignment: ' + error);
        res.status(400).send();
    }
}

async function updateAssignment(req, res) {
    try {
        const assignmentId = req.params.id; // Assuming you pass the assignment ID as a route parameter
        const userId = req.userId;

        console.log(assignmentId);
        console.log(userId);
        if (!assignmentId || !userId) {
            return res.status(400).json({ error: 'Missing assignment ID or user ID' });
        }

        const { name, points, num_of_attempts, deadline } = req.body;

        if (!name || !points || !num_of_attempts || !deadline ) {
            return res.status(400).send("missing values"); 
        };
        if (!name && !(name.match(/^[A-Za-z0-9\s]+$/) )) {
            return res.status(400).send("Invalid name");
        }

        if (isNaN(points) || typeof points !== 'number') {
            return res.status(400).send("Invalid points");
        }

        if (isNaN(num_of_attempts) || typeof num_of_attempts !== 'number') {
            return res.status(400).send("Invalid num_of_attempts");
        }

        if (!deadline) {
            return res.status(400).send("Missing deadline");
        }

        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate) || deadlineDate <= new Date()) {
            return res.status(400).send("Invalid or past deadline");
        }


        await sequelize.sync();

        const Assignment = await assignment.findOne({where: {uuid: assignmentId}});
        if(!assignment){
            return res.status(404).send();
        }

        // Check if the assignment with the provided ID exists and belongs to the authenticated user
        const existingAssignment = await assignment.findOne({ where: { uuid: assignmentId, userId } });

        if (!existingAssignment) {
            return res.status(403).send();
        }

        // Check if userId or assignmentId are provided in the request body
        if (req.body.id || req.body.userId || req.body.assignmentId) {
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

        res.status(204).send(existingAssignment);
    } catch (error) {
        console.error('Failed to update an assignment: ' + error);
        res.status(400).send("HI");
    }
}

async function deleteAssignment(req, res) {
    try {
        const assignmentId = req.params.id; // Capture the assignment ID from the URL
        const userId = req.userId; // Assuming you have a way to get the authenticated user's ID

        // Use the assignmentId to look up the assignment
        const assign = await assignment.findByPk(assignmentId);

        if (!assign) {
            return res.status(404).send();
        }

        // Check if the assignment belongs to the authenticated user
        if (assign.userId !== userId) {
            return res.status(403).send();
        }

        // Perform the delete operation
        await assign.destroy();

        res.status(204).send(); // Respond with a success status and no content
    } catch (error) {
        console.error('Failed to delete the assignment:', error);
        res.status(400).send();
    }
}




module.exports = { getAllAccounts, getAllAssignments, addAssignment, updateAssignment, deleteAssignment, getAssignment };
