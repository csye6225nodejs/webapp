const fs = require('fs');
//const csv = require('csv');
const path = require('path');
const csv = require('csv-parser');
const account = require('./../models/Account');
const sequelize = require('./../config/dbconfig');
const bcrypt = require('bcrypt');

function LoadFromCSV() {
    sequelize.authenticate()
        .then(() => {
            return sequelize.sync();
        })
        .then(() => {
            const filepath = path.join(__dirname, './../../user.csv');
            fs.createReadStream(filepath)
                .pipe(csv())
                .on('data', (row) => {
                    account.findOne({ where: { email: row.email } })
                        .then((existingUser) => {
                            if (!existingUser) {
                                // Hash the password using bcrypt
                                bcrypt.hash(row.password, 10, (err, hashedPassword) => {
                                  if (err) {
                                    console.error('Failed to hash the password:', err);
                                  } else {
                                    // Create the user with the hashed password
                                    account.create({
                                      first_name: row.first_name,
                                      last_name: row.last_name,
                                      email: row.email,
                                      password: hashedPassword, // Store the hashed password
                                    });
                                  }
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