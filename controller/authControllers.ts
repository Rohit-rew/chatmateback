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
    const existingUser = await users.getUser(email)
    if(!existingUser) return next(new Error("Invalid credentials"));
    const isValidPass = bcryptService.comparePassword(password , existingUser.password)
    if(!isValidPass) return next(new Error("Invalid credentials"));
    const token = await jwtService.createToken(existingUser)
    res.status(200).send({ success: true,tokenType : 'Bearer' , token});
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
    const existingUser = await users.getUser(email);
    if (existingUser) return next(new Error("Email already exists")); // if user already exists throw error
    password = await bcryptService.hashPassword(password) // if not then hash the password
    const newUser = users.createUser({ name, email, password }); // after hash create the user
    res.status(201).send({ success: true, user: newUser }); //send response to client
  } catch (error: any) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
