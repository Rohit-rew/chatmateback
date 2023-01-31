const experss = require("express")
const Router = experss.Router()

// types
import { Request, Response } from "express"

// controllers
import { login , signUp } from "../controller/authControllers"

//validators
import { validateUserLogin , loginValidation } from "../validators/authValidators"

Router.post("/login" , validateUserLogin, loginValidation , login)

Router.post("/signup"  ,  signUp)

module.exports = Router