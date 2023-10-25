const Sequelize = require('sequelize');

const DB_NAME = "cloudschema";
const DB_USER = "root";
const DB_PASSWORD = "Abhi$3534";
const DB_HOST = "127.0.0.1";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;
