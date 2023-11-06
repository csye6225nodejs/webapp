const express = require('express');
const bodyParser = require('body-parser');
const Account = require('./../models/Account');
const bcrypt = require('bcrypt');
const logger = require('./../logger/logger');


async function basicAuth(req,res,next) {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        logger.info("Your operation is not permitted");
        res.status(401).send();
        return;
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(encodedCredentials, 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    console.log(username);
    console.log(password);

    const isValid = await isValidUser(username, password);
    if(isValid === true){
        req.userId = await getUserId(username);
        next();
    } else {
        logger.info("This is not a valid or authenticated user");
        res.status(401).send();
    }
}

async function isValidUser(email, password) {
    try {
        const user = await Account.findOne({where: {email}});

        if(!user) {
            return false;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            console.log("it matches");
            logger.info("You are a valid user");
            return true;
        } else {
            logger.info("You are not a valid user");
            console.log("Does not match");
            return false;
        }
    } catch(error) {
        logger.error("You have an authentication error in middleware");
        console.error('Authentication error: ', error);
        return false;
    }
}

async function getUserId(email) {
    
    try {
        const user = await Account.findOne({where: {email}});

        if(user) {
            console.log(user+"got my user in userid");
            return user.id;
        } else {
            return null;
        }
    } catch(error) {
        console.error("Error in getuserID: ", error);
        throw(error);
    }
}

module.exports  = {basicAuth, isValidUser, getUserId};

