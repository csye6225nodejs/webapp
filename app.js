const express = require('express');
const bodyParser = require('body-parser');

const fs = require("fs");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded());

require('dotenv').config();
// Import route definitions
const healthzRoute = require('./routes/healthRouter');
const assignmentRouter = require('./routes/assignmentRouter');

// Use route definitions
app.use('/healthz', healthzRoute);
app.use('/v1/assignments', assignmentRouter);
app.use('*',(req,res) => {
    res.status(404).send();
})


module.exports = app;