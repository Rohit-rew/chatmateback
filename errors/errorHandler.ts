import { NextFunction, Request, Response } from "express";

const errorCatcher = (err:Error , req : Request,res : Response , next : NextFunction)=>{
        return res.status(400).json({success : false ,msg : err.message})
}


const  routeNotFoundError  = (req : Request,res : Response)=>{
    res.status(400).json({route : "wrong Route"})
}

module.exports = {errorCatcher , routeNotFoundError}