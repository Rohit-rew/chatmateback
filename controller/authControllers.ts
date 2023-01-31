import { Request, Response } from "express";


export const login = (req : Request,res : Response)=>{

    res.send("login")

}


export const signUp = (req : Request,res : Response)=>{

    res.send("registered")
}


