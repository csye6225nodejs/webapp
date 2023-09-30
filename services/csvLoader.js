const fs = require('fs');
//const csv = require('csv');
const path = require('path');
const csv = require('csv-parser');
const account = require('./../models/Account');
const sequelize = require('./../config/dbconfig');

function LoadFromCSV() {
    sequelize.authenticate()
        .then(() => {
            return sequelize.sync();
        })
        .then(() => {
            const filepath = path.join(__dirname, './../user.csv');
            fs.createReadStream(filepath)
                .pipe(csv())
                .on('data', (row) => {
                    account.findOne({ where: { email: row.email } })
                        .then((existingUser) => {
                            if (!existingUser) {
                                account.create({
                                    first_name: row.first_name,
                                    last_name: row.last_name,
                                    email: row.email,
                                    password: row.password
                                });
                            }
                        });
                })
                .on('end', () => {
                    console.log("Data has been sent to User");
                })
                .on('error', (error) => {
                    console.error('Error in CSV stream:', error);
                });
        })
        .catch((error) => {
            console.error('Sequelize connection error:', error);
        });
}


module.exports = {LoadFromCSV};