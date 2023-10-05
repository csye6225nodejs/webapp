const Sequelize = require('sequelize');

const sequelize = new Sequelize("cloudschema", "root", "Abhi$3534", {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
