const mysql = require('mysql2/promise');

const setupDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,  // Change to the host where your MySQL server is running
    user: process.env.DB_USER,       // Root user
    password: process.env.DB_PASSWORD,  // Set your desired root password
  });

  // Create the database
  await connection.query('CREATE DATABASE IF NOT EXISTS cloudschema');

  const escapedPassword = connection.escape(process.env.DB_PASSWORD);
  // Create or update the root user

  console.log('MySQL setup completed.');
  connection.end();
};

module.exports = { setupDatabase };
