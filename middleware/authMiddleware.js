const express = require('express');
const bodyParser = require('body-parser');

function basicAuth(req,res,next) {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        res.status(401).send();
        return;
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(encodedCredentials, 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    console.log(username);
    console.log(password);

    if(isValidUser(username, password)){
        req.userId = getUserId(username);

        next();
    } else {
        res.status(401).send();
    }
}

function isValidUser(username, password) {
    return true;
}

function getUserId(username) {
    return 1;
}

module.exports  = basicAuth;

