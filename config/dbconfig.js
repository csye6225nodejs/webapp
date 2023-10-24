const Sequelize = require('sequelize');

const sequelize = new Sequelize("cloudschema", "root", "Abhi$3534", {
    host: '127.0.0.1',
    dialect: 'mysql',
});

module.exports = sequelize;
