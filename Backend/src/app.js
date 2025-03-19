
import express from "express"
import ProductRoutes from "./routers/product.router.js"
import threadRoutes from "./routers/thread.route.js"
import messageRoutes from "./routers/message.router.js"
import { errorHandler, notFound } from "./middleware/error.middleware.js"

const app = express()


app.use(express.json())

// product routes
app.use("/api/products", ProductRoutes )
app.use("/api/threads", threadRoutes)
app.use("/api/messages", messageRoutes)


// Serve static images from public/images
app.use('/images', express.static('public/images'));



// Error handling middleware
app.use(notFound)
app.use(errorHandler)

export default app