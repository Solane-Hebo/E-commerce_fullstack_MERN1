import express from "express"
import { createThread, deleteThread, getThreads, updateThread } from "../controllers/thread.controller.js"
import { createMessage, deleteMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.route('/')
 .post(createThread)
 .get(getThreads)

router.route('/:id')
  .patch(updateThread)
  .delete(deleteThread)

router.route('/:threadId/message')
  .post(createMessage)

 

export default router