import { NextFunction, Request, Response } from "express";

import {  validationResult } from "express-validator";

export const validationErrCatcher = (
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