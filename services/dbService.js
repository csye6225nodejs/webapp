// Import necessary modules and database configuration
const sequelize = require('./../config/dbconfig');
const Account = require('./../models/Account');
const logger = require('./../logger/logger');

// Function to start the database connection
async function startDb() {
        
    try{
        
        await sequelize.authenticate();
        console.log("connected to the database");
        logger.info("connecting to database");
        await sequelize.sync();
        return true;
     } catch(error)
     {
        console.log("error in connecting to the database");
        logger.error("Error in connecting to the database");
        return false;
     }
}

module.exports = { startDb };
