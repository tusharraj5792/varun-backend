import express from "express";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

// export const addUserService = async (req, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       const error = {
//         status: 400,
//         message: "User Already exsits"
//       };
//       next(error);
//     }

//     const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });
//     const password = bcrypt.hash(req.body.password, 10)
//     const newUser =  User.create({...req.body, token, password})
//     await newUser.save()
//   } catch (error) {
//     console.error("Error in adding new user");
//     next();
//   }
// };


export const addUserService = async (req, next) => {
  try {
    const { email, password: plainPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = {
        status: 400,
        message: "User already exists"
      };
      return next(error);
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newUser = await User.create({
      ...req.body,
      token,
      password: hashedPassword
    });
    return newUser;
  } catch (error) {
    console.error("Error in adding new user", error);
    next(error);
  }
};


export const loginUserService = async (req, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "Issue in ema");
    
    const user = await User.findOne({ email });
    if (!user) {
      const error = {
        message: "User not found",
        status: 404
      };
      return next(error);
    }
    const isPasswordValid =  bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = {
        message: "Incorrect password",
        status: 400
      };
      return next(error);
    }
    console.log(user, "Userrrr");
    
    return user;
  } catch (error) {
    console.error("Error in logging", error);
    next(error);
  }
};



// export const loginUserService = async (req,next)=>{
//   try {
//     const {email, password} = req.body
//     const user  = await User.findOne({email})
//     if(!user){
//       const error = {
//         message:"User Not found",
//         status:404,
//       }
//       next(error);
//     }
//     const checkPassowrd = await bcrypt.compare(password, user.password)
//     if(!checkPassowrd){
//        const error = {
//         message:"Incorret Passoword",
//         status:400,
//       }
//       next(error);
//     }

//     return user;
//   } catch (error) {
//     console.error("Error in logging", error);
//     next(error);
    
//   }
// }