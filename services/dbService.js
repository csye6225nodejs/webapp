// Import necessary modules and database configuration
const sequelize = require('./../config/dbconfig');
const Account = require('./../models/Account');

// Function to start the database connection
async function startDb() {
    try {
        try{
            await sequelize.authenticate();
        }  
        catch (error) {
            console.log("error in authentication"+error);
            return false;
        } 
        console.log("Connected to the Database");
        try{
            await sequelize.sync();
        } catch (error) {
            console.log("error in connecting to database");
            return false;
        }
        console.log("Database synchronized");
        return true;
    } catch (error) {
        console.log("Error connecting to db");
        return false;
    }
}

module.exports = { startDb };