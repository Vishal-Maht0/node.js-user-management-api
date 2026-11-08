
export const errorMiddleware = (err, req, res, next) => {

    if (res.headersSent) {
        return next(err)
    }

    const statusCode = err.statusCode || 500

    const message = statusCode === 500
        ? "Internal Server Error"
        : err.message

    console.error(err)

    return res.status(statusCode).json({
        success: false,
        message
    })
}
