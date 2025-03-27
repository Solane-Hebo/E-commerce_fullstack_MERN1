import express from "express"
import { createThread, deleteThread, getThreads, updateThread } from "../controllers/thread.controller.js"
import { createMessage} from "../controllers/message.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(verifyToken)

router.route('/')
 .post(createThread)
 .get(getThreads)

router.route('/:id')
  .patch(updateThread)
  .delete(deleteThread)

router.route('/:threadId/message')
  .post(createMessage)

 

export default router