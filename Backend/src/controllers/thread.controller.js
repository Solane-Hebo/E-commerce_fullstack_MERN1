import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import Thread from "../models/thread.model.js";

export const createThread = asyncHandler(async (req, res, next) =>{
    const {name, title, message:messageContent, email} = req.body
    const user = req.user._id
     
    if(!name || !title || !messageContent || !email){
        return res.status(400).json({message: "All fields are required"})
    }

    const thread = await Thread.create({title, message:messageContent, name, email, user})
    res.status(201).json(thread)
    })

    export const getThreads = asyncHandler(async (req, res)=>{
         const threads = await Thread.find()
            .populate("user", "firstName lastName email")
            .populate({
             path: "messages",
              populate: {
                 path: "user",
                 select: "firstName lastName email"
              }
            })
            
            res.status(200).json(threads)    
    })

    export const updateThread = asyncHandler(async (req, res, next)=>{
        const { id } = req.params
        const { title,  message: messageContent, name, email} = req.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid thread id"})
        }

        const toUpdate = {}
        if(title) toUpdate.title = title
        if(messageContent) toUpdate.message = messageContent
        if(name) toUpdate.name = name
        if(email) toUpdate.email = email

        if(Object.keys(toUpdate).length === 0) {
            return res.status(400).json({message: "No changes provided"})
        }

        const thread = await Thread.findOneAndUpdate({_id:id, user: req.user._id}, 
        toUpdate, {new: true}).exec()

        if(!thread){
            return res.status(404).json({message: "Thread not found"})
        }

        res.status(200).json(thread)

    })

    
    export const deleteThread = asyncHandler(async (req, res, next)=>{
        const { id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid id'})
        }
        
        //TODO: man ska kunna ändra sin egen eller admin kunna
        const thread = await Thread.findById(id).exec()
        if(!thread) {
            return res.status(404).json({message: 'Threadd not found'})
        }

        if(message.user.toString() !== req.user._id && req.user.role !== "admin" && req.user.role !== "moderator") {
            return res.status(403).json({ message: 'You are not allowed to delete this thread'})
        }

        await Thread.deleteOne({_id: id}).exec()
    
        res.sendStatus(204)
    })

