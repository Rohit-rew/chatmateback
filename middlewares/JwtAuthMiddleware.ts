

import { NextFunction } from "express";
import { Socket } from "socket.io";
import { JwtService } from "../utils/jwtService";
const jwtService = new JwtService()

//types
import { ExtendedError } from "socket.io/dist/namespace";

export const jwtAuthMiddleware = async (socket : Socket, next : any )=>{

  let token = socket.client.request.headers.authorization
  if(!token) next(new Error("Auth token not present"))
  token = token?.split(" ")[1]
  const user = await jwtService.decodeJwt((token as string))
  socket.currentUser = user
  next()
}  

