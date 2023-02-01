import { check } from "express-validator";

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



