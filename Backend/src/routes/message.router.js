import express from "express"
import { createGeneralMessage, createMessage, deleteMessage } from "../controllers/message.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()


router.post('/', createGeneralMessage, verifyToken)
router.post('/:threadId', verifyToken, createMessage);

router.delete('/:id', verifyToken, deleteMessage)
export default router