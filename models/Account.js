const { DataTypes } = require('sequelize');
const sequelize = require('./../config/dbconfig');
const Assignment = require('./Assignment');

const Account = sequelize.define('account',{
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Account.hasMany(Assignment, { foreignKey: 'userId' });

module.exports = Account;