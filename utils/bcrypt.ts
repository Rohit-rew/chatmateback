import * as bcrypt from "bcrypt"

export class BcryptService {

    rounds = 10;

    async hashPassword (pass : string){
        const salt = await bcrypt.genSalt(this.rounds , "a")
        return await bcrypt.hash(pass , salt )
    }

    async comparePassword (pass : string , hash : string){
        return await bcrypt.compare(pass ,hash )
    }

}