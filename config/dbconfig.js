const Sequelize = require('sequelize');

const sequelize = new Sequelize("csye6225", "csye6225", "Abhi$3534", {
    host: 'csye622536c4a87.crjebeyojvne.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
});

module.exports = sequelize;
