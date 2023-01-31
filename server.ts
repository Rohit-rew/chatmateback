const express = require("express");
const app = express();

// types
import { Request, Response } from "express";

//env config
require("dotenv").config();

// home route for testing only
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

const port = process.env.PORT;
app.listen(port, console.log(`server started on port ${port}`));
 