import express from "express"
import { errorHandler, notFound } from "./middleware/error.middleware.js"

import messageRoutes from "./routes/message.router.js"
import threadRoutes from "./routes/thread.route.js"
import ProductRoutes from "./routes/product.router.js"
import uploadRouter from "./routes/upload.router.js"
import userRoutes from "./routes/user.route.js"
import orderRoutes from "./routes/order.route.js"
import cartRoute from './routes/cart.router.js'
import cors from 'cors'



const app = express()

const whitelist = ['http://localhost:5174', ' http://localhost:7676', '*']

app.use(cors())
app.use(express.json())

// product routes
app.use("/api/products", ProductRoutes )
app.use("/api/product", ProductRoutes)

app.use("/api", uploadRouter)

app.use("/api/threads",  threadRoutes)
app.use("/api/messages", messageRoutes)

app.use('/api/auth', userRoutes)

app.use('/api/order', orderRoutes)
app.use('/api/orders', orderRoutes)

app.use('/api/cart', cartRoute)


// Serve static images from public/images
app.use('/images', express.static('public/images'));


// Error handling middleware
app.use(notFound)
app.use(errorHandler)

export default app