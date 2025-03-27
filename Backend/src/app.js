
import express from "express"
import ProductRoutes from "./routes/product.router.js"
import threadRoutes from "./routes/thread.route.js"
import messageRoutes from "./routes/message.router.js"
import { errorHandler, notFound } from "./middleware/error.middleware.js"
import uploadRouter from "./routes/upload.router.js"
import userRoutes from "./routes/user.route.js"
import orderRoutes from "./routes/order.route.js"

const app = express()


app.use(express.json())

// product routes
app.use("/api/products", ProductRoutes )
app.use("/api/threads",  threadRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api", uploadRouter)
app.use('/api/auth', userRoutes)
app.use('/api/orders', orderRoutes)



// Serve static images from public/images
app.use('/images', express.static('public/images'));



// Error handling middleware
app.use(notFound)
app.use(errorHandler)

export default app