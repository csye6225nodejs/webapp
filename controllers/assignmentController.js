// Import necessary modules and services
const AWS = require('aws-sdk');
const axios = require('axios');
const url = require('url');
const { startDb } = require('../services/dbService');
const { LoadFromCSV } = require('../services/csvLoader');
const assignment  = require('./../models/Assignment');
const submission = require('./../models/Submission');
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
        res.status(204).send(); // Respond with a success status and no content
    } catch (error) {
        logger.error("Error in deleting assignment");
        console.error('Failed to delete the assignment:', error);
        res.status(400).send();
    }
}

async function addSubmission(req, res){

    statsdClient.increment('v1/assignments/:id/submission_post_called');
    try {

        const assignment_id = req.params.id;
        const userId = req.userId;

        const getUserEmail = (req, res) => {
            const authheader = req.headers.authorization;
            if (!authheader) {
                return '';
            }
            const auth = new Buffer.from(authheader.split(' ')[1],
                'base64').toString().split(':');
            const email = auth[0];
            const pass = auth[1];
            return email;
        }

        const { submission_url } = req.body;

        const queryParams = req.query;
        
        if (Object.keys(queryParams).length > 0) {
            //logger.info("/healthz Get request has query parameters, its an error ");
            res.status(400).send();
        }

        console.log("Assignment_id" +assignment_id);
        const result = await assignment.findOne({ where: { uuid: assignment_id } });
       //getting email from assignment to account
       const noOfSubmissions = await getSubmissionCountByAssignmentId(result.uuid);
       const user_id = result.dataValues.userId;
       const account_row = await account.findOne({ where: { id: user_id } });
       const email_id = account_row.dataValues.email;
       

       if (!submission_url ) {
            logger.info("Submission URL values are missing, bad request");
            return res.status(400).send("Add Submission URL"); 
        };

        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        if (!regex.test(submission_url)) {
            return res.status(400).send("Invalid URL format");
        } 
        console.log("number"+result.num_of_attempts);

        if(noOfSubmissions >= result.num_of_attempts){
            return res.status(403).send("Number of attempts crossed");
        }

        const newSubmission = await submission.create({
            assignment_id,
            submission_url
        });

        const message = {
            submissionDetails: newSubmission,
            emailId: getUserEmail,
            noOfSubmissions: noOfSubmissions
           };
        await sequelize.sync();

        // Set the AWS region
        AWS.config.update({
            region: 'us-east-2', // Replace with your AWS region, e.g., 'us-east-1'
        });

        const sns = new AWS.SNS();

        sns.publish({
            Message: JSON.stringify(message),
            TopicArn: process.env.SNS,
        }, (err, data) => {
        if (err) {
            console.error('Error publishing message to SNS:', err);
            logger.error('Error publishing message to SNS', err);
        } else {
            console.log('Message published to SNS:', data);
            logger.info('Message published to SNS', data);
        }
        });

        logger.info("Submission added to your assignment");
        return res.status(201).send(newSubmission);
    }
    catch(error){
        logger.error("Error in adding submission");
        console.error('Failed to delete the assignment:', error);
        res.status(400).send();
    }
}


async function getSubmissionCountByAssignmentId(assignmentId) {
    try {
      
      if (assignmentId === undefined || assignmentId === null) {
        // Handle the case where assignmentId is undefined or null
        logger.warn('Assignment ID is undefined or null. Returning 0.');
        return 0;
      }
      const submissionCount = await submission.count({
        where: {
          assignment_id: assignmentId
        }
      });

      logger.info(`Number of submissions for assignment ${assignmentId}: ${submissionCount}`);
      return submissionCount;
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError' && error.parent && error.parent.code === 'ER_NO_SUCH_TABLE') {
            // Handle the case where the table doesn't exist
            logger.warn(`The table does not exist. Returning 0 for assignment ${assignmentId}`);
            return 0;
          } else {
            // Rethrow the error for other unexpected errors
            
            logger.error('Error retrieving submission count:', error);
            throw error;
          }
      logger.error('Error retrieving submission count:', error);
      throw error;
    }
}


module.exports = { getAllAccounts, getAllAssignments, addAssignment, updateAssignment, deleteAssignment, getAssignment, addSubmission };
