import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type createContactDto = {
  name: string;
  email: string;
};

type currentUser = {
  name: string;
  email: string;
  id: string;
};

export class ContactsRepo {

    
  createNewContact(contactInfo: createContactDto, currentUser: currentUser) {
    const contact = prisma.contacts.create({
      data: { ...contactInfo, ownerId: currentUser.id },
    });
    return contact;
  }

  getAllContacts (ownerId : string){
    const contacts = prisma.contacts.findMany({where : {ownerId }})
    return contacts
  }

  async deleteContact (contactId:string , ownerId : string){
    const existingContact = await prisma.contacts.findFirst({where : {id : contactId}})
    if(!existingContact) throw new Error("Contact does not exist")
    if(existingContact.ownerId != ownerId) throw new Error("Not authorised to delete this contact")
    const contact = prisma.contacts.delete({where : {id : contactId }})
    return contact
  }


}
