const mysql = require('mysql2');

const setupDatabase = async () => {

    const connection = mysql.createConnection({
    host:'127.0.0.1', //localhost
    user: 'root',     // Root user
    password: 'Abhi$3534' // Set your desired root password
  });

    connection.query('CREATE DATABASE IF NOT EXISTS cloudschema');
    //const username = process.env.DB_HOST; // Replace with your desired username
   //const password = process.env.DB_PASSWORD; // Replace with your desired password
  console.log('MySQL setup completed.');
};

module.exports = { setupDatabase };