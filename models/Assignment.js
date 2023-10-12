const { DataTypes } = require('sequelize');
const sequelize = require('./../config/dbconfig');

const Assignment = sequelize.define('assignment',{
    uuid: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Set this column as the primary key
        autoIncrement: true,
        allowNull: false,
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
            max: 10
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
},{
        timestamps: true, // Set this to false to disable automatic timestamps
        createdAt: 'assignment_created', // Rename the createdAt field
        updatedAt: 'assignment_updated' // Rename the updatedAt field
});

module.exports = Assignment;