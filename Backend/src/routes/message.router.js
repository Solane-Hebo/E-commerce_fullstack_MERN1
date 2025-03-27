import express from "express"
import { deleteMessage } from "../controllers/message.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()


router.delete('/:id', verifyToken, deleteMessage)
export default router