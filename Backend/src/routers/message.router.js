import express from "express"
import { deleteMessage } from "../controllers/message.controller.js"

const router = express.Router()


router.delete('/:id', deleteMessage)
export default router