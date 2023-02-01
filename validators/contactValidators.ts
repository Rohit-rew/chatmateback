import { NextFunction, Request, Response } from "express";

import { check, validationResult } from "express-validator";

export const validateCreateContact = [
  check("name")
    .trim()
    .isString()
    .not()
    .isEmpty()
    .withMessage("name must be provided"),

  check("email")
    .trim()
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("email must not be empty"),
];


