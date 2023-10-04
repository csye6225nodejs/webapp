const mysql = require('mysql2/promise');

const setupDatabase = async () => {

    const connection = await mysql.createConnection({
    host:'localhost',
    user: 'root',     // Root user
    password: 'Abhi$3534' // Set your desired root password
  });

    await connection.query('CREATE DATABASE IF NOT EXISTS cloudschema');
    //const username = process.env.DB_HOST; // Replace with your desired username
   //const password = process.env.DB_PASSWORD; // Replace with your desired password
  console.log('MySQL setup completed.');
};

module.exports = { setupDatabase };
