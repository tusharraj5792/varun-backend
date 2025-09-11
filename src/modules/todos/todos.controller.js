import express from 'express'
import { Todo } from './todos.model'
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

export const createToDoController = async (req, res, next)=>{
    try {
        const {title} = req.body
        const {email, _id}  = req.user

        let newToDo = await Todo.create({
            title,
            user: _id
        })
        newToDo.save();

        return res.status(200).json({
            message:"ToDo added",
            status:200,
            data:newToDo,
            success:true
        })
    } catch (error) {
        next(error)
    }
}



export const editToDoController  = async (req, res, next)=>{
    try {

        const {id}  =req.params

        const todo = Todo.findById(id)
        if(!todo){
            return res.status(400).json({
                message:"Todo Not found"
            })
        }
        const {title, completed} = req.body
        const {email, _id}  = req.user

        
    } catch (error) {
        next(error)
    }
}

// export const get fetchToDoController = async (req, res) =>{}