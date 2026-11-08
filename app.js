
import "dotenv/config"
import express from "express"
import helmet from "helmet"
import { rateLimit } from "express-rate-limit"

import connectDB from "./config/db.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"

const app = express()
const PORT = process.env.PORT || 5000

// Rate limiter for authentication routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
})

// Security middleware
app.use(helmet())
app.use(express.json())

// API routes
app.use("/api/users", userRouter)
app.use("/api/auth", authLimiter, authRouter)

app.get("/", (req, res) => {
    return res.send("User Management API is running successfully!")
})

// Error middleware should be registered after all routes
app.use(errorMiddleware)

const connectServer = async () => {
    await connectDB()

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

connectServer()
