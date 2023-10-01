const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded());

// Import route definitions
const healthzRoute = require('./routes/healthRouter');
const assignmentRouter = require('./routes/assignmentRouter');


// Use route definitions
app.use('/healthz', healthzRoute);

app.use('/v1/assignments',assignmentRouter);

app.listen(port, () => {
    console.log("Server is running on port 8080");
});
