// Import necessary modules and services
const { startDb } = require('../services/dbService');
const { LoadFromCSV } = require('../services/csvLoader');
const assignment  = require('./../models/Assignment');
const account = require('./../models/Account');
const sequelize = require('./../config/dbconfig');
const authMiddleware = require('./../middleware/authMiddleware');

async function getAllAccounts(req,res) {
    try{

        await sequelize.sync();
        const result = await account.findAll();
        res.status(200).json(result);   
   } catch(error)  {
       console.error('Failed to get all accounts : ', error);
   }; 
}

async function getAllAssignments(req,res) {
    try{

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
        if (!name || !points || !num_of_attempts || !deadline || !req.userId ) {
            return res.status(400).json({ error: 'Missing required data in the request body' });
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

        res.status(200).json(newAssignment);
    } catch (error) {
        console.log('Failed to add an assignment: ' + error);
        res.status(500).json({ error: 'Failed to add an assignment' });
    }
}

async function updateAssignment(req, res) {
    try {
        const assignmentId = req.params.id; // Assuming you pass the assignment ID as a route parameter
        const userId = req.userId;

        if (!assignmentId || !userId) {
            return res.status(400).json({ error: 'Missing assignment ID or user ID' });
        }

        await sequelize.sync();

        // Check if the assignment with the provided ID exists and belongs to the authenticated user
        const existingAssignment = await assignment.findOne({ where: { id: assignmentId, userId } });

        if (!existingAssignment) {
            return res.status(404).json({ error: 'Assignment not found' });
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

        res.status(200).json(existingAssignment);
    } catch (error) {
        console.error('Failed to update an assignment: ' + error);
        res.status(500).json({ error: 'Failed to update an assignment' });
    }
}

async function deleteAssignment(req, res) {
    try {
        const assignmentId = req.params.id; // Capture the assignment ID from the URL
        const userId = req.userId; // Assuming you have a way to get the authenticated user's ID

        // Use the assignmentId to look up the assignment
        const assign = await assignment.findByPk(assignmentId);

        if (!assign) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Check if the assignment belongs to the authenticated user
        if (assign.userId !== userId) {
            return res.status(401).json({ error: 'Unauthorized: Assignment does not belong to you' });
        }

        // Perform the delete operation
        await assign.destroy();

        res.status(200).send(); // Respond with a success status and no content
    } catch (error) {
        console.error('Failed to delete the assignment:', error);
        res.status(500).json({ error: 'Failed to delete the assignment' });
    }
}




module.exports = { getAllAccounts, getAllAssignments, addAssignment, updateAssignment, deleteAssignment };
