import asyncHandler from 'express-async-handler'
import Message from '../models/message.model.js'
import Thread from '../models/thread.model.js'
import mongoose from 'mongoose'

export const createMessage = asyncHandler (async (req, res, next)=> {
    const { name, email ,message:messageContent } = req.body
    //  const user = req.user._id 
    const threadId = req.params.threadId

    if(!name || !email || !messageContent) {
        return res.status(400).json({message: 'Name, Email and content are required'})
    }
    

    if (!mongoose.Types.ObjectId.isValid(threadId)) {
        return res.status(400).json({ message: 'Invalid thread ID' });
    }

    const thread = await Thread.findById(threadId).exec()
    if (!thread) {
    return res.status(404).json({ message: 'Thread not found' });
    }
    
    const message = await Message.create({name, email, message:messageContent, thread: threadId})
    

    thread.messages.push(message._id)
    await thread.save()

    res.status(200).json({ message: "Message sent successfully" });

})


export const deleteMessage = asyncHandler(async (req, res, next)=>{
  const {id}  = req.params

   if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({message: 'Invalid id'})
   }

    // const message = await Message.findOneAndDelete({_id: id, user: req.userId})
    const message = await Message.findById(id).exec()

    if(!message) {
        return res.status(404).json({message: 'Message not found'})
    }

    // TODO Kolla om användaren är admin eller om användaren är den som skapat kommentaren 

    const thread = await Thread.findById(message.thread).exec()
    thread.messages.pull(id)

    // thread.messages.pull(message.filter(messageId => messageId.toString() !== id))
    

    await Message.deleteOne({_id: id}).exec()
    await thread.save()

    res.sendStatus(204)
})