import { Request, Response } from "express"


// index signature
interface Req extends Request {
    [key: string]: any;
}

import { ContactsRepo } from "../prisma/contactsRepo";
const contactRepo = new ContactsRepo()

export const createNewContact = async (req : Req,res : Response)=>{
    const contactInfo = req.body
    try {
        const contact = await contactRepo.createNewContact(contactInfo ,req.currentUser )
        res.status(201).send({success : true , contact})
    } catch (error) {
        res.status(400).send({success : false})
    }
}

export const getAllContacts = async (req : Req,res : Response)=>{
    const currentUser = req.currentUser

    try {
        const contacts = await contactRepo.getAllContacts(currentUser.id)
        res.status(200).send({contacts})
    } catch (error) {
        res.status(400).send({success : false})
    }
}


export const deleteContact = async (req : Req,res : Response)=>{
    const {id} = req.params
    const currentUser = req.currentUser
    try {
        const contact = await contactRepo.deleteContact(id , currentUser.id)
        res.status(200).send({success : true , contact })
    } catch (error:any) {
        console.log(error)
        res.status(404).send({success : false , msg : error.message })
    }
}
