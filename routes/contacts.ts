const experss = require("express");
const Router = experss.Router();

import {
  createNewContact,
  deleteContact,
  getAllContacts,
} from "../controller/contactsController";

//validators
import { validateCreateContact } from "../validators/contactValidators";
import { validationErrCatcher } from "../validators/validationErrorcatcher";

//middleware
import { authMiddleware } from "../middlewares/AuthMiddleware";

Router.get("/contact", authMiddleware, getAllContacts);

Router.post(
  "/contact",
  authMiddleware,
  validateCreateContact,
  validationErrCatcher,
  createNewContact
);

Router.delete("/contact/:id", authMiddleware, deleteContact);

module.exports = Router;
