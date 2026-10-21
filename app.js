import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"


app.use(express.json())
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use(errorMiddleware)


const connectServer = async () =>{
    await connectDB()

    app.listen(PORT, () =>{
    console.log(`Radhe Radhe Server is running on ${PORT} successfully!!`)
})
}


app.get("/", (req, res) =>{
    return res.send(`This is home route on PORT : ${PORT}`)
})



connectServer()