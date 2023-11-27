const { DataTypes } = require('sequelize');
const sequelize = require('./../config/dbconfig');
const { v4: uuidv4 } = require('uuid');


const Submission = sequelize.define('submission',{

    id: {
        type: DataTypes.STRING(16), // Change the data type to string
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 16), // Generate a 16-character hexadecimal code
    },
    assignment_id: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    submission_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignment_updated: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: 'submission_date', //set to false to disable automatic timestamps
    updatedAt: 'assignment_updated' //Rename UpdatedAt field
});

module.exports = Submission;