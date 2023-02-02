const express = require("express");
const app = express();

//cors
const cors = require("cors");
app.use(cors());

//socker.io setup
import { createServer } from "http";
import { Server, Socket } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

//bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser());

//env config
require("dotenv").config();

// auth route
const authRoute = require("./routes/auth"); // login and register
app.use(authRoute);

//contacts Route
const contactsRoute = require("./routes/contacts");
app.use(contactsRoute);

// user route
const userRoute = require("./routes/user");
app.use(userRoute);

//error handler
const { errorCatcher, routeNotFoundError } = require("./errors/errorHandler");
app.use(routeNotFoundError);
app.use(errorCatcher);

// middleware
import { jwtAuthMiddleware } from "./middlewares/JwtAuthMiddleware";
io.use(jwtAuthMiddleware);

interface soc extends Socket {
  // move to own file
  [key: string]: any;
}

// socket connection
io.on("connection", (socket: soc) => {
  const currentUser = socket.currentUser;

  socket.on(`one-on-one`, (payload) => {
    console.log(payload.sender.email)
    socket.broadcast.emit(`${payload.sentTo}` , payload)
    socket.emit(`${payload.sender.email}` , payload)
  });
}); 

// server starting 
const port = process.env.PORT;
httpServer.listen(port, () => console.log(`server started on port ${port}`));
