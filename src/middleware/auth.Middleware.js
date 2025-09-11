import jwt from "jsonwebtoken";
import express from 'express'
import { User } from "../modules/users/user.model";
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */


export const authMiddleware = async (req, res, next)=>{
   try {
     const authHeader = req.headers.authorization
    if(!authHeader){
        const error  ={
            message:"Not authorized",
            status:403
        }
        next(error);
    }

    const token  = authHeader.split(' ')[1]
    // verifying the token here

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const {email} = decoded;
    const user = User.findOne({email});
    if(!user){
        const error  ={
            message:"No user found, Invalid token",
            status:404
        }
        next(error);
    }
    req.user = decoded
    next();
   } catch (error) {
        console.error("Error in token verification");
        next(error);
        
   }

}