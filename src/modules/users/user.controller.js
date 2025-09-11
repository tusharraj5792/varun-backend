import express from 'express'
import { addUserService, loginUserService } from './user.service.js'
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

export const addUserController = async (req, res, next)=>{
    try {
        const result = await  addUserService(req,next)
        return res.status(200).json({
            message:"User created successfully",
            status:200,
            success:true,
            data:result
        })
    } catch (error) {
        console.error("ERror in add controller", error);
        next();
    }
}


export const loginUserController = async (req, res,next)=>{
    try {
        const result = await  loginUserService(req,next)
        return res.status(200).json({
            message:"User logged in successfully",
            status:200,
            success:true,
            data:result
        })
    } catch (error) {
        console.error("ERror in logging controller");
        next();
    }
}