import {  PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreateUserDto {
    name : string
    email : string
    password : string
}

export class Users {

    async getUser (email : string) {
        const user = await prisma.users.findFirst({where : {email}})
        return user
    }

    async createUser (userInfo : CreateUserDto) {
        const data = await prisma.users.create({data : userInfo})
        return data
    }

}
