export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (error, req, res, next) => {
    console.log(`Error: ${error.message}`)

    const statusCode = req.statusCode === 200 ? 500 : req.statusCode
    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "Development" ? error.stack : null
    })
}