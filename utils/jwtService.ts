import jwt from "jsonwebtoken"

const secret  = process.env.JWT_SECRET

interface jwtdata {
    id : string,
    email : string,
    name : string
}


export class JwtService {

    async createToken (dataObject : jwtdata){
        const token = jwt.sign(dataObject , (secret as string) , {algorithm  :"HS256" , expiresIn : '10d'}  )
        return token
    }

} 