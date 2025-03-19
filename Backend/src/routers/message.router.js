import express from "express"
import { createMessage, deleteMessage } from "../controllers/message.controller.js"

const router = express.Router()


router.delete('/:id', deleteMessage)
router.post('/:id', createMessage)
export default router