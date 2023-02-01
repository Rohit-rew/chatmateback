import { NextFunction, Request, Response } from "express";
import { JwtService } from "../utils/jwtService";

const jwtService = new JwtService()


// index signature 
interface Req extends Request {
    [key: string]: any;
}

export const authMiddleware = async (req:Req,res : Response , next : NextFunction)=>{
    const token = req.headers.authorization
    if(! token) next(new Error("Auth token not attached"))

    if(token){
        try {
            const jwt = token.split(" ")[1]
            const user = await jwtService.decodeJwt(jwt)
            // validate the user with the database record
            req.currentUser = user
            next()
        } catch (error) {
            res.status(404).send({success : false , message : "invalid token please log in again"})
        }
    }

}