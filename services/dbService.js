// Import necessary modules and database configuration
const sequelize = require('./../config/dbconfig');
const Account = require('./../models/Account');

// Function to start the database connection
async function startDb() {
        
    try{
        
        await sequelize.authenticate();
        console.log("connected to the db");
        
        await sequelize.sync();
        console.log("error in connecting to database");
         return true;
     } catch(error)
     {
        console.error("error ", error.message);
        return false;
     }
}

module.exports = { startDb };
