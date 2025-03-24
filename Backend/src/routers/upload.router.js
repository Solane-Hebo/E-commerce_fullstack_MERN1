import express from "express"
import router from "./product.router.js"
import upload from "../controllers/upload.controller.js"

const uploadRouter = express.Router()

uploadRouter.post('/upload-images', upload.array('images', 20), (req, res) => {
    const imageUrls = req.files.map(file => `/public/images/${file.filename}`)
    res.json({ imageUrls })
})

export default uploadRouter