import { Request, Response } from "express";
import { UsersRepo } from "../prisma/usersRepo";

const users = new UsersRepo()

// index signature
interface Req extends Request {
    [key: string]: any;
}

export const getCurrentUser = async (req:Req,res : Response)=>{
    const currentUser = req.currentUser
    try {
        res.status(200).send(currentUser)
    } catch (error:any) {
        res.status(404).send({success : false , msg : error.message})
    }
}