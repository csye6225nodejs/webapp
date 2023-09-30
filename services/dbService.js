// Import necessary modules and database configuration
const sequelize = require('./../config/dbconfig');
const Account = require('./../models/Account');

// Function to start the database connection
async function startDb() {
    try {
        await sequelize.authenticate();
        console.log("Connected to the Database");
        await sequelize.sync();
        console.log("Database synchronized");
        return true;
    } catch (error) {
        console.log("Error connecting to db");
        return false;
    }
}

module.exports = { startDb };