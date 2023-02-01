import { NextFunction, Request, Response } from "express";

//prisma db
import { Users } from "../prisma/database";
const users = new Users();

// bcrypt service
import { BcryptService } from "../utils/bcrypt";
const bcryptService = new BcryptService()

//jwt service 
import { JwtService } from "../utils/jwtService";
const jwtService = new JwtService()


//logging in existing user
export const login = async (req: Request, res: Response , next : NextFunction) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.getUser(email) // check if user exists
    if(!existingUser) return next(new Error("Invalid credentials")); // if not throw error
    const isValidPass = await bcryptService.comparePassword(password , existingUser.password)// if yes then compare password
    if(!isValidPass) return next(new Error("Invalid credentials"));// if invalid pass then throw error
    const sanitedUserData = jwtService.userDataSanitizer(existingUser) // sanitize the data (remove password)
    const token = await jwtService.createToken(sanitedUserData) // if valid pass then generate token
    res.status(200).send({ success: true,tokenType : 'Bearer' , token}); //send token to client
  } catch (error : any) {
    console.log(error)
    res.status(400).send({ success: false, msg: error.message });
  }

};


//registering new user
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, email, password } = req.body;

  try {
    const existingUser = await users.getUser(email); // checkif user exists
    if (existingUser) return next(new Error("Email already exists")); // if user already exists throw error
    password = await bcryptService.hashPassword(password) // if not then hash the password
    const newUser = await users.createUser({ name, email, password }); // after hash create the user
    //sanitize the user before sending it to the client
    res.status(201).send({ success: true, user: {...newUser} }); //send response to client
  } catch (error: any) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
