const Sequelize = require('sequelize');

const dbName = "cloudschema";
const dbUser = "root";
const dbPassword = "Abhi$3534";
const dbHost = "127.0.0.1";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
});

module.exports = sequelize;
