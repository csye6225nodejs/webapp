const { DataTypes } = require('sequelize');
const sequelize = require('./../config/dbconfig');

const Assignment = sequelize.define('assignment',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:1,
            max: 100
        },
    },
    num_of_attempts: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 1,
            max: 100
        },
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    //links assignment to users its a foreign key
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Assignment;