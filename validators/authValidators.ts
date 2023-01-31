import { NextFunction, Request, Response } from "express";

import { check, validationResult } from "express-validator";

export const validateUserLogin = [
  check("email")
    .trim()
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("email must not be empty"),
  check("password")
    .trim()
    .isString()
    .not()
    .isEmpty()
    .withMessage("password must not be empty"),
];

export const validateuserSignUp = [
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
    .withMessage("email must be provided"),
  check("password")
    .trim()
    .isString()
    .not()
    .isEmpty()
    .withMessage("name must be provided"),
  check("confirmPassword")
    .trim()
    .isString()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        console.log(value)
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
   return res.status(400).json({ success: false, errors });
  }
  return next();
};

export const userSignUpvalidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  return next();
};
