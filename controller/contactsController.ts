import { Request, Response } from "express"

export const createNewContact = (req : Request,res : Response)=>{
    // console.log(req.currentUser)
    res.send("contact created")
}


export const deleteContact = (req : Request,res : Response)=>{
    res.send("contact deleted")
}
