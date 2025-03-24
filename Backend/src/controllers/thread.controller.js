import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import Thread from "../models/thread.model.js";

export const createThread = asyncHandler(async (req, res, next) =>{
    const {name, title, message:messageContent, email} = req.body
     
    if(!name || !title || !messageContent || !email){
        return res.status(400).json({message: "All fields are required"})
    }

    const thread = await Thread.create({title,message:messageContent, name, email})
    res.status(201).json(thread)
    })

    export const getThreads = asyncHandler(async (req, res, next)=>{

        const threads = await Thread.find()
           .populate('messages')
        
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
        if(messageContent) toUpdate.messageContent = messageContent
        if(name) toUpdate.name = name
        if(email) toUpdate.email = email

        if(Object.keys(toUpdate).length === 0) {
            return res.status(400).json({message: "No changes provided"})
        }

        // TODO: change query so that you can delete your own thread
        const thread = await Thread.findByIdAndUpdate(id, toUpdate, {new: true}).exec()
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
    
        const thread = await Thread.findByIdAndDelete(id).exec()
        if(!thread) {
            return res.status(404).json({message: 'Threadd not found'})
        }
    
        res.sendStatus(204)
    })

