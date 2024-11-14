//import .env
require('dotenv').config();

//import express
const express = require('express');

//create express application object
const app = express();

//import routes/tasks.js
const tasks = require("./routes/tasks");

//import db/connect.js
const connectDB = require('./db/connect');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//****middleware****
//middleware runs between recieving and responding
app.use(express.static('./public'))
app.use(express.json());//automatically parse json 


//****routes****
app.use('/api/v1/tasks', tasks);//sets up /routes/tasks.js
//so that it will handle requests

//set up route for 404 error (route not found)
app.use(notFound);

//set up the error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URL);
        //first argument starts listening on a given port
        app.listen(port, console.log(`server is listening on port ${port}...`));
        //second argument is a callback that runs after success
    }
    catch(error){
        console.log(error);
    }
}

start();
