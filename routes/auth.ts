const experss = require("express");
const Router = experss.Router();

// types
import { Request, Response } from "express";

// controllers
import { login, signUp } from "../controller/authControllers";

//validators
import {
  validateUserLogin,
  validateuserSignUp,
} from "../validators/authValidators";

import { validationErrCatcher } from "../validators/validationErrorcatcher";

Router.post("/login", validateUserLogin, validationErrCatcher, login);

Router.post("/signup", validateuserSignUp, validationErrCatcher , signUp);

module.exports = Router;
