const express  = require("express");
const app = express();

//bodyparser 
const bodyParser = require("body-parser")
app.use(bodyParser());

//env config
require("dotenv").config();

// routes
const authRoute = require("./routes/auth") // login and register
app.use(authRoute)


//error handler
const {errorCatcher , routeNotFoundError} = require("./errors/errorHandler")

app.use(routeNotFoundError)
app.use(errorCatcher)


// server starting
const port = process.env.PORT;
app.listen(port, console.log(`server started on port ${port}`));
 