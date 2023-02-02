const experss = require("express");
const Router = experss.Router();

// middlewares 
import { authMiddleware } from "../middlewares/AuthMiddleware";

//controllers
import { getCurrentUser } from "../controller/userController";

Router.get("/user" , authMiddleware , getCurrentUser )

module.exports = Router 