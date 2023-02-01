const experss = require("express");
const Router = experss.Router();

import {
  createNewContact,
  deleteContact,
} from "../controller/contactsController";

//validators
import {
  validateCreateContact,
} from "../validators/contactValidators";
import { validationErrCatcher } from "../validators/validationErrorcatcher";

//middleware
import { authMiddleware } from "../middlewares/AuthMiddleware";

Router.post(
  "/contact",
  authMiddleware,
  validateCreateContact,
  validationErrCatcher,
  createNewContact
);


Router.delete("/contact", deleteContact);

module.exports = Router;
