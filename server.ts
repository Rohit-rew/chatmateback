const express  = require("express");
const app = express();

//cors
const cors = require("cors")
app.use(cors())

//socker.io setup
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app)
const io = new Server(httpServer , {cors : {origin : "*"}})

//bodyparser 
const bodyParser = require("body-parser")
app.use(bodyParser());

//env config
require("dotenv").config();

// auth route
const authRoute = require("./routes/auth") // login and register
app.use(authRoute)

//contacts Route
const contactsRoute = require("./routes/contacts")
app.use(contactsRoute)


//error handler
const {errorCatcher , routeNotFoundError} = require("./errors/errorHandler")
app.use(routeNotFoundError)
app.use(errorCatcher)

// middleware
import { jwtAuthMiddleware } from "./middlewares/JwtAuthMiddleware";
io.use(jwtAuthMiddleware)

// socket connection
io.on("connection" , (socket)=>{
  console.log(socket.currentUser)

  socket.on("chat" , (message)=>{
    console.log(message)
  })
})


// server starting
const port = process.env.PORT;
httpServer.listen(port, ()=>console.log(`server started on port ${port}`)); 
 