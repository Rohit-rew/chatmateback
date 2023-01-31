import jwt from "jsonwebtoken"

const secret  = process.env.JWT_SECRET

interface jwtDataSanitized {
    id : string,
    email : string,
    name : string,
}

interface jwtdataUnsanitized extends jwtDataSanitized {
    password : string
}


export class JwtService {

    async createToken (dataObject : jwtDataSanitized){
        const token = jwt.sign(dataObject , (secret as string) , {algorithm  :"HS256" , expiresIn : '10d'}  )
        return token
    }

    userDataSanitizer (userData : jwtdataUnsanitized){
        const sanitizeduserData = { name : userData.name, email : userData.email , id : userData.id}
        return sanitizeduserData
    }  

} 


 