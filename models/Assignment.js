const { DataTypes } = require('sequelize');
const sequelize = require('./../config/dbconfig');
const { v4: uuidv4 } = require('uuid');

const Assignment = sequelize.define('assignment',{
    uuid: {
        type: DataTypes.STRING(16), // Change the data type to string
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 16), // Generate a 16-character hexadecimal code
    },
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
            max: 10
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
},{
        timestamps: true, // Set this to false to disable automatic timestamps
        createdAt: 'assignment_created', // Rename the createdAt field
        updatedAt: 'assignment_updated' // Rename the updatedAt field
});

module.exports = Assignment;