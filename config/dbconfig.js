const Sequelize = require('sequelize');

const DB_NAME = process.env.DB_NAME || "cloudschema";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "Abhi$3534";
const DB_HOST = process.env.DB_HOST || "127.0.0.1";


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
