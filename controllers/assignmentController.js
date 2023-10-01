// Import necessary modules and services
const { startDb } = require('../services/dbService');
const { LoadFromCSV } = require('../services/csvLoader');
const assignment  = require('./../models/Assignment');
const account = require('./../models/Account');
const sequelize = require('./../config/dbconfig');

async function getAllAccounts(req,res) {
    try{

        await sequelize.sync();
        const result = await account.findAll();
        res.status(200).json(   result);   
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
        const { name, points, num_of_attempts, deadline, userId } = req.body;

        if (!name || !points || !num_of_attempts || !deadline || !userId) {
            return res.status(400).json({ error: 'Missing required data in the request body' });
        }

        await sequelize.sync();

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

module.exports = { getAllAccounts, getAllAssignments, addAssignment };
